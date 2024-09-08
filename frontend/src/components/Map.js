import React from 'react';

function Map({ userLocation, foodTrucks }) {
  return (
    <div className="map-placeholder">
      <h2>Map</h2>
      <p>User Location: {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Not set'}</p>
      <p>Number of Food Trucks: {foodTrucks.length}</p>
      {/*  */}
    </div>
  );
}

export default Map;