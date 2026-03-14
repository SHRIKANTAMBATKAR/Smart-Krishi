import axios from 'axios';

// Helper: convert File to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data:image/...;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const predictDisease = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('/api/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000,
    });

    return {
      crop: response.data.crop,
      disease: response.data.disease,
      confidence: `${response.data.confidence}%`,
      treatment: response.data.treatment,
      description: response.data.description,
      prevention: response.data.prevention,
      symptoms: response.data.symptoms
    };
  } catch (error) {
    console.error('Disease Detection API Error:', error);
    throw new Error(error?.response?.data?.error || error.message || 'Failed to analyze image. Please try again.');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Login failed');
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post('/api/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Registration failed');
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post('/api/contact', formData);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Failed to submit form');
  }
};

// Perenual API for disease information
const PERENUAL_API_KEY = 'sk-37Lh69ae89c913d6b15299';
const PERENUAL_BASE_URL = 'https://perenual.com/api';

export const fetchDiseases = async (page = 1) => {
  try {
    const response = await axios.get(`${PERENUAL_BASE_URL}/pest-disease-list`, {
      params: {
        key: PERENUAL_API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Perenual API Error:', error);
    throw new Error('Failed to fetch disease data. Please try again.');
  }
};

export const searchDiseases = async (query, page = 1) => {
  try {
    const response = await axios.get(`${PERENUAL_BASE_URL}/pest-disease-list`, {
      params: {
        key: PERENUAL_API_KEY,
        q: query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Perenual API Error:', error);
    throw new Error('Failed to search diseases. Please try again.');
  }
};

export default {
  predictDisease,
  fetchDiseases,
  searchDiseases,
  loginUser,
  registerUser,
  submitContactForm
};