import { useForm } from "react-hook-form";
import { Presentation } from "../PresentationComponent/Presentation";
import style from './Register.module.css';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//Creating the schema for the form validation
const FormSchema = z.object({
  name: z.string().min(3, 'The name cant be empty'),
  lastname: z.string().min(2, 'Add your lastname'),
  username: z.string().min(5, 'Username lenght must be minimum 5 characters').max(9, 'Username must be less than 9 characters'),
  email: z.email('Email not valid'),
  password: z.string().min(4, 'Add more than 6 characters')
    .refine(
      (val) => (val.match(/[A-Z]/g) || []).length >= 2,
      { error: 'The password must contain at least 2 uppercases' }
    )
    .refine(
      (val) => /[^a-zA-Z0-9]/.test(val),
      { error: 'The password must have a symbol' }
    )
})

interface ApiError{
  msg: string
}

//Getting the type fron the FromSchema, using the infer function
export type FormData = z.infer<typeof FormSchema>

export default function Register() {

  //Import things from the useForm hook
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur'
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    //Sendig the data to the backend
    axios.post('http://localhost:3000/api/register', 
      {
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password
      }, 
      { withCredentials: true }
    )
    .then((response)=>{
      if(response.statusText === 'OK'){
        toast('User registered');
        reset();
        setTimeout(()=>navigate('/login'),2000);
      }
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

  //Creating the component
  return (
    <div className={style.registercontainer}>
      <Presentation title="Register" />
      <div className={style.formcontainer}>
        <ToastContainer hideProgressBar={true} />
        <form className={style.registerform} onSubmit={handleSubmit(onSubmit)}>
          <label>Name </label>
          <input
            type="text"
            {...register('name')}
          />
          {errors.name && (<p className={style.errormessage}>{errors.name.message}</p>)}
          <label>Lastname</label>
          <input
            type="text"
            {...register('lastname')}
          />
          {errors.lastname && <p className={style.errormessage}>{errors.lastname.message}</p>}
          <label>Username</label>
          <input
            type="text"
            {...register('username')}
          />
          {errors.username && <p className={style.errormessage}>{errors.username.message}</p>}
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
          />
          {errors.email && <p className={style.errormessage}>{errors.email.message}</p>}
          <label>password</label>
          <input
            type="text"
            {...register('password')}
          />
          {errors.password && <p className={style.errormessage}>{errors.password.message}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}
