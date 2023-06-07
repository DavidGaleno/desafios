import styles from './styles.module.css'
interface Props {
    text: string
}
export const Option = ({ text }: Props) => {
    return (
        <option className={styles.produto}>{text}</option>
    )
}