import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.scss';
import App from './containers/App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers/store'
import "bootstrap/scss/bootstrap.scss"


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>

      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
