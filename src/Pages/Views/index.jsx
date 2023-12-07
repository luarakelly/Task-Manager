import data from '../../data/tasks.json'
import Header from "../Home/Header";
import Tasks from "../Home/Tasks";

export default function HomePage(){
    return(
        <>
            <Header/>
            <Tasks data={data}/>
        </>
    );
};