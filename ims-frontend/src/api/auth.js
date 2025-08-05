import axios from './axiosInstance';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/token/', {
      username,
      password,
    });
    
    if (response.data && response.data.access && response.data.refresh) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('username', username);
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  window.location.href = '/login';
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post('/token/refresh/', {
      refresh: refreshToken,
    });
    
    localStorage.setItem('accessToken', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    logoutUser();
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};