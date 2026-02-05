import React from 'react';
import Header from '../components/Header';

const Alerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Alertas 🔔" 
        rightAction={
            <div className="relative flex items-center justify-center rounded-full w-10 h-10 bg-gray-50">
                <span className="material-symbols-outlined text-text-main">notifications</span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-urgent rounded-full border-2 border-white"></span>
            </div>
        } 
      />

      <main className="p-4 pb-10">
        {/* Urgent Section */}
        <h3 className="text-text-main text-sm font-extrabold tracking-widest uppercase mb-4 flex items-center gap-2">
            PENDIENTES (3)
            <span className="w-2 h-2 rounded-full bg-urgent animate-pulse"></span>
        </h3>

        {/* Card 1: Urgent */}
        <div className="mb-4 bg-surface rounded-xl shadow-float border-l-4 border-urgent overflow-hidden">
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-urgent text-sm filled">error</span>
                    <p className="text-urgent text-sm font-bold uppercase tracking-wider">HOY - URGENTE</p>
                </div>
                <h4 className="text-text-main text-xl font-bold mb-2">¿Pagaste el F.931?</h4>
                <p className="text-gray-600 text-lg mb-5">Si no lo pagás hoy, perdés <strong className="text-urgent">$24.750</strong> de IVA por beneficios de pronto pago.</p>
                <div className="flex flex-col gap-3">
                    <button className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-white text-lg font-bold shadow-md active:scale-95 transition-transform">
                        <span className="material-symbols-outlined mr-2">check_circle</span>
                        Ya pagué
                    </button>
                    <button className="flex w-full items-center justify-center rounded-xl h-12 bg-gray-100 text-text-main text-base font-semibold active:scale-95 transition-transform">
                        <span className="material-symbols-outlined mr-2">timer</span>
                        Recordar en 1 hora
                    </button>
                </div>
            </div>
        </div>

        {/* Card 2: Warning */}
        <div className="mb-4 bg-surface rounded-xl p-5 shadow-card border-l-4 border-accent flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent text-sm">schedule</span>
                    <p className="text-accent text-sm font-bold uppercase tracking-wider">MAÑANA</p>
                </div>
                <p className="text-text-main text-lg font-bold">Vence DJ IVA (CUIT xxx)</p>
                <p className="text-gray-600">Según tus cargas: Saldo a favor <span className="text-primary font-bold">$230.000</span></p>
                <button className="mt-2 flex items-center justify-center rounded-lg h-10 px-4 bg-gray-50 text-text-main text-sm font-bold w-fit border border-gray-200">
                    Ver detalle <span className="material-symbols-outlined ml-1 text-sm">open_in_new</span>
                </button>
            </div>
        </div>

        {/* Card 3: Info */}
        <div className="mb-8 bg-surface rounded-xl p-5 shadow-card border-l-4 border-primary flex justify-between gap-4">
             <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm filled">check_circle</span>
                    <p className="text-primary text-sm font-bold uppercase tracking-wider">EN 15 DÍAS</p>
                </div>
                <p className="text-text-main text-lg font-bold">📬 Revisá tu buzón ARCA</p>
                <p className="text-gray-600">Último chequeo: hace 3 días. No pierdas tu Estado 1.</p>
                <button className="mt-2 flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold w-fit border border-primary/20">
                    Ir al buzón <span className="material-symbols-outlined ml-1 text-sm">mail</span>
                </button>
            </div>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Timeline */}
        <h3 className="text-text-main text-sm font-extrabold tracking-widest uppercase mb-4">PRÓXIMOS HITOS</h3>
        <div className="space-y-3">
            <HitoCard month="Oct" day="20" title="Presentar IP1" subtitle="Ciclo Productivo 2026" icon="calendar_month" />
            <HitoCard month="Dic" day="15" title="Presentar IP2" subtitle="Ciclo Productivo 2026" icon="calendar_month" />
            <HitoCard month="Feb" day="28" title="Cierre IP2" subtitle="Período Fiscal 2027" icon="lock_clock" opacity />
        </div>

      </main>
    </div>
  );
};

const HitoCard = ({ month, day, title, subtitle, icon, opacity }: any) => (
    <div className={`flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 ${opacity ? 'opacity-60' : ''}`}>
        <div className="flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 mr-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase">{month}</span>
            <span className="text-lg font-bold text-text-main">{day}</span>
        </div>
        <div className="flex-1">
            <p className="text-text-main font-bold text-base">{title}</p>
            <p className="text-text-sec text-sm">{subtitle}</p>
        </div>
        <span className="material-symbols-outlined text-gray-300">{icon}</span>
    </div>
);

export default Alerts;