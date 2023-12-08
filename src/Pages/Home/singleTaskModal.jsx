import { useState } from "react";
import TaskDetails from './TaskDetails';
import { FaTimes, FaEdit } from 'react-icons/fa';

export default function SingleTaskModal({ onClose, onUpdate, data, index }) {
  const { title, details, day } = data;

  const [tasks, setTasks] = useState(details); // Initialize tasks state with details array
  const [editMode, setEditMode] = useState(false);
  const [updatedStep, setUpdatedStep] = useState("");

  const editStep = (stepIndex) => {
    setEditMode(stepIndex);
    setUpdatedStep(tasks[stepIndex].step); // Set the initial value for the updatedStep
  };

  const saveStep = (stepIndex) => {
    setTasks((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[stepIndex].step = updatedStep;
      return newDetails;
    });
    setEditMode(false);
  };

  const deleteStep = (stepIndex) => {
    setTasks((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails.splice(stepIndex, 1);
      return newDetails;
    });
    setEditMode(false);
  };

  const handleUpdateTask = () => {
    console.log(data)
    // Check if data.tasks is defined before accessing it
    if (data) {
      // How I do not have a backend, we need this step to improvise a simulation with a JSON file
      const updatedData = {
        ...data,
        tasks: data.details.map((step, i) => (i === index ? { title, details: tasks, day } : step)),
      };
      // 1. Send an update request to the backend
      fetch('../../data/tasks.json', {
        method: 'PUT', // Use 'PUT' to simulate an update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json())
        .then(data => console.log('Data updated:', data))
        .catch(error => console.error('Error updating data:', error));
  
      // 2. Update the view by triggering the onUpdate function in the parent component
      onUpdate({ title, details: tasks, day });
      // 3. Close the modal
      onClose();
    } else {
      console.error("data is undefined");
      // You may want to handle this case accordingly, e.g., show an error message or return early
    }
  };  

  return (
    <div className='modal'>
      <div className='single--task'>
        <div className='task--title'>
          <h3>{title} </h3>
        </div>
        {tasks && tasks.map((step, index) => (
          <span className='icons' key={index}>
            {editMode === index ? (
              <input
                type="text"
                value={updatedStep}
                onChange={(e) => setUpdatedStep(e.target.value)}
              />
            ) : (
              <TaskDetails data={step} index={index} />
            )}
            <button onClick={() => editStep(index)}><FaEdit /></button>
            <button onClick={() => deleteStep(index)}><FaTimes /></button>
            {editMode === index && (
              <button onClick={() => saveStep(index)}>Save</button>
            )}
          </span>
        ))}
        <p>Deadline to conclude this task: {day}</p>
        <button onClick={handleUpdateTask}>Update Task</button>
      </div>
    </div>
  );
}
