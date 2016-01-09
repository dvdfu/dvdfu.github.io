var React = require('react');
var JQuery = require('jquery');
var NavBar = require('./nav-bar');
var Splash = require('./splash');
var FactList = require('./fact-list');
var JobList = require('./job-list');
var ProjectList = require('./project-list');
var Footer = require('./footer');

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
        <NavBar/>
        <Splash titles={this.state.titles}/>
        <FactList facts={this.state.facts} description={this.state.factDescription}/>
        <JobList facts={this.state.jobs}/>
        <ProjectList projects={this.state.projects} description={this.state.projectDescription}/>
        <Footer contacts={this.state.contacts}/>
      </div>
    );
  }
});

module.exports = Container;
