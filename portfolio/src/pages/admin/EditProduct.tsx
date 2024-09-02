import { useRef, useState, useEffect, useMemo } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { Category } from '../../models/Category';
import useFetchProducts from '../../util/useFetchProducts';
// import productsJSON from "../../data/products.json";

function EditProduct() {
	const { qnr } = useParams();
	const {products, loading} = useFetchProducts();

	const product = useMemo(() => products.find(p => p.id === Number(qnr)), [products, qnr]);
	const idRef = useRef<HTMLInputElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);
	const urlRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const activeRef = useRef<HTMLInputElement>(null);
	const countRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const [isUnique, setIsUnique] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);
	
	const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;
	const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;

	useEffect(() => {
		if (categoriesDbUrl === undefined) {
			return;
		}
		fetch(categoriesDbUrl)
			.then(res => res.json())
			.then(json => 
				setCategories(json || []),
			);
			
	}, [categoriesDbUrl]);

	const edit = () => {
		if (titleRef.current === null || idRef.current === null ||
			descRef.current === null || urlRef.current === null ||
			categoryRef.current === null || imageRef.current === null ||
		  activeRef.current === null ||
			countRef.current === null) {
			return;
		}
		const changedproduct = {
			"id": Number(idRef.current.value),
			"title": titleRef.current.value,
			"category": categoryRef.current.value,
			"url": urlRef.current.value,
			"image": imageRef.current.value,
			"description": descRef.current.value,
			"active": activeRef.current.checked,
		}
		const index = products.findIndex(p => p.id === Number(qnr));
		products[index] = changedproduct;
		if (productsDbUrl === undefined) {
			return;
		}
		fetch(productsDbUrl, {method: "PUT", body: JSON.stringify(products)})
			.then(() => 
				navigate("/admin/maintain-products"));
	}
	
	const checkIdUniqueness = () => {
		const idInput = idRef.current;
		if (idInput === null) {
			return;
		}
		if (qnr === idInput.value) {
			setIsUnique(true);
			return;
		}

		const result = products.findIndex(p => p.id === Number(idInput.value));
		// -1 --> ei leitud 0,1,2,3,4 --> leiti
		if (result === -1) { 
			setIsUnique(true);
		} else {
			setIsUnique(false);
		}
	}

	if (product === undefined) {
		return <div>product not fount</div>
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			{isUnique === false && <div>Produt ID is not Unique!</div>}
			<h1>{product.title}</h1>
			<label htmlFor="">Product id</label> <br />
			<input onChange={checkIdUniqueness} ref={idRef} type="number" defaultValue={product.id} /><br />
			<label htmlFor="">Project title</label> <br />
			<input ref={titleRef} type="text" defaultValue={product.title} /><br />
			<label htmlFor="">Project description</label> <br />
			<textarea style={{width: "500px"}} ref={descRef} defaultValue={product.description} /><br />
			<label htmlFor="">Project category</label> <br />
			{/* <input ref={categoryRef} type="text" defaultValue={product.category} /><br /> */}
			<select ref={categoryRef} defaultValue={product.category}>
				{categories.map(category => <option key={category.name}>{category.name}</option>)}
			</select><br />
			<label htmlFor="">Website url</label> <br />
			<input ref={urlRef} type="number" defaultValue={product.url} /><br />
			<label htmlFor="">Website image</label> <br />
			<input ref={imageRef} type="text" defaultValue={product.image} /><br />
			<button disabled={isUnique === false} onClick={edit}>Update</button>
		</div>
	)
}

export default EditProduct