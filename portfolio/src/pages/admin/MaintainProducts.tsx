import { useRef } from 'react'
// import productsJSON from "../../data/products.json";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'
import styles from "../../css/MaintainProducts.module.css"; // "module" local import
import ConfirmationModal, { ConfirmationModalRefInterface } from '../../components/ConfirmationModal';
import { Product } from '../../models/Product';
import useFetchProducts from '../../util/useFetchProducts';

// let toBeDeleted = null;

// props ehk child-parent komponentidega suhtlus
// parent --> child   parentist saadame muutujaid, et neist infot saada
// child --> parent 	parentist saadame funktsiooni, et child saaks käima parentis panna

function MaintainProducts() {
	const { products, productsDefault, loading, setProducts, url } = useFetchProducts();
	const searchedRef = useRef<HTMLInputElement>(null);
	const childRef = useRef<ConfirmationModalRefInterface>(null);

	const remove = (product: Product) => {
		//console.log(toBeDeletedRef);
		const index = productsDefault.findIndex(p => p.id === product.id);
		productsDefault.splice(index, 1);
		// setProducts(productsDefault.slice());
		if (url === undefined) {
			return;
		}
		
		fetch(url, {method: "PUT", body: JSON.stringify(productsDefault)})
			.then(() => {
				searchFromProducts();
				toast.success('Product removed');
				if (childRef.current !== null) {
					childRef.current.closeModal();
				}
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

	const showModal = (p: Product) => {
		if (childRef.current === null) {
			return;
		}
		childRef.current.handleShow(p);
	}

	if (loading) {
		return <Spinner data-testid="spinner" />
	}

	return (
		<div>
			<h1>Maintain products</h1>
			<input type="text" onChange={searchFromProducts} ref={searchedRef} />
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Image</th>
						<th>Title</th>
						<th>Category</th>
						<th>Description</th>
						<th>Website url</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p) =>
						<tr key={p.id} className={p.active ? styles.active : styles.inactive }>
							<td>{p.id}</td>
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.description}</td>
							<td>{p.url}</td>
							<td>
								<button onClick={() =>showModal(p) }>Remove</button>
								<Link to={"/admin/edit-product/" + p.id}>
									<button>Edit</button>
								</Link>
							</td> 
						</tr>
					)}
				</tbody>
			</table>
			
			<ConfirmationModal ref={childRef} remove={remove} />

		</div>
	)
}

export default MaintainProducts