import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/index.scss';
import App from './components/App';
import reducers from './reducers';


/* eslint-disable no-underscore-dangle */
const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions,
  )
);
/* eslint-enable */

/* enables page reload on back button */
window.onpopstate = (event) => {
  if (event && event.state) {
    location.reload();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
