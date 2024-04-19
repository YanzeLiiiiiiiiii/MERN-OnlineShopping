import { createSlice } from '@reduxjs/toolkit'
import { updataCart } from '../utils/cartUtils'
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, PaymentMethod: 'PayPal' }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const item = action.payload
            const currentItem = state.cartItems.find(i => i._id === item._id)
            if (currentItem) {
                state.cartItems = state.cartItems.map(i => i._id === currentItem._id ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            return updataCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
            return updataCart(state)
        },

        addShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updataCart(state)
        },
        addPaymentMethod: (state, action) => {
            state.PaymentMethod = action.payload
            return updataCart(state)
        },
        clearCart: (state, action) => {
            state.cartItems = []
            return updataCart(state)
        }
    }

})

export const { addToCart, removeFromCart, addShippingAddress, addPaymentMethod, clearCart } = cartSlice.actions;
export default cartSlice.reducer