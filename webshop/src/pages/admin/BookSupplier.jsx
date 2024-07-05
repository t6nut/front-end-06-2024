import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from 'react-bootstrap';

function BookSupplier() {
	const [loading, setLoading] = useState(true);
	const [books, setBooks] = useState([]);
	const [searchValue, setSearchValue] = useState('react');
	const searchRef = useRef();

	useEffect(() => {
		fetch('https://api.itbook.store/1.0/search/' + searchValue)
			.then(res => res.json())
			.then(json => 
				setBooks(json.books),
				setLoading(false)
			);
				
	}, [searchValue]);
	
	const changeSearchValue = () => {
		if (searchRef.current.value.length === 0) {
			return;
		}
		setSearchValue(searchRef.current.value);
	}

	if (loading) {
		return <Spinner />
	}

  return (
    <div>
			<input onChange={changeSearchValue} ref={searchRef} defaultValue={"react"} type="text" />
			{searchValue.length >= 2 ? 
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Image</th>
						<th>Title</th>
						<th>Subtitle</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{books.map((p, index) =>
						<tr key={p.id}>
							<td>{p.isbn13}</td>
							<td><img className='image' src={p.image} alt="" /></td>
							<td>{p.title}</td>
							<td>{p.subtitle}</td>
							<td>{p.price}</td>
						</tr>
					)}
				</tbody>
			</table> : 
				<div>Invalid search!</div>
			}
		</div>
  )
}

export default BookSupplier