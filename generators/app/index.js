'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
    prompting: {
        bitmate() {
            this.options.client = 'angular1';
            return this.clientPrompts();
        },

        angularOptions() {
            // Can add more prompts that are angular specific here...
            this.option('css', {type: String, required: true});
            this.option('router', {type: String, required: true});
            this.option('styling', {type: String, required: false});


            const prompts = [{
                when: !this.options.css,
                type: 'list',
                name: 'css',
                message: 'Which CSS preprocessor do you want?',
                choices: [
                    {name: 'SASS', value: 'scss'},
                    {name: 'Stylus', value: 'styl'},
                    {name: 'Less', value: 'less'},
                    {name: 'CSS', value: 'css'},
                ]
            },{
                when: !this.options.router,
                type: 'list',
                name: 'router',
                message: 'Would you like a router?',
                choices: [
                    // {name: 'Angular Component Router (Angular 2 router)', value: 'router'},
                    {name: 'UI Router', value: 'uirouter'},
                    {name: 'Angular Router', value: 'ngroute'}
                ]
            },{
                when: !this.options.styling,
                type: 'list',
                name: 'styling',
                message: 'Which CSS Styling Framework would you like?',
                choices: [
                    {name: 'Bootstrap', value: 'bootstrap'},
                    {name: 'None', value: 'none'}
                ]
            }];

            return this.prompt(prompts).then(props => {
                Object.assign(this.props, props);
            });
        }
    },

    configuring() {
        this.config.set('props', this.props);
        let bower = Object.assign({}, {
            name: "app",
            version: "0.0.0",
            dependencies: {
                angular: '^1.5.0'
            },
            devDependencies: {
                'angular-mocks': '^1.5.0'
            }
        });
        if (this.props.router === 'uirouter') { bower.dependencies['angular-ui-router'] = '1.0.0-beta.1' }
        if (this.props.router === 'ngroute') { bower.dependencies['angular-route'] = '1.6.0' }
        if (this.props.styling === 'bootstrap') { bower.dependencies['bootstrap'] = '3.3.7' }
        this.mergeJson('bower.json', bower);
    },

    composing() {
        const options = {
            framework: this.options.client,
            css: this.props.css,
            router: this.props.router,
            styling: this.props.styling,
            skipInstall: this.props.skipInstall,
            skipCache: this.props.skipCache
        };

        this.composeWith(`bitmate-angular1:basic`, {options}, {
            local: require.resolve(`../basic`)
        });
    },

    writing() {
        const files = [
            'client/index.html',
            'client/favicon.ico',
            'client/robots.txt',
            'client/.htaccess',
            '.bowerrc'
        ];

        files.forEach(file => {
            this.copyTemplate(file, file, this.props);
        });
    }
});