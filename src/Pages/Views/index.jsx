import data from '../../data/tasks.json'
import Header from "../Home/Header";
import Tasks from "../Home/Tasks";

export default function HomePage(){
    //make GET rekest to the server but how i do not have it i am just passing a json file
    return(
        <>
            <Header/>
            <Tasks data={data}/>
        </>
    );
};