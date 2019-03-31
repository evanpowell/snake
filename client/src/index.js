import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// Bootstrap modules
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.slim.min';
import '../../node_modules/popper.js/dist/umd/popper.min';
import '../../node_modules/bootstrap/dist/js/bootstrap.min';

import './styles/index.scss';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
