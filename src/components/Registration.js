
import React, { useState } from 'react';
import { registerUser,generateSampleInvoice  } from '../services/api';

const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [error, setError] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await registerUser({ name, email, gstNumber });
      console.log('User registered:', userData);
      
      // Generate a sample invoice for the new user
      try {
        const invoiceData = await generateSampleInvoice(userData._id);
        console.log('Sample invoice generated:', invoiceData);
      } catch (invoiceError) {
        console.error('Failed to generate sample invoice:', invoiceError);
        // Continue with registration even if invoice generation fails
      }
      
      onRegister(userData);
    } catch (error) {
        console.error('Registration error:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gstNumber">GST Number:</label>
          <input
            type="text"
            id="gstNumber"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Registration;