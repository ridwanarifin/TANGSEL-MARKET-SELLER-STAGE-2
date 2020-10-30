import { combineReducers } from '@reduxjs/toolkit';
import recycleState from 'redux-recycle';

import AuthReducer, { initialState as initialAuthState } from './authSlice';
import UserReducer, { initialState as initialUserState } from './userSlice';
import ProfileReducer from './profileSlice';
import ShopReducer from './shopSlice';

const rootReducer = combineReducers({
  profile: ProfileReducer,
  // auth: AuthReducer,
  // @ts-ignore
  auth: recycleState(AuthReducer, ['resetAuth'], initialAuthState),
  user: recycleState(UserReducer, ['resetUser']),
  shop: ShopReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
