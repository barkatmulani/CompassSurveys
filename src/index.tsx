import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';

const render = () => {
  const App = require('./app.tsx').default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
};

render();

const mod: any = module;

if (process.env.NODE_ENV === 'development' && mod.hot) {
  mod.hot.accept('./app.tsx', render)
}