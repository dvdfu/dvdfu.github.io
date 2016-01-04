window.addEventListener('hashchange', function() {
  scrollBy(0, -50);
});

var Container = React.createClass({
  getInitialState: function() {
    return {facts: [], jobs: [], projects: [], contacts: []};
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
        <Splash titles={this.state.titles}/>
        <Info facts={this.state.facts} description={this.state.factDescription}/>
        <Projects projects={this.state.projects} description={this.state.projectDescription}/>
        <Footer contacts={this.state.contacts}/>
      </div>
    );
  }
});

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

var NavButton = React.createClass({
  clickHandler: function(hash) {
    location.hash = hash;
  },
  render: function() {
    var className = this.props.logo ? 'logo' : '';
    var content = (
      <h5 className={className} onClick={this.clickHandler.bind(this, this.props.clickHash)}>
        {this.props.name}
      </h5>);
    return (<li className="nav-cell">{content}</li>);
  }
});

var NavIcon = React.createClass({
  render: function() {
    var icon = 'nav-icon fa fa-2x fa-' + this.props.icon;
    return (<i className={icon}></i>);
  }
});

var Splash = React.createClass({
  getInitialState: function() {
    return { titleIndex: 0 };
  },
  animateIn: function() {
    var $title = document.getElementsByClassName('title')[0];
    var index = this.state.titleIndex;
    var newTitle = this.props.titles[index];

    $title.classList.remove('hidden');
    $title.innerText = newTitle;

    setTimeout(this.animateOut, 2000)
  },
  animateOut: function() {
    var $title = document.getElementsByClassName('title')[0];
    var index = this.state.titleIndex;

    $title.classList.add('hidden');
    index = (index + 1) % this.props.titles.length;
    this.setState({ titleIndex: index }, function() {
      setTimeout(this.animateIn, 500);
    });
  },
  componentDidUpdate: function(props, state) {
    if (props != this.props) this.animateIn();
  },
  render: function() {
    return (
      <header id="splash" className="splash">
        <div className="name">
          <h1>David Fu</h1>
          <h2 className="title hidden"></h2>
        </div>
      </header>
    );
  }
});

var Info = React.createClass({
  render: function() {
    return (
      <section id="info" className="info">
        <div className="section-description wrap">
          <h2>Info</h2>
          <p>{this.props.description}</p>
        </div>
        <FactList facts={this.props.facts}/>
      </section>
    );
  }
});

var FactList = React.createClass({
  render: function() {
    var facts = null;
    if (this.props.facts) {
      facts = this.props.facts.map(function(fact, i) {
        return (
          <Fact
            icon={fact.icon}
            name={fact.name}
            description={fact.description}
            key={i}
          />
        );
      });
    }
    return (<ul className="fact-list">{facts}</ul>);
  }
});

var Fact = React.createClass({
  render: function() {
    return (
      <li className="fact">
        <div className="fact-box">
          <i className={'fa fa-3x fa-' + this.props.icon}></i>
        </div>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </li>
    );
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
            image={job.image}
            link={job.link}
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
    return (
      <li className="job">
        <a href={this.props.link}>
          <img src={'/images/' + this.props.image}></img>
        </a>
        <div className="job-info">
          <h3>{this.props.position}</h3>
          <h5>{date}</h5>
        </div>
      </li>
    );
  }
});

var Projects = React.createClass({
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

var ProjectTitle = React.createClass({
  render: function() {
    var title = this.props.title;
    if (this.props.link) {
      title = (<a href={this.props.link}>{this.props.title}</a>);
    }
    return (<h3>{title}</h3>);
  }
});

var ProjectTools = React.createClass({
  render: function() {
    return (<h5>{this.props.tools.join(', ')}</h5>);
  }
});

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
