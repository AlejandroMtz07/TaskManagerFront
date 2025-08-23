import { useForm } from "react-hook-form";
import { Presentation } from "../PresentationComponent/Presentation";
import style from './Register.module.css';
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";


const FormSchema = z.object({
  name: z.string().min(3,'Add a name'),
  lastname: z.string().min(2,'Add your lastname'),
  username: z.string().min(3,'Username must be larger than 3 letters'),
  email: z.string().email('Email not valid'),
  password: z.string().min(6,'Add more than 6 letters')
})

export type FormData = z.infer<typeof FormSchema>

export default function Register() {

  const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = (data:FormData)=>{
    console.log(data);
  }

  //Register component
  return (
    <div className={style.registercontainer}>
        <Presentation title="Register"/>
        <div className={style.formcontainer}>
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
