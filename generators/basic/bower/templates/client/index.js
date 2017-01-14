'use strict';
angular
<% if (router === 'uirouter') { -%>
  .module('app', [<%- angularModules %>]);
<% } else { -%>
  .module('app', [<%- angularModules %>]);
<% } -%>
