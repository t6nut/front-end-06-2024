import React, { useState, useEffect } from 'react'
// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import { Spinner } from 'react-bootstrap'
import SortButtons from '../../components/home/SortButtons';
import FilterButtons from '../../components/home/FilterButtons';
import Product from '../../components/home/Product';
import CarouselGallery from '../../components/home/CarouselGallery';

function HomePage() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [productsDefault, setProductsDefault] = useState([]);
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

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Home</h1>
			<CarouselGallery />
			<SortButtons products={products} setProducts={setProducts} />
			<FilterButtons productsDefault={productsDefault} setProducts={setProducts } />
			<br /><br />
			<h6>There are currently {products.length} products found</h6>
			<div className="products">
				{products.map(product =>
					<Product key={product.id} product={product} />
				)}
			</div>
		</div>
	)
}

export default HomePage