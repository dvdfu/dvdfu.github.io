var React = require('react');
var Fact = require('./fact');

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
    return (
      <section id="info" className="info">
        <div className="section-description wrap">
          <h2>Info</h2>
          <p>{this.props.description}</p>
        </div>
        <ul className="fact-list">{facts}</ul>
      </section>
    );
  }
});

module.exports = FactList;
