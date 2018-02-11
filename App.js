import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Home from './src/components/Home';
import rootReducer from './src/rootReducer';

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'>
            <Scene key='home' hideNavBar component={Home} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
