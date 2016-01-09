var React = require('react');
var ProjectTitle = require('./project-title');
var ProjectTools = require('./project-tools');

var Project = React.createClass({
  statics: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    formatData: function(data) {
      var formatted = data;
      formatted.image = 'images/projects/' + data.image;
      formatted.date = Project.months[data.date.m-1] + ' ' + data.date.y;
      return formatted;
    }
  },
  render: function() {
    var data = Project.formatData(this.props.data);
    var tools = data.tools ? (<ProjectTools tools={data.tools}/>) : null;
    var imageStyle = {backgroundImage: 'url(' + data.image + ')'};
    return (
      <li className="project">
        <div className="project-header">
          <ProjectTitle title={data.title} link={data.link}/>
          <h5>{data.date}</h5>
        </div>
        <div className="project-image" style={imageStyle}>
        </div>
        <div className="project-footer">
          <p className="project-description">{data.desc}</p>
          {tools}
        </div>
      </li>
    );
  }
});

module.exports = Project;
