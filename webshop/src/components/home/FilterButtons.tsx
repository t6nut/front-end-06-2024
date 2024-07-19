import { useRef } from 'react'
import { Product } from '../../models/Product';

interface FilterButtonsInterface {
	productsDefault: Product[],
	setProducts: (products: Product[]) => void,
}

const FilterButtons = (props: FilterButtonsInterface) => {
	const searchedRef = useRef<HTMLSelectElement>(null);

	// filtreeri kategooria algusel
	const filterByCategory = () => {
		const searchRefCurrent = searchedRef.current;
		if (searchRefCurrent === null) {
			return;
		}
		const result = props.productsDefault.filter(products =>
			products.category.toLowerCase().includes(searchRefCurrent.value.toLowerCase())
		);
		props.setProducts(result);
	}

	const categoryOptions = [...new Set(props.productsDefault.map((p) => p.category))];

	return (
		<div>
			<h6>Filter by category:</h6>
			{/* <input onChange={filterByCategory} ref={searchedRef} type="text" /> */}
			<select defaultValue="" onChange={filterByCategory} ref={searchedRef}>
				<option value="">--Select category--</option>
				{categoryOptions.map((category) =>
					<option key={category}>{category}</option> //reset filter?
				)}
			</select>
		</div>
	)
}


export default FilterButtons