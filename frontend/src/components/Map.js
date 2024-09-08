import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map({ userLocation, foodTrucks }) {
  const center = userLocation 
    ? [userLocation.latitude, userLocation.longitude] 
    : [37.7749, -122.4194]; // Default to San Francisco

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {foodTrucks.map((truck) => (
          <Marker 
            key={truck._id} 
            position={[parseFloat(truck.Latitude), parseFloat(truck.Longitude)]}
          >
            <Popup>
              <div>
                <h3>{truck.Applicant}</h3>
                <p>{truck.FoodItems}</p>
                <p>Distance: {truck.distance.toFixed(2)} km</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;