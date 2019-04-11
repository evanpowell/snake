import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from './components/Title/Title';
import Options from './components/Options/Options';
import Gameplay from './components/Options/Gameplay/Gameplay';
import Display from './components/Options/Display/Display';
import Game from './components/Game/Game';

export class App extends Component {
  componentDidMount() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.tabIndex = 0;

    this.props.updateCanvas(canvas);
  }

  render() {
    return (
      <div id="main" className="h-100 d-flex align-items-center" style={{ backgroundColor: this.props.colors.background, color: this.props.colors.text }}>
        <div className="screen" style={{ backgroundColor: this.props.colors.wall }}>
          <div className="screen__container h-100" style={{ backgroundColor: this.props.colors.screen }}>
            <div className="screen__inner h-100">
              <Router>
                <Switch>
                  <Route path="/" exact component={Title} />
                  <Route path="/game" exact component={Game} />
                  <Route path="/settings" exact component={Options} />
                  <Route path="/settings/gameplay" exact component={Gameplay} />
                  <Route path="/settings/display" exact component={Display} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
