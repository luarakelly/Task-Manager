import React, {useState} from 'react';
import AddNewTask from '../Nav/AddNewTask';

export default function Tasks() {
    const [addTaskActive, setAddTaskActive] = useState(false);
    const [tasks, setTasks] = useState([]);

    const toggleAddTask = () => {
        setAddTaskActive(!addTaskActive);
    };

    const addTask = (newTask) => {
        // Update the tasks state with the new task
        setTasks([...tasks, newTask]);
    }
    return (
        <section className='tasks'>
            <header>
                <p>date</p> 
                <h1> Your Tasks</h1>
                <button onClick={toggleAddTask}>Add new task</button>
                {addTaskActive? <AddNewTask isOpen={addTaskActive} onClose={toggleAddTask} onSave={addTask}/>: null}
                <label htmlFor='sortTasks'>Sort by:</label>
                <select name='sortTasks' id='sortTasks'>
                    <option >Due date</option>
                    <option >in Progress</option>
                    <option >Concluded</option>
                </select>
            </header>
            <div>
                <div>Tasks due tomorrow:</div>
                <div>Tasks due in 7 days:</div>
                <div>Tasks due today:</div>
            </div>
            {tasks.map((task, index) => (
            <div className='single-task-card__grouped' key={index}>
                <div className='single-task-card__container'>
                    <h2>{task.title}</h2>
                    <h3>Status: in progress</h3>
                    <p>colorTag</p>
                    <button>edit</button> 
                    <button>delet</button> 
                </div>
                <div className='single-task-card__body'>
                    <span>
                        <label htmlFor="status">
                            <p>step1</p>
                            <input
                                id="status"
                                name="isConcluded"
                                type="checkbox"
                                value={false}
                            />
                        </label>
                        <p>dueDate</p>
                        <p>weeklyRemaind</p>
                    </span>
                    <p>dueDate</p>
                    <p>remaind</p>
                </div>
            </div>
            ))}
        </section>
    );
}