var React = require('react');

var ProjectTools = React.createClass({
  render: function() {
    return (<h5>{this.props.tools.join(', ')}</h5>);
  }
});

module.exports = ProjectTools;
