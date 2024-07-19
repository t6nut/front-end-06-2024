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
	// sorteeri hind kahanevalt
	const sortPriceHigh = () => {
		props.products.sort((a, b) => a.price - b.price);
		props.setProducts(props.products.slice());
	}
	// sorteeri hind kasvavalt
	const sortPriceLow = () => {
		props.products.sort((a, b) => b.price - a.price);
		props.setProducts(props.products.slice());
	}
	// sorteeri reiting kahanevalt
	const sortRatingHigh = () => {
		props.products.sort((a, b) => a.rating.rate - b.rating.rate);
		props.setProducts(props.products.slice());
	}
	// sorteeri reiting kasvavalt
	const sortRatingLow = () => {
		props.products.sort((a, b) => b.rating.rate - a.rating.rate);
		props.setProducts(props.products.slice());
	}
	return (
		<div>
			<button onClick={sortAZ}>Sort A-Z</button>
			<button onClick={sortZA}>Sort Z-A</button>
			<button onClick={sortPriceHigh}>Sort price from high</button>
			<button onClick={sortPriceLow}>Sort price from low</button>
			<button onClick={sortRatingHigh}>Sort rating from high</button>
			<button onClick={sortRatingLow}>Sort rating from low</button> <br /><br />
		</div>
	)
}

export default SortButtons