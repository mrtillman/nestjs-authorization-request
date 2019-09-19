const React = require('react');
const ReactDOM = require('react-dom');

const Root = () => (
  <div>
    <a href="/sign-in">Sign In</a>
  </div>
);

ReactDOM.render(<Root/>, document.getElementById('main'));