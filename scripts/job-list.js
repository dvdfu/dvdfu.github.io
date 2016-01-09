var React = require('react');
var Job = require('./job');

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
    return (
      <section className="work">
        <ul className="job-list wrap">{jobs}</ul>
      </section>
    );
  }
});

module.exports = JobList;
