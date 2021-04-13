import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map as MapType } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';
import axios from 'axios';

mapboxgl.accessToken =
	'pk.eyJ1IjoiYXNwaWVjb2RlciIsImEiOiJja25kYWdpMWsxZmwyMm9tcmxwenRmazVuIn0.CFsA0MiNkPyNTas4op_Glw';

const Map = ({ address }: { address: string }): JSX.Element => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		// eslint-disable-next-line prefer-const
		let map: MapType;
		const fetchData = async () => {
			const addressString = new URLSearchParams(address).toString();
			try {
				const { data } = await axios.get(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=AIzaSyD5S52SXFzOSKe_yb3QD0QN8pWJ5vp5hmI`
				);
				const location = data.results[0].geometry.location;
				map.setCenter(new mapboxgl.LngLat(location.lng, location.lat));
				new mapboxgl.Marker()
					.setLngLat(new mapboxgl.LngLat(location.lng, location.lat))
					.addTo(map);
			} catch (err) {
				console.log('Something went wrong');
				console.log(err);
			}
		};

		map = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
		});

		fetchData();

		return () => map?.remove();
	}, []);
	return (
		<div>
			<div className={styles.container} ref={mapContainer} />
		</div>
	);
};

export default Map;
