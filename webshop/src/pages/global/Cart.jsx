import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
// import cartJSON from '../../data/cart.json'

function Cart() {
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
	const [pms, setPMs] = useState([]);
	const [pmsOriginal, setPMsOriginal] = useState([]);
	const searchRef = useRef();

	useEffect(() => {
		fetch('https://www.omniva.ee/locations.json')
			.then(res => res.json())
			.then(json => {
				setPMs(json);
				setPMsOriginal(json);
			});
	}, []);


	const emptyCart = () => {
		cart.splice(0);
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const decreaseQuantity = (index) => {
		cart[index].quantity--;
		if (cart[index].quantity === 0) {
			cart.splice(index, 1);
		}
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const increaseQuantity = (index) => {
		cart[index].quantity++;
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const removeProduct = (index) => {
		toast.success('Product removed'); // kuidas lisada product.title toast sõnumisse?
		cart.splice(index, 1);
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
		
	}

	const calculateCart = () => {
		let cartSum = 0;
		cart.forEach(p => 
			cartSum += p.product.price * p.quantity
		);
		return cartSum.toFixed(2);
	}

	const countProducts = () => {
		let cartCount = 0;
		cart.forEach(product =>
			cartCount++
		);
		return cartCount;
	}

	const searchFromPMs = () => {
		const result = pmsOriginal.filter(pm => 
			pm.NAME.toLowerCase().includes(searchRef.current.value.toLowerCase())
		);
		setPMs(result);
	}

	return (
		<div>
			<h1>Cart</h1>
			{cart.map((p, index) =>
				<div key={p.product.id}>
					<img className="image" src={p.product.image} alt="" />
					<div>{p.product.title}</div>
					<div>{p.product.price} €</div>
					<button onClick={() => decreaseQuantity(index)}>-</button>
					<div>{p.quantity} pcs</div>
					<button onClick={() => increaseQuantity(index)}>+</button>
					<div>{(p.product.price * p.quantity).toFixed(2)} €</div>
					<button onClick={() => removeProduct(p.product)}>Remove</button>
				</div>
			)}

			{/* 
			{cart.length > 0 && }
			{cart.length > 0 && } */}

			{cart.length > 0 && 
				<div>
						<div>Cart count: {countProducts()}</div>
						<div>Cart sum: {calculateCart()}</div>
						<button onClick={emptyCart}>Empty cart</button>
						<br />
						<input onChange={searchFromPMs} ref={searchRef} type="text" />
						<select>
							{pms
								.filter(pm => pm.A0_NAME === "EE")
								.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
						</select>
				</div>
			}

			{cart.length === 0 &&
				<>
					<div>Cart is currently empty. Add some products:</div>
					<Link to="/">
						To home page
					</Link>
				</>
			}

		</div>
	)
}

export default Cart