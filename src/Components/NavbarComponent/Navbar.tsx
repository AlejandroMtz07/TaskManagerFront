import style from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={style.navbar}>
        <a href="login">Login</a>
        <a href="register">Register</a>
        <a href="#">About us</a>
    </div>
  )
}
