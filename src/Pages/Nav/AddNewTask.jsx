import React, { useState } from "react";
import './addnewTask.css';
import { FaCirclePlus } from 'react-icons/fa6';

export default function AddNewTask({ isOpen, onClose, onSave }) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [task, setTask] = useState({
        title: '',
        step: [
            {
                description: '',
                startDate: new Date(),
                finishDate: new Date()
            },
        ],
        weeklyRemainder: [],
        dueDate: new Date(),
        dueRmainder: new Date(),
        weeklyReview: false,
        note: '',
    });

    if (!isOpen) return null;

    const inputHandler = (event, index) => {
        const { name, value, type, checked } = event.target;

        if (index !== undefined){
            // 1 copy the existing steps
            const inputNewStep = [...task.step];
            // 2 insert the one added by the user.
            inputNewStep[index][name] = value;

            setTask({
                ...task,
                step: inputNewStep,
            });

        } else {
            setTask({
                ...task, [name]: type === 'checkbox' ? checked : value,
            });
        }
    };
    
    //Adds a new step to the step array when the "Add step" button is clicked.
    const AddStepHandler = () => {
        setTask({
            ...task,
            step: [
                ...task.step,
                {
                    description: '',
                    startDate: new Date(),
                    finishDate: new Date()
                },
            ],
        });
    };
    
    //Toggles the selected day in the weeklyRemainder array when a checkbox is clicked and update the state for weeklyRemainder.
    const weeklyRemainderHandler = (day) => {
        setTask({
            ...task, weeklyRemainder: task.weeklyRemainder.includes(day)
            ? task.weeklyRemainder.filter((selectedDay) => selectedDay !== day)
            :  [...task.weeklyRemainder, day]
        });
    };
    
    const saveTask = (event) =>{
        event.preventDefault();
        // Call the onSave callback with the task data
        onSave(task);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="formheader">
                    <h1>Task</h1>
                    <button onClick={onClose}>X</button>
                </div>
                <form className="form" onSubmit={saveTask}>
                    <label htmlFor="title">Title: </label>
                    <input id="title" name="title" value={task.title} onChange={inputHandler} type="text" />

                    {/* Display existing steps */}
                    {task.step.map((step, index) => (
                        <div key={index}>
                            {/* Step description input */}
                            <div>
                            <label htmlFor={`description${index}`}>Step {index +1}: </label>
                            <input
                                id={`description${index}`}
                                name="description"
                                value={step.description}
                                onChange={(event) => inputHandler(event, index)}
                                type="text"
                            />

                            {/* Step startDate input */}
                            <label htmlFor={`startDate-${index}`}>Start Date: </label>
                            <input
                                id={`startDate-${index}`}
                                name="startDate"
                                value={step.startDate}
                                onChange={(event) => inputHandler(event, index)}
                                type="date"
                            />

                            {/* Step finishDate input */}
                            <label htmlFor={`finishDate-${index}`}>Finish Date: </label>
                            <input
                                id={`finishDate-${index}`}
                                name="finishDate"
                                value={step.finishDate}
                                onChange={(event) => inputHandler(event, index)}
                                type="date"
                            />
                            </div>
                            {/* you still have to handle the delet step action */}
                            <button>Delete</button>
                        </div>
                    ))}
                    {/* Button to add new step */}
                    <p type='button' onClick={AddStepHandler}><FaCirclePlus /> Add step</p>

                    <legend>Weekly remainder: </legend>
                    {daysOfWeek.map((day, index) => (
                        <div key={day}>
                            <label htmlFor={`weeklyRemainder${index}`}>
                                <input
                                    id={`weeklyRemainder${index}`}
                                    name="weeklyRemainder"
                                    type="checkbox"
                                    value={index}
                                    checked={task.weeklyRemainder.includes(index)}
                                    onChange={() => weeklyRemainderHandler(index)}
                                />
                                {day}
                            </label>
                        </div>
                    ))}

                    <label htmlFor="dueDate">Due date: </label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={inputHandler}
                        type="date"
                    />
                    <label htmlFor="dueRmainder">Due remainder: </label>
                    <input
                        id="dueRmainder"
                        name="dueRmainder"
                        value={task.dueRmainder}
                        onChange={inputHandler}
                        type="date"
                    />

                    <span>
                        <label htmlFor="weeklyReview"> - Do weekly review</label>
                        <input id="weeklyReview" name="weeklyReview" checked={task.weeklyReview} onChange={inputHandler} type="checkbox" />
                    </span>
                    <br />
                    <button type='submit' onClick={saveTask}>Save</button>
                </form>
            </div>
        </div>
    );
}
