import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import photo from './photo';
import photoData from './photoData';
import user from './user';
import records from './records';

const reducer = combineReducers({ photo, photoData, user, records });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))

const store = createStore(reducer, middleware);

export default store;
