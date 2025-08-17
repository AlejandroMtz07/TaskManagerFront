import style from './Presentation.module.css'


interface PresentationProps {
  title :string
}

export const Presentation = ({title}:PresentationProps) => {
  return (
    <div className={style.header}>  
      <header>
        {title}
      </header>
    </div>
  )
}
