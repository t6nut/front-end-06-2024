import React, { createContext, PropsWithChildren, useState } from 'react';
import { CartProduct } from '../models/CartProduct';

// Create a Context for the app
export const CartSumContext = createContext(
	{
		cartSum: 0,
		setCartSum: (value: number) => { }
	}
);

// Create a provider component
export const CartSumProvider = ({ children }: PropsWithChildren) => {
	// State that will be shared in the context
	const [cartSum, setCartSum] = useState(calculateCartSum());

	function calculateCartSum() {
		const cartLS: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
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
