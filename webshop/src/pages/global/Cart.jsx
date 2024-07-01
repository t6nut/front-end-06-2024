import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import cartJSON from '../../data/cart.json'

function Cart() {
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

	const emptyCart = () => {
		cart.splice(0);
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const addMore = (product) => {
		cart.push(product);
		setCart(cart.slice()); // HTMLi uuendamiseks
		localStorage.setItem("cart", JSON.stringify(cart)); // salvestamiseks
	}

	const removeProduct = (index) => {
		cart.splice(index, 1);
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const calculateCart = () => {
		let cartSum = 0;
		cart.forEach(product => 
			cartSum += product.price
		);
		return cartSum.toFixed(2);
	}

	const countProducts = () => {
		let cartCount = 0;
		cart.forEach(product =>
			cartCount++
		);
		return cartCount;
	}

	return (
		<div>
			<h1>Cart</h1>
			{cart.map((product, index) =>
				<div key={product.name}>
					<img className="image" src={product.image} alt="" />
					<button onClick={() => removeProduct(product)}>Remove</button>
					<button onClick={() => addMore(product)}>Add 1 more</button>
				</div>
			)}

			{cart.length > 0 && <div>Cart sum: {calculateCart()}</div>}
			{cart.length > 0 && <div>Cart count: {countProducts()}</div>}

			{cart.length > 0 && <button onClick={emptyCart}>Empty cart</button>}

			{cart.length === 0 &&
				<>
					<div>Cart is currently empty. Add some products:</div>
					<Link to="/">
						To home page
					</Link>
				</>
			}

		</div>
	)
}

export default Cart