import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../Home/Home";
import { ConversorNumero } from "../components/ConversorNumeros/ConversorNumeros";
import { CalculadoraPedido } from "../components/CalculadorPedido/CalcularPedido";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [{
        path: '/',
        element: <Home />
    },
    {
        path: '/conversor_numeros',
        element: <ConversorNumero />
    },
    {
        path: '/calculadora_pedido',
        element: <CalculadoraPedido />
    }
    ]
}])