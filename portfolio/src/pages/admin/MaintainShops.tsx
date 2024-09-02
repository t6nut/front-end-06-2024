import React, { useRef, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Location } from '../../models/Location';

function MaintainShops() {
	const [loading, setLoading] = useState(true);
	const [shops, setShops] = useState<Location[]>([]);
	const shopRef = useRef<HTMLInputElement>(null);
	const lngRef = useRef<HTMLInputElement>(null);
	const latRef = useRef<HTMLInputElement>(null);
	const url = process.env.REACT_APP_SHOPS_DB_URL;

	useEffect(() => {
		if (url === undefined) {
			return;
		}
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setShops(json || [])
				setLoading(false)
			}
		);
	}, [url]);

	const deleteShop = (index: number) => {
		shops.splice(index, 1);
		setShops(shops.slice());
		if (url === undefined) {
			return;
		}
		fetch(url, { method: "PUT", body: JSON.stringify(shops) });
	}

	const add = () => {
		if (shopRef.current === null || lngRef.current === null || latRef.current === null) {
			return;
		}
		const newShop = {
			"name": shopRef.current.value,
			"coordinates": {
				"lng": Number(lngRef.current.value),
				"lat": Number(latRef.current.value) 
			} 
		};
		shops.push(newShop);
		setShops(shops.slice());
		if (url === undefined) {
			return;
		}
		fetch(url, { method: "PUT", body: JSON.stringify(shops) });
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<label>Shop name</label> <br />
			<input ref={shopRef} type="text" /> <br />
			<label>Shop longitued</label> <br />
			<input ref={lngRef} type="number" /> <br />
			<label>Shop latitude</label> <br />
			<input ref={latRef} type="number" /> <br />
			<button onClick={add}>Add</button>
			<div>
				{shops.map((shop, index) =>
					<div key={shop.name}>
						{shop.name}
						<button onClick={() => deleteShop(index)}>x</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default MaintainShops