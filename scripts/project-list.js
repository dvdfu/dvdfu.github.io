var React = require('react');
var Project = require('./project');

var ProjectList = React.createClass({
  render: function() {
    var projects = null;
    if (this.props.projects) {
      projects = this.props.projects.map(function(project, i) {
        return (<Project data={project} key={i}/>);
      });
    }
    return (
      <section id="projects" className="projects">
        <div className="section-description wrap">
          <h2>Projects</h2>
          <p>{this.props.description}</p>
        </div>
        <ul className="project-list">
          {projects}
        </ul>
      </section>
    );
  }
});

module.exports = ProjectList;
