import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import productsJSON from '../../data/products.json';

function AddProduct() {
	// const [message, setMessage] = useState("Add product!");
	const idRef = useRef();
	const titleRef = useRef();
	const categoryRef = useRef();
	const descRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();
	const ratingRef = useRef();
	const activeRef = useRef();
	const [isUnique, setIsUnique] = useState(true);

	const add = () => {
		if (titleRef.current.value === "") {
			toast.error("Can't add product without a title!");
			return;
		}
		if (titleRef.current.value < 4) {
			toast.error("Product name too short!");
			return;
		}
		if (titleRef.current.value[0] === titleRef.current.value[0].toLowerCase()) {
			toast.error("Product can't start with a lower case letter or a number!");
			return;
		}
		toast.success("Product added: " + titleRef.current.value);

		const newProduct = {
			'id': Number(idRef.current.value),
			'title': titleRef.current.value,
			'category': categoryRef.current.value,
			'description': descRef.current.value,
			'price': Number(priceRef.current.value),
			'image': imageRef.current.value,
			'rating': {
				'rate': ratingRef.current.value,
				'count': 0,
			}
		}

		productsJSON.push(newProduct);
	}

	const test = () => {
		if (imageRef.current.value.startsWith("https://") === false) {
			toast.error("Image URL is wrong!");
			return;
		}
		if (!(imageRef.current.value.endsWith(".png") ||
			imageRef.current.value.endsWith(".jpg") ||
			imageRef.current.value.endsWith(".jpeg"))) {
			toast.error("Image URL ending is wrong!");
			return;
		}
		toast.error("");
	}

	const checkIdUniqueness = () => {
		const result = productsJSON.findIndex(p => p.id === Number(idRef.current.value));
		if (result === -1) {
			setIsUnique(true);
		} else {
			setIsUnique(false);
		}
	}

	return (
		<div>
			{isUnique === false && <div>Produt ID is not Unique!</div>}
			<h1>Add a new product</h1>
			<label>Product id</label> <br />
			<input onChange={checkIdUniqueness} ref={idRef} type="text" /> <br />
			<label>Product name</label> <br />
			<input ref={titleRef} type="text" /> <br />
			<label>Product category</label> <br />
			<input ref={categoryRef} type="text" /> <br />
			<label>Product description</label> <br />
			<textarea ref={descRef} type="text" /> <br />
			<label>Product price</label> <br />
			<input ref={priceRef} type="number" /> <br />
			<label>Product rating</label> <br />
			<input ref={ratingRef} type="number" max="5" min="0" step=".1" /> <br />
			<label>Product image</label> <br />
			<input onChange={test} ref={imageRef} type="text" /> <br />
			<label>Product in stock</label> <br />
			<input ref={activeRef} type="checkbox" /> <br />
			<button disabled={isUnique === false} onClick={add}>Add</button> <br />
		</div>
	)
}

export default AddProduct