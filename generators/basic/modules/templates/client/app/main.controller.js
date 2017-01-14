module.exports = {
<% if (modules === 'systemjs') { -%>
  templateUrl: '<%- templateUrl %>',
<% } else { -%>
  template: require('./main.html'),
<% } -%>
  controller: function () {
    this.awesomeThings = [];
  }
};
