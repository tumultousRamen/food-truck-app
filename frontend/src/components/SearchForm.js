import React, { useState } from 'react';

function SearchForm({ setUserLocation, setRadius }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [localRadius, setLocalRadius] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
    setRadius(localRadius);
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      alert("Geolocation is not available in your browser.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" required />
      <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" required />
      <input type="number" value={localRadius} onChange={(e) => setLocalRadius(e.target.value)} placeholder="Radius (km)" required />
      <button type="submit">Search</button>
      <button type="button" onClick={handleUseCurrentLocation}>Use Current Location</button>
    </form>
  );
}

export default SearchForm;