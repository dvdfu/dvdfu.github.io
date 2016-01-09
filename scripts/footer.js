var React = require('react');
var ContactList = require('./contact-list');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="contact-box">
          <ContactList contacts={this.props.contacts}/>
          <p>Site handmade by <strong>David Fu</strong> using</p>
          <p>
            <a href="https://facebook.github.io/react/">React</a>&nbsp;&middot;&nbsp;
            <a href="https://nodejs.org/en/">Node.js</a>&nbsp;&middot;&nbsp;
            <a href="https://fortawesome.github.io/Font-Awesome/">Font Awesome</a>&nbsp;&middot;&nbsp;
            <a href="https://www.google.com/fonts">Google Fonts</a>
          </p>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
