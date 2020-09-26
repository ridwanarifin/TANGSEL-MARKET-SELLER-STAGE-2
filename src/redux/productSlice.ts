import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface ProductState {
  id: string | number
  name: string
  rating?: number
  image_id?: string | number
  toko_id: string,
}

let initialState: Array<ProductState> = [{
  id: '8jf4cnh',
  name: "Kemeja",
  rating: 4,
  image_id: 1,
  toko_id: 'w6epdrxd94',
}]

const productSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    addProduct (state, action: PayloadAction<ProductState>) {
      state = [...state, action.payload]
    }
  }
});

export const {
  addProduct
} = productSlice.actions

export default productSlice.reducer
