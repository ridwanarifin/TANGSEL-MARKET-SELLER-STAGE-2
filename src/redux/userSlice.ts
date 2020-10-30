import { createSlice } from '@reduxjs/toolkit';
import _, { Object } from 'lodash';
import { getUserMe } from '../api/get';

export type LoginType = {
  email: string | undefined
  password: string | undefined
}

export type RegistrationType = LoginType & {
  avatar: string | undefined
  name: string | undefined
  password: string | undefined
  c_password: string | undefined
  nik: string | undefined
  province: string | undefined
  regency: string | undefined
}

export type UserType = {
  id: number | undefined
  uuid: string | undefined
  name: string | undefined
  email: string | undefined
  phone_number: string | undefined
  nik: string | undefined
  avatar: string | undefined
  email_verified_at: string | undefined
  active: number | undefined
  created_at: string | undefined
  updated_at: string | undefined
  detail?: Object<{
    id: number
    market_id: number
    regency: string
  }> | undefined,

  errors: string | undefined
}

export const initialState: UserType = {
  id: undefined,
  uuid: undefined,
  name: undefined,
  email: undefined,
  phone_number: undefined,
  nik: undefined,
  avatar: undefined,
  email_verified_at: undefined,
  active: 0,
  created_at: undefined,
  updated_at: undefined,
  detail: undefined,

  errors: undefined
}


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state = _.assign(state, action.payload)
    },
    setUserError (state, action) {
      state.errors = _.assign(state.errors, action.payload)
    },
    resetUser (state) {
      state = _.assign(state, initialState)
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserMe.fulfilled, (state, action) => {
      state = _.assign(state, action.payload.data)
    })
  }
});

export const {
  setUser,
  setUserError,
  resetUser
} = UserSlice.actions;

export default UserSlice.reducer
