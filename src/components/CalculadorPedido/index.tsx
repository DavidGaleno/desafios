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
    const [produto, setProduto] = useState<string>()
    const [produtoDividido, setProdutoDividido] = useState<string>()
    const [nome, setNome] = useState<string>('')
    const [clientes, setClientes] = useState<string[]>([])
    const [compras, setCompras] = useState<Record<string, string[]>>({})
    const [valorConsumo, setValorConsumo] = useState<Record<string, number>>({})
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

        if (!valorConsumo[nome]) setClientes(prevClientes => [...prevClientes, nome])
        const produtoComprado = produtos.filter((item: Produto) => item.nome === produto)

        const copiaValorConsumo = { ...valorConsumo }
        if (!copiaValorConsumo[nome]) copiaValorConsumo[nome] = 0
        copiaValorConsumo[nome] += produtoComprado[0].preco
        setValorConsumo(copiaValorConsumo)
    }

    const dividirProduto = () => {
        if (!valorConsumo[nome]) return;
        const produtoComprado = produtos.find((item: Produto) => item.nome === produto);

        if (produtoComprado) {
            const updatedProdutos = [...produtos]; // Create a copy of the produtos array
            const index = updatedProdutos.indexOf(produtoComprado);
            updatedProdutos[index] = {
                ...updatedProdutos[index], // Copy the existing product object
                divisao: [...updatedProdutos[index].divisao, nome] // Update the divisao array
            };
            setProdutos(updatedProdutos); // Update the state with the modified array
        }
    };
    const finalizarPedido = () => {

        produtos.forEach((produto: Produto) => {
            if (produto.divisao.length < 1) return
            const copiaValorConsumo = { ...valorConsumo };
            const quantidadeDivisao = produto.divisao.length;
            produto.divisao.forEach(cliente => {
                copiaValorConsumo[cliente] -= produto.preco / quantidadeDivisao;
            });
            console.log(copiaValorConsumo)
            clientes.forEach(cliente => {
                copiaValorConsumo[cliente] += Number((copiaValorConsumo[cliente] * 0.1).toFixed(2))

            })
            setValorConsumo(prevValorConsumo => ({ ...prevValorConsumo, ...copiaValorConsumo }));
            console.log(produtos)
        });

    };


    return (
        <div className={styles.container}>
            <div className={styles.clientes}>
                {clientes.map((cliente: string, index: number) => (
                    <div className={styles.clienteContainer}>
                        <span key={index} className={styles.cliente}>{cliente}</span>
                        {valorConsumo[cliente] && <span key={index} className={styles.cliente}>R${valorConsumo[cliente]}</span>}
                    </div>
                ))
                }

            </div>
            <form onSubmit={(e) => e.preventDefault()} className={styles.cadastro}>
                <input className={styles.input} type="text" onChange={(e) => setNome(e.target.value)} value={nome} name="" id="" placeholder='Digite o nome do cliente' required />
                <select className={styles.produtos} onChange={(e) => setProduto(e.target.value)} value={produto} name="" id="" required>
                    <option value="" hidden selected>Selecione um produto para ser comprado</option>
                    {produtos.map((produto: Produto) => <option className={styles.produto}>{produto.nome}</option>)}
                </select>

                <div className={styles.buttons}>
                    <button className={styles.button} onClick={(e) => dividirProduto()}>Dividir Produto</button>

                    <button className={styles.button} onClick={(e) => criarPedido()}>Criar Pedido</button>
                    <button className={styles.button} onClick={(e) => finalizarPedido()}>Finalizar Pedido</button>
                </div>
            </form>
        </div>
    )
}