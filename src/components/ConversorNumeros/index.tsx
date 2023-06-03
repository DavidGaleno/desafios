import styles from './styles.module.css'
export const ConversorNumero = () => {
    return (
        <div className={styles.container}>
            <form className={styles.conversorContainer}>
                <h1 className={styles.title}>Conversor Entre Números Arábicos e Romanos</h1>
                <div className={styles.numbers}>
                    <input type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' />
                    <input type="text" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' />
                </div>
                <button className={styles.conversor}>Converter</button>
            </form>
        </div>
    )
}