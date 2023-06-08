import { MouseEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '../components/Button'
import { Span } from '../components/Span'
import { Select } from '../components/Select'
import { IProduto } from '../intefaces/IProduto'
import { Input } from '../components/Input'
import { ButtonHome } from '../../../Home/ButtonHome'



export const CalculadoraPedido = () => {
    const taxaServico = 0.1
    //Representa o pago inicialmente por cada usuário, sem considerar taxas e divisões
    const [valorConsumo, setValorConsumo] = useState<Record<string, number>>({})
    //Valor resultado da soma dos produtos do valorConsumo de cada cliente + taxa de serviço - descontos de produtos divididos
    const [valorFinal, setvalorFinal] = useState<Record<string, number>[]>([])
    //Esse texto será Dividir Produto quando o usuário não tiver clicado no botão dividir produto e será Não Dividir Produto quando o
    //usuário já tiver clicado em Dividir Produto
    const [textDividirProduto, setTextDividirProduto] = useState<string>('Dividir Produto')
    const [produto, setProduto] = useState<string>()
    const [usuario, setUsuario] = useState<string>('')
    const [clientes, setClientes] = useState<string[]>([])
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

    //Sempre que o usuário no Input, o produto no Select ou os usuarios inseridos dentro do produto.divisao mudar, será checado
    //se o usuário já pediu para dividir esse produto, podendo mudar a aparência do textDividirProduto 
    useEffect(() => {
        const produtoComprado = produtos.find((item: IProduto) => item.nome === produto);
        if (produtoComprado?.divisao.includes(usuario)) return setTextDividirProduto('Não Dividir Produto')
        return setTextDividirProduto('Dividir Produto')
    }, [usuario, produto, produtos])

    const criarPedido = () => {
        //Reinicia o valor final da aplicação. Só faz sentido após a finalização de um pedido
        setvalorFinal([])

        if (!produto || !usuario) return
        if (!valorConsumo[usuario]) setClientes(prevClientes => [...prevClientes, usuario])
        const produtoComprado = produtos.filter((item: IProduto) => item.nome === produto)

        //Cria uma cópia do array que representa o valor consumido por cada cliente
        //Será somado o valor de cada produto comprado pelo cliente
        const copiaValorConsumo = { ...valorConsumo }
        if (!copiaValorConsumo[usuario]) copiaValorConsumo[usuario] = 0
        copiaValorConsumo[usuario] += produtoComprado[0].preco
        setValorConsumo(copiaValorConsumo)


        const compra: Record<string, string[]> = {}
        compra[usuario] = []
        compra[usuario].push(produto)

        //É criada uma cópia do array com as compras dos usuários
        //É criada uma variável item que representa um usuário e suas compras
        //Se já houver um item com o usuário escrito no Input, será apenas adicionado um usuário ao array
        const updatedCompras = [...compras]
        for (let i = 0; i < updatedCompras.length; i++) {
            const item = updatedCompras[i]
            if (item[usuario]) {
                updatedCompras[i] = { ...item, [usuario]: [...item[usuario], produto] }
                setCompras(updatedCompras)
                return
            }
        }
        //Se o usuário ainda não estiver no array será adicionado
        updatedCompras.push(compra)
        setCompras(updatedCompras)

    }


    const dividirProduto = () => {
        if (!valorConsumo[usuario] || !produto || !usuario) return;


        const produtoComprado = produtos.find((item: IProduto) => item.nome === produto);

        //Se o produto já tiver sido comprado, então será autorizada a divisão do produto
        if (produtoComprado) {
            const updatedProdutos = [...produtos];
            const index = updatedProdutos.indexOf(produtoComprado);
            //Caso o produto já tenha sido dividido, será cancelada a divisão
            if (produtoComprado.divisao.includes(usuario)) {
                produtoComprado.divisao.splice(produtoComprado.divisao.indexOf(usuario), 1)
                updatedProdutos[index] = { ...updatedProdutos[index], [usuario]: produtoComprado }
            }
            //O produto será dividido
            else {
                updatedProdutos[index] = {
                    ...updatedProdutos[index],
                    divisao: [...updatedProdutos[index].divisao, usuario]
                };
            }
            setProdutos(updatedProdutos);
        }
    };
    const finalizarPedido = () => {
        const copiaValorConsumo = { ...valorConsumo };
        produtos.forEach((produto: IProduto) => {
            //Serão realizados os descontos devido a divisão dos produtos
            produto.divisao.forEach(cliente => {
                if (produto.divisao.length > 1) {
                    const quantidadeDivisao = produto.divisao.length;
                    copiaValorConsumo[cliente] -= produto.preco / quantidadeDivisao;
                }
            });
        });
        const updatedvalorFinal = [...valorFinal]
        //Realiza a aplicação das taxas de serviço no valor final
        clientes.forEach(cliente => {
            copiaValorConsumo[cliente] += Number((copiaValorConsumo[cliente] * taxaServico).toFixed(2))
            updatedvalorFinal.push({ [cliente]: copiaValorConsumo[cliente] })
        })
        //Zera os valores de todas as variáveis, salvo a variável valorFinal
        setValorConsumo({})
        setClientes([])
        setvalorFinal(updatedvalorFinal)
        setUsuario('')
        setProduto("")
        const copiaProdutos = produtos
        copiaProdutos.forEach(produto => produto.divisao = [])
        setProdutos(copiaProdutos)
        setCompras([])

    };
        
    const deletarPedido = (_e: MouseEvent<HTMLSpanElement>, cliente: string, produtoComprado: string) => {

        const updatedCompras = [...compras]
        for (const compra of updatedCompras) {
            if (compra[cliente] && compra[cliente].includes(produtoComprado)) compra[cliente].splice(compra[cliente].indexOf(produtoComprado), 1)
            setCompras(updatedCompras)

            const copiaValorConsumo = { ...valorConsumo }
            const produtoRemovido = produtos.find(produto => produto.nome === produtoComprado)
            if (produtoRemovido) {
                copiaValorConsumo[usuario] -= produtoRemovido.preco
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
        setvalorFinal([])
        setUsuario('')
        setProduto("")
        setCompras([])
    }


    return (
        <div className={styles.container}>
            <ButtonHome route='/' text='Voltar' />
            <div className={styles.buttons}>
                <Button onClick={() => dividirProduto()} text={textDividirProduto} />
                <Button onClick={() => criarPedido()} text='Criar Pedido' />
                <Button onClick={() => finalizarPedido()} text='Finalizar Pedido' />
                <Button onClick={() => limpar()} text='Limpar' />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className={styles.cadastro}>
                <Input maxLength={28} onChange={(e) => setUsuario(e.target.value)} value={usuario} placeholder='Digite o nome do cliente' />
                <Select options={produtos} value={produto} onChange={(e) => setProduto(e.target.value)} />
            </form>
            <div className={styles.clientes}>
                {valorFinal.length > 0 && valorFinal.map(valor => (<Span text={`${Object.keys(valor)[0]}: R$${Object.values(valor)[0]}`} />
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