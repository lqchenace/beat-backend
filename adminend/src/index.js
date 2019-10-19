import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
    ,document.getElementById('root'));
serviceWorker.unregister();
