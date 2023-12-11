import data from '../../data/tasks.json'
import Tasks from "../Home/Tasks";

export default function HomePage(){
    //make GET rekest to the server but how i do not have it i am just passing a json file
    // use useEffect hook
    return(
        <>
            <Tasks data={data}/>
        </>
    );
};