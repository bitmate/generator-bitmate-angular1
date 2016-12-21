'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
    configuring: {
        ngModules: function() {
            var angModules = [];
            if(this.options.router === 'ngroute') angModules.push("'ngRoute'");
            if(this.options.router === 'uirouter') angModules.push("'ui.router'");
            if (this.options.styling === 'bootstrap') angModules.push("'ui.bootstrap'");
            this.options.angularModules = '\n  ' + angModules.join(',\n  ') +'\n';
        }
    },

    writing: {
        src() {
            const files = [
                'app.js',
                'app.css',
                'main/main.controller.js',
                'main/main.controller.spec.js',
                'main/main.css',
                'main/main.js',
                'main/main.html'
            ];
            const options = this.options;
            files.forEach(file => {
                this.copyTemplate(file, 'client/app/' + file, options);
            });
        }
    }
});