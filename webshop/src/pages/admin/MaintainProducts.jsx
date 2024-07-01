import React, { useState } from 'react'
import productsJSON from "../../data/products.json";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function MaintainProducts() {

	const [products, setProducts] = useState(productsJSON);

	const remove = (index) => {
		productsJSON.splice(index, 1);
		setProducts(productsJSON.slice());
		// kustutab, aga ei salvesta?
		toast.success('Product removed');
	}

	return (
		<div>
			<h1>Maintain products</h1>
			<table>
				<thead>
					<tr>
						<th>Rating</th>
						<th>Image</th>
						<th>Title</th>
						<th>Category</th>
						<th>Price</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p, index) =>
						<tr key={p.title}>
							<td>{p.rating.rate}/{p.rating.count}</td> 
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.price}</td>
							<td>
								<button onClick={() => { remove(index); }}>Remove</button>
								<Link to={"/admin/edit-product/" + index}>
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