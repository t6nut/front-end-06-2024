// import productsFromFile from "../../data/products.json";
// import cartJSON from "../../data/cart.json"
import CarouselGallery from '../../components/home/CarouselGallery';

function HomePage() {
	return (
		<div id="home">
			<div className='intro'>
				<h1>Welcome to my portfolio website</h1>
				<p>I am Tõnu, a web developer from Tallinn, Estonia</p>
				<p>Check out some of my <a className="button" href="/projects">projects</a></p>
				<br />
			</div>
			<img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/336676250_1009488043545089_7673412117151719441_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UnKzjmGKIb8Q7kNvgFDR7M3&_nc_ht=scontent-hel3-1.xx&oh=00_AYBXr4GY2pgOsUH217tUs3v4TOsmcOJ2XvIR23VXi1h0tA&oe=66DB8D81" alt="" />
			{/* <CarouselGallery /> */}
			{/* <SortButtons products={products} setProducts={setProducts} /> */}
		</div>
	)
}

export default HomePage