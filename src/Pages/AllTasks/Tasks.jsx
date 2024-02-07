import React, {useState} from 'react';
import AddNewTask from '../Nav/AddNewTask';

export default function Tasks({ tasks }) {
    const [addTaskActive, setAddTaskActive] = useState(false);

    const toggleAddTask = () => {
        setAddTaskActive(!addTaskActive);
    };

    return (
        <section className='tasks'>
            <header>
                <p>date</p> 
                <h1> Your Tasks</h1>
                <button onClick={toggleAddTask}>Add new task</button>
                {addTaskActive? <AddNewTask isOpen={addTaskActive} onClose={toggleAddTask}/>: null}
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
            {tasks && tasks.map((task, index) => (
            <div className='single-task-card__grouped' key={index}>
                <div className='single-task-card__container'>
                    <h2>{task.title}</h2>
                    <h3>Status: in progress</h3>
                    <p>colorTag</p>
                    <button>edit</button> 
                    <button>delet</button> 
                </div>
                <div className='single-task-card__body'>                    
                    {task.step && task.step.map((step, index)=>(
                        <div key={index}>
                            <label htmlFor="status">
                            <input
                                id="status"
                                name="isConcluded"
                                type="checkbox"                                    value={false}
                            /> {step.description}</label>
                            <p>Planned day to conlcud the step: {step.finishDate}</p>
                        </div>
                    ))}
                    <p>Task due date: {task.dueDate}</p>
                    <p>Remainder: {task.dueRmainder}</p>
                </div>
            </div>      
            ))}
        </section>
    );
}