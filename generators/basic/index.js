'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  configuring: {
    ngModules() {
      const angModules = [];
      if (this.options.router === 'ngroute') {
        angModules.push("'ngRoute'");
      }
      if (this.options.router === 'uirouter') {
        angModules.push("'ui.router'");
      }
      if (this.options.styling === 'bootstrap') {
        angModules.push("'ui.bootstrap'");
      }
      this.options.angularModules = `\n  ${angModules.join(',\n  ')}\n`;
    }
  },

  writing: {
    src() {
      const files = [
        'client/app/app.js',
        'client/app/app.css',
        'client/app/main/main.controller.js',
        'client/app/main/main.controller.spec.js',
        'client/app/main/main.css',
        'client/app/main/main.js',
        'client/app/main/main.html'
      ];
      const options = this.options;
      files.forEach(file => {
        this.copyTemplate(file, file, options);
      });
    }
  }
});
