'use client';
import { useState, useEffect } from "react";
import ListPedidos, { Pedido } from "./components/PedidosList";

import { supabase } from '../services/supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/pedidos';

export default function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const fetchPedidos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao conectar no servidor:", error);
    }
  };

  useEffect(() => {fetchPedidos();
      console.log(" Conectando ao Realtime do Supabase...");
      const channel = supabase
        .channel('mudancas-pedidos')
        .on(
          'postgres_changes',{ event: '*',schema: 'public',table: 'Pedido' },
          (payload) => {
            console.log(" Mudança detectada!", payload);
            fetchPedidos();
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
  }, []);


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
            <p className="text-gray-500 text-sm">Acompanhe o seu pedido</p>
          </div>
        </header>

        <div className="flex flex-col gap-10 w-full">
          <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl p-2 md:p-4 border border-orange-100 dark:border-orange-900/30 h-fit transition-all duration-300">
            <ListPedidos
              titulo="Preparando"
              corTitulo="text-orange-600"
              pedidos={listaGrelha}
            />
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/10 rounded-2xl p-2 md:p-4 border border-green-100 dark:border-green-900/30 h-fit transition-all duration-300">
            <ListPedidos
              titulo="✅ Prontos"
              corTitulo="text-green-600"
              pedidos={listaProntos}
             
            />
          </div>

        </div>
      </main>
    </div>
  );
}