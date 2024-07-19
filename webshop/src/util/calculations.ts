import { CartProduct } from "../models/CartProduct";

export const calculateCart = (cart: CartProduct[]) => {
	let cartSum = 0;
	cart.forEach(p =>
		cartSum += p.product.price * p.quantity
	);
	return cartSum;
}

export const countProducts = (cart: CartProduct[]) => {
	let cartCount = 0;
	cart.forEach(p =>
		cartCount += p.quantity
	);
	return cartCount;
}