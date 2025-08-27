import style from './Benefits.module.css'

export default function Benefits() {
  return (
    <div className={style.benefitscontainer}>
      <div className={style.imagebenefits}>
        <img src="./benefits.svg" alt="" />
      </div>
      <span className={style.textbenefits}>
        This application allows you to handle the best way your tasks
      </span>
    </div>
  )
}
