import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./Pages/Views/index";

function App() {
  return (
    <div className="app-container">
      <Router>
        <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='*' element={<div>404 Not Found</div>}/>
        </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
