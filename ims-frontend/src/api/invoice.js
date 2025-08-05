import axios from './axiosInstance';

export const getInvoices = async () => {
  try {
    const response = await axios.get('/invoices/');
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoice = async (id) => {
  try {
    const response = await axios.get(`/invoices/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice ${id}:`, error);
    throw error;
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post('/invoices/', invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(`/invoices/${id}/`, invoiceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating invoice ${id}:`, error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    await axios.delete(`/invoices/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error deleting invoice ${id}:`, error);
    throw error;
  }
};

export const getInvoiceStats = async () => {
  try {
    const response = await axios.get('/invoices/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice stats:', error);
    throw error;
  }
};