// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import CarouselGallery from '../../components/home/CarouselGallery';

function HomePage() {
	return (
		<div>
			<h1>Hello, I am Tõnu</h1>
			<h2>Web developer and designer from Estonia</h2>
			<p></p>
			<CarouselGallery />
			{/* <SortButtons products={products} setProducts={setProducts} /> */}
		</div>
	)
}

export default HomePage