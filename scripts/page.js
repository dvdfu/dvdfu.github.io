var NavBar = React.createClass({
  render: function() {
    var names = ['Info', 'Work', 'Projects', 'Contact'];
    names = names.map(function(name, i) {
      return (<NavButton name={name} key={i}/>);
    });
    return (
      <nav>
        <ul className="wrap">
          <li className="nav-cell">
            <h5 className="nav-name">dvdfu</h5>
          </li>
          {names}
        </ul>
      </nav>);
  }
});

var NavButton = React.createClass({
  render: function() {
    return (
      <li className="nav-cell">
        <h5>{this.props.name}</h5>
      </li>
    );
  }
});

ReactDOM.render(<NavBar/>, document.getElementById('nav'));

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
      return (<Project data={project} key={i}/>);
    });
    return (
      <div className="projects">
        {projectList}
      </div>
    );
  }
});

var Project = React.createClass({
  statics: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    formatData: function(data) {
      var formatted = data;
      formatted.image = 'images/' + data.type + '/' + data.image;
      formatted.date = Project.months[data.date.m-1] + ' ' + data.date.y;
      return formatted;
    }
  },
  render: function() {
    var data = Project.formatData(this.props.data);
    var tools = data.tools ? (<ProjectTools tools={data.tools}/>) : null;
    return (
      <div className="project">
        <div className="project-header">
          <ProjectTitle title={data.title} link={data.link}/>
          <h5>{data.date}</h5>
        </div>
        <img className="project-image" src={data.image}></img>
        <div className="project-footer">
          <p className="project-description">{data.desc}</p>
          {tools}
        </div>
      </div>
    );
  }
});

var ProjectTitle = React.createClass({
  render: function() {
    var title = this.props.title;
    if (this.props.link) {
      title = (<a href={this.props.link}>{this.props.title}</a>);
    }
    return (<h2>{title}</h2>);
  }
});

var ProjectTools = React.createClass({
  render: function() {
    return (<h5>{this.props.tools.join(', ')}</h5>);
  }
});

// ReactDOM.render(<Projects/>, document.getElementById('content'));
