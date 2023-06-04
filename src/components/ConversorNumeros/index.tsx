import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'
import styles from './styles.module.css'

const numerosRomanosEmArabicos: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
}
export const ConversorNumero = () => {
    const [numeroRomano, setNumeroRomano] = useState('')
    const [numeroArabico, setNumeroArabico] = useState('')
    const padraoNumeroRomano = /^[IVXLCDM]+$/i

    //Essa função procura impedir que o usuário digite uma letra diferente de um número romano. A validação aceita letras maículas e minusculas, convertendo sempre para caixa alta
    const validarNumeroRomano = (e: KeyboardEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.key === 'Backspace') return setNumeroRomano(numeroRomano.slice(0, -1))

        if (!padraoNumeroRomano.test(e.key)) return

        const numeroInserido = e.key.toUpperCase()
        setNumeroRomano(numeroRomano + numeroInserido)



    }

    //Essa função procura impedir que o usuário digite um número maior que 3999 ou menor que 1
    const validarNumeroArabico = (e: ChangeEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.target.value === '') return setNumeroArabico(numeroRomano.slice(0, -1))
        const numero = Number(e.target.value)
        if (numero < 1 || numero > 3999) return
        setNumeroArabico(e.target.value)
    }

    const converterNumero = () => {
        let numeroConvertido = 0
        if (numeroRomano.length === 1) numeroConvertido = numerosRomanosEmArabicos[numeroRomano]
        if (numeroRomano.length > 1) {
            for (let i = numeroRomano.length - 1; i >= 0; i--) {
                if (numerosRomanosEmArabicos[numeroRomano[i - 1]] >= numerosRomanosEmArabicos[numeroRomano[i]]) {
                    numeroConvertido += numerosRomanosEmArabicos[numeroRomano[i]]
                    console.log(numeroConvertido)
                }
                else if (numerosRomanosEmArabicos[numeroRomano[i - 1]] < numerosRomanosEmArabicos[numeroRomano[i]]) {
                    numeroConvertido = numerosRomanosEmArabicos[numeroRomano[i]] - numeroConvertido
                    switch (numeroRomano[i]) {
                        case 'V':
                            if (numeroRomano[i - 1] === 'I')
                                --i
                            numeroConvertido =  numeroConvertido - numerosRomanosEmArabicos['I'] 
                            break
                        case 'X':
                            if (numeroRomano[i - 1] === 'I')
                                --i
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['I'] 
                            break
                        case 'L':
                            if (numeroRomano[i - 1] === 'X')
                                --i
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['X'] 
                            break
                        case 'C':
                            if (numeroRomano[i - 1] === 'X')
                                --i
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['X'] 
                            break
                        case 'D':
                            if (numeroRomano[i - 1] === 'C') --i
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['C'] 
                            break
                        case 'M':
                            if (numeroRomano[i - 1] === 'C') --i
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['C'] 
                            break
                    }
                }
                else numeroConvertido += numerosRomanosEmArabicos[numeroRomano[i]]

            }
        }
        setNumeroArabico(numeroConvertido.toString())
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
                <button onClick={() => converterNumero()} className={styles.conversor}>Converter</button>
            </div>
        </div>
    )
}