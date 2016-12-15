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

test('Set framework and call this.clientPrompts', t => {
    context.bitmatePrompts = () => {};
    const spy = chai.spy.on(context, 'clientPrompts');
    TestUtils.call(context, 'prompting.bitmate');
    t.is(context.options.framework, 'angular1');
    expect(spy).to.have.been.called.once();
});
