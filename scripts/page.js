var Container = React.createClass({
  getInitialState: function() {
    return {work: [], projects: []};
  },
  componentDidMount: function() {
    $.getJSON('/data/data.json', function (data) {
      this.setState(data);
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <NavBar/>
        <Work jobs={this.state.jobs}/>
        <Footer/>
      </div>
    );
  }
});

var NavBar = React.createClass({
  render: function() {
    return (
      <nav className="nav-bar">
        <ul className="wrap">
        <NavButton name="dvdfu" logo={true}/>
        <NavButton name="Info" icon="info"/>
        <NavButton name="Work" icon="suitcase"/>
        <NavButton name="Projects" icon="star"/>
        <NavButton name="Contact" icon="envelope"/>
        </ul>
      </nav>
    );
  }
});

var NavButton = React.createClass({
  render: function() {
    var className = this.props.logo ? 'logo' : '';
    var content = (<h5 className={className}>{this.props.name}</h5>);
    if (window.innerWidth < 420 && this.props.icon) {
      content = (<i className={'fa fa-' + this.props.icon}></i>);
    }
    return (<li className="nav-cell">{content}</li>);
  }
});

var NavIcon = React.createClass({
  render: function() {
    var icon = 'nav-icon fa fa-2x fa-' + this.props.icon;
    return (<i className={icon}></i>);
  }
});

var ProjectList = React.createClass({
  getInitialState: function() {
    return {projects: []};
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
      <section className="projects">
        {projectList}
      </section>
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

var Work = React.createClass({
  render: function() {
    return (
      <section className="work">
        <JobList jobs={this.props.jobs}/>
      </section>
    );
  }
});

var JobList = React.createClass({
  render: function() {
    var jobs = null;
    if (this.props.jobs) {
      jobs = this.props.jobs.map(function(job, i) {
        return (
          <Job
            company={job.company}
            position={job.position}
            tasks={job.tasks}
            image={job.image}
            startDate={job.startDate}
            endDate={job.endDate}
            key={i}
          />
        );
      });
    }
    return (<ul className="job-list wrap">{jobs}</ul>);
  }
});

var Job = React.createClass({
  statics: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  },
  render: function() {
    var date = Job.months[this.props.startDate.m - 1];
    if (this.props.startDate.y != this.props.endDate.y) {
      date += ' ' + this.props.startDate.y;
    }
    date += ' - ' + Job.months[this.props.endDate.m - 1] + ' ' + this.props.endDate.y;
    var tasks = this.props.tasks.map(function(task, i) {
      return (<li key={i}><p>{task}</p></li>);
    });
    return (
      <div className="job">
        <div className="job-header">
          <img src={'/images/' + this.props.image}></img>
          <div className="job-info">
            <h3>{this.props.position}</h3>
            <h5>{date}</h5>
          </div>
        </div>
        <ul>{tasks}</ul>
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="contact-box">
          <ContactList/>
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

var ContactList = React.createClass({
  render: function() {
    return (
      <ul className="contact-list">
        <Contact icon="github" link="https://github.com/dvdfu"/>
        <Contact icon="linkedin" link="http://ca.linkedin.com/in/dvdfu"/>
        <Contact icon="twitter" link="https://twitter.com/dvdfu"/>
        <Contact icon="tumblr" link="http://dvdfu.tumblr.com"/>
        <Contact icon="envelope" link="mailto:davidf1212@gmail.com"/>
      </ul>
    );
  }
});

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

ReactDOM.render(<Container/>, document.getElementById('container'));
