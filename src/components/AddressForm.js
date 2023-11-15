// AddressForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddressForm.css';

const AddressForm = ({logsss}) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [state, setState] = useState('');
  const [mobile, setMobile] = useState('');

  const history = useNavigate();

  const handleProceedToCheckout = () => {
    try {
      if (!name || !area || !city || !pin || !state || !mobile) {
        toast.error('Please fill in all fields.');
        return;
      }
  
      toast.success('Order successfully placed!');
      localStorage.removeItem('products');
      history("/");
      logsss(name);
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('An error occurred during checkout.');
    }
  };
  

  return (
    <div className="address-form-container">
      <h2>Enter Your Address</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddressForm;
