import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      let storedData = JSON.parse(localStorage.getItem('formData'));
      
      // Ensure storedData is an array
      if (!Array.isArray(storedData)) {
        console.warn('Invalid data in localStorage, resetting...');
        storedData = [];
      }
      
      // Add the new form data to the stored array
      storedData.push(formData);
      
      // Save updated array back to localStorage
      localStorage.setItem('formData', JSON.stringify(storedData));
      
      // Call the onAdd callback if provided
      if (onAdd) onAdd();
      
      // Reset form and errors
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          autoComplete="name" 
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          autoComplete="email" 
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          autoComplete="current-password" 
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default FormComponent;
