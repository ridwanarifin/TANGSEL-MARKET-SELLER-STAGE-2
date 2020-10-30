import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLoginMarket } from '../api/post';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

export type tokenType = {
  access_token?: string | null | undefined
  expires_in?: number | null | undefined
} | undefined | null

export type authType = tokenType & {
  email?: string | null
  password?: string | null
  isLogged: boolean
  error?: string | unknown
}

export const initialState: authType = {
  access_token: null,
  email: null,
  password: null,
  expires_in: null,
  isLogged: false,
  error: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth (state, action: PayloadAction<tokenType>) {
      state = _.assign(state, action.payload)
    },
    setIsLogged (state, action: PayloadAction<{isLogged: boolean}>) {
      if (!_.isEqual(state.isLogged, action.payload.isLogged)) {
        state.isLogged = action.payload.isLogged
      }
    },
    setAuthError (state, action: PayloadAction<any>) {
      state.error = _.assign(state.error, action.payload)
    },
    resetAuth (state) {
      state = _.assign(state, initialState)
    },
  },
  extraReducers: builder => {
    builder.addCase(postLoginMarket.fulfilled, (state, action) => {
      state = _.assign(state, action.payload)
    })
  }
})

export const {
  setAuth,
  setIsLogged,
  setAuthError,
  resetAuth,
} = AuthSlice.actions

export default AuthSlice.reducer
