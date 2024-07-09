import React, { useRef } from 'react'

function FilterButtons(props) {
	const searchedRef = useRef();

	// filtreeri kategooria algusel
	const filterByCategory = () => {
		const result = props.productsDefault.filter(products =>
			products.category.toLowerCase().includes(searchedRef.current.value.toLowerCase())
		);
		props.setProducts(result);
	}

	const categoryOptions = new Map([
		...props.productsDefault.map((p) => [p.category]),
	]);

	return (
		<div>
			<h6>Filter by category:</h6>
			{/* <input onChange={filterByCategory} ref={searchedRef} type="text" /> */}
			<select defaultValue="" onChange={filterByCategory} ref={searchedRef}>
				<option value="">--Select category--</option>
				{[...categoryOptions].map((category) =>
					<option key={category}>{category}</option> //reset filter?
				)}
			</select>
		</div>
	)
}

export default FilterButtons