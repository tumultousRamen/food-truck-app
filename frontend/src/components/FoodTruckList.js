import React from 'react';

function FoodTruckList({ foodTrucks }) {
    console.log('Rendering FoodTruckList with:', foodTrucks);
    return (
      <div className="food-truck-list">
        <h2>Nearby Food Trucks</h2>
        {foodTrucks.length === 0 ? (
          <p>No food trucks found nearby.</p>
        ) : (
          <ul>
            {foodTrucks.map((truck) => (
              <li key={truck._id}>
                <h3>{truck.Applicant}</h3>
                <p>Distance: {truck.distance.toFixed(2)} km</p>
                <p>Address: {truck.Address}</p>
                <p>Food Items: {truck.FoodItems}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  export default FoodTruckList;