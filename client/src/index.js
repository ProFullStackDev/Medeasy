import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import * as serviceWorker from './serviceWorker';
import store from './redux/store'


ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
