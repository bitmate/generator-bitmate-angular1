'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

const files = [
  'client/index.js',
  'client/index.css',
  'client/app/main.controller.js',
  'client/app/main.controller.spec.js',
  'client/app/main.css',
  'client/app/main.html'
];

test.before(() => {
  context = TestUtils.mock('basic/bower');
  require('../../../generators/basic/bower');
  process.chdir('../../../');
});

test(`Call this.copyTemplate 6 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing.src', {
    client: 'angular1',
    css: 'css',
    router: 'uirouter',
    styling: 'bootstrap',
    angularModules: ''
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[file].length > 0));
});
