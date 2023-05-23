import { combineReducers, legacy_createStore as createStore } from 'redux';

import authReducer from './reducer/authReducer';
import isSuccessReducer from './reducer/reUpdateUseState';

const rootReducer = combineReducers({
  authReducer,
  isSuccessReducer,
});

const store = createStore(rootReducer);

export default store;
