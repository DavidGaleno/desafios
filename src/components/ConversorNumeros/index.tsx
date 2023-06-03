import { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'
export const ConversorNumero = () => {
    const [numeroRomanoValue, setNumeroRomanoValue] = useState('')
    const [numeroArabico,setNumeroArabico] = useState('')
    const padraoNumeroRomano = /^[IVXLCDM]+$/i

    //Essa função procura impedir que o usuário digite uma letra diferente de um número romano
    const validarNumeroRomano = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') return setNumeroRomanoValue(numeroRomanoValue.slice(0, -1))
        if (padraoNumeroRomano.test(e.target.value)) return setNumeroRomanoValue(e.target.value.toUpperCase())
    }

    //Essa função permite que somente um dos Inputs esteja preenchido. Ou seja, se o usuário começar a digitar um número romano, o número arábico no outro input será apagado. Da mesma forma para o número romano, caso um número arábico seja digitado
    const checarValorContrario = (e: ChangeEvent<HTMLInputElement>) => {
        if (padraoNumeroRomano.test(e.target.value)) return setNumeroArabico('')
        return setNumeroRomanoValue('')
    }



    return (
        <div className={styles.container}>
            <form className={styles.conversorContainer}>
                <h1 className={styles.title}>Conversor Entre Números Arábicos e Romanos</h1>
                <div className={styles.numbers}>
                    <input value={numeroRomanoValue} type="text" className={styles.numeroArabico} name="numeroRomano" id="numeroRomano" placeholder='Digite um número romano' onChange={(e) => {
                        validarNumeroRomano(e)
                        checarValorContrario(e)
                    }} />
                    <input value={numeroArabico} type="number" className={styles.numeroArabico} name="numeroArabico" id="numeroArabico" placeholder='Digite um número arábico' onChange={(e)=>{
                        setNumeroArabico(e.target.value)
                        checarValorContrario(e)
                    }} />
                </div>
                <button className={styles.conversor}>Converter</button>
            </form>
        </div>
    )
}