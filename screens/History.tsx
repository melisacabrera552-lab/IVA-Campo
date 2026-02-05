import React from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
        {/* Header Custom */}
        <header className="sticky top-0 z-20 flex items-center bg-surface/90 backdrop-blur-md p-4 pb-4 justify-between border-b border-gray-100">
            <button onClick={() => navigate('/home')} className="text-text-main flex size-10 items-center justify-center rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-text-main text-lg font-bold flex-1 text-center pr-10">Historial de Movimientos</h1>
        </header>

        {/* Filter Chips */}
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
            <Chip label="Todos" active />
            <Chip label="Ventas" />
            <Chip label="Compras" />
        </div>

        {/* List */}
        <main className="px-4 py-2 flex flex-col gap-3 pb-24">
            <TransactionCard 
                icon="🌾" 
                title="Venta de Soja" 
                date="12 Oct" 
                amount="$450.000" 
                iva="+$52.500 IVA" 
                ivaColor="bg-accent/10 text-accent"
            />
            <TransactionCard 
                icon="🌱" 
                title="Fertilizantes" 
                date="10 Oct" 
                amount="-$120.000" 
                iva="- $25.200 IVA" 
                ivaColor="bg-primary/10 text-primary"
            />
             <TransactionCard 
                icon="🚜" 
                title="Flete Cosecha" 
                date="05 Oct" 
                amount="-$85.000" 
                iva="- $8.925 IVA" 
                ivaColor="bg-primary/10 text-primary"
            />

            {/* Monthly Summary */}
            <div className="mt-4 p-5 rounded-2xl bg-[#111812] text-white shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Saldo IVA Mes</span>
                    <span className="material-symbols-outlined opacity-60">info</span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-3xl font-bold">+$18.375</p>
                        <p className="text-xs opacity-60 mt-1">A favor de AFIP</p>
                    </div>
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

const Chip = ({ label, active = false }: { label: string, active?: boolean }) => (
    <button className={`flex h-10 shrink-0 items-center justify-center rounded-xl px-6 font-semibold text-sm transition-colors ${active ? 'bg-primary text-white shadow-sm' : 'bg-surface border border-gray-200 text-text-main'}`}>
        {label}
    </button>
);

const TransactionCard = ({ icon, title, date, amount, iva, ivaColor }: any) => (
    <div className="flex flex-col gap-3 bg-surface p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-2xl flex items-center justify-center rounded-full bg-gray-50 shrink-0 size-12">{icon}</div>
                <div className="flex flex-col">
                    <p className="text-text-main text-base font-bold leading-tight">{title}</p>
                    <p className="text-text-sec text-sm font-medium">{date}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-text-main text-lg font-bold leading-tight">{amount}</p>
                <div className={`mt-1 px-2 py-0.5 rounded border border-transparent ${ivaColor}`}>
                    <p className="text-[11px] font-bold uppercase tracking-wider">{iva}</p>
                </div>
            </div>
        </div>
    </div>
);

export default History;