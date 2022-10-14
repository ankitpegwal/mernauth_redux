import {legacy_createStore as createStore,applyMiddleware, combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducer';
// import mainReducer from './reducers/mainReducer';
const rootReducer = combineReducers({
    main: reducer,
    // main: mainReducer
});

const middleware = applyMiddleware(thunk)

export default createStore(rootReducer,middleware);