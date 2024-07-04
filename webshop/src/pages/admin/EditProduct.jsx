import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import productsJSON from "../../data/products.json";

function EditProduct() {
	const { qnr } = useParams();
	const product = productsJSON.find(p => p.id === Number(qnr)); // kasuta find()
	const idRef = useRef();
	const titleRef = useRef();
	const categoryRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();
	const descRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();
	const activeRef = useRef();
	const navigate = useNavigate();
	const [isUnique, setIsUnique] = useState(true);

	// Reacti hookid - Reacti erikood
	// 1. Peavad algama use eesliidesega
	// 2. Neid peab alati importima
	// 3. Neid peab alati käivitama
	// 4. Need ei tohi olla funktsiooni sees loodud
	// 5. Need ei tohi olla loodud tingimuslikult

	const edit = () => {
		const changedproduct = {
			"id": Number(idRef.current.value),
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
		const index = productsJSON.findIndex(p => p.id === Number(qnr));
		productsJSON[index] = changedproduct;
		navigate("/admin/maintain-products")
	}
	
	const checkIdUniqueness = () => {
		if (qnr === idRef.current.value) {
			setIsUnique(true);
			return;
		}

		const result = productsJSON.findIndex(p => p.id === Number(idRef.current.value));
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

	return (
		<div>
			{isUnique === false && <div>Produt ID is not Unique!</div>}
			<h1>{product.title}</h1>
			<label htmlFor="">Product rating & count</label> <br />
			<input ref={rateRef} type="number" disabled defaultValue={product.rating.rate} />
			<input ref={countRef} type="number" disabled defaultValue={product.rating.count} /> <br />
			<label htmlFor="">Product id</label> <br />
			<input onChange={checkIdUniqueness} ref={idRef} type="number" defaultValue={product.id} /><br />
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
			<button disabled={isUnique === false} onClick={edit}>Update</button>
		</div>
	)
}

export default EditProduct