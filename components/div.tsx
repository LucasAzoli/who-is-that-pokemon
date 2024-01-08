import styles from './div.module.css'

interface IProps {
    children: React.ReactNode;
}

export default function Div({children}: IProps) {
    return (
        <div className={styles.default}>{children}</div>
    )
}