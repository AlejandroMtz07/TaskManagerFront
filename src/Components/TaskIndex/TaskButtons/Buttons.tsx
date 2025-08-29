import axios from 'axios';
import style from './Buttons.module.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



interface ButtonsProps {
    id: number;
    taskname: string,
    taskcontent: string
    state: string[];
    actualstate: string,
}

export default function Buttons({ id,taskname,taskcontent, state, actualstate }: ButtonsProps) {

    const navigate = useNavigate();
    
    const handleDelete = () => {
        axios.delete(
            `http://localhost:3000/api/tasks/${id}`,{
                withCredentials: true
            }
        ).then((response) => {
            toast.warning(response.data.msg);
            setTimeout(()=>navigate(0),2000);
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const newState = e.target.value;
        axios.put(
            `http://localhost:3000/api/tasks/${id}`, 
            {
                id,
                taskname,
                taskcontent,
                taskstate: newState
            }, 
            { withCredentials: true }
        ).then((response)=>{
            toast.success(response.data.msg);
            setTimeout(()=>navigate(0),2000);
        }).catch((error)=>{
            toast.error(error.data.msg);
        })
    }

    return (
        <>
            <ToastContainer autoClose={1000}/>
            <button onClick={handleDelete} className={`${style.button}`}>
                Delete
            </button>
            <select onChange={handleChange} defaultValue={actualstate}>
                {
                    state.map((option, index) =>
                        (<option key={index} value={option}>{option}</option>))
                }
            </select>
        </>
    )
}
