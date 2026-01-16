'use client';

import { PlusIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type PedidoItens = {
    CA: number;
    FB: number;
    CO: number;
    F: number;
};

export default function AddPedido() {

    const [itens, setItens] = useState({
        CA: 0,
        FB: 0,
        CO: 0,
        F: 0
    });
    const updateQuantidade = (tipo: keyof PedidoItens, valor: number) => {
        setItens(prev => {
            const novaQtd = prev[tipo] + valor;
            return {
                ...prev,
                [tipo]: novaQtd < 0 ? 0 : novaQtd
            };
        });
    };
    const zerarPedido = () => {
        setItens({
            CA: 0,
            FB: 0,
            CO: 0,
            F: 0
        });
    };

    const temItens = Object.values(itens).some(qtd => qtd > 0);
    return (
        <section className='w-full bg-cyan-50 px-4 py-6 max-w-md lg:max-w-4xl mx-auto relative rounded-lg' >
            <h2 className='text-2xl font-bold text-[#171918] mb-4' >
                Adicionar Pedido
            </h2>
            <button
                type="button"
                onClick={zerarPedido}
                className="absolute top-0.5 md:top-4 right-1 md:right-4 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Fechar Modal"
            >
                <XMarkIcon className="size-6" />
            </button>
            <form className='flex flex-col gap-4' >
                <div className='flex flex-col' >
                    <label className='mb-1 font-medium text-[#171918]' >
                        Nome:
                    </label>
                    <input type="text" className='text-[#171918] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8' >
                    <div className='bg-[#EA6E15] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('CA', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >CA</span>
                        <button type="button" onClick={() => updateQuantidade('CA', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#EA6E15] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('FB', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >FB</span>
                        <button type="button" onClick={() => updateQuantidade('FB', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#EA6E15] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('CO', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >CO</span>
                        <button type="button" onClick={() => updateQuantidade('CO', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#EA6E15] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('F', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >F</span>
                        <button type="button" onClick={() => updateQuantidade('F', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>
                </div>
                {temItens && (
                    <div className='bg-white p-4 rounded-lg border border-gray-200 mt-2 relative pr-12 animate-fade-in'>

                        <div className='flex flex-wrap gap-2'>
                            {Object.entries(itens).map(([nome, qtd]) => (
                                qtd > 0 && (
                                    <span key={nome} className='bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2'>
                                        {qtd}x {nome}
                                    </span>
                                )
                            ))}
                        </div>
                        <button
                            type='button'
                            onClick={zerarPedido}
                            className='absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors'
                            title="Limpar tudo"
                        >
                            <XMarkIcon className='size-5 md:size-6' />
                        </button>
                    </div>
                )}

                <button type="submit" className='bg-[#2A7D13] text-white px-4 py-2 rounded-md hover:bg-[#16430A] transition-colors cursor-pointer' >
                    Adicionar Pedido
                </button>
            </form>
        </section>
    );
}
