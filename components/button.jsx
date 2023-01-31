import style from '../styles/Button.module.css';

export default function Button({ text, onClick }) {
    return (
        <button className={style.container} onClick={onClick}>{text}</button>
    );
}