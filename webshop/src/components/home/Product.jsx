import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Product({product}) {
	const addToCart = (productClicked) => {
		// cartJSON.push(product);
		const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
		const index = cartLS.findIndex(p => p.product.id === productClicked.id);
		if (index >= 0) { // index !== -1
			cartLS[index].quantity++;
		} else {
			cartLS.push({ quantity: 1, product: productClicked });
		}

		localStorage.setItem("cart", JSON.stringify(cartLS));
		toast.success(productClicked.title + ' - added to cart');
	}

	return (
		<div className="product">
			<img style={{ width: "100px", height: "100px", objectFit: "contain" }} src={product.image} alt="" />
			<div>{product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}</div>
			<div>€{product.price}</div>
			<button onClick={() => addToCart(product)}>Add to cart</button> <br />
			<Link to={"/product/" + product.title.toLowerCase().replaceAll(" ", "-")}>
				<button>Read more</button>
			</Link>
		</div>
	)
}

export default Product