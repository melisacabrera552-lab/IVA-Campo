import React from 'react';
import Header from '../components/Header';

const SisaStatus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Mi Estado SISA" />

      <div className="p-4 flex flex-col gap-4">
        {/* Main Status Card */}
        <div className="bg-[#E8F5E9] rounded-xl p-6 border border-primary/20 text-center">
            <h3 className="text-text-main text-xs font-bold uppercase tracking-wider mb-6">TU SEMÁFORO ACTUAL</h3>
            
            <div className="flex items-center justify-center gap-8 py-4 relative mb-4">
                <div className="absolute h-1 w-40 bg-gray-300 -z-0"></div>
                <div className="z-10 w-12 h-12 rounded-full bg-primary ring-4 ring-white shadow-[0_0_15px_#2f7f33] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined font-bold">check</span>
                </div>
                <div className="z-10 w-10 h-10 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="z-10 w-10 h-10 rounded-full bg-gray-300 ring-4 ring-white"></div>
            </div>

            <p className="text-3xl font-black text-text-main tracking-tight">ESTADO 1</p>
            <p className="text-primary font-medium text-lg">"Productor confiable"</p>
        </div>

        {/* Pager Indicator */}
        <div className="flex justify-center gap-2 py-2">
            <div className="w-6 h-1.5 bg-primary rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Benefits List */}
        <div className="flex items-center justify-between mt-2">
            <h2 className="text-xl font-bold text-text-main">Información de Beneficios</h2>
            <span className="material-symbols-outlined text-gray-400">payments</span>
        </div>

        <div className="bg-surface rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <BenefitRow icon="universal_currency_alt" title="Retención en ventas" value="Solo 5%" highlight="(Tasa mínima)" />
            <BenefitRow icon="keyboard_return" title="Reintegro automático" value="SÍ - En ~45 días" />
            <BenefitRow icon="calendar_month" title="Próximo control" value="IP1 Octubre 2026" last={true} />
        </div>

        {/* Requirements */}
        <div className="mt-4">
            <h2 className="text-lg font-bold text-text-main mb-3">Para mantener Estado 1</h2>
            <div className="space-y-3">
                <CheckItem label="Presentar IP1 en octubre" />
                <CheckItem label="Presentar IP2 dic-feb" />
                <CheckItem label="Revisar buzón ARCA diario" />
                <CheckItem label="Declarar todo lo que vendés" />
            </div>
        </div>

        <button className="w-full mt-6 mb-8 flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold h-14 rounded-xl hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined">mail</span>
            IR AL BUZÓN DE ARCA
        </button>
      </div>
    </div>
  );
};

const BenefitRow = ({ icon, title, value, highlight, last = false }: any) => (
    <div className={`flex items-center gap-4 p-4 ${!last ? 'border-b border-gray-50' : ''}`}>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
            <p className="text-xs text-text-sec font-bold uppercase">{title}</p>
            <p className="text-base font-bold text-text-main">{value} <span className="text-primary font-normal text-sm">{highlight}</span></p>
        </div>
    </div>
);

const CheckItem = ({ label }: { label: string }) => (
    <div className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-gray-100">
        <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
        <span className="text-sm font-medium text-text-main">{label}</span>
    </div>
);

export default SisaStatus;