var Projects = React.createClass({
  getInitialState: function() {
    return {
      data: {
        facts: [],
        projects: [],
        contacts: []
      }
    };
  },
  componentDidMount: function() {
    $.getJSON('/data/data.json', function (data) {
      this.setState({data: data});
    }.bind(this));
  },
  render: function() {
    var projectList = this.state.data.projects.map(function(project, i) {
      // TODO: use more descriptive key than index
      return (<Project data={project} key={i}></Project>);
    });
    return (
      <div className="projects">
        {projectList}
      </div>
    );
  }
});

var Project = React.createClass({
  render: function() {
    var data = this.props.data;
    data.image = 'images/'+data.type+'/'+data.image;
    return (
      <div className="project">
        <div className="project-header">
          <h2>{data.title}</h2>
          <p>{data.date}</p>
        </div>
        <img className="project-image" src={data.image}></img>
        <p className="project-description">{data.desc}</p>
      </div>
    );
  }
});

ReactDOM.render(
  <Projects/>,
  document.getElementById('content')
);
