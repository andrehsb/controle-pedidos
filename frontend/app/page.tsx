'use client';
import { useState } from "react";
import AddPedido from "./components/AddPedido";
import PlusIcon from "@heroicons/react/24/solid/esm/PlusIcon";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen w- bg-white dark:bg-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start pt-24 md:pt-40 gap-10">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-wider">
          ESPETINHO
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2A7D13] w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:bg-[#22630f] hover:scale-110 transition-all duration-300 group"
          title="Novo Pedido"
        >
          <PlusIcon className="size-10 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <AddPedido closeModal={() => setIsModalOpen(false)} />
          </div>
        )}

      </main>
    </div>
  );
}
