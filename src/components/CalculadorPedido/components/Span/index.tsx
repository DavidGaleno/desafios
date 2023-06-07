import styles from './styles.module.css'
import { MouseEvent } from 'react'

interface Props {
    text: string
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void
    index?: number
}
export const Span = ({ text, onClick, index }: Props) => {
    return (
        <span onClick={(e) => onClick?.(e)} key={index} className={styles.span}>{text}</span>
    )
}