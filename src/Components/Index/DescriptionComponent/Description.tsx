import style from './Description.module.css'

export default function Description() {
  return (
    <div className={style.descriptioncontainer}>
        <span className={style.textdescription}>
          The task management app was created by an student of the TecNM of Los Mochis 
          who need a functional app to manage their tasks,
          track them, and manage them in the best way.
        </span>
        <div className={style.imagedescription}>
          <img src="./description-task.svg" alt="" />
        </div>
    </div>
  )
}
