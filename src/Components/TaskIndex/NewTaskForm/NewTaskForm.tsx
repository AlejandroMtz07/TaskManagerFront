import z, { string } from 'zod';
import { Presentation } from '../../PresentationComponent/Presentation';
import style from './NewTaskForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskSchema = z.object({
  taskname: string().min(4,'Name can\'t be empty'),
  taskcontent: string().min(1,'Task can\'t be empty'),
  taskstate: string()
});

export type TaskData = z.infer<typeof TaskSchema>;

export default function NewTaskForm() {

  //Import things from the useForm hook
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskData>({
    resolver: zodResolver(TaskSchema)
  });
  const navigate = useNavigate();

  const onSubmit = (data:TaskData) =>{
    axios.post(
      'http://localhost:3000/api/tasks',
      {
        taskname: data.taskname,
        taskcontent: data.taskcontent,
        taskstate: data.taskstate
      },
      {withCredentials: true}
    ).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className={style.newtaskcontainer}>
      <Presentation title='Add new task'/>
      <div className={style.formcontainer}>
        <form className={style.taskform} onSubmit={handleSubmit(onSubmit)}>
          <label>Task name</label>
          <input type="text" {...register('taskname')}/>
          {errors.taskname && (<p className={style.errormessage}>Add a task name</p>)}
          <label>Task content</label>
          <input type="text" {...register('taskcontent')}/>
          {errors.taskcontent && (<p className={style.errormessage}>Add a task content</p>)}
          <label>Task state</label>
          <select {...register('taskstate',{required: true})}>
            <option>Pending</option>
            <option>Postponed</option>
            <option>Done</option>
          </select>
          {errors.taskstate && (<p className={style.errormessage}>Add a task state</p>)}
          <button type='submit'>Add task</button>
        </form>
      </div>
    </div>
  )
}
