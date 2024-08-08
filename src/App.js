
import React, { useState, useEffect } from 'react';
import Registration from './components/Registration';
import InvoiceList from './components/InvoiceList';
import { getInvoices } from './services/api';
import './styles/styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoices(user._id);
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  const handleRegistration = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Invoice System</h1>
        {!user ? (
          <Registration onRegister={handleRegistration} />
        ) : (
          <InvoiceList invoices={invoices} />
        )}
      </div>
    </div>
  );
}

export default App;