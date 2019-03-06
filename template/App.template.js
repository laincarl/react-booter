import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader/root'
{%imports%}
class App extends Component {
  render() {
    return <Fragment>
      {%routes%}
    </Fragment>;
  }
}
export default hot(App)
