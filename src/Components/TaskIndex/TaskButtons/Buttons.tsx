import style from './Buttons.module.css'

interface ButtonsProps {
    id: number;
    state: string[];
}

export default function Buttons({ id, state }: ButtonsProps) {

    const handleDelete = () => {
        console.log(id);
    }

    return (
        <div className={style.buttonscontainer}>
            <button onClick={handleDelete}>
                Delete
            </button>
            <select>
                {
                    state.map((option, index) =>
                        (<option key={index}>{option}</option>))
                }
            </select>
        </div>
    )
}
