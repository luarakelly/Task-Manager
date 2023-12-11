import React, { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState({
    title: '',
    details: [{
      step: '',
      data: '',
    }],
    day: '',
    remainder: false,
  });

  const handleInputChange = (field, value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleDetailsChange = (index, field, value) => {
    setNewTask((prevTask) => {
      const updatedDetails = [...prevTask.details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [field]: value,
      };

      return {
        ...prevTask,
        details: updatedDetails,
      };
    });
  };

  const saveTask = () => {
    onAdd({
      title: newTask.title,
      details: newTask.details,
      day: newTask.day,
      remainder: newTask.remainder,
    });
    console.log(newTask);
  };

  return (
    <form className='add--task--form'>
      <div className='form--control'>
        <label htmlFor="task--title"> Task Title: </label>
        <input
          id='task--title'
          type="text"
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        <p>Type: <br /> Break your task into small steps; this way, it is easier to get it done!</p>
        <label htmlFor="task--details">Step: </label>
        <input
          id='task--details'
          type="text"
          onChange={(e) => handleDetailsChange(0, 'step', e.target.value)}
        />
        <label htmlFor="task--date">Data: </label>
        <input
          id='task--date'
          type="text"
          onChange={(e) => handleInputChange('day', e.target.value)}
        />
        <button className='but'> + </button>
        <label htmlFor="task--deadline">Final Deadline: </label>
        <input
          id='task--deadline'
          type="text"
          onChange={(e) => handleInputChange('remainder', e.target.value)}
        />
        <button onClick={saveTask}>Save Task</button>
      </div>
    </form>
  );
}
