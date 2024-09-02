import { Product } from '../../models/Product';

interface SortButtonsInterface {
	products: Product[],
	setProducts: (products: Product[]) => void,
}
function SortButtons(props: SortButtonsInterface) {
	// sorteeri A-Z
	const sortAZ = () => {
		props.products.sort((a, b) => a.title.localeCompare(b.title));
		props.setProducts(props.products.slice());
	}
	// sorteeri Z-A
	const sortZA = () => {
		props.products.sort((a, b) => b.title.localeCompare(a.title));
		props.setProducts(props.products.slice());
	}
	return (
		<div>
			<button onClick={sortAZ}>Sort A-Z</button>
			<button onClick={sortZA}>Sort Z-A</button>
		</div>
	)
}

export default SortButtons