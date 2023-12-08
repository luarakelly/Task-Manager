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
    setDetails((detailsOpen) => {
        const newDetails = [...detailsOpen]; //if user added neww details 
        newDetails[index] = !newDetails[index]; // Toggle visibility
      return newDetails;
    });
  };

  // Edit Task
  const editTask = ()=>{
    setIsModalOpen(true); // Open the modal
  }

  // Delete Task
  const deleteTask = (id) => {
    // Use setTasks to update the state and remove the task with the specified id
    setTasks((tasks) => tasks.filter((task) => task.id !== id ? true: false));
  };

  return (
    <section className='tasks'>
      <h2>
        <Link to={`/${tasks}`}>Tasks in Progress</Link> 
      </h2>
      {tasks.length > 0 ?
        <div className="task--container">
          {tasks.map((task, index) => (
            <div className='single--task' key={index}>
              <div className='task--title'>
                <h3 onClick={() => toggleDetails(index)}>{task.title} </h3>
                <span className='icons'>
                    <button onClick={() => editTask(task.id)}><FaEdit/></button>
                    <button onClick={() => deleteTask(task.id)}><FaTimes/></button>
                  </span>
              </div>
              {/* Render details only if detailsVisible is true for the current task */}
              {details[index] && task.details?.map((step, index) => (
                <div className='details' key={index}>
                  <ul>
                    <li>
                      {step.step} <br /> {step.date}
                    </li>
                  </ul>
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
