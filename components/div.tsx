import styles from './div.module.css'

interface IProps {
    button: boolean;
    children: React.ReactNode;
}

export default function Div({children, button}: IProps) {
    return (
        <div className={button ? styles.button : styles.default}>{children}</div>
    )
}