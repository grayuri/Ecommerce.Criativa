import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  idsInCart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => {
        item.id === action.payload.id
      })

      if(state.idsInCart.includes(action.payload.id)) return

      if(item) {
        item.quantity += action.payload.quantity
      }
      else {
        state.products.push(action.payload)
        state.idsInCart.push(action.payload.id)
      } 
    },
    removeItem: (state, action) => {
      const idIndex = state.idsInCart.indexOf(action.payload)

      state.idsInCart.splice(idIndex, 1)
      state.products = state.products.filter((item) => item.id !== action.payload)
    },
    resetCart: (state, action) => {
      state.products = []
      state.idsInCart = []
    }
  }
})

export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer