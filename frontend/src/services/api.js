import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getFoodTrucks = async (lat, lon, radius) => {
  try {
    const response = await axios.get(`${API_URL}/foodtrucks`, {
      params: { lat, lon, radius }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching food trucks:', error);
    throw error;
  }
};