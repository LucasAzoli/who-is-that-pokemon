import styles from './div.module.css'

interface IProps {
    button?: boolean;
    children: React.ReactNode;
    color?: string;
}

export default function Div({children, button, color}: IProps) {
    return (
        <div style={{backgroundColor: color}} className={button ? styles.button : styles.default}>{children}</div>
    )
}