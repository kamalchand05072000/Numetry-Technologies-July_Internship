import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, mobile, dob };
    let storedData = JSON.parse(localStorage.getItem('peopleData')) || [];
    storedData.push(data);
    localStorage.setItem('peopleData', JSON.stringify(storedData));
    navigate('/dashboard');
  };

  return (
    <div className='form-container'>
      <p className='paragraph'>Enter Details Here</p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email Address:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Enter Mobile:
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </label>
        <label>
          Enter DOB:
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
