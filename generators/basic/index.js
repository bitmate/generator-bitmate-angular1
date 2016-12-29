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
        'app/app.js',
        'app/app.css',
        'app/main/main.controller.js',
        'app/main/main.controller.spec.js',
        'app/main/main.css',
        'app/main/main.js',
        'app/main/main.html'
      ];
      const options = this.options;
      files.forEach(file => {
        this.copyTemplate(file, `client/${file}`, options);
      });
    }
  }
});
