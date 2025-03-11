import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function MapComponent({ startCity, endCity, onDistanceCalculated, onFareCalculated }) {
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (startCity && endCity) {
            getDistance();
        }
    }, [startCity, endCity]);

    const fetchCoordinates = async (city) => {
        try {
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    key: '8c57bfd16d8f4ccaab0481d78b9ba7cd',
                    q: city,
                },
            });

            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                return { lat, lng };
            } else {
                throw new Error('City not found');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error.message);
            throw new Error('Failed to fetch coordinates. Please try again.');
        }
    };

    const getDistance = async () => {
        setError(null);
        setDistance(null);
        setRouteCoords([]);

        try {
            const start = await fetchCoordinates(startCity);
            const end = await fetchCoordinates(endCity);

            if (!start || !end) {
                setError('Invalid locations. Please enter valid city names.');
                return;
            }

            setStartCoords(start);
            setEndCoords(end);

            const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
                params: {
                    api_key: '5b3ce3597851110001cf6248d0e7229566e8452486b6757bc3e74be5',
                    start: `${start.lng},${start.lat}`,
                    end: `${end.lng},${end.lat}`,
                },
            });

            const distanceInKm = response.data.features[0].properties.segments[0].distance / 1000;
            setDistance(distanceInKm);
            onDistanceCalculated(distanceInKm);

            const route = response.data.features[0].geometry.coordinates.map(([lng, lat]) => ({
                lat,
                lng,
            }));
            setRouteCoords(route);
        } catch (error) {
            console.error('Error calculating distance:', error.message);
            setError(error.message || 'Error calculating distance. Please try again.');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {startCoords && (
                    <Marker position={[startCoords.lat, startCoords.lng]}>
                        <Popup>Start: {startCity}</Popup>
                    </Marker>
                )}

                {endCoords && (
                    <Marker position={[endCoords.lat, endCoords.lng]}>
                        <Popup>End: {endCity}</Popup>
                    </Marker>
                )}

                {routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} color="blue" />
                )}
            </MapContainer>
        </div>
    );
}