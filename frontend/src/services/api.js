import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getFoodTrucks = async (lat, lon, radius) => {
    try {
      console.log(`Fetching food trucks for lat: ${lat}, lon: ${lon}, radius: ${radius}`);
      const response = await axios.get(`${API_URL}/foodtrucks`, {
        params: { lat, lon, radius }
      });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching food trucks:', error);
      throw error;
    }
  };