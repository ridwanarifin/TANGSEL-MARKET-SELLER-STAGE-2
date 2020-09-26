import { combineReducers } from '@reduxjs/toolkit';

import ProfileReducer from './profileSlice';
import ShopReducer from './shopSlice';

const rootReducer = combineReducers({
  profile: ProfileReducer,
  shop: ShopReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
