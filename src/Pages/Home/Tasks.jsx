import { useState } from 'react';
import { FaTimes,  FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SingleTaskModal from './singleTaskModal';
import TaskDetails from './TaskDetails';

export default function Tasks({data}) {
  // manage the GET, DELETE and UpDate task fom the user end
  const [tasks, setTasks] = useState(data.tasks || []);
  // manage the visibility of task details
  const [details, setDetails] = useState([]);
  // open modal state
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // state to store the selected task
  const [selectedTask, setSelectedTask] = useState(undefined); 

  // Delete Task
  const deleteTask = (id) => {
    // Use setTasks to update the state and remove the task with the specified id
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id ? true: false));
  };

  //call API to update the detetion in the database

  // Update Task
  const updateTask = (updatedTask, index) => {
    setTasks((prevState) => {
      const newState = [...prevState];
      newState[index] = updatedTask;
      return newState;
    });
  };

  // Toggle details
  const toggleDetails = (index) => {
    setDetails((prevState) => {
        const newState = [...prevState]; //copy current state to not alterate the original detail value
        newState[index] = !newState[index]; // change the current state for the specified index, the empty array is treated as true, then the negation of he value will convert it to false
      return newState;
    });
  };

  // Edit Task
  const editTask = (task, index )=>{
    setSelectedTask({ task, index }); // pass the selected task data 
    setIsModalOpen(true); // Open the modal
  }

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
                    <button onClick={() => editTask(task, index)}><FaEdit/></button>
                    <button onClick={() => deleteTask(task.id)}><FaTimes/></button>
                  </span>
              </div>
              {/* Render details only if detailsVisible is false for the current task */}
              {details[index] && task.details?.map((step, index) => (
                <div key={index}>
                  <TaskDetails data={step} index={index} />
                </div>
              ))}
              <p>Deadline to conclud this task: {task.day}</p>
            </div>
          ))}
        </div>
      : (
      'There is no taks yet'
    )}
    {isModalOpen && selectedTask && (
        <SingleTaskModal
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedTask) => updateTask(updatedTask, selectedTask.index)}
          data={selectedTask.task}
          index={selectedTask.index}
        />
      )}
    </section>
  );
}
