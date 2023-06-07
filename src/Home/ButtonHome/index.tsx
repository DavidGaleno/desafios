import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
interface Props {
    text: string
    route:string
}
export const ButtonHome = ({ text,route }: Props) => {
    return (
        <button className={styles.conversor}><NavLink className={styles.conversorLink} to={route}>{text}</NavLink></button>

    )
}