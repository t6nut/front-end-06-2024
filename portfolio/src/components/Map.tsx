import L, { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ChangeView from './ChangeView';
import { Location } from '../models/Location';
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapInterface {
	locations: Location[],
	mapCoordinates: {
		lngLat: LatLngExpression,
		zoom: number
	}
}

function Map(props: MapInterface) {

	return (
		<div>

			<MapContainer className='map' center={props.mapCoordinates.lngLat} zoom={props.mapCoordinates.zoom} scrollWheelZoom={false}>
				<ChangeView center={props.mapCoordinates.lngLat} zoom={props.mapCoordinates.zoom} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{props.locations.map(location => 
					<Marker position={[location.coordinates.lng, location.coordinates.lat]}>
						{location.name}
					</Marker>
				)}
			</MapContainer>
		</div>)
}

export default Map; 