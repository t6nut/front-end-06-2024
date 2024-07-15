import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ParcelMachines from '../../components/cart/ParcelMachines';
import Payment from '../../components/cart/Payment';
import styles from "../../css/Cart.module.css";
import { useContext } from 'react';
import { CartSumContext } from '../../store/CartSumContext';
// import cartJSON from '../../data/cart.json'

function Cart() {
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
	const {setCartSum} = useContext(CartSumContext);

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
		setCartSum(calculateCart());
	}

	const increaseQuantity = (index) => {
		cart[index].quantity++;
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
		setCartSum(calculateCart());
	}

	const removeProduct = (index) => {
		toast.success('Product removed'); // kuidas lisada product.title toast sõnumisse?
		cart.splice(index, 1);
		setCart(cart.slice());
		localStorage.setItem("cart", JSON.stringify(cart));
		setCartSum(calculateCart());
	}

	const calculateCart = () => {
		let cartSum = 0;
		cart.forEach(p => 
			cartSum += p.product.price * p.quantity
		);
		return cartSum;
	}

	const countProducts = () => {
		let cartCount = 0;
		cart.forEach(p =>
			cartCount += p.quantity
		);
		return cartCount;
	}

	return (
		<div>
			<h1>Cart</h1>
			{cart.map((p, index) =>
				<div className={styles.product} key={p.product.id}>
					<img className={styles.image} src={p.product.image} alt="" />
					<div className={styles.title}>{p.product.title}</div>
					<div className={styles.price}>{p.product.price} €</div>
					<div className={styles.quantity}>
						<img src={require("../../images/minus.png")} className={styles.button} onClick={() => decreaseQuantity(index)} alt="" />
						<div>{p.quantity} pcs</div>
						<img src={require("../../images/plus.png")} className={styles.button} onClick={() => increaseQuantity(index)} alt="" />
					</div>
					<div className={styles.total} >{(p.product.price * p.quantity).toFixed(2)} €</div>
					<img src={require("../../images/remove.png")} className={styles.button} onClick={() => removeProduct(p.product)} alt="" />
				</div>
			)}

			{/* 
			{cart.length > 0 && }
			{cart.length > 0 && } */}

			{cart.length > 0 && 
				<div>
					<div>Cart count: {countProducts()}</div>
					<div>Cart sum: {calculateCart().toFixed(2)}</div>
					<Payment sum={calculateCart()}/>
					<br />
					<button onClick={emptyCart}>Empty cart</button>
					<br />
					<ParcelMachines />
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