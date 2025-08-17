import style from './Login.module.css'
import { Presentation } from "../PresentationComponent/Presentation";

export default function Login() {
  return (
    <div className={style.logincontainer}>
        <Presentation title="Login"/>
        <div className={style.formcontainer}>
          <form action="/" className={style.loginform}>
            <label htmlFor="name">Gmail</label>
            <input type="email" id='gmail'/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            <button type='submit'>Login</button>
          </form>
        </div>
    </div>
  )
}
