import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const ExpenseCategory = () => {
  const navigate = useNavigate();

  const CategoryItem = ({ icon, title, subtitle, onClick }: { icon: string; title: string; subtitle: string; onClick?: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full text-left flex items-center justify-between p-5 bg-surface rounded-xl shadow-card active:scale-[0.98] transition-transform"
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-text-main text-base">{title}</h4>
                <p className="text-sm text-text-sec">{subtitle}</p>
            </div>
        </div>
        <span className="material-symbols-outlined text-gray-300">chevron_right</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
       <Header title="Cargar Gasto" showBack={true} />
       
       <div className="p-4 flex-1">
          <div className="py-4">
            <h3 className="text-2xl font-bold text-text-main">¿Qué compraste o pagaste?</h3>
            <p className="text-text-sec mt-1">Selecciona una categoría para continuar</p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <CategoryItem 
                icon="🌱" 
                title="INSUMOS DE CAMPO" 
                subtitle="Semillas, fertilizantes, agroquímicos"
                onClick={() => navigate('/expenses/warning')} 
            />
            <CategoryItem icon="🚜" title="SERVICIOS Y LABORES" subtitle="Siembra, cosecha, fletes" />
            <CategoryItem icon="⚙️" title="MAQUINARIA / EQUIPOS" subtitle="Tractor, cosecha, riego, herramientas" />
            <CategoryItem icon="📋" title="OTROS GASTOS" subtitle="Profesionales, seguros, administración" />
          </div>

          <div className="mt-10 text-center px-6">
            <div className="inline-flex p-3 rounded-full bg-primary/5 text-primary mb-3">
                <span className="material-symbols-outlined">help_outline</span>
            </div>
            <p className="text-sm text-text-sec">¿No encontrás la categoría? Los gastos se agrupan según las normativas vigentes de AFIP para el agro.</p>
          </div>
       </div>

       <div className="p-4 bg-surface/80 backdrop-blur-sm border-t border-gray-100">
          <button className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20">
            Continuar sin categoría
          </button>
       </div>
    </div>
  );
};

export const ExpenseWarning = () => {
    const navigate = useNavigate();

    // This component simulates the overlay on top of the Expense Category screen, 
    // but for routing simplicity in this structure, it renders the visual result directly.
    return (
        <div className="min-h-screen bg-background relative">
             {/* Blurred Background Mockup */}
             <div className="absolute inset-0 blur-sm opacity-50 pointer-events-none bg-white">
                 <Header title="Cargar Gasto" />
                 <div className="p-4">
                     <h3 className="text-2xl font-bold text-text-main mb-4">¿Qué compraste o pagaste?</h3>
                     <div className="p-5 bg-surface rounded-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">🌱</div>
                        <div>
                            <h4 className="font-bold text-text-main">INSUMOS DE CAMPO</h4>
                        </div>
                     </div>
                 </div>
             </div>

             {/* Modal */}
             <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                <div className="w-full max-w-sm bg-surface rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
                    <h2 className="text-urgent text-2xl font-black mb-4 flex items-center justify-center gap-2">
                        ¡ATENCIÓN! <span className="material-symbols-outlined filled">do_not_disturb_on</span>
                    </h2>

                    <p className="text-lg font-semibold text-text-main mb-6 leading-tight">
                        Esta factura tiene leyenda <br/>
                        <span className="text-primary">"Pago en CBU Informada"</span>
                    </p>

                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                         <span className="material-symbols-outlined text-urgent shrink-0">close</span>
                         <p className="text-urgent font-bold text-sm leading-snug">Perdés los $21.000 de IVA de esta factura</p>
                    </div>

                    <p className="text-sm text-gray-500 font-medium mb-6">
                        El efectivo y los cheques endosados <strong className="underline decoration-urgent text-text-main">NO sirven</strong>.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => navigate('/home')}
                            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            PAGUÉ POR TRANSFERENCIA ✓
                        </button>
                        <button 
                            onClick={() => navigate('/expenses/category')}
                            className="w-full h-14 bg-transparent border-2 border-gray-200 text-gray-500 font-bold rounded-xl"
                        >
                            NO, PAGUÉ DE OTRA FORMA
                        </button>
                    </div>
                </div>
             </div>
        </div>
    );
};