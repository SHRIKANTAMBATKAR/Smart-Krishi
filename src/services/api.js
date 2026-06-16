import axios from 'axios';

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Normalize URL: Remove trailing slash if it exists to prevent double slashes like //api/contact
if (API_BASE_URL.endsWith('/')) {
  API_BASE_URL = API_BASE_URL.slice(0, -1);
}

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

    const response = await axios.post(`${API_BASE_URL}/api/predict`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // 60 sec — Render free tier can take up to 60s to respond
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
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Login failed');
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Registration failed');
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
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

export const fetchWeatherAlerts = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/weather`, {
      params: { lat, lon },
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw new Error(error?.response?.data?.error || 'Failed to fetch weather data.');
  }
};

export const geocodeCity = async (cityName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/geocode`, {
      params: { city: cityName },
      timeout: 8000,
    });
    return response.data;
  } catch (error) {
    console.error('Geocode API Error:', error);
    throw new Error('Failed to search for city.');
  }
};

/**
 * Send a one-time weather alert email to the given address.
 * The backend fetches current weather for lat/lon, runs the condition engine,
 * and emails medium/high severity alerts to the address.
 */
export const sendWeatherAlertEmail = async (email, lat, lon, locationName) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/weather/send-alert`,
      { email, lat, lon, locationName },
      { timeout: 20000 }
    );
    return response.data; // { sent, alerts_count, message }
  } catch (error) {
    console.error('Send Weather Alert Email Error:', error);
    throw new Error(error?.response?.data?.error || 'Failed to send weather alert email.');
  }
};

/** Subscribe user to automatic weather alert emails (stored in DB, checked every 30 min). */
export const subscribeWeatherAlerts = async (email, lat, lon, locationName) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/weather/subscribe`,
      { email, lat, lon, locationName },
      { timeout: 15000 }
    );
    return response.data; // { subscribed, message }
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Failed to subscribe to auto-alerts.');
  }
};

/** Unsubscribe user from automatic weather alert emails. */
export const unsubscribeWeatherAlerts = async (email) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/weather/subscribe`,
      { data: { email }, timeout: 15000 }
    );
    return response.data; // { subscribed: false, message }
  } catch (error) {
    throw new Error(error?.response?.data?.error || 'Failed to unsubscribe from auto-alerts.');
  }
};

/** Check if a user has an active auto-alert subscription. */
export const getWeatherSubscriptionStatus = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/weather/subscription`, {
      params: { email },
      timeout: 10000,
    });
    return response.data; // { subscribed, location_name, last_alerted_at, cooldown_remaining_min, ... }
  } catch (error) {
    return { subscribed: false }; // Fail gracefully
  }
};

export default {
  predictDisease,
  fetchDiseases,
  searchDiseases,
  loginUser,
  registerUser,
  submitContactForm,
  fetchWeatherAlerts,
  geocodeCity,
  sendWeatherAlertEmail,
  subscribeWeatherAlerts,
  unsubscribeWeatherAlerts,
  getWeatherSubscriptionStatus,
};