import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ParcelMachines from '../../components/cart/ParcelMachines';
import Payment from '../../components/cart/Payment';
import styles from "../../css/Cart.module.css";
import { useContext } from 'react';
import { CartSumContext } from '../../store/CartSumContext';
import { useDispatch } from 'react-redux';
import { decrement, decrementByAmount, empty, increment } from '../../store/counterSlice';
import { calculateCart, countProducts } from '../../util/calculations';
import useFetchProducts from '../../util/useFetchProducts';
import { Spinner } from 'react-bootstrap';
import { Product, Rating } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';
import { CartProductId } from '../../models/CartProductId';
import { log } from 'console';
// import cartJSON from '../../data/cart.json'

function Cart() {
	const { products, loading } = useFetchProducts();

	const [cart, setCart] = useState<CartProduct[]>([]);
	const {setCartSum} = useContext(CartSumContext);
	const dispatch = useDispatch();

	useEffect(() => {
		// {quantity: 5, productId: 99}
		if (loading === false) {
			const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
			const cartWithProducts = cartLS.map(c => (
				{
					quantity: c.quantity,
					product: products.find(p => p.id === c.productId) ||
						new Product(0, "", 0, "", "", "", false, new Rating(0, 0))
				}
			)).filter(c => c.product.id !== 0);
			// {quantity: 5, product: {id: 99, price: 99}}
			setCart(cartWithProducts);
		}
	}, [loading, products]);


	const emptyCart = () => {
		cart.splice(0);
		updateCart();
		dispatch(empty());
	}

	const decreaseQuantity = (index: number) => {
		cart[index].quantity--;
		if (cart[index].quantity === 0) {
			cart.splice(index, 1);
		}
		updateCart();
		dispatch(decrement())
	}

	const increaseQuantity = (index: number) => {
		cart[index].quantity++;
		updateCart();
		dispatch(increment())
	}

	const removeProduct = (index: number) => {
		const quantity = cart[index].quantity;
		toast.success('Product removed'); // kuidas lisada product.title toast sõnumisse?
		cart.splice(index, 1);
		updateCart();
		dispatch(decrementByAmount(quantity));
	}

	const updateCart = () => {
		setCart(cart.slice());
		const result = cart.map(c => ({quantity: c.quantity, productId: c.product.id}));
		localStorage.setItem("cart", JSON.stringify(result));
		setCartSum(calculateCart(cart));
	}

	/* const calculateCart = () => {
		let cartSum = 0;
		cart.forEach(p => 
			cartSum += p.product.price * p.quantity
		);
		return cartSum;
	} */

		if (loading) {
			return <Spinner />
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
					<img src={require("../../images/remove.png")} className={styles.button} onClick={() => removeProduct(index)} alt="" />
				</div>
			)}

			{/* 
			{cart.length > 0 && }
			{cart.length > 0 && } */}

			{cart.length > 0 && 
				<div>
					<div>Cart count: {countProducts(cart)}</div>
					<div>Cart sum: {calculateCart(cart).toFixed(2)}</div>
					<Payment sum={calculateCart(cart)}/>
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