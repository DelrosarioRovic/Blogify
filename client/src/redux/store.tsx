import { combineReducers, legacy_createStore as createStore } from 'redux';

import authReducer from './reducer/authReducer';
import isSuccessReducer from './reducer/reUpdateUseState';
import hoverReducer from './reducer/handleHoverProfile';

const rootReducer = combineReducers({
  authReducer,
  isSuccessReducer,
  hoverReducer
});

const store = createStore(rootReducer);

export default store;
