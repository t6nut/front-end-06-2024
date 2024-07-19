import { createSlice } from '@reduxjs/toolkit'
import { CartProduct } from '../models/CartProduct'

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: determineInitialValue(),
	},
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes.
			// Also, no return statement is required from these functions.
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		decrementByAmount: (state, action) => {
			state.value -= action.payload
		},
		empty: (state) => {
			state.value = 0;
		}
	},
})

function determineInitialValue() {
	const cart: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
	let cartCount = 0;
	cart.forEach(p =>
		cartCount += p.quantity
	);
	return cartCount;
}
// Action creators are generated for each case reducer function
export const { increment, decrement, decrementByAmount, empty } = counterSlice.actions

export default counterSlice.reducer