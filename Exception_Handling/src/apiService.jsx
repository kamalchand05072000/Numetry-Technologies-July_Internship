import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleException(error);
    throw error; 
  }
};

const handleException = (error) => {
  if (error.response) {
    console.error('Error Response:', error.response);
    switch (error.response.status) {
      case 400:
        console.error('Bad Request');
        break;
      case 401:
        console.error('Unauthorized');
        break;
      case 404:
        console.error('Not Found');
        break;
      case 500:
        console.error('Internal Server Error');
        break;
      default:
        console.error('An unexpected error occurred');
    }
  } else if (error.request) {
    console.error('Error Request:', error.request);
  } else {
    console.error('Error Message:', error.message);
  }
};
