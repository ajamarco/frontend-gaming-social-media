import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './Reducers/UserReducer';
import dataReducer from './Reducers/DataReducer';
import UiReducer from './Reducers/UiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  ui: UiReducer,
  data: dataReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;