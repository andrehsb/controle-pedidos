import { ArrowUturnLeftIcon, CheckIcon, FireIcon, PencilIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export type StatusPedido = 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';

export type Pedido = {
    id: number;
    nome: string;
    itens: { [key: string]: number };
    status: StatusPedido;
};

type ListPedidosProps = {
    titulo: string;
    pedidos: Pedido[];
    corTitulo: string;
    textoBotao: string;
    markStatus: (id: number) => void;
    voltar?: (id: number) => void;
    editar?: (pedido: Pedido) => void;
    idSelecionado: number | null;
    aoSelecionar: (id: number) => void;
    destacarSelecao: boolean;
};

const coresStatus = {
    PREPARANDO: 'bg-gray-800 hover:bg-black',
    PRONTO: 'bg-green-600 hover:bg-green-700',
    ENTREGUE: 'bg-gray-400 hover:bg-gray-500',
};

const titleButton = {
    PREPARANDO: 'MARCAR COMO PRONTO',
    PRONTO: 'ENTREGAR PEDIDO',
    ENTREGUE: 'FINALIZAR PEDIDO',
};


export default function ListPedidos({ titulo, pedidos, corTitulo, textoBotao, markStatus, voltar, editar, idSelecionado, aoSelecionar, destacarSelecao }: ListPedidosProps) {

    const [listaAberta, setListaAberta] = useState(true);

    useEffect(() => {
        if (idSelecionado && destacarSelecao) {
            const pedidoEstaNestaLista = pedidos.some(p => p.id === idSelecionado);
            if (pedidoEstaNestaLista) {
                const elemento = document.getElementById(`pedido-${idSelecionado}`);
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',    
                        inline: 'nearest'
                    });
                }
            }
        }
    }, [idSelecionado, destacarSelecao, pedidos]);

    useEffect(() => {
        const handleActionKey = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (idSelecionado) {
                    const pedidoDestaLista = pedidos.find(p => p.id === idSelecionado);
                    if (pedidoDestaLista) {
                        event.preventDefault();
                        markStatus(idSelecionado);
                    }
                }
            } else if (event.key === 'Backspace' || event.key === 'Delete') {
                if (idSelecionado) {
                    const pedidoDestaLista = pedidos.find(p => p.id === idSelecionado);
                    if (pedidoDestaLista && voltar) {
                        event.preventDefault();
                        voltar(idSelecionado);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleActionKey);
        return () => window.removeEventListener('keydown', handleActionKey);
    }, [idSelecionado, pedidos, markStatus]);

    return (

        <section className="w-full mt-4 px-2">
            <div
                onClick={() => setListaAberta(!listaAberta)}
                className={`group cursor-pointer select-none flex items-center justify-between mb-4 border-b pb-2 
                ${corTitulo} `}
            >
                <div className="flex items-center gap-3">

                    <h2 className="text-2xl font-bold">
                        {titulo}
                    </h2>
                    <ChevronUpIcon
                        className={`size-6 transition-transform duration-300 ${listaAberta ? '' : 'rotate-180'}`}
                    />
                    <span className="text-sm font-normal text-gray-400 group-hover:text-gray-600 transition-colors">
                        {listaAberta ? '(fechar)' : '(abrir)'}
                    </span>
                </div>
                <span className="text-sm text-gray-500 font-normal">{pedidos.length} pedidos</span>
            </div>

            {pedidos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum pedido na fila.</p>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {listaAberta && pedidos.map((pedido) => {
                        const estaSelecionado = idSelecionado === pedido.id && destacarSelecao;
                        return (
                            <div key={pedido.id} onClick={() => aoSelecionar(pedido.id)}
                            id={`pedido-${pedido.id}`} 
                            className={`
                                relative p-4 gap-3 rounded-lg shadow-sm border flex flex-col justify-between h-full cursor-pointer transition-all duration-200
                                ${estaSelecionado
                                ? 'border-orange-500 ring-4 ring-orange-200 scale-105 z-10 bg-orange-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }
                            `}>
                                {editar && (
                                    <button
                                        onClick={() => editar(pedido)}
                                        className="absolute top-2 right-2 p-1.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-md transition-colors z-10"
                                        title="Desfazer / Voltar para Grelha"
                                    >
                                        <PencilIcon className="size-6" />
                                    </button>
                                )}
                                {voltar && (
                                    <button
                                        onClick={() => voltar(pedido.id)}
                                        className="absolute top-2 right-2 p-1.5 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-md transition-colors z-10"
                                        title="Desfazer / Voltar para Grelha"
                                    >
                                        <ArrowUturnLeftIcon className="size-6" />
                                    </button>
                                )}

                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg text-gray-800">{pedido.nome}</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {Object.entries(pedido.itens).map(([nome, qtd]) => (
                                            qtd > 0 && (
                                                <span key={nome} className='bg-[#C47D64] text-[#572F21] px-3 py-2 md:px-3 md:py-2 rounded-full text-16px font-bold flex items-center gap-2'>
                                                    {qtd}x {nome}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => markStatus(pedido.id)}
                                    className={`w-full sm:w-auto px-6 py-3 md:px-3 md:py-2 rounded-lg font-bold text-white shadow-md 
                                    transition-all active:scale-95 flex items-center justify-center gap-2 ${coresStatus[pedido.status]}`}
                                >
                                    {pedido.status === 'PREPARANDO' ? <FireIcon className="size-5" /> : <CheckIcon className="size-5" />}
                                    {textoBotao}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}