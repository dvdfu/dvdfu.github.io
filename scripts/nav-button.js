var React = require('react');

var NavButton = React.createClass({
  clickHandler: function(hash) {
    location.hash = hash;
  },
  render: function() {
    var className = this.props.logo ? 'logo' : '';
    var content = (
      <h5 className={className} onClick={this.clickHandler.bind(this, this.props.clickHash)}>
        {this.props.name}
      </h5>);
    return (<li className="nav-cell">{content}</li>);
  }
});

module.exports = NavButton;
