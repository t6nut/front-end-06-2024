import React, { useState, useRef, useEffect, useMemo } from 'react'
// import productsJSON from "../../data/products.json";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Button, Modal, Spinner } from 'react-bootstrap'
import styles from "../../css/MaintainProducts.module.css"; // "module" local import

// let toBeDeleted = null;

function MaintainProducts() {

	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [productsDefault, setProductsDefault] = useState([]);
	const [show, setShow] = useState(false);
	const searchedRef = useRef();
	const toBeDeletedRef = useRef();

	const url = process.env.REACT_APP_PRODUCTS_DB_URL;

	const handleClose = () => setShow(false);
	const handleShow = (p) => {
		setShow(true);
		toBeDeletedRef.current = p;
	};

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setProducts(json || []);
				setProductsDefault(json || []);
				setLoading(false);
			})
	}, [url]);

	const remove = () => {
		console.log(toBeDeletedRef);
		const index = productsDefault.findIndex(p => p.id === toBeDeletedRef.current.id);
		productsDefault.splice(index, 1);
		// setProducts(productsDefault.slice());
		searchFromProducts();
		toast.success('Product removed');
		setShow(false);
		// fetch(url, {method: "PUT", body: JSON.stringify(productsDefault)})
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
						<tr key={p.id} className={p.active ? styles.active : styles.inactive }>
							<td>{p.id}</td>
							<td>{p.rating.rate}/{p.rating.count}</td> 
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.description}</td>
							<td>{p.price}</td>
							<td>
								<button onClick={() => { handleShow(p) }}>Remove</button>
								<Link to={"/admin/edit-product/" + p.id}>
									<button>Edit</button>
								</Link>
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => remove() }>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	)
}

export default MaintainProducts