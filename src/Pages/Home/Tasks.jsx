import { useState } from 'react';
import { FaTimes,  FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SingleTaskModal from './singleTaskModal';

export default function Tasks({data}) {
  // manage the visibility of task details
  const [details, setDetails] = useState([]);
  // manage the tasks delete
  const [tasks, setTasks] = useState(data.tasks || []);
  // Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Toggle details
  const toggleDetails = (index) => {
    setDetails((detailsActive) => {
        const newDetails = [...detailsActive]; //if user add neww details 
        newDetails[index] = !newDetails[index]; // Toggle visibility
      return newDetails;
    });
  };

  // Edit Task

  // Delete Task
  const deleteTask = (id) => {
    // Use setTasks to update the state and remove the task with the specified id
    setTasks((tasks) => tasks.filter((task) => task.id !== id ? true: false));
  };

  // edit single Task
  const editStep = ()=>{
    setIsModalOpen(true); // Open the modal
  }
  // edit single Task
  const deleteStep = (stepId, stepIndex) => {
    setTasks((details) =>
    details.map((step) => {
        if (step.id === stepId) {
          const newDetails = step.details.filter((_, index) => index !== stepIndex ? true: false);
          return { ...step, details: newDetails };
        }
        return step;
      })
    );
  };

  return (
    <section className='tasks'>
      <h2>Tasks in Progress</h2>
      {tasks.length > 0 ?
        <div className="task--container">
          {tasks.map((task, index) => (
            <div className='single--task' key={index}>
              <div className='task--title' onClick={() => toggleDetails(index)}>
                <Link to={`/${task.id}`}><h3>{task.title} </h3></Link>
                <button className='btn' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
              {/* Render details only if detailsVisible is true for the current task */}
              {details[index] && task.details?.map((step, index) => (
                <div className='details' key={index}>
                  <ul>
                    <li>
                      {step.step} <br /> {step.date}
                    </li>
                  </ul>
                  <span className='icons'>
                    <FaEdit onClick={() => editStep(step.id, index)} />
                    <FaTimes onClick={() => deleteStep(step.id, index)} />
                  </span>
                </div>
              ))}
              <p>Deadline to conclud this task: {task.day}</p>
            </div>
          ))}
        </div>
      : (
      'There is no taks yet'
    )}
    {isModalOpen && <SingleTaskModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
