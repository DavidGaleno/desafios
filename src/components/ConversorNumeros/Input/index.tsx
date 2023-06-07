import styles from './styles.module.css'
import { ChangeEvent } from 'react'

interface Props {
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
}
export const Input = ({ value, onChange, placeholder, type }: Props) => {
    return (
        <input value={value} type={type} className={styles.numero} onChange={(e) => onChange(e)} placeholder={placeholder} />
    )
}