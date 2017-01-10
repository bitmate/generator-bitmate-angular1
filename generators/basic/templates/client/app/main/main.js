'use strict';

angular.module('app')
  <% if (router === 'ngroute') { %>.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<main></main>'
      });
  });<% } %><% if (router === 'uirouter') { %>.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main></main>'
      });
  });<% } %>
