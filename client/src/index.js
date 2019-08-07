import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const Root = ({store})=>( 
  <Provider store={store}>
    <App />
  </Provider>
 )

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
registerServiceWorker();
