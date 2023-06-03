import { ChangeEvent, KeyboardEvent, useState } from 'react'
import styles from './styles.module.css'
export const ConversorNumero = () => {
    const [numeroRomano, setNumeroRomano] = useState('')
    const [numeroArabico, setNumeroArabico] = useState('')
    const padraoNumeroRomano = /^[IVXLCDM]+$/i

    //Essa função procura impedir que o usuário digite uma letra diferente de um número romano. A validação aceita letras maículas e minusculas, convertendo sempre para caixa alta
    const validarNumeroRomano = (e: KeyboardEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.key === 'Backspace') return setNumeroRomano(numeroRomano.slice(0, -1))
        if (!padraoNumeroRomano.test(e.key)) return



    }

    //Essa função procura impedir que o usuário digite um número maior que 3999 ou menor que 1
    const validarNumeroArabico = (e: ChangeEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.target.value === '') return setNumeroArabico(numeroRomano.slice(0, -1))
        const numero = Number(e.target.value)
        if (numero < 1 || numero > 3999) return
        setNumeroArabico(e.target.value)
    }



    return (
        <div className={styles.container}>
            <div className={styles.conversorContainer}>
                <h1 className={styles.title}>Conversor Entre Números Arábicos e Romanos</h1>
                <div className={styles.numbers}>
                    <input value={numeroRomano} type="text" className={styles.numeroArabico} name="numeroRomano" id="numeroRomano" placeholder='Digite um número romano' onKeyDown={(e) => validarNumeroRomano(e)} />
                    <input value={numeroArabico} type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' onChange={(e) => {
                        validarNumeroArabico(e)
                    }} />
                </div>
                <button className={styles.conversor}>Converter</button>
            </div>
        </div>
    )
}