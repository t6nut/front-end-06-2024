import { useState, useEffect } from 'react'
import Map from '../../components/Map'
import { Spinner } from 'react-bootstrap';
import { LatLngExpression } from 'leaflet';
import { Location } from '../../models/Location';

function AboutMe() {
	const [locations, setLocations] = useState<Location[]>([]);
	const [coordinates, setCoordinates] = useState<{ lngLat: LatLngExpression, zoom: number }>({ lngLat: [59.4341, 24.7549], zoom: 12});
	const [loading, setLoading] = useState(true);

	// TODO: useEffect siin, võtta kõik poed
	const url = process.env.REACT_APP_LOCATIONS_DB_URL;

	useEffect(() => {
		if (url === undefined) {
			return;
		}
		fetch(url)
			.then(res => res.json())
	 		.then(json => {
				setLocations(json || []);
	 			setLoading(false);
	 		})
	 }, [url]);

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<h1>About me</h1>
			<img style={{ width: "200px", borderRadius: "50%" }} src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/336676250_1009488043545089_7673412117151719441_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UnKzjmGKIb8Q7kNvgFDR7M3&_nc_ht=scontent-hel3-1.xx&oh=00_AYBXr4GY2pgOsUH217tUs3v4TOsmcOJ2XvIR23VXi1h0tA&oe=66DB8D81" alt="" />
			<br /><br />
			<h4>Hi, I am Tõnu <br /> a web developer & designer</h4>
			<br />
			<h5>Technologies I use</h5>
			<ul>
				<li>JavaScript</li>
				<li>React</li>
				<li>HTML</li>
				<li>CSS</li>
				<li>PHP</li>
				<li>WordPress</li>
			</ul>
			<h5>Design tools</h5>
			<ul>
				<li>Adobe Photoshop</li>
				<li>Adobe Illustrator</li>
				<li>Figma</li>
			</ul>
			<h5>Video editing</h5>
			<ul><li>Adobe Premiere</li></ul>
			<br /><br />
			<h5>Currently living in Tallinn, Estonia</h5>
			<Map locations={locations} mapCoordinates={coordinates} />
		</div>
	)
}

export default AboutMe