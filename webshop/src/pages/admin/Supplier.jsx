import React, { useEffect, useState } from 'react'

function Supplier() {
	const [products, setProducts] = useState([]);

	// tehakse 1x useEffect sisu kui lehele tullakse
	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json()) //kogu tagastus -> statuscode, headers
			.then(json => setProducts(json)) // reaalne sisu mille lehelt saan
	}, [])
	/* dependency array -> sinna panen muutujad mille muutudes läheb
	useEffect uuest käima */

  return (
		<div>
			<h1>Supplier</h1>
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
					</tr>
				</thead>
				<tbody>
					{products.map((p, index) =>
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>{p.rating.rate}/{p.rating.count}</td>
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.category}</td>
							<td>{p.description}</td>
							<td>{p.price}</td>
							<td>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
  )
}

export default Supplier