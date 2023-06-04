import { ChangeEvent, MouseEvent, useState } from 'react'
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
    const [novosClientes, setNovosClientes] = useState<string[]>([])
    const [nomesClientes, setNomesClientes] = useState<string[]>([])
    const [novosConsumos, setNovosConsumos] = useState<Record<string, string[]>>({})
    const [novoValorConsumo, setNovoValorConsumo] = useState<Record<string, number>>({})
    const [novoPagamentoTaxa, setNovoPagamentoTaxa] = useState<Record<string, boolean>>({})
    const [novoOcorrenciaProduto, setnovoOcorrenciaProduto] = useState<Record<string, number>>({})
    const [clientes, setClientes] = useState(['David', 'Debora', 'Julio'])
    const [produtos, setProdutos] = useState(['Refrigerante', 'Peixe', 'Salada', 'Cerveja'])

    const produtosDivididos = ['Salada']



    const calcularValor = () => {
        for (let novoCliente of novosClientes) {
            setNovosConsumos(prevConsumos => ({ ...prevConsumos, [novoCliente]: ['Salada'] }))
        }

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

    const criarCliente = (e: MouseEvent<HTMLButtonElement>) => {
        setNovosClientes(prevClientes => [...prevClientes, `Cliente${prevClientes.length}`])
        setNomesClientes(prevNomesClientes => [...prevNomesClientes, `Cliente${prevNomesClientes.length}`])
        setNovoValorConsumo(prevNovoValorConsumo => ({ ...prevNovoValorConsumo, [`Cliente${novoValorConsumo.length}`]: 0 }))
        setnovoOcorrenciaProduto(prevnovoOcorrenciaProduto => ({ ...prevnovoOcorrenciaProduto, [`Cliente${novoOcorrenciaProduto.length}`]: 0 }))
        setNovoPagamentoTaxa(prevPagamentoTaxa => ({ ...prevPagamentoTaxa, [`Cliente${novoPagamentoTaxa.length}`]: false }))
    }

    return (
        <div className="container">
            <button onClick={(e) => criarCliente(e)}>Novo Cliente</button>
            {novosClientes.map((cliente, index) => (
                <input key={index} type='text' value={nomesClientes[index]} onChange={(e) => nomesClientes[index] === e.target.value} />
            ))}
            <button onClick={() => {
                calcularValor()
            }}>Enviar</button>
        </div>
    )
}