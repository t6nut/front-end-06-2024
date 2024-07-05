import React, { useState, useRef, useEffect } from 'react'
// import productsJSON from "../../data/products.json";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'
import "../../css/MaintainProducts.css"; // globalne import

function MaintainProducts() {
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

	const remove = (product) => {
		const index = productsDefault.findIndex(p => p.id === product.id);
		productsDefault.splice(index, 1);
		// setProducts(productsDefault.slice());
		searchFromProducts();
		toast.success('Product removed');
		fetch(url, {method: "PUT", body: JSON.stringify(productsDefault)})
	}

	const searchFromProducts = () => {
		const result = productsDefault.filter(product => 
			product.title.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
			product.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
			product.id.toString().includes(searchedRef.current.value)
		);
		setProducts(result);
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Maintain products</h1>
			<input type="text" onChange={searchFromProducts} ref={searchedRef} />
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Rating</th>
						<th>Image</th>
						<th>Title</th>
						<th>Category</th>
						<th>Description</th>
						<th>Price</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p, index) =>
						<tr key={p.id} className={p.active ? "active" : "inactive"}>
							<td>{p.id}</td>
							<td>{p.rating.rate}/{p.rating.count}</td> 
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.description}</td>
							<td>{p.price}</td>
							<td>
								<button onClick={() => { remove(p); }}>Remove</button>
								<Link to={"/admin/edit-product/" + p.id}>
									<button>Edit</button>
								</Link>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default MaintainProducts