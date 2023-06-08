import { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
import { Input } from '../Input'
import { Button } from '../Button'
import { Title } from '../Title'
import { ButtonHome } from '../../../Home/ButtonHome'

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
    const padraoNumeroRomano = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i


    //Essa função procura impedir que o usuário digite uma letra diferente de um número romano. A validação aceita letras maículas e minusculas, convertendo sempre para caixa alta
    const validarNumeroRomano = (e: ChangeEvent<HTMLInputElement>) => {
        const numeroInserido = e.target.value.toUpperCase()


        if (!padraoNumeroRomano.test(numeroInserido)) setNumeroRomano(numeroRomano)
        else { setNumeroRomano(numeroInserido) }

    }

    //Essa função procura impedir que o usuário digite um número maior que 3999 ou menor que 1
    const validarNumeroArabico = (e: ChangeEvent<HTMLInputElement>) => {
        //Isso garante que o usuário possa apagar o valor digitado no input
        if (e.target.value === '') return setNumeroArabico(numeroRomano.slice(0, -1))
        const numero = Number(e.target.value)
        if (numero < 1 || numero > 3999) return
        setNumeroArabico(e.target.value)
    }

    //Se a variavel numeroRomano estiver preenchida, será feita a conversão para número árabe. 
    //Se não, será feita a conversão para número romano
    const converterNumero = () => {
        if (numeroRomano) return converterParaArabico()
        return converterParaRomano()

    }
    const converterParaArabico = () => {

        let numeroConvertido = 0
        //Se a largura do número romano for igual a 1, será feita apenas uma consulta direta ao objeto com
        //os valores da conversão
        if (numeroRomano.length === 1) numeroConvertido = numerosRomanosEmArabicos[numeroRomano]

        else if (numeroRomano.length > 1) {
            for (let i = numeroRomano.length - 1; i >= 0; i--) {
                //Se o número da esquerda for maior que o número da direita, será realizada uma soma entre eles
                if (numerosRomanosEmArabicos[numeroRomano[i - 1]] >= numerosRomanosEmArabicos[numeroRomano[i]]) {
                    numeroConvertido += numerosRomanosEmArabicos[numeroRomano[i]]
                }
                //Se o número da direita for menor que o número da esquerda, será feita uma subtração
                else if (numerosRomanosEmArabicos[numeroRomano[i - 1]] < numerosRomanosEmArabicos[numeroRomano[i]]) {
                    numeroConvertido = numerosRomanosEmArabicos[numeroRomano[i]] - numeroConvertido
                    //Nesse caso, é feito o Switch com casos específicos de números antecessores
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

                <Title text="Conversor Arábico-Romano" />
                {ordem ? <div className={styles.numbers}>
                    <Input type="text" value={numeroRomano} onChange={(e) => {
                        trocarValor(e)
                        validarNumeroRomano(e)
                    }} placeholder='Digite um número romano' />
                    <Button onClick={() => setOrdem(!ordem)} text='Inverter' />
                    <Input type="number" value={numeroArabico} onChange={(e) => {
                        trocarValor(e)
                        validarNumeroArabico(e)
                    }} placeholder='Digite um número arábico' />
                </div>
                    :
                    <div className={styles.numbers}>
                        <Input type="number" value={numeroArabico} onChange={(e) => {
                            trocarValor(e)
                            validarNumeroArabico(e)
                        }} placeholder='Digite um número arábico' />
                        <Button onClick={() => setOrdem(!ordem)} text='Inverter' />
                        <Input type="text" value={numeroRomano} onChange={(e) => {
                            trocarValor(e)
                            validarNumeroRomano(e)
                        }} placeholder='Digite um número romano' />

                    </div>}
                <Button onClick={() => converterNumero()} text='Converter' />
                <ButtonHome route='/' text='Voltar' />
            </div>
        </div>
    )
}