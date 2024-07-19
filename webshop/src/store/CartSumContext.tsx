import { createContext, PropsWithChildren, useState } from 'react';
import { calculateCart } from '../util/calculations';
import { CartProductId } from '../models/CartProductId';

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
		/* const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
		return calculateCart(cartLS); */
		return 12;
	}

	return (
		<CartSumContext.Provider value={{ cartSum, setCartSum }}>
			{children}
		</CartSumContext.Provider>
	);
};
