'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
    context = TestUtils.mock('app');
    require('../../generators/app/index');
});

test.beforeEach(() => {
    context.mergeJson['bower.json'] = {};
    context.config = {
        set: () => {}
    };
});

test('Call this.config.set twice', () => {
    context.config = {
        set: () => {}
    };
    const spy = chai.spy.on(context.config, 'set');
    TestUtils.call(context, 'configuring');
    expect(spy).to.have.been.called.once();
    expect(spy).to.have.been.called.with('props');
});

test(`Add angular deps to bower.json dependencies`, t => {
    context.props = {};
    TestUtils.call(context, 'configuring');
    t.is(context.mergeJson['bower.json'].dependencies.angular, '^1.5.0');
    t.is(context.mergeJson['bower.json'].devDependencies['angular-mocks'], '^1.5.0');
});

test(`Add 'angular-ui-router' to bower.json dependencies`, t => {
    context.props = {router: 'uirouter'};
    TestUtils.call(context, 'configuring');
    t.is(context.mergeJson['bower.json'].dependencies['angular-ui-router'], '1.0.0-beta.1');
});

test(`Add 'angular-router' to bower.json dependencies`, t => {
    context.props = {router: 'ngroute'};
    TestUtils.call(context, 'configuring');
    t.is(context.mergeJson['bower.json'].dependencies['angular-route'], '1.6.0');
});

test(`Add 'bootstrap' to bower.json dependencies`, t => {
    context.props = {styling: 'bootstrap'};
    TestUtils.call(context, 'configuring');
    t.is(context.mergeJson['bower.json'].dependencies['bootstrap'], '3.3.4');
});