import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZC13aW5rbGVyIiwiYSI6ImNsYWpnenZoMzBkMm4zcW4zN2VvaHQ2MzAifQ.NVRv1o_IVVEO_e4Cx7cRgA';


export default function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(15.971116);
    const [lat, setLat] = useState(45.8);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (

        <div ref={mapContainer} className="map-container" />

    );
}