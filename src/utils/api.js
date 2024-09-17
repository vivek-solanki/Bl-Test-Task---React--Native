import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://fakestoreapi.com';

// Create an axios instance with the base URL
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Function to fetch products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

