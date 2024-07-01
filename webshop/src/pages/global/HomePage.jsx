import React, { useState } from 'react'
import productsFromFile from "../../data/products.json";
import cartJSON from "../../data/cart.json"

function HomePage() {
	const [products, setProducts] = useState(productsFromFile);
	const addToCart = (product) => {
		// cartJSON.push(product);

		const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
		cartLS.push(product);
		localStorage.setItem("cart", JSON.stringify(cartLS));
		// add toastify
		// react-hot-toast
	}

	// mitu tk on n2htaval

	// sorteeri A-Z
	// sorteeri Z-A
	// sorteeri hind kasvavalt
	// sorteeri hind kahanevalt
	// sorteeri reiting kasvavalt
	// sorteeri reiting kahanevalt

	// filtreeri kategooria algusel

	return (
		<div>
			<h1>Home</h1>
			{products.map(product =>
				<div key={product.id}>
					<img style={{width: "100px"}} src={product.image} alt="" />
					<div>{product.title}</div>
					<div>{product.price}</div>
					<button onClick={() => addToCart(product)}>Add to cart</button>
					
				</div>
			)}
		</div>
	)
}

export default HomePage