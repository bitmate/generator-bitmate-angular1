'use strict';

angular.module('app', [<%- angularModules %>])
  .config((<% if (router === 'ngroute') { %>$routeProvider<% } if (router === 'uirouter') { %>$urlRouterProvider<% } %>, $locationProvider) => {<% if (router === 'ngroute') { %>
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });<% } if (router === 'uirouter') { %>
    $urlRouterProvider
      .otherwise('/');<% } %>

    $locationProvider.html5Mode(true);
  });
