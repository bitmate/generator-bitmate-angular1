'use strict';

angular.module('app')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: function ($scope) {
      $scope.awesomeThings = [];
    }
  });
