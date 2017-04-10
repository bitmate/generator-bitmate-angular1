'use strict';

const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({
  prompting: {
    bitmate() {
      this.options.server = (this.options.server) ? this.options.server : 'none';
      this.options.client = 'angular1';
      return this.bitmatePrompts();
    },

    angularOptions() {
      // Can add more prompts that are angular specific here...
      this.option('router', {type: String, required: true});
      this.option('styling', {type: String, required: false});

      const prompts = [{
        when: !this.options.router,
        type: 'list',
        name: 'router',
        message: 'Would you like a router?',
        choices: [
          // {name: 'Angular Component Router (Angular 2 router)', value: 'router'},
          {name: 'UI Router', value: 'uirouter'},
          {name: 'Angular Router', value: 'ngroute'}
        ]
      }, {
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
    const pkg = Object.assign({}, {
      name: 'app',
      version: '0.0.0',
      dependencies: {
        angular: '1.6.2'
      },
      devDependencies: {
        'angular-mocks': '1.6.2'
      }
    });
    if (this.props.router === 'uirouter') {
      pkg.dependencies['angular-ui-router'] = '1.0.0-beta.3';
    }
    if (this.props.router === 'ngroute') {
      pkg.dependencies['angular-route'] = '1.6.2';
    }
    if (this.props.styling === 'bootstrap') {
      if (this.props.modules !== 'bower') {
        pkg.dependencies.jquery = '3.2.1';
      }
      if (this.props.css === 'scss' && this.props.modules === 'bower') {
        pkg.dependencies['bootstrap-sass'] = '3.3.7';
      }
      pkg.dependencies.bootstrap = '3.3.7';
      if (this.props.modules === 'bower') {
        pkg.dependencies['angular-bootstrap'] = '2.5.0';
      } else {
        pkg.dependencies['angular-ui-bootstrap'] = '2.5.0';
      }
    }
    if (this.props.modules === 'bower') {
      this.mergeJson('bower.json', pkg);
    } else {
      this.mergeJson('package.json', pkg);
    }
  },

  composing() {
    const options = {
      client: this.props.client,
      modules: this.props.modules,
      html: this.props.html,
      css: this.props.css,
      js: this.props.js,
      router: this.props.router,
      styling: this.props.styling,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(require.resolve(`../basic/${this.props.modules === 'bower' ? 'bower' : 'modules'}`), {options});
  },

  writing() {
    const files = [
      'client/index.html',
      'client/favicon.ico',
      'client/robots.txt',
      'client/.htaccess'
    ];

    files.forEach(file => {
      this.copyTemplate(file, file, this.props);
    });

    if (this.props.router === 'uirouter') {
      this.copyTemplate('client/routes.js', 'client/routes.js', this.props);
    }
  }
});
