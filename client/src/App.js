import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Title from './components/Title/Title';

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Route path="/" exact component={Title}></Route>
        </Router>
      </div>
    )
  }
}

export default App;
