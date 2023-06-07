import { IProduto } from '../../intefaces/IProduto'
import styles from './styles.module.css'
import { Option } from '../Option'
interface Props {
    value: string | undefined
    options: IProduto[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export const Select = ({ value, options, onChange }: Props) => {
    return (
        <select className={styles.produtos} onChange={(e) => onChange(e)} value={value} name="" id="" required>
            <option value="">Selecione um produto para ser comprado</option>
            {options.map((produto: IProduto, index: number) => (<Option index={index} text={produto.nome} />))}
        </select>
    )
}