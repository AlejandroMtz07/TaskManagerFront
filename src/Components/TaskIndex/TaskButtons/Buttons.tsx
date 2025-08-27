import axios from 'axios';
import style from './Buttons.module.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../../AuthContext/AuthContext';

interface ButtonsProps {
    id: number;
    state: string[];
}

export default function Buttons({ id, state }: ButtonsProps) {

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

    return (
        <>
            <ToastContainer autoClose={1000}/>
            <button onClick={handleDelete} className={`${style.button}`}>
                Delete
            </button>
            <select>
                {
                    state.map((option, index) =>
                        (<option key={index}>{option}</option>))
                }
            </select>
        </>
    )
}
