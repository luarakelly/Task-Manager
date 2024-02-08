import React, {useState} from 'react';
import './tasks.css';
import AddNewTask from '../Nav/AddNewTask';

export default function Tasks({ data, onSave, onDelete }) {
    const [addTaskActive, setAddTaskActive] = useState(false);

    const toggleAddTask = () => {
        setAddTaskActive(!addTaskActive);
    };
    
    // Function to get the current date in a formatted string
    const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US');
    };

    // Function to filter tasks due within a specified number of days
    const getTasksDueWithinDays = (days) => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        return data.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            const timeDifference = taskDueDate.getTime() - targetDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
        return daysDifference >= 0 && daysDifference < 1;
        });
    };
    const tasksDueTomorrow = getTasksDueWithinDays(1);
    const tasksDueIn7Days = getTasksDueWithinDays(7);
    const tasksDueToday = getTasksDueWithinDays(0)

    return (
        <section className='tasks'>
            <header>
                <p>{getCurrentDate()}</p> 
                <h1> Your Tasks</h1>
            </header>
            <aside>
                <div className='today-duetask'>
                    <p>Tasks due today:</p> 
                    <div className='today-duetask-title'>
                    {tasksDueToday.map(task => task.title).join(', ') || 'None'}
                    </div>
                </div>
                <div className='remaining-week-duetask'>
                    <div className='tomorrow-duetask'>Tasks due tomorrow: {tasksDueTomorrow.length}</div>
                    <div className='week-duetask'>Tasks due in 7 days: {tasksDueIn7Days.length}</div>
                </div> 
            </aside>
            {data.length !== 0 ? (
            <div className='task-cards'>
                <div className='task-cards-nav'>
                <label htmlFor='sortTasks'>Sort by:
                <select name='sortTasks' id='sortTasks'>
                    <option >Due date</option>
                    <option >Progress</option>
                    <option >Color tag</option>
                </select>
                </label>
                <label htmlFor='search'>Search:
                <input name='search' id='search'></input>
                </label>
                </div>
                <div className='single-task-card__box'>
                {data.map((task, index) => (
                    <div className='single-task-card__grouped' key={index}>
                        <div className='single-task-card__container'>
                            <div className='single-task-card__header'>
                                <h2>{task.title}</h2>
                                <div className='single-task-card__colorTag'>colorTag</div>
                            </div>
                            <div className='progress-bar'>Progress bar</div>
                            <div className='single-task-card__body'>                    
                                {task.step && task.step.map((step, index)=>(
                                    <div className='single-task-card__step' key={index}>
                                        <label htmlFor="status">
                                            <input
                                                id="status"
                                                name="isConcluded"
                                                type="checkbox"                                    
                                            /> {step.description}
                                        </label>
                                        <p>{step.finishDate}</p>
                                    </div>
                                ))}
                                <p>Task due date: {task.dueDate}</p>
                                <p>Remainder: {task.dueRmainder}</p>
                            </div>
                            <div className='btn-group'>
                                <button>edit</button> 
                                {/*delet task */}
                                <button type='button' onClick={() => onDelete(index)}>delet</button> 
                            </div>
                        </div>
                    </div>      
                ))}
                </div>
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

/*
use the tabel to display the card data it is more recomendable, one exaple:
<table>
        <tbody>
        {
           todos.map((todo, index) => (
            <tr key={index}>
                <td>{todo.description}</td>
                <td>{todo.date}</td>
                </tr>
            ))
        }
        </tbody>
      </table>
*/