'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
    context = TestUtils.mock('basic');
    require('../../generators/basic/index');
});

test('Set angularModules to ui.bootstrap', t => {
    context.options = {
        styling: 'bootstrap'
    };
    TestUtils.call(context, 'configuring.ngModules');
    t.is(context.options.angularModules,  "\n  'ui.bootstrap'\n");
});

test('Set angularModules to ngRoute', t => {
    context.options = {
        router: 'ngroute'
    };
    TestUtils.call(context, 'configuring.ngModules');
    t.is(context.options.angularModules,  "\n  'ngRoute'\n");
});

test('Set angularModules to ui.router', t => {
    context.options = {
        router: 'uirouter'
    };
    TestUtils.call(context, 'configuring.ngModules');
    t.is(context.options.angularModules,  "\n  'ui.router'\n");
});

test('Set angularModules to ui.router & ui.bootstrap', t => {
    context.options = {
        styling: 'bootstrap',
        router: 'uirouter'
    };
    TestUtils.call(context, 'configuring.ngModules');
    t.is(context.options.angularModules,  "\n  'ui.router',\n  'ui.bootstrap'\n");
});

