import { useState } from "react";
import { FaTimes } from 'react-icons/fa';

export default function SingleTaskModal({ onClose, onUpdate, data, index }) {
  const { title, details, day } = data;

  // Initialize tasks state with the entire task data
  const [taskData, setTaskData] = useState({
    title,
    details: [...details], // Copy the details array
    day,
  });

  const [editMode, setEditMode] = useState(true); // Initially set to edit mode

  const deleteStep = (id, e) => {
    e.preventDefault();
    setTaskData((prevData) => {
      const newData = { ...prevData };
      newData.details = newData.details.filter((i) => i.id !== id);
      return newData;
    });
  };

  const saveTask = () => {
    if (data) {
      // Simulate an update request to the backend (replace with actual API call)
      fetch('../../data/tasks.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskData }),
      })
        .then(response => response.json())
        .then(data => console.log('Data updated:', data))
        .catch(error => console.error('Error updating data:', error));

      onUpdate({ title: taskData.title, details: taskData.details, day: taskData.day });
      onClose();
    } else {
      console.error("data is undefined");
    }
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  return (
    <form className='modalForm'>
      <div className='single--task'>
        <div className='task--title'>
          <label htmlFor="title">Task Title: </label>
          {editMode ? (
            // Edit mode: Display input field
            <input
              id="title"
              name="title"
              type="text"
              placeholder={taskData.title}
              value={taskData.title}
              onChange={(e) => setTaskData((prevData) => ({ ...prevData, title: e.target.value }))}
            />
          ) : (
            // Preview mode: Display plain text
            <span>{taskData.title}</span>
          )}
        </div>
        <p>Tipe: <br /> Break your task into small steps; this way, it is easier to get it done!</p>
        {taskData.details.map((step, index) => (
          <div className="step--container--btn" key={index}>
            <div className="step--container">
              <div className="step">
                {/* Step Label and Input */}
                <label htmlFor={`step${index}`}>Step {index + 1}: </label>
                {editMode ? (
                  // Edit mode: Display input field
                  <input
                    id={`step${index}`}
                    name={`step${index}`}
                    type="text"
                    placeholder={step.step}
                    value={taskData.details[index].step}
                    onChange={(e) => {
                      setTaskData((prevData) => {
                        const newDetails = [...prevData.details];
                        newDetails[index].step = e.target.value;
                        return { ...prevData, details: newDetails };
                      });
                    }}
                  />
                ) : (
                  // Preview mode: Display plain text
                  <span>{taskData.details[index].step}</span>
                )}
              </div>
              <div className="date">
                {/* Date Label and Input */}
                <label htmlFor={`date${index}`}>Estimate how long this step will take and set a day for it: </label>
                {editMode ? (
                  // Edit mode: Display input field
                  <input
                    id={`date${index}`}
                    name={`date${index}`}
                    type="text"
                    placeholder={step.date}
                    value={taskData.details[index].date}
                    onChange={(e) => {
                      setTaskData((prevData) => {
                        const newDetails = [...prevData.details];
                        newDetails[index].date = e.target.value;
                        return { ...prevData, details: newDetails };
                      });
                    }}
                  />
                ) : (
                  // Preview mode: Display plain text
                  <span>{taskData.details[index].date}</span>
                )}
              </div>
              {/* Delete Step Button */}
              <button onClick={(e) => deleteStep(step.id, e)}><FaTimes /></button>
            </div>
            <div className='task--final--deadline'>
              {/* Final Deadline Label and Input */}
              <label htmlFor="deadline">Final deadline to conclude this task: </label>
              {editMode ? (
                // Edit mode: Display input field
                <input
                  id="deadline"
                  name="deadline"
                  type="text"
                  placeholder={taskData.day}
                  value={taskData.day}
                  onChange={(e) => setTaskData((prevData) => ({ ...prevData, day: e.target.value }))}
                />
              ) : (
                // Preview mode: Display plain text
                <span>{taskData.day}</span>
              )}
            </div>
          </div>
        ))}
        <button onClick={(e) => toggleEditMode(e)}>{editMode ? 'Preview' : 'Edit'}</button>
        <button onClick={saveTask}>Save Task</button>
      </div>
    </form>
  );
}

