import style from '../styles/Button.module.css';

export default function Button({ text, disable, onClick }) {
    return (
        <button className={style.container} disabled={disable} onClick={onClick}>{text}</button>
    );
}
