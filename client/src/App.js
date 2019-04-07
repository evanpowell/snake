import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from './components/Title/Title';
import Options from './components/Options/Options';
import Gameplay from './components/Options/Gameplay/Gameplay';

export class App extends Component {
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.tabIndex = 0;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.props.colors.screen;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    this.props.updateCanvas(canvas);
    this.props.updateContext(ctx);
  }

  render() {
    return (
      <div id="main" className="h-100 d-flex align-items-center" style={{ backgroundColor: this.props.colors.background }}>
        <div className="screen" style={{ backgroundColor: this.props.colors.wall }}>
          <div className="screen__container h-100">
            <div className="screen__inner h-100">
              <Router>
                <Switch>
                  <Route path="/" exact component={Title}></Route>
                  <Route path="/settings" exact component={Options}></Route>
                  <Route path="/settings/gameplay" exact component={Gameplay}></Route>
                </Switch>
              </Router>
            </div>
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    colors: state.colors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCanvas: (canvas) => { dispatch({ type: 'UPDATE_CANVAS', payload: canvas })},
    updateContext: (context) => { dispatch({ type: 'UPDATE_CONTEXT', payload: context })}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
