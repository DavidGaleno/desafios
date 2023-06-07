import { ChangeEvent } from 'react'
import styles from './styles.module.css'
interface Props {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    minLength: number
}
export const Input = ({ value, onChange, placeholder, maxLength }: Props) => {
    return (
        <input className={styles.input} max={maxLength} type="text" onChange={(e) => onChange(e)} value={value} name="" id="" placeholder={placeholder} required />
    )
}