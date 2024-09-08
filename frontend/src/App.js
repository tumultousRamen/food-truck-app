import React, { useState, useEffect } from 'react';
import FoodTruckList from './components/FoodTruckList';
import SearchForm from './components/SearchForm';
import Map from './components/Map';
import { getFoodTrucks } from './services/api';
import './styles/App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    if (userLocation) {
      getFoodTrucks(userLocation.latitude, userLocation.longitude, radius)
        .then(setFoodTrucks)
        .catch(console.error);
    }
  }, [userLocation, radius]);

  return (
    <div className="App">
      <h1>Food Truck Finder</h1>
      <SearchForm setUserLocation={setUserLocation} setRadius={setRadius} />
      <div className="content">
        <Map userLocation={userLocation} foodTrucks={foodTrucks} />
        <FoodTruckList foodTrucks={foodTrucks} />
      </div>
    </div>
  );
}

export default App;