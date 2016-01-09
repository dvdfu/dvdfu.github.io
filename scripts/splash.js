var React = require('react');

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

module.exports = Splash;
