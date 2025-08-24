import axios from "axios"
import { Presentation } from "../PresentationComponent/Presentation";
import style from './TaskIndex.module.css'
import { useEffect, useState } from "react";
import Task from "./Task/Task";
import { useAuth } from "../../AuthContext/AuthContext";
import Footer from "../FooterComponent/Footer";

interface Task {
    id: number
    taskname: string
    taskcontent: string
    taskstate: string;
}


export default function TasksIndex() {

    //Creating the tasks constant and setting the initial value to an empty list
    const [tasks, setTasks] = useState<Task[]>([]);
    const { isLoged } = useAuth();

    useEffect(() => {
        axios.get(
            'http://localhost:3000/api/tasks',
            { withCredentials: true }
        ).then((response) => {
            setTasks(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }, []);

    return (
        <div>
            <Presentation title="Here, !Your tasks!" />
            {
                //Checking if the user is loged
                isLoged ?
                    (<div className={style.taskscontainer}>
                        {tasks.map((task, index) =>
                        (
                            //Generating the user tasks
                            <Task
                                key={index}
                                id={task.id}
                                taskname={task.taskname}
                                taskcontent={task.taskcontent}
                                taskstate={task.taskstate}
                            />
                        ))}
                    </div>
                    ) : (
                        <div className={style.loginmessage}>
                            Login to see your tasks
                        </div>
                    )
            }
            <Footer/>
        </div>
    )
}

