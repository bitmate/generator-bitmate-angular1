'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

const files = [
    'app.js',
    'app.css',
    'main/main.controller.js',
    'main/main.controller.spec.js',
    'main/main.css',
    'main/main.js',
    'main/main.html'
];

test.before(() => {
    context = TestUtils.mock('basic');
    require('../../generators/basic');
    process.chdir('../../');
});

test(`Call this.copyTemplate 7 times`, t => {
    const spy = chai.spy.on(context, 'copyTemplate');
    TestUtils.call(context, 'writing.src', {
        framework: 'angular1',
        css: 'css',
        router: 'uirouter'
    });
    expect(spy).to.have.been.called.exactly(files.length);
    files.forEach(file => t.true(context.copyTemplate['client/app/' + file].length > 0));
});