var React = require('react');

var ProjectTitle = React.createClass({
  render: function() {
    var title = this.props.title;
    if (this.props.link) {
      title = (<a href={this.props.link}>{this.props.title}</a>);
    }
    return (<h3>{title}</h3>);
  }
});

module.exports = ProjectTitle;
