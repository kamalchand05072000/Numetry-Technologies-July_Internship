import React, { useState, useEffect } from 'react';
import './ViewLocalStorage.css';

const ViewLocalStorage = () => {
  const [storedData, setStoredData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    setStoredData(data);
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditData(storedData[index]);
  };

  const handleUpdate = (index) => {
    const updatedData = [...storedData];
    updatedData[index] = editData;
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setStoredData(updatedData);
    setIsEditing(null);
  };

  const handleDelete = (index) => {
    const updatedData = storedData.filter((_, i) => i !== index);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setStoredData(updatedData);
  };

  return (
    <div className="view-localstorage">
      <h2>Stored Data From LocalStorage</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storedData.map((item, index) => (
            <tr key={index}>
              {isEditing === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={editData.password}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(index)}>Update</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLocalStorage;
