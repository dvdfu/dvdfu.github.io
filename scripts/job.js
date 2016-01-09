var React = require('react');

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

module.exports = Job;
