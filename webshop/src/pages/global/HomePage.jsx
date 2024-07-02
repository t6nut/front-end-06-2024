import React, { useState } from 'react'
import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function HomePage() {
	const [products, setProducts] = useState(productsFromFile);
	const addToCart = (product) => {
		// cartJSON.push(product);

		const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
		cartLS.push(product);
		localStorage.setItem("cart", JSON.stringify(cartLS));
		toast.success(product.title + ' - added to cart' );
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
			<div className="products">
				{products.map(product =>
					<div className="product" key={product.id}>
						<img style={{ width: "100px" }} src={product.image} alt="" />
						<div>{product.title}</div>
						<div>{product.price}</div>
						<button onClick={() => addToCart(product)}>Add to cart</button> <br />
						<Link to={"/product/" + product.title.toLowerCase().replaceAll(" ", "-")}>
							<button>Read more</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default HomePage