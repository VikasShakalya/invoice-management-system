import axios from './axiosInstance';

export const getUsers = async () => {
  try {
    const response = await axios.get('/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post('/users/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`/users/${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`/users/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};