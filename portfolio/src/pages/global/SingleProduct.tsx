import { Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import useFetchProducts from '../../util/useFetchProducts';
// import productsJSON from '../../data/products.json'

function SingleProduct() {
	const { title } = useParams();
	const { products, loading} = useFetchProducts();
	const product = products.find(p => p.title.toLowerCase().replaceAll(" ", "-") === title);

	if (loading) {
		return <Spinner />
	}

	if (product === undefined) {
		return <h1>Projects not found!</h1>
	}

	return (
		<div className='single-product'>
			<h1>{product.title}</h1>
			<p>{product.category}</p>
			<img src={product.image} alt="" />
			<br />
			<br />
			<p>{product.description}</p>
			<Link to={product.url} rel='noopener noreferrer' target="_blank">Website</Link>
		</div>
	)
}

export default SingleProduct