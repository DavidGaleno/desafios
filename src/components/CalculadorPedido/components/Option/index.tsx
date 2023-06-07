import styles from './styles.module.css'
interface Props {
    text: string
    index: number
}
export const Option = ({ index, text }: Props) => {
    return (
        <option key={index} className={styles.produto}>{text}</option>
    )
}