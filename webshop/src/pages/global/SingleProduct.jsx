import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
// import productsJSON from '../../data/products.json'

function SingleProduct() {
	const [loading, setLoading] = useState(true);
	const { title } = useParams();
	const [products, setProducts] = useState([]);
	const product = products.find(p => p.title.toLowerCase().replaceAll(" ", "-") === title);
	const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;

	useEffect(() => {
		fetch(productsDbUrl)
			.then(res => res.json())
			.then(json => 
				setProducts(json || []),
				setLoading(false)
			);
	
	}, [productsDbUrl]);

	if (loading) {
		return <Spinner />
	}

	if (product === undefined) {
		return <h1>Product not found!</h1>
	}

	return (
		<div className='single-product'>
			<h1>Product name: {product.title}</h1>
			<p>Category: {product.category}</p>
			<img src={product.image} alt="" />
			<p>Product price: {product.price}</p>
			<p>Product descriptions: {product.description}</p>
			<p>Product rating: {product.rating.rate} ({product.rating.count})</p>
		</div>
	)
}

export default SingleProduct