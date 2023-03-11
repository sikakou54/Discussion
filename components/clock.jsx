import style from '../styles/Clock.module.css';

export default function Clock({ type, sec }) {

    return (
        <div className={style.clock}>
            <div className={style.dot}></div>
            {
                type === '1min' &&
                <div className={style.line} style={{ transform: `rotate(${90 - (sec * 6)}deg)` }}></div>
            }
            {
                type === '12min' &&
                <div className={style.line} style={{ transform: `rotate(${90 - (sec / 2)}deg)` }}></div>
            }
            <div className={style.number}>12</div>
            <div className={`${style.number} ${style.one}`}>1</div>
            <div className={`${style.number} ${style.two}`}>2</div>
            <div className={`${style.number} ${style.three}`}>3</div>
            <div className={`${style.number} ${style.four}`}>4</div>
            <div className={`${style.number} ${style.five}`}>5</div>
            <div className={`${style.number} ${style.six}`}>6</div>
            <div className={`${style.number} ${style.seven}`}>7</div>
            <div className={`${style.number} ${style.eight}`}>8</div>
            <div className={`${style.number} ${style.nine}`}>9</div>
            <div className={`${style.number} ${style.ten}`}>10</div>
            <div className={`${style.number} ${style.eleven}`}>11</div>
            {
                type === '12min' &&
                <div className={style.unit}>12分計</div>
            }
        </div>
    );
}
