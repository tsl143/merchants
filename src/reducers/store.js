import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import { combineReducers } from 'redux';
import Merchant from './merchant';

const reducers = combineReducers({
    merchants: Merchant
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
