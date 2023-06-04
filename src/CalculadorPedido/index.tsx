import { ChangeEvent, useState } from 'react'
import styles from './styles.module.css'

const valorProdutos: Record<string, number> = {
    Refrigerante: 8,
    Peixe: 20,
    Salada: 4,
    Cerveja: 6
}

const consumos: Record<string, string[]> = {
    David: ['Refrigerante', 'Peixe'],
    Debora: ['Refrigerante', 'Salada', 'Peixe'],
    Julio: ['Salada', 'Cerveja']
}



export const CalculadoraPedido = () => {
    const [clientes, setClientes] = useState(['David', 'Debora', 'Julio'])
    const [produtos, setProdutos] = useState(['Refrigerante', 'Peixe', 'Salada', 'Cerveja'])

    const produtosDivididos = ['Salada']

    const calcularValor = () => {


        const pagamentoTaxa: Record<string, boolean> = {
            David: false,
            Debora: false,
            Julio: false
        }


        const valorConsumo: Record<string, number> = {
            David: 0,
            Debora: 0,
            Julio: 0
        }

        const ocorrenciasProduto: Record<string, number> = {
            Refrigerante: 0,
            Peixe: 0,
            Salada: 0,
            Cerveja: 0
        }

        for (let values of Object.values(consumos)) {
            for (let produto of produtos) {
                if (values.includes(produto)) {
                    ocorrenciasProduto[produto] += 1
                }
            }
        }


        for (let [key, values] of Object.entries(consumos)) {
            for (let produto of produtos) {
                if (values.includes(produto)) {
                    if (produtosDivididos.includes(produto)) {
                        valorConsumo[key] += valorProdutos[produto] / ocorrenciasProduto[produto]
                    }
                    else {
                        valorConsumo[key] += valorProdutos[produto]
                    }
                }
            }
        }

        const produtosUnicos = []
        for (let produto of Object.keys(ocorrenciasProduto)) {
            if (ocorrenciasProduto[produto] === 1) produtosUnicos.push(produto)
        }

        for (let [key, values] of Object.entries(consumos)) {
            for (let produto of produtosUnicos) {
                if (values.includes(produto)) {
                    valorConsumo[key] += valorConsumo[key] * 0.1
                    pagamentoTaxa[key] = true
                }
            }

        }
        for (let [produto, ocorrencia] of Object.entries(ocorrenciasProduto)) {

            if (ocorrencia > 1 && produtosDivididos.includes(produto) === false) {
                for (let [pessoa, produtos] of Object.entries(consumos)) {
                    if (produtos.includes(produto) && !pagamentoTaxa[pessoa]) {
                        valorConsumo[pessoa] += valorConsumo[pessoa] * 0.1
                        pagamentoTaxa[pessoa] = true
                    }
                }

            }
        }


    }

    return (
        <div className="container">
            <input value={clientes[0]} type="text" placeholder='Insira um cliente' />
            <input value={clientes[1]} type="text" placeholder='Insira um cliente' />
            <input value={produtos[0]} type="text" placeholder='Insira um produto' />
            <input value={produtos[1]} type="text" placeholder='Insira um produto' />
            <button onClick={() => calcularValor()}>Enviar</button>
        </div>
    )
}