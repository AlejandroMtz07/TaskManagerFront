import style from './Login.module.css'
import { Presentation } from "../PresentationComponent/Presentation";
import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  interface ApiError{
    msg: string;
  }


  //Gettting the form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3000/api/login',
      { 
        email:email,
        password:password
      },
      {withCredentials : true}
    )
    .then((response) => {
      toast.info(response.data.msg)
      setTimeout(()=>{
        navigate('/tasks')
      },2000)
    })
    .catch((error)=>{
      if(Array.isArray(error.response.data)){
        const errors:ApiError[] = error.response.data;
        errors.forEach((element)=>{
          toast.warning(element.msg)
        })
      }else{
        toast.warning(error.response.data.msg);
      }
    })
  }

  return (
    <div className={style.logincontainer}>
      <Presentation title="Login" />
      <ToastContainer hideProgressBar={false}/>
      <div className={style.formcontainer}>
        <form className={style.loginform} onSubmit={submitForm}>
          <label htmlFor="name">
            Email
          </label>
          <input
            type="email"
            placeholder='Email'
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder='Password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
          />
          <button type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
