var React = require('react');
var Contact = require('./contact');

var ContactList = React.createClass({
  render: function() {
    var contacts = null;
    if (this.props.contacts) {
      contacts = this.props.contacts.map(function(contact, i) {
        return (<Contact icon={contact.icon} link={contact.link} key={i}/>);
      });
    }
    return (<ul className="contact-list">{contacts}</ul>);
  }
});

module.exports = ContactList;
