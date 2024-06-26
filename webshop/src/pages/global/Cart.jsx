import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import cartJSON from '../../data/cart.json'

function Cart() {
	const [cart, setCart] = useState(cartJSON.slice());

	const emptyCart = () => {
		cartJSON.splice(0);
		setCart(cartJSON.slice());
	}

	const addMore = (product) => {
		cartJSON.push(product);
		setCart(cartJSON.slice());
	}

	const removeProduct = (index) => {
		cartJSON.splice(index, 1);
		setCart(cartJSON.slice());
	}

	const calculateCart = () => {
		let cartSum = 0;
		cartJSON.forEach(product => 
			cartSum += product.price
		);
		return cartSum; //TODO: ASK how to return multiple variables & use them below?
	}

	const countProducts = () => {
		let cartCount = 0;
		cartJSON.forEach(product =>
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