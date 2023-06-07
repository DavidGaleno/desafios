import { ChangeEvent } from 'react'
import styles from './styles.module.css'
interface Props {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    maxLength: number
}
export const Input = ({ value, onChange, placeholder, maxLength }: Props) => {
    return (
        <input className={styles.input} maxLength={maxLength} type="text" onChange={(e) => onChange(e)} value={value} name="" id="" placeholder={placeholder} required />
    )
}