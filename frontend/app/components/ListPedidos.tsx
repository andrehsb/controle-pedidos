import { ArrowUturnLeftIcon, CheckIcon, FireIcon } from "@heroicons/react/24/outline";

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
};

export default function ListPedidos({ titulo, pedidos, corTitulo, textoBotao, markStatus, voltar }: ListPedidosProps) {
    return (
        <section className="w-full mt-4 px-2">
            <h2 className={`text-2xl font-bold mb-4 ${corTitulo} border-b pb-2 flex justify-between items-end`}>
                {titulo}
                <span className="text-sm text-gray-500 font-normal">{pedidos.length} pedidos</span>
            </h2>

            {pedidos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum pedido na fila.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="relative bg-white p-4 gap-3 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
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
                                className={`w-full sm:w-auto px-6 py-3 md:px-3 md:py-2 rounded-lg font-bold text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2
                                    ${pedido.status === 'PREPARANDO'
                                        ? 'bg-gray-800 hover:bg-black'
                                        : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {pedido.status === 'PREPARANDO' ? <FireIcon className="size-5" /> : <CheckIcon className="size-5" />}
                                {textoBotao}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}