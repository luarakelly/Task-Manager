import {useState} from "react";

export default function SingleTaskModal() {
  // manage single taks edit
  const [edit, setEdit] = useState(false);
  // manage the single task delete
  const [tasks, setTasks] = useState([]);
  // manage the single task addition
  const [add, setAdd] = useState([]);

    // edit single Task
  const editStep = ()=>{
    
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
        <div>
            <p>I am a modal</p>
        </div>
    );
}