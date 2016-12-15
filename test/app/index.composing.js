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
    context.composeWith = () => {
    };
    require('../../generators/app/index');
});

test(`Call this.composeWith once`, () => {
    const spy = chai.spy.on(context, 'composeWith');
    context.props = {
        client: 'angular1',
        css: 'less',
        styling: 'bootstrap',
        router: 'uirouter'
    };
    TestUtils.call(context, 'composing', {});
    expect(spy).to.have.been.called.once();
});
