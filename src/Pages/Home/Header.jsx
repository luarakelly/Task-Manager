export default function Header(){
  const createTask = () => {
    console.log('form')
  }

  return (
    <header className="header">
      <button className="btn btn-outline" onClick={createTask}> Create a Task!</button>
      <img src="./imgs/header/plan-make.jpg" alt="title" />
    </header>
  );
};
 