import { useState, useEffect } from 'react'
import Map from '../../components/Map'


function Shops() {
	const [shops, setShops] = useState([{ lngLat: [59.4378, 24.7574], zoom: 11}]);

	// TODO: useEffect siin, võtta kõik poed
	const url = process.env.REACT_APP_SHOPS_DB_URL;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
	 		.then(json => {
				setShops(json || []);
	 			//setLoading(false);
	 		})
	 }, [url]);

	return (
		<div>
			<h1>Shops</h1>
			{shops.map((shop, index) =>
				<div key={shop.name}>
					<button onClick={() => setShops({ lngLat: [shop.coordinates.lng, shop.coordinates.lat], zoom: 7 })}>{shop.name}</button>
				</div>
			)}
			{/* <button onClick={() => setCoordinates({ lngLat: [58.8090, 25.4878], zoom: 7 })}>Kõik poed</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4316, 24.7574], zoom: 11 })}>Kõik Tallinna poed</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4231, 24.7991], zoom: 13 })}>Ülemiste</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4277, 24.7193], zoom: 13 })}>Kristiine</button>
			<button onClick={() => setCoordinates({ lngLat: [58.3779, 26.7305], zoom: 13 })}>Tasku</button> */}
			
			<Map mapCoordinates={shops} />
		</div>
	)
}

export default Shops