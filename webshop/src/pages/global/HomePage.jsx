import React, { useState, useRef, useEffect } from 'react'
// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function HomePage() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [productsDefault, setProductsDefault] = useState([]);
	const searchedRef = useRef();
	const url = process.env.REACT_APP_PRODUCTS_DB_URL;

	useEffect(() => {
		fetch(url)
		.then(res => res.json())
		.then(json => {
			setProducts(json || []);
			setProductsDefault(json || []);
			setLoading(false);
		})
	}, [url]);

	const addToCart = (productClicked) => {
		// cartJSON.push(product);

		const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
		const index = cartLS.findIndex(p => p.product.id === productClicked.id);
		if (index >= 0) { // index !== -1
			cartLS[index].quantity++;
		} else {
			cartLS.push({quantity: 1, product: productClicked});
		}
		
		localStorage.setItem("cart", JSON.stringify(cartLS));
		toast.success(productClicked.title + ' - added to cart' );
		// react-hot-toast
	}

	// sorteeri A-Z
	const sortAZ = () => {
		products.sort((a, b) => a.title.localeCompare(b.title));
		setProducts(products.slice());
	}
	// sorteeri Z-A
	const sortZA = () => {
		products.sort((a, b) => b.title.localeCompare(a.title));
		setProducts(products.slice());
	}
	// sorteeri hind kahanevalt
	const sortPriceHigh = () => {
		products.sort((a, b) => a.price - b.price);
		setProducts(products.slice());
	}
	// sorteeri hind kasvavalt
	const sortPriceLow = () => {
		products.sort((a, b) => b.price - a.price);
		setProducts(products.slice());
	}
	// sorteeri reiting kahanevalt
	const sortRatingHigh = () => {
		products.sort((a, b) => a.rating.rate - b.rating.rate);
		setProducts(products.slice());
	}
	// sorteeri reiting kasvavalt
	const sortRatingLow = () => {
		products.sort((a, b) => b.rating.rate - a.rating.rate);
		setProducts(products.slice());
	}
	// filtreeri kategooria algusel
	const filterByCategory = () => {
		const result = productsDefault.filter(products =>
			products.category.toLowerCase().includes(searchedRef.current.value.toLowerCase())
		);
		setProducts(result);
	}

	const categoryOptions = new Map([
		...productsDefault.map((p) => [p.category]),
	]);

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Home</h1>
			<button onClick={sortAZ}>Sort A-Z</button>
			<button onClick={sortZA}>Sort Z-A</button>
			<button onClick={sortPriceHigh}>Sort price from high</button>
			<button onClick={sortPriceLow}>Sort price from low</button>
			<button onClick={sortRatingHigh}>Sort rating from high</button>
			<button onClick={sortRatingLow}>Sort rating from low</button> <br /><br />
			<h6>Filter by category:</h6>
			{/* <input onChange={filterByCategory} ref={searchedRef} type="text" /> */}
			<select defaultValue="" onChange={filterByCategory} ref={searchedRef}>
				<option value="">--Select category--</option>
				{[...categoryOptions].map((category) => 
					<option key={category}>{category}</option> //reset filter?
				)}
			</select>
			<br /><br />
			<h6>There are currently {products.length} products found</h6>
			<div className="products">
				{products.map(product =>
					<div className="product" key={product.id}>
						<img style={{ width: "100px" }} src={product.image} alt="" />
						<div>{product.title}</div>
						<div>€{product.price}</div>
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