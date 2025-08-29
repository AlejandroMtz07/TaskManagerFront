import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext/AuthContext";
import style from './Logout.module.css'

export default function Logout() {

    const navigate = useNavigate();
    const {setIsLoged} = useAuth();

    useEffect(()=>{
        axios.post(
            'http://localhost:3000/api/logout',
            {},
            {withCredentials: true}
        ).then(()=>{
            setTimeout(()=>{
                setIsLoged(false);
                localStorage.removeItem('token');
                localStorage.removeItem('isLoged');
                navigate('/login');
            },2000);
        }).catch(()=>{
            navigate('/login');
        })
    },[navigate]);

  return (
    <div className={style.message}>
        Saliendo
    </div>
  )
}
