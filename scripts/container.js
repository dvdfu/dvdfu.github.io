var React = require('react');
var JQuery = require('jquery');
var NavButton = require('./nav-button');
var Splash = require('./splash');
var FactList = require('./fact-list');
var ProjectList = require('./project-list');
var ContactList = require('./contact-list');

var Container = React.createClass({
  getInitialState: function() {
    return {facts: [], jobs: [], projects: [], contacts: []};
  },
  componentDidMount: function() {
    JQuery.getJSON('/data/data.json', function (data) {
      this.setState(data);
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <nav className="nav-bar">
          <ul className="wrap">
          <NavButton name="dvdfu" logo={true} clickHash="#splash"/>
          <NavButton name="Info" icon="info" clickHash="#info"/>
          <NavButton name="Projects" icon="star" clickHash="#projects"/>
          </ul>
        </nav>
        <Splash titles={this.state.titles}/>
        <FactList facts={this.state.facts} description={this.state.factDescription}/>
        <ProjectList projects={this.state.projects} description={this.state.projectDescription}/>
        <footer className="footer">
          <div className="contact-box">
            <ContactList contacts={this.state.contacts}/>
            <p>Site handmade by <strong>David Fu</strong> using</p>
            <p>
              <a href="https://facebook.github.io/react/">React</a>&nbsp;&middot;&nbsp;
              <a href="http://webpack.github.io/">webpack</a>&nbsp;&middot;&nbsp;
              <a href="https://nodejs.org/en/">Node.js</a>&nbsp;&middot;&nbsp;
              <a href="https://fortawesome.github.io/Font-Awesome/">Font Awesome</a>&nbsp;&middot;&nbsp;
              <a href="https://www.google.com/fonts">Google Fonts</a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = Container;
