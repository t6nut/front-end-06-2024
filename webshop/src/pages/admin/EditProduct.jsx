import React, { useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import producstJSON from "../../data/products.json";

function EditProduct() {
	const { qnr } = useParams();
	const product = producstJSON[qnr]; // kasuta find()
	const titleRef = useRef();
	const categoryRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();
	const descRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();
	const activeRef = useRef();
	const navigate = useNavigate();

	// Reacti hookid - Reacti erikood
	// 1. Peavad algama use eesliidesega
	// 2. Neid peab alati importima
	// 3. Neid peab alati käivitama
	// 4. Need ei tohi olla funktsiooni sees loodud
	// 5. Need ei tohi olla loodud tingimuslikult

	const edit = () => {
		const changedproduct = {
			"title": titleRef.current.value,
			"category": categoryRef.current.value,
			"price": Number(priceRef.current.value),
			"image": imageRef.current.value,
			"description": descRef.current.value,
			"active": activeRef.current.checked,
			"rating": {
				"rate": rateRef.current.value,
				"count": countRef.current.value
			}
		}
		producstJSON[qnr] = changedproduct;
		navigate("/admin/maintain-products")
	}

	if (product === undefined) {
		return <div>product not fount</div>
	}

	return (
		<div>
			<h1>{product.title}</h1>
			<label htmlFor="">Product rating & count</label> <br />
			<input ref={rateRef} type="number" disabled defaultValue={product.rating.rate} />
			<input ref={countRef} type="number" disabled defaultValue={product.rating.count} /> <br />
			<label htmlFor="">Product title</label> <br />
			<input ref={titleRef} type="text" defaultValue={product.title} /><br />
			<label htmlFor="">Product description</label> <br />
			<textarea style={{width: "500px"}} ref={descRef} type="text" defaultValue={product.description} /><br />
			<label htmlFor="">Product category</label> <br />
			<input ref={categoryRef} type="text" defaultValue={product.category} /><br />
			<label htmlFor="">Product price</label> <br />
			<input ref={priceRef} type="number" defaultValue={product.price} /><br />
			<label htmlFor="">Product image</label> <br />
			<input ref={imageRef} type="text" defaultValue={product.image} /><br />
			<label htmlFor="">Product stock</label> <br />
			<input ref={activeRef} type="checkbox" defaultChecked={product.active} /><br />
			<button onClick={edit}>Update</button>
		</div>
	)
}

export default EditProduct