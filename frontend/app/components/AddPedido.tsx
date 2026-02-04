'use client';

import { PlusIcon, XMarkIcon, MinusIcon} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type PedidoItens = {
    CA: number;
    FB: number;
    CO: number;
    F: number;
    J: number;
};

const PRECOS: Record<keyof PedidoItens, number> = {
    CA: 12.00,
    FB: 12.00,
    CO: 10.00,
    F: 10.00,
    J: 15.00
};

type AddPedidoProps = {
    closeModal: () => void;
    aoAdicionar: (nome: string, itens: PedidoItens) => void;
    pedidoEditar?: { nome: string; itens: any } | null;
};

export default function AddPedido({ closeModal, aoAdicionar, pedidoEditar }: AddPedidoProps) {

    const [nome, setNome] = useState('');

    const [itens, setItens] = useState({
        CA: 0,
        FB: 0,
        CO: 0,
        F: 0,
        J: 0
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

    useEffect(() => {
        if (pedidoEditar) {
            setNome(pedidoEditar.nome);
            setItens({
                CA: pedidoEditar.itens.CA || 0,
                FB: pedidoEditar.itens.FB || 0,
                CO: pedidoEditar.itens.CO || 0,
                F: pedidoEditar.itens.F || 0,
                J: pedidoEditar.itens.J || 0
            });
        } else {
            // Limpa se for novo pedido
            setNome('');
            setItens({ CA: 0, FB: 0, CO: 0, F: 0, J: 0 });
        }
    }, [pedidoEditar]);

    const zerarPedido = () => {
        setItens({
            CA: 0,
            FB: 0,
            CO: 0,
            F: 0,
            J: 0
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        aoAdicionar(nome, itens);
        closeModal();
    };

    const totalPedido = Object.entries(itens).reduce((acc, [key, qtd]) => {
        const precoItem = PRECOS[key as keyof PedidoItens];
        return acc + (qtd * precoItem);
    }, 0);

    const formatarMoeda = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const temItens = Object.values(itens).some(qtd => qtd > 0);
    return (
        <section className='w-full bg-[#F0EACD] px-4 py-6 max-w-md lg:max-w-4xl mx-auto relative rounded-lg' >
            <h2 className='text-2xl font-bold text-[#171918] mb-4' >
                {pedidoEditar ? "Editar Pedido" : "Adicionar Pedido"}
            </h2>
            <button
                type="button"
                onClick={closeModal}
                className="absolute top-0.5 md:top-4 right-1 md:right-4 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Fechar Modal"
            >
                <XMarkIcon className="size-6" />
            </button>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
                <div className='flex flex-col' >
                    <label className='mb-1 font-medium text-[#171918]' >
                        Nome:
                    </label>
                    <input type="text" value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='text-[#171918] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#737373]' />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8' >
                    <div className='bg-[#0E0E0E] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('CA', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >Carne</span>
                        <button type="button" onClick={() => updateQuantidade('CA', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#F08E09] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('FB', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >Medalhão</span>
                        <button type="button" onClick={() => updateQuantidade('FB', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#833215] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('CO', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >Coração</span>
                        <button type="button" onClick={() => updateQuantidade('CO', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>

                    <div className='bg-[#FFD21F] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('F', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >Frango</span>
                        <button type="button" onClick={() => updateQuantidade('F', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>
                </div>
                <div className='bg-[#16430A] px-1 md:px-2 h-10 md:h-15 rounded-xl md:rounded-2xl flex items-center justify-between'>
                        <button type="button" onClick={() => updateQuantidade('J', -1)}>
                            <MinusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                        <span className='text-white font-bold' >Jantinha</span>
                        <button type="button" onClick={() => updateQuantidade('J', 1)}>
                            <PlusIcon className='size-4 md:size-6 text-white cursor-pointer' />
                        </button>
                    </div>
                {!temItens ? (
                    <p className='text-gray-400 italic text-sm'>Nenhum item adicionado ainda.</p>
                ) : (
                    <>
                    <div className='bg-white p-4 rounded-lg border border-gray-200 mt-2 relative pr-12 animate-fade-in'>

                        <div className='flex flex-wrap gap-2'>
                            {Object.entries(itens).map(([nome, qtd]) => (
                                qtd > 0 && (
                                    <span key={nome} className='bg-[#C47D64] text-[#572F21] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2'>
                                        {qtd}x {nome}
                                    </span>
                                )
                            ))}
                        </div>
                        <div className=" border-gray-200 pt-3 flex items-center">
                            <span className="text-xl font-bold text-[#16430A]">
                                {formatarMoeda(totalPedido)}
                            </span>
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
                     <button type="submit" className='bg-[#545454] text-white px-4 py-2 rounded-md hover:bg-[#16430A] transition-colors cursor-pointer' >
                    {pedidoEditar ? "Salvar Alterações" : "Adicionar Pedido"}
                </button>
                </>
                )}


            </form>
        </section>
    );
}