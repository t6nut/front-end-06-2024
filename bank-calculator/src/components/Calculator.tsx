import { useState } from 'react';
import productsJSON from '../data/products.json';
import { ReactComponent as DeleteIcon } from '../assets/remove.svg';
import { ReactComponent as AddIcon } from '../assets/plus.svg';

interface Product {
	name: string;
	price: string;
}

function Calculator() {
	const [products, setProducts] = useState<Product[]>(
		[...productsJSON.map(product => ({
			...product,
		}))]
	);

	const sanitizePrice = (value: string) => {
		return Number(value.replace(',', '.'));
	};

	const updateProduct = (index: number, field: keyof Product, value: string) => {
		const updatedProducts = products.map((product, i) =>
			i === index ? { ...product, [field]: value } : product
		);
		setProducts(updatedProducts);
	};

	const addNewRow = () => {
		const updatedProducts = [...products, { name: '', price: '' }];
		setProducts(updatedProducts);
	};

	const deleteProduct = () => {
		if (products.length <= 1) {
			alert("Vähemalt üks toode peab olema lisatud");
			return;
		}
		const updatedProducts = products.slice(0, -1);
		setProducts(updatedProducts);
	};

	const totalPrice = products.reduce((acc, product) => acc + (sanitizePrice(product.price) || 0), 0);

	return (
		<div className='calculator' id="kalkulaator">
			<div className="calculator__wrapper">
				<h2 className="calculator__title"><strong>Koosta soovinimekiri</strong> ja vaata oma uue sisustuse kuumakset</h2>
				<div className="calculator__content-wrapper">
					<div className="calculator__content">

						<form>
							<table>
								<thead>
									<tr>
										<th>Toode</th>
										<th>Hind</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product, index) => (
										<tr key={index}>
											<td>
												<input
													className='calculator__input'
													placeholder="Toote nimi"
													name="toode"
													type="text"
													value={product.name}
													onChange={(e) => updateProduct(index, 'name', e.target.value)}
												/>
											</td>
											<td>
												<input
													className='calculator__input'
													placeholder="Toote hind"
													name="hind"
													type="text"
													value={product.price}
													pattern="[0-9,.]*"
													onChange={(e) => {
														const value = e.target.value;
														if (/^[0-9,.]*$/.test(value)) {
															updateProduct(index, 'price', value);
														}
													}}
												/> <span className="calculator__currency">€</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</form>

						<div className="calculator__buttons">
							<button className="btn btn--gray btn--hover-line" onClick={addNewRow}>
								<AddIcon className="btn--icon" />
								Lisa toode
							</button>
							<button className="btn btn--gray btn--hover-line" onClick={deleteProduct}>
								<DeleteIcon className="btn--icon" />
								Kustuta
							</button>
						</div>
					</div>

					<div className='calculator__sum'>
						<span>
							{Number.isInteger(totalPrice)
								? `${totalPrice}€`
								: `${totalPrice.toFixed(2)}€`}
						</span>
						<button className="btn btn--dark"><p>Taotle sisustuslaenu</p></button>
						<a className="link link--gray" href="/#">Tutvu tingimustega</a>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Calculator;
