import styles from '../styles/Select.module.css';

export default function SelectItem({ children, enable, onClick }) {

    if (enable) {
        return <div className={styles.selectItemEnable} onClick={onClick}>{children}</div>
    } else {
        return <div className={styles.selectItemDisable} >{children}</div>
    }

}
