import { useState } from "react";
import TaskDetails from './TaskDetails';
import { FaTimes, FaEdit } from 'react-icons/fa';

export default function SingleTaskModal({ onClose, onUpdate, data, index }) {
  const { title, details, day } = data;

  const [steps, setSteps] = useState(details); // Initialize tasks state with details array
  const [editMode, setEditMode] = useState(false);
  const [updatedStep, setUpdatedStep] = useState("");

  const editStep = (stepIndex) => {
    setEditMode(stepIndex);
    setUpdatedStep(steps[stepIndex].step); // Set the initial value for the updatedStep with the previous value that the user selected to change
  };

  const updateStep = (stepIndex) => {
    setSteps((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[stepIndex].step = updatedStep;
      return newDetails;
    });
    setEditMode(false);
  };

  const deleteStep = (stepIndex) => {
    setSteps((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails.splice(stepIndex, 1);
      return newDetails;
    });
    setEditMode(false);
  };

  const saveTask = () => {
    // Check if data.tasks is defined before accessing it
    if (data) {
      // How I do not have a backend, we need this step to improvise a simulation with a JSON file
      const updatedData = {
        ...data,
        tasks: data.details.map((step, i) => (i === index ? { title, details: steps, day } : step)),
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
      onUpdate({ title, details: steps, day });
      // 3. Close the modal
      onClose();
    } else {
      console.error("data is undefined");
      // You may want to handle this case accordingly, e.g., show an error message or return early
    }
  };  

  return (
    <div className='modalForm'>
      <div className='single--task'>
        <div className='task--title'>
          <h3>{title} </h3>
        </div>
        {steps && steps.map((step, index) => (
          <span className='icons' key={index}>
            {editMode === index ? (
              <input
                type="text"
                value={updatedStep}
                onChange={(e) => setUpdatedStep(e.target.value)} // updating the state variablewith the uer input
              />
            ) : (
              <TaskDetails data={step} index={index} />
            )}
            <button onClick={() => editStep(index)}><FaEdit /></button>
            <button onClick={() => deleteStep(index)}><FaTimes /></button>
            {editMode === index && (
              <button onClick={() => updateStep(index)}>Save</button>
            )}
          </span>
        ))}
        <p>Deadline to conclude this task: {day}</p>
        <button onClick={saveTask}>Update Task</button> 
      </div>
    </div>
  );
}


_____________________________________


import { useState } from "react";
import TaskDetails from './TaskDetails';
import { FaTimes } from 'react-icons/fa';

export default function SingleTaskModal({ onClose, onUpdate, data, index }) {
  const { title, details, day } = data;

  const [tasks, setTasks] = useState(data); // Initialize tasks state with details array
  
  const [updateTitle, setUpdatedTitle] = useState(title);
  const [updateStep, setUpdatedStep] = useState([...details]);
  const [updateDay, setUpdatedDay] = useState(day);
  const [editMode, setEditMode] = useState(true);
  const [previewMode, setPreviewMode] = useState(true);

  const deleteStep = (index) => {
    setTasks((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const editDetails = (index) => {
    setPreviewMode(false);
    setUpdatedStep(details.step.map(step => ({ ...step }))); // Set the initial value for the updatedStep with the previous value that the user selected to change
    setUpdatedStep(details.date.map(date => ({ ...date }))); // Set the initial value for the updatedStep with the previous value that the user selected to change
  };

  const updateTask = (index) => {
    setTasks((prevData) => {
      const newData = { ...prevData }; // Use object spread for copying
      console.log(newData)
      newData.title = updateTitle;
      newData.details[index] = updateStep;
      newData.day = updateDay;
      console.log('new data:',newData)
      return newData;
    });
    setPreviewMode(true);
    setEditMode(!editMode);
  };

 // const addStep = ()=>{}

  const saveTask = () => {
    // Check if data.tasks is defined before accessing it
    if (data) {
      // How I do not have a backend, we need this step to improvise a simulation with a JSON file
      const updatedData = {
        ...data,
        tasks: data.details.map((step, i) => (i === index ? { title, details: step, day } : step)),
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
      onUpdate({ title, details:updateStep, day });
      // 3. Close the modal
      onClose();
    } else {
      console.error("data is undefined");
      // You may want to handle this case accordingly, e.g., show an error message or return early
    }
  };  

  return (
    <form className='modalForm'>
      {editMode ? (
      <div className='single--task'>
        <div className='task--title'>
        <label htmlFor="title">Task Title: </label>
        <input
              id="title"
              name="title"
              type="text"
              placeholder={tasks.title}
              value={updateTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)} // updating the state variablewith the uer input
            />
        </div>
        <p>Tipe: <br /> Break your task in small steps, this way it is easier to get it done!</p>
        {tasks && tasks.details.map((step, index)=> (
          <div className="step--container--btn" key={index}>
            
              <div className="step--container">
                <div className="step">
                  <label htmlFor={`step${index}`}>Step {index + 1}: </label>
                  <input
                    id={`step${index}`}
                    name={`step${index}`}
                    type="text"
                    placeholder={step.step}
                    value={updateStep[index].step}
                    onChange={//update each element individually.
                      (e) => {
                        const newUpdateStep = [...updateStep];
                        newUpdateStep[index].step = e.target.value;
                        setUpdatedStep(newUpdateStep);} 
                  }
                  />
                </div>
                <div className="date">
                  <label htmlFor="date">Estimate how long this step will take and set a day for it: </label>
                  <input
                    id={`date${index}`}
                    name={`date${index}`}
                    type="text"
                    placeholder={step.date}
                    value={updateStep[index].date}
                    onChange={//update each element individually.
                      (e) => {
                        const newUpdateStep = [...updateStep];
                        newUpdateStep[index].date = e.target.value;
                        setUpdatedStep(newUpdateStep);} 
                  }
                  />
                </div>
                <button onClick={() => deleteStep(index)}><FaTimes /></button>
                <p>Final deadline to conclude this task: {day}</p>
              </div>           
          </div>
        ))}        
      </div>
      ) : (
        <div className='single--task'>
        <div className='task--title'>
          <h3>{title} </h3>
        </div>
        {details && details.map((step, index) => (
          <span className='icons' key={index}>

              <TaskDetails data={step} index={index} />
          </span>
        ))}
        <p>Deadline to conclude this task: {day}</p>
      </div>     
        )
      }
      <button onClick={ () => updateTask(index)} >Preview</button>
      <button onClick={() => editDetails(index)} >Edit</button>
      <button onClick={saveTask}>Save Task</button>
    </form>
  );
}
_____________________________________________________________-


const updateTask = (index) => {
  setTasks((prevData) => {
    const newData = { ...prevData }; // Use object spread for copying
    newData.title = updateTitle;
    newData.details[index] = updateStep;
    newData.day = updateDay;
    return newData;
  });
};

_____________________________________________________________________

import { useState } from "react";
//import TaskDetails from './TaskDetails';
import { FaTimes } from 'react-icons/fa';

export default function SingleTaskModal({ onClose, onUpdate, data, index }) {
  const { title, details, day } = data;

  const [tasks, setTasks] = useState(data); // Initialize tasks state with details array
  
  const [updateTitle, setUpdatedTitle] = useState(title);
  const [updateStep, setUpdatedStep] = useState([...details]);
  const [updateDay, setUpdatedDay] = useState(day);


  const deleteStep = (index, e) => {
    e.preventDefault(); // Prevent form submission
    setTasks((prevData) => {
      const newData = { ...prevData };
      newData.details = [...newData.details]; // Create a new array to avoid mutating the original state
      newData.details.splice(index, 1);
      console.log(newData);
      return newData;
    });
  };


  // const updateTask = (index) => {
  //   setTasks((prevData) => {
  //     return {
  //       ...prevData,
  //       title: updateTitle,
  //       details: prevData.details.map((step, i) => (i === index ? { step: updateStep[i].step, date: updateStep[i].date } : step)),
  //       day: updateDay,
  //     };
  //   });
  // };

 // const addStep = ()=>{}

  const saveTask = () => {
    // Check if data.tasks is defined before accessing it
    if (data) {
      // How I do not have a backend, we need this step to improvise a simulation with a JSON file
      const updatedData = {
        ...data,
        tasks: data.details.map((step, i) => (i === index ? { title, details: step, day } : step)),
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
      onUpdate({ title:updateTitle, details:updateStep, day:updateDay });
      // 3. Close the modal
      onClose();
    } else {
      console.error("data is undefined");
      // You may want to handle this case accordingly, e.g., show an error message or return early
    }
  };  

  return (
    <form className='modalForm'>
      <div className='single--task'>
        <div className='task--title'>
        <label htmlFor="title">Task Title: </label>
        <input
              id="title"
              name="title"
              type="text"
              placeholder={tasks.title}
              value={updateTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)} // updating the state variablewith the uer input
            />
        </div>
        <p>Tipe: <br /> Break your task in small steps, this way it is easier to get it done!</p>
        {tasks && tasks.details.map((step, index)=> (
          <div className="step--container--btn" key={index}>
            
              <div className="step--container">
                <div className="step">
                  <label htmlFor={`step${index}`}>Step {index + 1}: </label>
                  <input
                    id={`step${index}`}
                    name={`step${index}`}
                    type="text"
                    placeholder={step.step}
                    value={updateStep[index].step}
                    onChange={//update each element individually.
                      (e) => {
                        const newUpdateStep = [...updateStep];
                        newUpdateStep[index].step = e.target.value;
                        setUpdatedStep(newUpdateStep);} 
                  }
                  />
                </div>
                <div className="date">
                  <label htmlFor="date">Estimate how long this step will take and set a day for it: </label>
                  <input
                    id={`date${index}`}
                    name={`date${index}`}
                    type="text"
                    placeholder={step.date}
                    value={updateStep[index].date}
                    onChange={//update each element individually.
                      (e) => {
                        const newUpdateStep = [...updateStep];
                        newUpdateStep[index].date = e.target.value;
                        setUpdatedStep(newUpdateStep);} 
                  }
                  />
                </div>
                <button onClick={(e) => deleteStep(index, e)}><FaTimes /></button>
              </div>
              <div className='task--final--deadline'>
              <label htmlFor="deadline">Final deadline to conclude this task: </label>
              <input
              id="deadline"
              name="deadline"
              type="text"
              placeholder={day}
              value={updateDay}
              onChange={(e) => setUpdatedDay(e.target.value)} // updating the state variablewith the uer input
              />
              </div>
          </div>
          
        ))}
        
        <button onClick={saveTask}>Save Task</button> 
               
      </div>
    </form>
  );
}
