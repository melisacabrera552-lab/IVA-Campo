import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between p-5 bg-surface sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
            <button className="text-primary">
                <span className="material-symbols-outlined text-[32px]">menu</span>
            </button>
        </div>
        <div className="flex-1 px-3">
          <h2 className="text-text-main text-lg font-bold">Hola Juan 👋</h2>
          <p className="text-text-sec text-xs font-semibold uppercase tracking-wider">Octubre 2023</p>
        </div>
        <div className="relative cursor-pointer" onClick={() => navigate('/alerts')}>
          <span className="material-symbols-outlined text-[28px] text-text-main">notifications</span>
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold border-2 border-surface">3</div>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-4">
        {/* IVA Card */}
        <div className="bg-surface rounded-2xl p-5 shadow-card border border-gray-100">
          <h3 className="text-text-main text-lg font-bold mb-6">Tu situación este mes</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-text-sec text-sm font-medium">IVA de mis ventas</span>
                <span className="text-text-main font-bold">$450.000</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-2/3 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-text-sec text-sm font-medium">IVA de mis compras</span>
                <span className="text-text-main font-bold">$680.000</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="my-5 border-t border-dashed border-gray-200"></div>

          <div className="bg-primary/5 rounded-xl p-4 text-center">
             <div className="text-primary text-xl font-black mb-1">💰 A TU FAVOR: $230.000</div>
             <div className="text-primary/80 text-sm font-semibold">(No pagás IVA este mes)</div>
          </div>
        </div>

        {/* SISA Card */}
        <div 
          onClick={() => navigate('/sisa')}
          className="bg-surface rounded-2xl p-5 shadow-card border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-text-sec uppercase tracking-widest">ESTADO SISA</span>
            <span className="material-symbols-outlined text-primary">info</span>
          </div>

          <div className="relative flex items-center justify-between px-8 mb-6">
             <div className="absolute left-8 right-8 top-1/2 h-1 bg-gray-100 -z-0"></div>
             
             {/* Green Dot */}
             <div className="z-10 bg-surface p-1 rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/20">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                </div>
             </div>
             
             {/* Grey Dots */}
             <div className="z-10 bg-surface p-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
             </div>
             <div className="z-10 bg-surface p-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
             </div>
          </div>

          <div className="text-center">
            <h4 className="text-text-main font-bold text-base">ESTADO 1 - Todo bien</h4>
            <p className="text-text-sec text-sm mt-1">Retención: 5% | Reintegro ✓</p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
            <ActionButton 
                icon="add_shopping_cart" 
                label="Cargué una venta" 
                onClick={() => navigate('/sales/type')}
            />
            <ActionButton 
                icon="agriculture" 
                label="Compré para el campo" 
                onClick={() => navigate('/expenses/category')}
            />
            <ActionButton 
                icon="query_stats" 
                label="Simular el año" 
                onClick={() => navigate('/simulator')}
            />
            <ActionButton 
                icon="history" 
                label="Ver historial" 
                onClick={() => navigate('/history')}
            />
        </div>

      </main>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center justify-center p-5 bg-surface rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all hover:border-primary/30"
    >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
            <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
        <span className="text-sm font-bold text-text-main text-center leading-tight">{label}</span>
    </button>
);

export default Dashboard;