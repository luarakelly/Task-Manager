import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Pages/Nav/Sidebar';
import Home from './Pages/Home';
import Tasks from './Pages/AllTasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app-container">
      <Router>
        <div>
        <Sidebar onSave={addTask}/>
        <Routes>
          <Route path='/'element={<Home />}/>
          <Route path='/tasks'element={<Tasks data={tasks} onSave={addTask}/>}/>
          <Route path='*' element={<div>404 Not Found</div>}/>
        </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

