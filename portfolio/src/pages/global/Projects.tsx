// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import { Spinner } from 'react-bootstrap'
import SortButtons from '../../components/home/SortButtons';
import FilterButtons from '../../components/home/FilterButtons';
import ProductCard from '../../components/home/ProductCard';
import CarouselGallery from '../../components/home/CarouselGallery';
import useFetchProducts from '../../util/useFetchProducts';

function Projects() {
	const { products, productsDefault, loading, setProducts } = useFetchProducts();

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Here be some of my works</h1>
			<p></p>
			{/* <CarouselGallery /> */}
			{/* <SortButtons products={products} setProducts={setProducts} /> */}
			<FilterButtons productsDefault={productsDefault} setProducts={setProducts} />
			<br /><br />
			<h6>There are currently {products.length} projects shown</h6>
			<div className="products">
				{products.map(product =>
					<ProductCard key={product.id} product={product} />
				)}
			</div>
		</div>
	)
}

export default Projects