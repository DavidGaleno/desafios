import { MouseEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '../components/Button'
import { Span } from '../components/Span'
import { Select } from '../components/Select'
import { IProduto } from '../intefaces/IProduto'
import { Input } from '../components/Input'



export const CalculadoraPedido = () => {
    const taxaServico = 0.1
    const [textDividirProduto, setTextDividirProduto] = useState<string>('Dividir Produto')
    const [valorTotal, setValorTotal] = useState<Record<string, number>[]>([])
    const [produto, setProduto] = useState<string>()
    const [nome, setNome] = useState<string>('')
    const [clientes, setClientes] = useState<string[]>([])
    const [valorConsumo, setValorConsumo] = useState<Record<string, number>>({})
    const [compras, setCompras] = useState<Record<string, string[]>[]>([])
    const [produtos, setProdutos] = useState<IProduto[]>([
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
    useEffect(() => {
        const produtoComprado = produtos.find((item: IProduto) => item.nome === produto);
        if (produtoComprado?.divisao.includes(nome)) return setTextDividirProduto('Não Dividir Produto')
        return setTextDividirProduto('Dividir Produto')
    }, [nome, produto, produtos])

    const criarPedido = () => {
        setValorTotal([])
        if (!produto || !nome) return
        if (!valorConsumo[nome]) setClientes(prevClientes => [...prevClientes, nome])
        const produtoComprado = produtos.filter((item: IProduto) => item.nome === produto)

        const copiaValorConsumo = { ...valorConsumo }
        if (!copiaValorConsumo[nome]) copiaValorConsumo[nome] = 0
        copiaValorConsumo[nome] += produtoComprado[0].preco
        setValorConsumo(copiaValorConsumo)
        const compra: Record<string, string[]> = {}
        compra[nome] = []
        compra[nome].push(produto)

        const updatedCompras = [...compras]
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
        console.log(compras)
        if (!valorConsumo[nome]) return;
        if (!produto) return
        for (const compra of compras) {
            if (compra[nome] && !compra[nome].includes(produto)) return
        }

        const produtoComprado = produtos.find((item: IProduto) => item.nome === produto);

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
            setProdutos(updatedProdutos);
        }
    };
    const finalizarPedido = () => {
        const copiaValorConsumo = { ...valorConsumo };
        produtos.forEach((produto: IProduto) => {


            produto.divisao.forEach(cliente => {
                if (produto.divisao.length > 1) {
                    const quantidadeDivisao = produto.divisao.length;
                    copiaValorConsumo[cliente] -= produto.preco / quantidadeDivisao;
                }
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
        const copiaProdutos = produtos
        copiaProdutos.forEach(produto => produto.divisao = [])
        setProdutos(copiaProdutos)
        setCompras([])

    };
    const deletarPedido = (_e: MouseEvent<HTMLSpanElement>, cliente: string, produtoComprado: string) => {

        const updatedCompras = [...compras]
        for (const compra of updatedCompras) {
            if (compra[cliente].includes(produtoComprado)) compra[cliente].splice(compra[cliente].indexOf(produtoComprado), 1)
            setCompras(updatedCompras)

            const copiaValorConsumo = { ...valorConsumo }
            const produtoRemovido = produtos.find(produto => produto.nome === produtoComprado)
            if (produtoRemovido) {
                copiaValorConsumo[nome] -= produtoRemovido.preco
                setValorConsumo(copiaValorConsumo)
            }

        }
    }
    const deletarCliente = (_e: MouseEvent<HTMLSpanElement>, cliente: string) => {
        const updatedClientes = [...clientes]
        updatedClientes.splice(clientes.indexOf(cliente), 1)
        setClientes(updatedClientes)
        delete valorConsumo[cliente]
        const updatedCompras = [...compras]
        for (const compra of updatedCompras) {
            if (Object.keys(compra)[0] === cliente) updatedCompras.splice(updatedCompras.indexOf(compra), 1)
        }
        setCompras(updatedCompras)
        const updatedProdutos = [...produtos]
        for (const produto of updatedProdutos)
            if (produto.divisao.includes(cliente)) {
                updatedProdutos.splice(produtos.indexOf(produto), 1)
            }

        setProdutos(updatedProdutos)
    }

    const limpar = () => {
        setValorConsumo({})
        setClientes([])
        setValorTotal([])
        setNome('')
        setProduto("")
        setCompras([])
    }


    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Button onClick={() => dividirProduto()} text={textDividirProduto} />
                <Button onClick={() => criarPedido()} text='Criar Pedido' />
                <Button onClick={() => finalizarPedido()} text='Finalizar Pedido' />
                <Button onClick={() => limpar()} text='Limpar' />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className={styles.cadastro}>
                <Input maxLength={28} onChange={(e) => setNome(e.target.value)} value={nome} placeholder='Digite o nome do cliente' />
                <Select options={produtos} value={produto} onChange={(e) => setProduto(e.target.value)} />
            </form>
            <div className={styles.clientes}>
                {valorTotal.length > 0 && valorTotal.map(valor => (<Span text={`${Object.keys(valor)[0]}: R$${Object.values(valor)[0]}`} />
                ))}
                {compras.map((compra: Record<string, string[]>, index: number) => (
                    <div className={styles.clienteContainer}>
                        <Span text={Object.keys(compra)[0]} onClick={(e) => deletarCliente(e, Object.keys(compra)[0])} index={index} />
                        {Object.values(compra)[0].map((produto, index) => (
                            <Span text={produto} onClick={(e) => deletarPedido(e, Object.keys(compra)[0], produto)} index={index} />
                        ))}
                    </div>
                ))
                }

            </div>
        </div>
    )
}