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

test(`Call this.composeWith once when modules is 'webpack'`, () => {
  const spy = chai.spy.on(context, 'composeWith');
  context.props = {modules: 'webpack'};
  TestUtils.call(context, 'composing', {modules: context.props.modules, router: 'uirouter'});
  expect(spy).to.have.been.called.once();
  expect(spy).to.have.been.called.with(require.resolve('../../generators/basic/modules'));
});

test(`Call this.composeWith once when modules is 'bower'`, () => {
  const spy = chai.spy.on(context, 'composeWith');
  context.props = {modules: 'bower'};
  TestUtils.call(context, 'composing', {modules: context.props.modules, router: 'uirouter'});
  expect(spy).to.have.been.called.once();
  expect(spy).to.have.been.called.with(require.resolve('../../generators/basic/bower'));
});
