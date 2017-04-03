'use strict';

const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['bower.json'] = {};
});

test(`Add angular deps to bower.json dependencies`, t => {
  context.props = {modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.angular, '1.6.2');
  t.is(context.mergeJson['bower.json'].devDependencies['angular-mocks'], '1.6.2');
});

test(`Add 'angular-ui-router' to bower.json dependencies`, t => {
  context.props = {router: 'uirouter', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['angular-ui-router'], '1.0.0-beta.1');
});

test(`Add 'angular-router' to bower.json dependencies`, t => {
  context.props = {router: 'ngroute', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['angular-route'], '1.6.2');
});

test(`Add 'bootstrap' to bower.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.bootstrap, '3.3.4');
});

test(`Add 'bootstrap-sass' to bower.json dependencies is css is 'scss'`, t => {
  context.props = {styling: 'bootstrap', css: 'scss', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['bootstrap-sass'], '3.3.4');
});

test(`Add 'jQuery' to package.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'webpack'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['package.json'].dependencies.jquery, '^3.1.1');
});

test(`Add 'angular-ui-bootstrap' to package.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'webpack'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['package.json'].dependencies['angular-ui-bootstrap'], '2.5.0');
});
