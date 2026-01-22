'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BackspaceIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const router = useRouter();
    
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const PIN_CORRETO = '123456';

    const handleNumber = (num: string) => {
        if (pin.length < 6 && !loading) {
            setPin(prev => prev + num);
            setError(false);
        }
    };

    const handleBackspace = () => {
        if (!loading) {
            setPin(prev => prev.slice(0, -1));
            setError(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        setTimeout(() => {
            if (pin === PIN_CORRETO) {
                Cookies.set('token_pedidos', 'acesso-garantido', { expires: 1 });
                router.push('/');
            } else {
                setError(true);
                setPin(''); 
                setLoading(false);
            }
        }, 500);
    };

    useEffect(() => {
        if (pin.length === 6) {
            handleLogin();
        }
    }, [pin]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= '0' && e.key <= '9') {
                handleNumber(e.key);
            } else if (e.key === 'Backspace') {
                handleBackspace();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pin, loading]); // Dependências para garantir estado atualizado

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#F0EACD] p-4 font-sans">
            
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center p-8 animate-fade-in">
                
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                    <LockClosedIcon className="size-8 text-orange-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Acesso Restrito</h1>
                <p className="text-gray-500 mb-8 text-sm">Digite o PIN de 6 dígitos</p>

                <div className={`flex gap-4 mb-8 transition-transform duration-200 ${error ? 'animate-shake' : ''}`}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div 
                            key={index}
                            className={`
                                w-4 h-4 rounded-full border-2 
                                ${index < pin.length 
                                    ? 'bg-gray-800 border-gray-800 scale-110'
                                    : 'bg-transparent border-gray-300'
                                }
                                ${error ? 'bg-red-500 border-red-500' : ''} // Erro
                                transition-all duration-200
                            `}
                        />
                    ))}
                </div>
                
                <div className="h-6 mb-2">
                    {error && <span className="text-red-500 text-sm font-bold">PIN Incorreto</span>}
                </div>
                <div className="grid grid-cols-3 gap-4 w-full mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumber(num.toString())}
                            disabled={loading}
                            className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-2xl font-bold text-gray-700 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="h-16"></div> 

                    <button
                        onClick={() => handleNumber('0')}
                        disabled={loading}
                        className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-2xl font-bold text-gray-700 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        0
                    </button>

                    <button
                        onClick={handleBackspace}
                        disabled={loading}
                        className="h-16 rounded-2xl bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 flex items-center justify-center transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <BackspaceIcon className="size-8" />
                    </button>
                </div>
            </div>
        </main>
    );
}