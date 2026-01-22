import ChevronUpIcon from "@heroicons/react/24/solid/esm/ChevronUpIcon";
import { useState } from "react";
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
};

export default function ListPedidos({ titulo, pedidos, corTitulo }: ListPedidosProps) {

    const [listaAberta, setListaAberta] = useState(true);
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

                    {listaAberta && pedidos.map((pedido) => (
                        <div key={pedido.id} className="relative bg-white p-4 pt-1 gap-3 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-center w-full text-[30px] mt-1 text-gray-800">
                                    {pedido.nome}
                                </h3>
                                <div className='flex flex-wrap gap-2 justify-center'>
                                    {Object.entries(pedido.itens).map(([nome, qtd]) => (
                                        qtd > 0 && (
                                            <span key={nome} className='bg-[#C47D64] text-[#572F21] px-3 py-2 rounded-full text-[16px] font-bold flex items-center gap-2'>
                                                {qtd}x {nome}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}