import React, { useState } from 'react';
import './sidebar.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdTask } from 'react-icons/md';
import AddNewTask from './AddNewTask'

export default function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [addTaskActive, setAddTaskActive] = useState(false);

  const arrowLeft = '<';
  const arrowRight = '>';

  const toggleSideBar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleAddTask = () => {
    setAddTaskActive(!addTaskActive);
  };


  return (
    <>
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`} onClick={toggleSideBar}>
      <div className='sidebar-content'>
        {sidebarActive ? (
          <>
            <div className='sidebar-icon'>{arrowRight}</div>
            <div className='nav-icons'>
              <FaCirclePlus type='button' onClick={toggleAddTask}/> New Task
              <MdTask /> Your Tasks
              <HiHome /> Home
              <FaCalendarAlt /> Calendar
              <IoSettings /> Settings
            </div>
          </>
        ) : (
          <div className='sidebar-icon'>{arrowLeft}</div>
        )}
      </div>
    </div>
    <AddNewTask isOpen={addTaskActive} onClose={toggleAddTask}/>
    </>
  );
}
