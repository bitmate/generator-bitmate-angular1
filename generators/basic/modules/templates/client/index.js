var angular = require('angular');

var main = require('./app/main.controller');
<% if (router === 'uirouter') { -%>
require('angular-ui-router');
var routesConfig = require('./routes');
<% } -%>
<% if (styling === 'bootstrap') { -%>
require('jquery');
require('angular-bootstrap-npm');
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');
<% } -%>

<% if (modules === 'webpack') { -%>
require('./index.<%- css %>');
<% } -%>
var app = 'app';
module.exports = app;

angular
<% if (router === 'uirouter') { -%>
  .module(app, [
    <%- angularModules %>
  ])
  .config(routesConfig)
<% } else { -%>
  .module(app, [<%- angularModules %>])
<% } -%>
  .component('app', main);

