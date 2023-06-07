import { ButtonHome } from '../ButtonHome'
import { Title } from '../Title'
import styles from './styles.module.css'
export const Home = () => {
    return (
        <div className={styles.container}>
            <Title text='Desafios' />
            <div className={styles.buttons}>
                <ButtonHome route="/conversor_numeros" text='Conversor Números' />
                <ButtonHome route="/calculadora_pedido" text='Calculadora Pedido' />
            </div>
        </div>
    )
}