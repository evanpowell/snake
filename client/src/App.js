import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Title from './components/Home/Title';

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Title}></Route>
      </Router>
    )
  }
}

export default App;
