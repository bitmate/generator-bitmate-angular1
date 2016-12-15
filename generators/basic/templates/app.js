'use strict';

angular.module('app', [])
  .config(function(<% if (router === 'ngroute') { %>$routeProvider<% } if (router === 'uirouter') { %>$urlRouterProvider<% } %>, $locationProvider) {<% if (router === 'ngroute') { %>
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });<% } if (router === 'uirouter') { %>
    $urlRouterProvider
      .otherwise('/');<% } %>

    $locationProvider.html5Mode(true);
  });
