import { Link } from 'react-router-dom';
import { Product } from '../../models/Product';
import { Button } from 'react-bootstrap';

function ProductCard ({product}: {product: Product}) {


	return (
		<div className="product">
			<img style={{ width: "100px", height: "100px", objectFit: "contain" }} src={product.image} alt="" />
			<h3>{product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}</h3>
			<div>{product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.category}</div>
			{/* <Link to={product.url} rel='noopener noreferrer' target="_blank">Website link</Link> */}
			<Link to={"/product/" + product.title.toLowerCase().replaceAll(" ", "-")}>
				<button>Read more</button>
			</Link>
		</div>
	)
}

export default ProductCard