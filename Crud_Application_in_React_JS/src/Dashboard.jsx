import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', dob: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('peopleData')) || [];
    setPeopleData(data);
  }, []);

  const handleDelete = (index) => {
    const updatedData = peopleData.filter((_, i) => i !== index);
    localStorage.setItem('peopleData', JSON.stringify(updatedData));
    setPeopleData(updatedData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(peopleData[index]);
    setAddMode(false);
    setIsSidebarOpen(true); // Open sidebar on edit
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = [...peopleData];
    updatedData[editIndex] = formData;
    localStorage.setItem('peopleData', JSON.stringify(updatedData));
    setPeopleData(updatedData);
    setEditIndex(null);
    setAddMode(false);
    setIsSidebarOpen(false); // Close sidebar after update
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const updatedData = [...peopleData, formData];
    localStorage.setItem('peopleData', JSON.stringify(updatedData));
    setPeopleData(updatedData);
    setFormData({ name: '', email: '', mobile: '', dob: '' });
    setAddMode(false);
    setIsSidebarOpen(false); // Close sidebar after add
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='dashboard-container'>
      <div className='table-div'>
        <button className='btn' onClick={() => { setAddMode(true); toggleSidebar(); }}>Add</button>
        <p className='paragraph1'>Person Detail</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>D.O.B</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {peopleData.map((person, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.mobile}</td>
              <td>{person.dob}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isSidebarOpen && (
        <div className='sidebar'>
          <div className='sidebar-content'>
            <h2>{addMode ? 'Add New Person' : 'Edit Details'}</h2>
            <form onSubmit={addMode ? handleAdd : handleUpdate}>
              <label>
                Enter Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Email Address:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Enter Mobile:
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
              </label>
              <label>
                Enter DOB:
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </label>
              <button type="submit">{addMode ? 'Add' : 'Update'}</button>
              <button type="button" onClick={() => { setEditIndex(null); setAddMode(false); setIsSidebarOpen(false); }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Dashboard;
