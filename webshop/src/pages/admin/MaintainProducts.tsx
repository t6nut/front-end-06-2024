import React, { useState, useRef, useEffect } from 'react'
// import productsJSON from "../../data/products.json";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'
import styles from "../../css/MaintainProducts.module.css"; // "module" local import
import ConfirmationModal from '../../components/ConfirmationModal';
import { Product } from '../../models/Product';

// let toBeDeleted = null;

// props ehk child-parent komponentidega suhtlus
// parent --> child   parentist saadame muutujaid, et neist infot saada
// child --> parent 	parentist saadame funktsiooni, et child saaks käima parentis panna

function MaintainProducts() {

	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [productsDefault, setProductsDefault] = useState<Product[]>([]);
	const searchedRef = useRef<HTMLInputElement>(null);
	const childRef = useRef<HTMLInputElement>(null);

	const url = process.env.REACT_APP_PRODUCTS_DB_URL;

	useEffect(() => {
		if (url === undefined) {
			return;
		}
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setProducts(json || []);
				setProductsDefault(json || []);
				setLoading(false);
			})
	}, [url]);

	const remove = (product: any) => {
		//console.log(toBeDeletedRef);
		const index = productsDefault.findIndex(p => p.id === product.id);
		productsDefault.splice(index, 1);
		// setProducts(productsDefault.slice());
		if (url === undefined) {
			return;
		}
		
		fetch(url, {method: "PUT", body: JSON.stringify(productsDefault)})
			.then(() => {
				if (!closeModal() || childRef.current === null) {
					return;
				}
				searchFromProducts();
				toast.success('Product removed');
				childRef.current.closeModal();
			})
	}
	
	const searchFromProducts = () => {
		const idSearch = searchedRef.current;
		if (idSearch === null) {
			return;
		}
		const result = productsDefault.filter(product =>
			product.title.toLowerCase().includes(idSearch.value.toLowerCase()) ||
			product.description.toLowerCase().includes(idSearch.value.toLowerCase()) ||
			product.id.toString().includes(idSearch.value)
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
							{ childRef.current !== null ?
								<td>
									<button onClick={() => childRef.current.handleShow(p) }>Remove</button>
									<Link to={"/admin/edit-product/" + p.id}>
										<button>Edit</button>
									</Link>
								</td> 
								:
								<div> No child</div>
							}
						</tr>
					)}
				</tbody>
			</table>
			
			<ConfirmationModal ref={childRef} remove={remove} />

		</div>
	)
}

export default MaintainProducts