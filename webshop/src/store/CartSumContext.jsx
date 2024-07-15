import React, { createContext, useState } from 'react';

// Create a Context for the app
export const CartSumContext = createContext();

// Create a provider component
export const CartSumProvider = ({ children }) => {
	// State that will be shared in the context
	const [cartSum, setCartSum] = useState(calculateCartSum());

	function calculateCartSum() {
		const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
		let cartSum = 0;
		cartLS.forEach(p =>
			cartSum += p.product.price * p.quantity
		);
		return cartSum;
	}

	return (
		<CartSumContext.Provider value={{ cartSum, setCartSum }}>
			{children}
		</CartSumContext.Provider>
	);
};