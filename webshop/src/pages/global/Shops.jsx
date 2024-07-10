import { useState, useEffect } from 'react'
import Map from '../../components/Map'
import { Spinner } from 'react-bootstrap';


function Shops() {
	const [shops, setShops] = useState([]);
	const [coordinates, setCoordinates] = useState({ lngLat: [59.4316, 24.7574], zoom: 7});
	const [loading, setLoading] = useState(true);

	// TODO: useEffect siin, võtta kõik poed
	const url = process.env.REACT_APP_SHOPS_DB_URL;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
	 		.then(json => {
				setShops(json || []);
	 			setLoading(false);
	 		})
	 }, [url]);

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Shops</h1>
			{shops.map((shop, index) =>
				<div key={shop.name}>
					<button onClick={() => setCoordinates({ lngLat: [shop.coordinates.lng, shop.coordinates.lat], zoom: 11 })}>{shop.name}</button>
				</div>
			)}
			{/* <button onClick={() => setCoordinates({ lngLat: [58.8090, 25.4878], zoom: 7 })}>Kõik poed</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4316, 24.7574], zoom: 11 })}>Kõik Tallinna poed</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4231, 24.7991], zoom: 13 })}>Ülemiste</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4277, 24.7193], zoom: 13 })}>Kristiine</button>
			<button onClick={() => setCoordinates({ lngLat: [58.3779, 26.7305], zoom: 13 })}>Tasku</button> */}
			
			<Map shops={shops} mapCoordinates={coordinates} />
		</div>
	)
}

export default Shops