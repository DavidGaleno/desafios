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

interface Produto {
    nome: string
    preco: number
    divisao: string[]
}
interface Compra {
    cliente: string
    produto: string[]
}

export const CalculadoraPedido = () => {
    const taxaServico = 0.1
    const [valorTotal, setValorTotal] = useState<Record<string, number>[]>([])
    const [produto, setProduto] = useState<string>()
    const [nome, setNome] = useState<string>('')
    const [clientes, setClientes] = useState<string[]>([])
    const [valorConsumo, setValorConsumo] = useState<Record<string, number>>({})
    const [compras, setCompras] = useState<Record<string, string[]>[]>([])
    const [produtos, setProdutos] = useState<Produto[]>([
        {
            nome: 'Refrigerante', preco: 8, divisao: []
        },
        {
            nome: 'Peixe', preco: 20, divisao: []
        },
        {
            nome: 'Salada', preco: 4, divisao: []
        },
        {
            nome: 'Cerveja', preco: 6, divisao: []
        }
    ]);

    const criarPedido = () => {
        setValorTotal([])
        if (!produto || !nome) return
        console.log('oi')
        if (!valorConsumo[nome]) setClientes(prevClientes => [...prevClientes, nome])
        const produtoComprado = produtos.filter((item: Produto) => item.nome === produto)

        const copiaValorConsumo = { ...valorConsumo }
        if (!copiaValorConsumo[nome]) copiaValorConsumo[nome] = 0
        copiaValorConsumo[nome] += produtoComprado[0].preco
        setValorConsumo(copiaValorConsumo)
        const compra: Record<string, string[]> = {}
        compra[nome] = []
        compra[nome].push(produto)

        const updatedCompras = [...compras]
        console.log(updatedCompras)
        for (let i = 0; i < updatedCompras.length; i++) {
            const item = updatedCompras[i]
            if (item[nome]) {
                if (item[nome].includes(produto)) return
                updatedCompras[i] = { ...item, [nome]: [...item[nome], produto] }
                setCompras(updatedCompras)
                return
            }
        }

        updatedCompras.push(compra)
        setCompras(updatedCompras)

    }


    const dividirProduto = () => {
        if (!valorConsumo[nome]) return;
        const produtoComprado = produtos.find((item: Produto) => item.nome === produto);

        if (produtoComprado) {
            const updatedProdutos = [...produtos];
            const index = updatedProdutos.indexOf(produtoComprado);
            if (produtoComprado.divisao.includes(nome)) {
                produtoComprado.divisao.splice(produtoComprado.divisao.indexOf(nome), 1)
                updatedProdutos[index] = { ...updatedProdutos[index], [nome]: produtoComprado }
            }
            else {
                updatedProdutos[index] = {
                    ...updatedProdutos[index],
                    divisao: [...updatedProdutos[index].divisao, nome]
                };
            }
            console.log(updatedProdutos)
            setProdutos(updatedProdutos);
        }
    };
    const finalizarPedido = () => {
        const copiaValorConsumo = { ...valorConsumo };

        produtos.forEach((produto: Produto) => {

            const quantidadeDivisao = produto.divisao.length > 1 ? produto.divisao.length : 1;

            produto.divisao.forEach(cliente => {
                console.log('oi')
                copiaValorConsumo[cliente] -= produto.preco / quantidadeDivisao;
            });
        });
        const updatedValorTotal = [...valorTotal]
        clientes.forEach(cliente => {
            copiaValorConsumo[cliente] += Number((copiaValorConsumo[cliente] * taxaServico).toFixed(2))
            updatedValorTotal.push({ [cliente]: copiaValorConsumo[cliente] })
        })
        setValorConsumo({})
        setClientes([])
        setValorTotal(updatedValorTotal)
        setNome('')
        setProduto("")
        setCompras([])

    };
    const deletarPedido = (e: MouseEvent<HTMLSpanElement>, cliente: string, produtoComprado: string) => {

        const updatedCompras = [...compras]
        for (const compra of updatedCompras) {
            console.log(produtoComprado)
            console.log(compra[cliente].includes(produtoComprado))
            if (compra[cliente].includes(produtoComprado)) compra[cliente].splice(compra[cliente].indexOf(produtoComprado), 1)
            console.log(updatedCompras)
            setCompras(updatedCompras)

            const copiaValorConsumo = { ...valorConsumo }
            const produtoRemovido = produtos.find(produto => produto.nome === produtoComprado)
            if (produtoRemovido) {
                copiaValorConsumo[nome] -= produtoRemovido.preco
                setValorConsumo(copiaValorConsumo)
            }

        }
    }
    const deletarCliente = (e: MouseEvent<HTMLSpanElement>, cliente: string) => {
        const updatedClientes = [...clientes]
        updatedClientes.splice(clientes.indexOf(cliente), 1)
        setClientes(updatedClientes)
        delete valorConsumo[cliente]
        const updatedCompras = [...compras]
        for (const compra of updatedCompras) {
            if (Object.keys(compra)[0] === cliente) updatedCompras.splice(updatedCompras.indexOf(compra), 1)
        }
        const updatedProdutos = [...produtos]
        for (const produto of updatedProdutos)
            if (produto.divisao.includes(cliente)) {
                updatedProdutos.splice(produtos.indexOf(produto), 1)
            }
        setProdutos(updatedProdutos)
    }


    return (
        <div className={styles.container}>
            <div className={styles.clientes}>
                {valorTotal.length > 0 && valorTotal.map(valor => (<span className={styles.cliente}>{Object.keys(valor)[0]}: R${Object.values(valor)[0]}</span>
                ))}
                {compras.map((compra: Record<string, string[]>, index: number) => (
                    <div className={styles.clienteContainer}>
                        <span onClick={(e) => deletarCliente(e, Object.keys(compra)[0])} key={index} className={styles.cliente}>{Object.keys(compra)[0]}:</span>
                        {Object.values(compra)[0].map((produto, index) => (
                            <span onClick={(e) => deletarPedido(e, Object.keys(compra)[0], produto)} key={index} className={styles.cliente}>
                                {produto}{index !== Object.values(compra)[0].length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                ))
                }

            </div>
            <form onSubmit={(e) => e.preventDefault()} className={styles.cadastro}>
                <input className={styles.input} type="text" onChange={(e) => setNome(e.target.value)} value={nome} name="" id="" placeholder='Digite o nome do cliente' required />
                <select className={styles.produtos} onChange={(e) => setProduto(e.target.value)} value={produto} name="" id="" required>
                    <option value="">Selecione um produto para ser comprado</option>
                    {produtos.map((produto: Produto, index: number) => <option key={index} className={styles.produto}>{produto.nome}</option>)}
                </select>

                <div className={styles.buttons}>
                    <button className={styles.button} onClick={() => dividirProduto()}>Dividir Produto</button>

                    <button className={styles.button} onClick={() => criarPedido()}>Criar Pedido</button>
                    <button className={styles.button} onClick={() => finalizarPedido()}>Finalizar Pedido</button>
                </div>
            </form>
        </div>
    )
}