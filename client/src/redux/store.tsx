import { combineReducers, legacy_createStore as createStore } from 'redux';

import authReducer from './reducer/authReducer';
import isSuccessReducer from './reducer/reUpdateUseState';
import reUpdateUserData from './reducer/reUpdateUser';

const rootReducer = combineReducers({
  authReducer,
  isSuccessReducer,
  reUpdateUserData
});

const store = createStore(rootReducer);

export default store;
