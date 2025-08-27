import Buttons from '../TaskButtons/Buttons';
import style from './Task.module.css'

interface TaskProps {
    id: number
    taskname: string
    taskcontent: string
    taskstate: string;
}

export default function Task({ id, taskname, taskcontent, taskstate }: TaskProps) {

    const checkTaskState = ()=>{
        switch(taskstate){
            case 'Done':
                return style.done;
            case 'Postponed':
                return style.postponed;
            case 'Pending':
                return style.pending;
            default:
                return style.taskcontainer;
        }
    }

    return (
        <div className={`${checkTaskState()} ${style.taskcontainer}`}>
            <h3>{taskname}</h3>
            <p>{taskcontent}</p>
            <p>{taskstate}</p>
            <Buttons id={id} state={['Done','Postponed','Pending']}/>
        </div>
    )
}
