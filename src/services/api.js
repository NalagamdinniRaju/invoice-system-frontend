import axios from 'axios';

const API_URL = 'https://invoice-system-backend-3utn.onrender.com/api';

export const downloadInvoice = async (invoiceId) => {
  const response = await axios.get(`${API_URL}/invoices/${invoiceId}/download`, {
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invoice-${invoiceId}.pdf`);
  document.body.appendChild(link);
  link.click();
};

export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const generateSampleInvoice = async (userId) => {
    try {
      const response = await axios.post(`${API_URL}/invoices/generate`, {
        userId,
        planDetails: "Sample Premium Plan",
        amount: 1000
      });
      return response.data;
    } catch (error) {
      console.error('Invoice generation error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const getInvoices = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/invoices/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch invoices error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };