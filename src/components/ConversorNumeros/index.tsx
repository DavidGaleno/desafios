import { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
export const ConversorNumero = () => {
    const [numeroRomanoValue, setNumeroRomanoValue] = useState('')
    const padraoNumeroRomano = /^[IVXLCDM]+$/i
    const validarNumeroRomano = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') return setNumeroRomanoValue(numeroRomanoValue.slice(0, -1))
        if (padraoNumeroRomano.test(e.target.value)) return setNumeroRomanoValue(e.target.value.toUpperCase())
    }

    return (
        <div className={styles.container}>
            <form className={styles.conversorContainer}>
                <h1 className={styles.title}>Conversor Entre Números Arábicos e Romanos</h1>
                <div className={styles.numbers}>
                    <input value={numeroRomanoValue} type="text" className={styles.numeroArabico} name="numeroRomano" id="numeroRomano" placeholder='Digite um número romano' onChange={(e) => validarNumeroRomano(e)} />
                    <input type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' />
                </div>
                <button className={styles.conversor}>Converter</button>
            </form>
        </div>
    )
}