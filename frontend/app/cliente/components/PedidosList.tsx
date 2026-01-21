type Pedido = {
    nome: string;
    itens: { [key: string]: number };
};

type ListPedidosProps = {
    pedidos: Pedido[];
};

export default function ListPedidos({ pedidos }: ListPedidosProps) {
    return (
        <section className="w-full max-w-md mt-8 px-4">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white border-b pb-2">
                Pedidos ({pedidos.length})
            </h2>

            {pedidos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum pedido na fila.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {pedidos.map((pedido, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">

                            <div className="flex flex-col gap-3">
                                <h3 className="font-bold text-lg text-gray-800">{pedido.nome}</h3>
                                <div className='flex flex-wrap gap-2'>

                                    {Object.entries(pedido.itens).map(([nome, qtd]) => (

                                        qtd > 0 && (
                                                <span key={nome} className='bg-[#C47D64] text-[#572F21] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2'>
                                                    {qtd}x {nome}
                                                </span>  
                                        )
                                    ))}
                                </div>
                            </div>

                            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                                PREPARANDO
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}