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
    const [ordem, setOrdem] = useState(false)
    const padraoNumeroRomano = /^[IVXLCDM]+$/i

    //Essa função procura impedir que o usuário digite uma letra diferente de um número romano. A validação aceita letras maículas e minusculas, convertendo sempre para caixa alta
    const validarNumeroRomano = (e: KeyboardEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.key === 'Backspace') return setNumeroRomano(numeroRomano.slice(0, -1))

        if (!padraoNumeroRomano.test(e.key)) return setNumeroRomano(numeroRomano)
        const numeroInserido = e.key.toUpperCase()

        for (let i = 0; i < numeroRomano.length; i++) {
            if (numeroRomano[i - 2] === numeroInserido && numeroRomano[i - 1] === numeroInserido && numeroRomano[i] === numeroInserido) return

        }

        if (numeroRomano[numeroRomano.length - 2] === 'I' && numeroRomano[numeroRomano.length - 1] === 'V') return
        if (numeroRomano[numeroRomano.length - 2] === 'I' && numeroRomano[numeroRomano.length - 1] === 'X') return






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
        if (numeroRomano) return converterParaArabico()
        return converterParaRomano()

    }
    const converterParaArabico = () => {

        let numeroConvertido = 0
        if (numeroRomano.length === 1) numeroConvertido = numerosRomanosEmArabicos[numeroRomano]

        else if (numeroRomano.length > 1) {
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
                            numeroConvertido = numeroConvertido - numerosRomanosEmArabicos['I']
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

    const converterParaRomano = () => {
        let numeroConvertido = ''
        let numeroRepeticoes = 0
        let number = Number(numeroArabico)
        if (number >= 1000) {
            numeroRepeticoes = Math.floor((number / 1000))
            console.log(numeroRepeticoes)
            numeroConvertido += 'M'.repeat(numeroRepeticoes)
            number -= 1000 * numeroRepeticoes
        }
        console.log(number)
        if (number === 900) {
            numeroConvertido += 'CM'
            number -= 900
        }
        if (number >= 500) {
            numeroRepeticoes = Math.floor((number / 500))
            numeroConvertido += 'D'.repeat(numeroRepeticoes)
            number -= 500 * numeroRepeticoes
        }
        if (number === 400) {
            numeroConvertido += 'CD'
            number -= 400
        }
        if (number >= 100) {
            numeroRepeticoes = Math.floor((number / 100))
            numeroConvertido += 'C'.repeat(numeroRepeticoes)
            number -= 100 * numeroRepeticoes
        }
        if (number === 90) {
            numeroConvertido += 'XC'
            number -= 90
        }
        if (number >= 50) {
            numeroRepeticoes = Math.floor((number / 50))
            numeroConvertido += 'L'.repeat(numeroRepeticoes)
            number -= 50 * numeroRepeticoes
        }
        if (number === 40) {
            numeroConvertido += 'XL'
            number -= 40
        }
        if (number >= 10) {
            numeroRepeticoes = Math.floor((number / 10))
            numeroConvertido += 'X'.repeat(numeroRepeticoes)
            number -= 10 * numeroRepeticoes
        }
        if (number === 9) {
            numeroConvertido += 'IX'
            number -= 9
        }
        if (number >= 5) {
            numeroRepeticoes = Math.floor((number / 5))
            numeroConvertido += 'V'.repeat(numeroRepeticoes)
            number -= 5 * numeroRepeticoes
        }
        if (number === 4) {
            numeroConvertido += 'IV'
            number -= 4
        }
        if (number >= 1) {
            numeroRepeticoes = Math.floor((number / 1))
            numeroConvertido += 'I'.repeat(numeroRepeticoes)
            number -= 1 * numeroRepeticoes
        }
        setNumeroRomano(numeroConvertido)
    }

    const trocarValor = (e: ChangeEvent<HTMLInputElement>) => {
        if (padraoNumeroRomano.test(e.target.value) && numeroArabico) setNumeroArabico('')
        if (!padraoNumeroRomano.test(e.target.value) && numeroRomano) setNumeroRomano('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.conversorContainer}>
                <h1 className={styles.title}>Conversor Entre Números Arábicos e Romanos</h1>
                {ordem ? <div className={styles.numbers}>
                    <input value={numeroRomano} type="text" className={styles.numeroArabico} onChange={(e) => trocarValor(e)} name="numeroRomano" id="numeroRomano" placeholder='Digite um número romano' onKeyDown={(e) => validarNumeroRomano(e)} />
                    <button onClick={() => setOrdem(!ordem)} className={styles.conversor}>Inverter</button>
                    <input value={numeroArabico} type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' onChange={(e) => {
                        validarNumeroArabico(e)
                        trocarValor(e)
                    }} />
                </div>
                    :
                    <div className={styles.numbers}>
                        <input value={numeroArabico} type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' onChange={(e) => {
                            validarNumeroArabico(e)
                            trocarValor(e)
                        }} />
                        <button onClick={() => setOrdem(!ordem)} className={styles.conversor}>Inverter</button>
                        <input value={numeroRomano} type="text" onChange={(e) => trocarValor(e)} className={styles.numeroArabico} name="numeroRomano" id="numeroRomano" placeholder='Digite um número romano' onKeyDown={(e) => validarNumeroRomano(e)} />

                    </div>}
                <button onClick={() => converterNumero()} className={styles.conversor}>Converter</button>
            </div>
        </div>
    )
}