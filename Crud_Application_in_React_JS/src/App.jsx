import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Form from './Form';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <Router>
      <div className="container">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="fullscreen-content">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard openSidebar={openSidebar} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
