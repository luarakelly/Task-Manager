import { useState } from 'react';
import { FaTimes,  FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SingleTaskModal from './singleTaskModal';
import TaskDetails from './TaskDetails';
import AddTaskForm from './AddTaskForm';

export default function Tasks({data}) {
  // manage the GET, DELETE and UpDate task fom the user end
  const [tasks, setTasks] = useState(data.tasks || []);
  // manage the visibility of task details
  const [isDetailsVisible, setIsDetailsVisible] = useState([]);
  // open modal state
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // state to store the selected task to show in the model
  const [selectedTask, setSelectedTask] = useState(undefined); 
  // state to show or not the add form
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Delete Task
  const deleteTask = (id) => {
    // Use setTasks to update the state and remove the task with the specified id
    setTasks((prevData) => prevData.filter((item) => item.id !== id ? true: false));
  };

  //call API to update the deletion in the database, use useEffect hook

  // Update Task
  const updateTask = (updatedTask, index) => {
    setTasks((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedTask;
      return newData;
    });
  };

  // Toggle details
  const toggleDetails = (index) => {
    setIsDetailsVisible((prevData) => {
        const newData = [...prevData]; //copy current state to not alterate the original detail value
        newData[index] = !newData[index]; // change the current state for the specified index, the empty array is treated as true, then the negation of he value will convert it to false
      return newData;
    });
  };

  // Edit Task
  const editTask = (task, index )=>{
    setSelectedTask({ task, index }); // pass the selected task data 
    setIsModalOpen(true); // Open the modal
  }

  const createTask = () => {
    setIsAddFormOpen(true)
  }

  const addTask = (newTask) => {
    console.log(newTask)
    setTasks((prevData) => {
      return [...prevData, {id: Date.now(), ...newTask }] ;
  });
  };
  
  return (
    <section className='tasks'>
      <header className="header">
      <button className="btn btn-outline" onClick={createTask}> Create a Task!</button>
      <img src="./imgs/header/plan-make.jpg" alt="title" />
      {isAddFormOpen && (
        <AddTaskForm onAdd={(newTask) => addTask(newTask)}/>
      )}
      </header>
      <h2>
        <Link to={`/${tasks}`}>Task manager</Link> 
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
              {isDetailsVisible[index] && task.details?.map((step, index) => (
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
