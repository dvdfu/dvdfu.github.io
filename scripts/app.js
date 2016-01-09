var React = require('react');
var ReactDOM = require('react-dom');
var Container = require('./container');

window.addEventListener('hashchange', function() {
  scrollBy(0, -50);
});

ReactDOM.render(<Container/>, document.getElementById('container'));
