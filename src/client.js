/* @flow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './App';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// eslint-disable-next-line
const state = window.__PRELOADED_STATE__;
// eslint-disable-next-line
delete window.__PRELOADED_STATE__;

const store = createStore(reducers, state, composeEnhancers(applyMiddleware(thunk)));

const root = document.getElementById('rootApp');

if (root !== null) {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    root
  );
}
