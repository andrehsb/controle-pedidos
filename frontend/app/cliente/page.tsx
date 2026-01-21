'use client';
import { useState } from "react";
import PedidosList from "./components/PedidosList";

type Pedido = {
  nome: string;
  itens: { [key: string]: number };
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaPedidos, setListaPedidos] = useState<Pedido[]>([]);
  
  const adicionarPedido = (nome: string, itens: { [key: string]: number }) => {
    const novoPedido: Pedido = { nome, itens };
    setListaPedidos((prev) => [...prev, novoPedido]);
  };
  
  return (
    <div className="min-h-screen w- bg-white dark:bg-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start pt-24 md:pt-40 gap-10">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-wider">
          ESPETINHO
        </h1>
        

        <PedidosList pedidos={listaPedidos} />
      </main>
    </div>
  );
}
