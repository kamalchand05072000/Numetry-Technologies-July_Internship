import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FormComponent from './FormComponent';
import ViewLocalStorage from './ViewLocalStorage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/view-localstorage" element={<ViewLocalStorage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
