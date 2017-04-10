/* eslint quotes: 0 */  // --> OFF

const bitmate = require('@oligibson/bitmate-generator');

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
      this.options.angularModules = `${angModules.join(', ')}`;
    }
  },

  writing: {
    src() {
      const files = [
        'client/index.js',
        'client/index.css',
        'client/app/main.controller.js',
        'client/app/main.controller.spec.js',
        'client/app/main.css',
        'client/app/main.html'
      ];
      const options = this.options;
      files.forEach(file => {
        this.copyTemplate(file, file, options);
      });
    }
  }
});
