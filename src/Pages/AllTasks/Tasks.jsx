import React, {useState} from 'react';
import './tasks.css';
import AddNewTask from '../Nav/AddNewTask';

export default function Tasks({ data, onSave }) {
    const [addTaskActive, setAddTaskActive] = useState(false);

    const toggleAddTask = () => {
        setAddTaskActive(!addTaskActive);
    };
    console.log(data.length);
    return (
        <section className='tasks'>
            <header>
                <p>date</p> 
                <h1> Your Tasks</h1>
            </header>
            <aside>
                <div>Tasks due tomorrow:</div>
                <div>Tasks due in 7 days:</div>
                <div>Tasks due today:</div>
            </aside>
            {data.length !== 0 ? (
            <div className='single-task-card__box'>
                <label htmlFor='sortTasks'>Sort by:
                <select name='sortTasks' id='sortTasks'>
                    <option >Due date</option>
                    <option >in Progress</option>
                    <option >Concluded</option>
                </select>
                </label>

                {data.map((task, index) => (
                    <div className='single-task-card__grouped' key={index}>
                        <div className='single-task-card__container'>
                            <div className='single-task-card__header'>
                                <h2>{task.title}</h2>
                                <p>colorTag</p>
                                <h3>Progress bar</h3>
                            </div>
                            <div className='single-task-card__body'>                    
                                {task.step && task.step.map((step, index)=>(
                                    <div className='single-task-card__step' key={index}>
                                        <label htmlFor="status">
                                        <input
                                            id="status"
                                            name="isConcluded"
                                            type="checkbox"                                    
                                        /> {step.description}</label>
                                        <p>Planned day to conlcud the step: {step.finishDate}</p>
                                    </div>
                                ))}
                                <p>Task due date: {task.dueDate}</p>
                                <p>Remainder: {task.dueRmainder}</p>
                            </div>
                            <button>edit</button> 
                            <button>delet</button> 
                        </div>
                    </div>      
                ))}
            </div>
            )
            : (
                <>
                    <p>You haven't created any task.</p>
                    <h2>Let's get started!</h2>
                    <button onClick={toggleAddTask}>Create you first task</button>
                    {addTaskActive ? <AddNewTask isOpen={addTaskActive} onClose={toggleAddTask} onSave={onSave}/> : null}
                </>
                )
            }            
        </section>
    );
}