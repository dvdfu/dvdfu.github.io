var React = require('react');

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

module.exports = Fact;
