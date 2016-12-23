'use strict';

(function() {

class MainController {

  constructor() {
    this.awesomeThings = [];
  }

}

angular.module('app')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
