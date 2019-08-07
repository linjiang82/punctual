import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/info';
import promiseMiddleWare from 'redux-promise-middleware';

//the preloadedState can be omitted.
export default createStore(reducers,applyMiddleware(logger, promiseMiddleWare()));