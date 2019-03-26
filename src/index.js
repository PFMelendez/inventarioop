import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { history, store } from './redux/store';
import createWrapper from './services/provider';
import theme from './services/theme';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const WrappedApp = createWrapper(store, history, theme)(App);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
