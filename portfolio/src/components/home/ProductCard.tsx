import { Link } from 'react-router-dom';
import { Product } from '../../models/Product';

function ProductCard ({product}: {product: Product}) {


	return (
		<div className="product">
			<img style={{ width: "100px", height: "100px", objectFit: "contain" }} src={product.image} alt="" />
			<div>{product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}</div>
			<div>€{product.price}</div>
			<Link to={"/product/" + product.title.toLowerCase().replaceAll(" ", "-")}>
				<button>Read more</button>
			</Link>
		</div>
	)
}

export default ProductCard