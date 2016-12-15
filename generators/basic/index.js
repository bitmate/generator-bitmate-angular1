'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
    configuring() {

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