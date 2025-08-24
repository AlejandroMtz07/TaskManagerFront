
import style from './Navbar.module.css'


interface NavBarProps{
  links: string[];
  linkname: string[];
}

export default function Navbar({links,linkname}:NavBarProps) {
  return (
    <div className={style.navbar}>
        {
          links.map((link,index)=>(
            <a href={`/${link}`} key={index}>{linkname[index]}</a>
          ))
        }
    </div>
  )
}
