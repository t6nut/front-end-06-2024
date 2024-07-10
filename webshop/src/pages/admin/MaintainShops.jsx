import React, { useRef, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';

function MaintainShops() {
	const [loading, setLoading] = useState(true);
	const [shops, setShops] = useState([]);
	const shopRef = useRef();
	const lngRef = useRef();
	const latRef = useRef();
	const url = process.env.REACT_APP_SHOPS_DB_URL;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json =>
				setShops(json || []),
				setLoading(false)
			);
	}, [url]);

	const deleteShop = (index) => {
		shops.splice(index, 1);
		setShops(shops.slice());
		fetch(url, { method: "PUT", body: JSON.stringify(shops) });
	}

	const add = () => {
		shops.push({ 
			"name": shopRef.current.value,
			"coordinates": {
				"lng": Number(lngRef.current.value),
				"lat": Number(latRef.current.value) 
			} 
		});
		setShops(shops.slice());
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