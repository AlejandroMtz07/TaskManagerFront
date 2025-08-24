import Buttons from '../TaskButtons/Buttons';
import style from './Task.module.css'

interface TaskProps {
    id: number
    taskname: string
    taskcontent: string
    taskstate: string;
}

export default function Task({ id, taskname, taskcontent, taskstate }: TaskProps) {

    return (
        <div className={style.taskcontainer}>
            <h3>{taskname}</h3>
            <p>{taskcontent}</p>
            <p>{taskstate}</p>
            <Buttons id={id} state={['Done','Postponed','Pending']}/>
        </div>
    )
}
