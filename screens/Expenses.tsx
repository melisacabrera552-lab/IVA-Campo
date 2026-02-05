import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

export const ExpenseCategory = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string, icon: string, warning: boolean = false) => {
      if (warning) {
          navigate('/expenses/warning', { state: { category, icon } });
      } else {
          navigate('/expenses/form', { state: { category, icon } });
      }
  };

  const CategoryItem = ({ icon, title, subtitle, warning = false }: { icon: string; title: string; subtitle: string; warning?: boolean }) => (
    <button 
      onClick={() => handleSelect(title, icon, warning)}
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
                warning={true}
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
          <button onClick={() => handleSelect('Gasto General', '🧾')} className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20">
            Continuar sin categoría
          </button>
       </div>
    </div>
  );
};

export const ExpenseWarning = () => {
    const navigate = useNavigate();
    const navState = window.history.state?.usr || { category: 'Insumos', icon: '🌱' };

    return (
        <div className="min-h-screen bg-background relative">
             {/* Blurred Background Mockup */}
             <div className="absolute inset-0 blur-sm opacity-50 pointer-events-none bg-white">
                 <Header title="Cargar Gasto" />
                 <div className="p-4">
                     <h3 className="text-2xl font-bold text-text-main mb-4">¿Qué compraste o pagaste?</h3>
                     <div className="p-5 bg-surface rounded-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">{navState.icon}</div>
                        <div>
                            <h4 className="font-bold text-text-main">{navState.category}</h4>
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
                         <p className="text-urgent font-bold text-sm leading-snug">Si no pagás por banco, perdés el 100% del IVA de esta factura.</p>
                    </div>

                    <p className="text-sm text-gray-500 font-medium mb-6">
                        El efectivo y los cheques endosados <strong className="underline decoration-urgent text-text-main">NO sirven</strong>.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => navigate('/expenses/form', { state: navState })}
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

export const ExpenseForm = () => {
  const navigate = useNavigate();
  const { addTransaction, formatCurrency } = useAppContext();
  const [amount, setAmount] = useState('');
  
  const navState = window.history.state?.usr || { category: 'Gasto', icon: '🧾' };

  const calculateIVA = () => {
    const val = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    // Assuming 21% for expenses for this demo, usually varies
    return val * 0.21;
  };

  const handleSave = () => {
      const val = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
      if (val <= 0) return;

      const iva = calculateIVA();
      
      addTransaction({
          type: 'expense',
          category: navState.category,
          amount: val,
          iva: iva,
          icon: navState.icon
      });

      // Quick success feedback then home
      navigate('/home'); 
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={navState.category} />
      
      <div className="p-4 flex-1 flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-bold text-text-main mb-4">Monto de la factura</h3>
          <label className="block">
            <span className="text-sm font-medium text-text-main block mb-2">Total Facturado (Neto)</span>
            <div className="flex w-full items-center rounded-xl border border-gray-300 bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                <span className="pl-4 text-text-main font-bold">$</span>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full h-14 border-none bg-transparent text-xl font-bold text-text-main focus:ring-0 placeholder:text-gray-300"
                />
            </div>
          </label>
        </div>

        <div className="bg-gray-100 rounded-xl p-5 border border-dashed border-gray-300 text-center">
             <p className="text-text-main text-lg font-bold">IVA Crédito (21%) = <span className="text-primary">{formatCurrency(calculateIVA())}</span></p>
        </div>

      </div>

      <div className="p-4 bg-surface border-t border-gray-100">
        <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
            CONFIRMAR GASTO
        </button>
      </div>
    </div>
  );
};