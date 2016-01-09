var React = require('react');
var NavButton = require('./nav-button');

var NavBar = React.createClass({
  render: function() {
    return (
      <nav className="nav-bar">
        <ul className="wrap">
        <NavButton name="dvdfu" logo={true} clickHash="#splash"/>
        <NavButton name="Info" icon="info" clickHash="#info"/>
        <NavButton name="Projects" icon="star" clickHash="#projects"/>
        </ul>
      </nav>
    );
  }
});

module.exports = NavBar;
