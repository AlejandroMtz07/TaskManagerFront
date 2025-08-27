import style from './Login.module.css'
import { Presentation } from "../PresentationComponent/Presentation";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import z, { email, string } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  email: email(),
  password: string().min(1,'The password can\'t be empty')
})

export type LoginData = z.infer<typeof LoginSchema>;

export default function Login() {

  interface ApiError{
    msg: string;
  }

  const navigate = useNavigate();
  const{setIsLoged} = useAuth();

  //Import things from the useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
      resolver: zodResolver(LoginSchema)
    });

  const onSubmit = (data: LoginData) => {
    axios.post(
      'http://localhost:3000/api/login',
      { 
        email:data.email,
        password:data.password
      },
      {withCredentials : true}
    )
    .then((response) => {
      setIsLoged(true);
      toast.info(response.data.msg)
      setTimeout(()=>{
        navigate('/tasks');
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
        <form className={style.loginform} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">
            Email
          </label>
          <input
            type="email"
            placeholder='Email'
            {...register('email',{required: true})}
          />
          {errors && (<p className={style.errormessage}>Add your email</p>)}
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder='Password'
            {...register('password',{required: true})}
          />
          {errors && (<p className={style.errormessage}>Add your password</p>)}
          <button type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
