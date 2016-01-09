var React = require('react');

var Contact = React.createClass({
  render: function() {
    var className = 'fa fa-2x fa-' + this.props.icon;
    return (
      <li className="contact">
        <a href={this.props.link}>
          <i className={className}></i>
        </a>
      </li>
    );
  }
});

module.exports = Contact;
