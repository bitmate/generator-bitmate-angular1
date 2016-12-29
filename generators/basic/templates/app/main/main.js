'use strict';

angular.module('app')
  <% if (router === 'ngroute') { %>.config($routeProvider =>
    $routeProvider
      .when('/', {
        template: '<main></main>'
      })
  );<% } %><% if (router === 'uirouter') { %>.config($stateProvider =>
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main></main>'
      })
  );<% } %>
