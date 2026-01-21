'use client';
import { useState, useEffect } from "react";
import AddPedido from "./components/AddPedido";
import ListPedidos, { Pedido } from "./components/ListPedidos";
import { PlusIcon } from "@heroicons/react/24/solid";

const API_URL = 'http://192.168.15.173:3001/pedidos';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const fetchPedidos = async () => {
    try {
      const res = await fetch(API_URL);
      console.log("Resposta do servidor:", res);
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao conectar no servidor:", error);
    }
  };

  useEffect(() => {
    fetchPedidos(); 
    const intervalo = setInterval(fetchPedidos, 2000); 
    return () => clearInterval(intervalo); 
  }, []);

  const adicionarPedido = async (nome: string, itens: { [key: string]: number }) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, itens })
    });
    fetchPedidos(); 
  };

  const moverParaPronto = async (id: number) => {
    await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'PRONTO' })
    });
    fetchPedidos();
  };

  const returnPedido = async (id: number) => {
    await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'PREPARANDO' }) // Volta o status
    });
    fetchPedidos();
  };

  const entregarPedido = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchPedidos();
  };

  const listaGrelha = pedidos.filter(p => p.status === 'PREPARANDO').sort((a, b) => a.id - b.id);
  const listaProntos = pedidos.filter(p => p.status === 'PRONTO').sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#121212] font-sans overflow-x-hidden">
      <main className="flex flex-col items-center pt-10 px-4 pb-20 max-w-7xl mx-auto">

        <header className="flex flex-col md:flex-row justify-between items-center w-full mb-10 gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter">
              Espetinho
            </h1>
            <p className="text-gray-500 text-sm">Gerenciamento de Fila</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#2A7D13] hover:bg-[#22630f] text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <PlusIcon className="size-6" />
            NOVO PEDIDO
          </button>
        </header>

        <div className="flex flex-col gap-10 w-full">

          <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl p-2 md:p-4 border border-orange-100 dark:border-orange-900/30 min-h-[400px]">
            <ListPedidos
              titulo="Preparando"
              corTitulo="text-orange-600"
              pedidos={listaGrelha}
              textoBotao="TÁ PRONTO!"
              markStatus={moverParaPronto}
            />
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/10 rounded-2xl p-2 md:p-4 border border-green-100 dark:border-green-900/30 min-h-[400px]">
            <ListPedidos
              titulo="✅ Prontos"
              corTitulo="text-green-600"
              pedidos={listaProntos}
              textoBotao="ENTREGAR"
              markStatus={entregarPedido}
              voltar={returnPedido}
            />
          </div>

        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
            <AddPedido
              closeModal={() => setIsModalOpen(false)}
              aoAdicionar={adicionarPedido}
            
            />
          </div>
        )}

      </main>
    </div>
  );
}