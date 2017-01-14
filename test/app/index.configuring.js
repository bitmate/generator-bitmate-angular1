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
    set: () => {
    }
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
  context.props = {modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.angular, '^1.5.0');
  t.is(context.mergeJson['bower.json'].devDependencies['angular-mocks'], '^1.5.0');
});

test(`Add 'angular-ui-router' to bower.json dependencies`, t => {
  context.props = {router: 'uirouter', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['angular-ui-router'], '1.0.0-beta.1');
});

test(`Add 'angular-router' to bower.json dependencies`, t => {
  context.props = {router: 'ngroute', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['angular-route'], '1.6.0');
});

test(`Add 'bootstrap' to bower.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.bootstrap, '3.3.4');
});

test(`Add 'bootstrap-sass' to bower.json dependencies is css is 'scss'`, t => {
  context.props = {styling: 'bootstrap', css: 'scss', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['bootstrap-sass-official'], '3.3.4');
});

test(`Add 'jQuery' to package.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'webpack'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['package.json'].dependencies.jquery, '^3.1.1');
});

test(`Add 'angular-bootstrap-npm' to package.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'webpack'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['package.json'].dependencies['angular-bootstrap-npm'], '^0.14.3');
});
