import styles from './styles.module.css'
interface Props {
    onClick: () => void
    text: string
}
export const Button = ({ onClick, text }: Props) => {
    return (
        <button onClick={() => onClick()} className={styles.conversor}>{text}</button>

    )
}