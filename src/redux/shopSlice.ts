import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type JasaKirim = {
  pengiriman_luar_tangsel: string
  pengiriman_dalam_tangsel: string
} | undefined


type ShopState = {
  id: string
  user_id: string
  avatar?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  jasa_kirim: JasaKirim
  created_at?: string
  updated_at?: string
}

const initialState: ShopState = {
  id: 'abc123',
  user_id: 'w6epdrxd94',
  avatar: 'https://tangselkaos.com/assets/img/TangselKaos.png',
  name: 'Tangsel Distro',
  email: 'Tokoangga@email.com',
  phone: '',
  address: '',
  jasa_kirim: {
    pengiriman_dalam_tangsel: '1 - 2 Hari',
    pengiriman_luar_tangsel: '1 - 2 Hari',
  }
}

const shopSlice = createSlice({
  name: 'Shop',
  initialState,
  reducers: {
    setJasaKirimDalamTangsel (state, action) {
      state.jasa_kirim!.pengiriman_dalam_tangsel = action.payload
    },
    setJasaKirimLuarTangsel (state, action) {
      state.jasa_kirim!.pengiriman_luar_tangsel = action.payload
    },
    setShopBiodata (state, action: PayloadAction<{avatar?: string, name?: string, email?: string, phone?: string}>) {
      state.avatar  = action.payload?.avatar
      state.name    = action.payload.name
      state.email   = action.payload.email
      state.phone   = action.payload.phone
    }
  }
})

export const {
  setJasaKirimDalamTangsel,
  setJasaKirimLuarTangsel,
  setShopBiodata
} = shopSlice.actions

export default shopSlice.reducer