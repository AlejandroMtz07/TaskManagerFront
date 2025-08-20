import { useState, type ChangeEvent, type FormEvent } from "react";
import { Presentation } from "../PresentationComponent/Presentation";
import style from './Register.module.css';


export default function Register() {

  const[formData, setFormData] = useState({
    name:'',
    lastname:'',
    username:'',
    email:'',
    password:''
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  };

  const submitForm = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // axios.post(
    //   'http://localhost:3000/api/register',
    //   {
    //   }
    // )
  }

  return (
    <div className={style.registercontainer}>
        <Presentation title="Register"/>
        <div className={style.formcontainer}>
            <form className={style.registerform} onSubmit={submitForm}>
                <label>Name </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                <label>Lastname</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}/>
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                <label>password</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}
