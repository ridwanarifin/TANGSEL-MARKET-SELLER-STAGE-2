import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 *       id            : number,
 *       residence_id  : string,
 *       name          : string,
 *       email         : string,
 *       password      : string,
 *       image         : string,
 *       birthday      : date,
 *       gender        : userId,
 *       phone         : userId,
 *       shop_name     : userId,
 *       created_at    : userId,
 *       updated_at    : userId,
 */

type ProfileState = {
  id: string | number
  name: string
  nik: string
  email: string
  password: string
  avatar?: string
  birthday?: string
  gender?: string
  shop_name: string
  phone: string
  address: string
  created_at?: string
  updated_at?: string
} | any | undefined;

let initialState: ProfileState = {
  id: 'w6epdrxd94',
  name: 'test',
  nik: '12345',
  email: 'test@gmail.com',
  password: 'test123',
  birthday: '30-agustus-2020',
  gender: 'laki-laki',
  shop_name: 'Tangsel Distro',
  avatar: undefined,
  address: 'Cipadu, Tangerang Selatan',
  phone: '(+62) 12 888 8888',
}

const profileSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    setProfilSignUp (state, action: PayloadAction<{name: string, nik: string, email: string, password: string}>) {
      state.email     = action.payload.email
      state.nik       = action.payload.nik
      state.name      = action.payload.name
      state.password  = action.payload.password
    },
    setProfilNameBiodata (state, action: PayloadAction<{name: string}>) {
      state.name      = action.payload.name
    }
  }
});

export const {
  setProfilSignUp,
  setProfilNameBiodata
} = profileSlice.actions

export default profileSlice.reducer
