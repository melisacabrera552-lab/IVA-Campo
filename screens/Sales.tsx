import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

// --- Screen 1: Select Type ---
export const SaleTypeSelect = () => {
  const navigate = useNavigate();

  const Option = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
    <button 
      onClick={() => navigate('/sales/form', { state: { category: title, icon } })}
      className="w-full flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all group text-left"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-text-main">{title}</h3>
        <p className="text-text-sec text-sm">{subtitle}</p>
      </div>
      <span className="material-symbols-outlined text-primary/40 group-active:text-primary">chevron_right</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Cargar Venta" />
      <div className="p-4 flex flex-col gap-4 flex-1">
        <Option icon="potted_plant" title="GRANOS" subtitle="Soja, Maíz, Trigo, etc." />
        <Option icon="sound_detection_dog_barking" title="HACIENDA" subtitle="Bovinos, Porcinos, etc." />
        <Option icon="sync" title="CANJE" subtitle="Entregué granos por insumos que ya recibí" />
        
        <p className="mt-8 text-center text-xs text-text-sec font-bold uppercase tracking-widest">
            Seleccione el tipo de operación para continuar
        </p>
      </div>
    </div>
  );
};

// --- Screen 2: Form ---
export const SaleForm = () => {
  const navigate = useNavigate();
  const { addTransaction, formatCurrency } = useAppContext();
  const [amount, setAmount] = useState('');
  const [retention, setRetention] = useState('');
  
  // Get state from navigation (category info)
  const navState = window.history.state?.usr || { category: 'Granos', icon: '🌾' };

  const calculateIVA = () => {
    const val = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    return val * 0.105;
  };

  const handleSave = () => {
      const val = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
      if (val <= 0) return;

      const iva = calculateIVA();
      
      addTransaction({
          type: 'sale',
          category: `Venta de ${navState.category}`,
          amount: val,
          iva: iva,
          icon: navState.icon
      });

      navigate('/sales/success', { state: { amount: val, iva, type: navState.category } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={`Venta ${navState.category}`} />
      
      <div className="p-4 flex-1 flex flex-col gap-8">
        {/* Input 1 */}
        <div>
          <h3 className="text-2xl font-bold text-text-main mb-4">¿Cuánto vendiste?</h3>
          <label className="block">
            <span className="text-sm font-medium text-text-main block mb-2">Monto bruto</span>
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
            <div className="flex items-center gap-1 mt-2 text-text-sec text-sm">
                <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                <span>Es el valor antes de IVA</span>
            </div>
          </label>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Calculated Result */}
        <div>
            <h3 className="text-lg font-bold text-text-main mb-3">El IVA de esta venta es:</h3>
            <div className="bg-gray-100 rounded-xl p-5 border border-dashed border-gray-300 text-center">
                <p className="text-text-main text-lg font-bold">IVA 10,5% = <span className="text-primary">{formatCurrency(calculateIVA())}</span></p>
            </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Input 2 */}
        <div>
          <h3 className="text-lg font-bold text-text-main mb-3">¿Te retuvieron IVA?</h3>
          <label className="block">
            <div className="flex w-full items-center rounded-xl border border-gray-300 bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                <span className="pl-4 text-text-main font-bold">$</span>
                <input 
                    type="number" 
                    value={retention}
                    onChange={(e) => setRetention(e.target.value)}
                    placeholder="0,00"
                    className="w-full h-14 border-none bg-transparent text-xl font-bold text-text-main focus:ring-0 placeholder:text-gray-300"
                />
            </div>
            <div className="flex items-start gap-1 mt-2 text-text-sec text-sm">
                <span className="material-symbols-outlined text-[16px] mt-0.5">lightbulb</span>
                <span>Figura en la liquidación como "Retención RG 2300"</span>
            </div>
          </label>
        </div>
      </div>

      <div className="p-4 bg-surface border-t border-gray-100">
        <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
            CARGAR ESTA VENTA
        </button>
      </div>
    </div>
  );
};

// --- Screen 3: Success ---
export const SaleSuccess = () => {
    const navigate = useNavigate();
    const { formatCurrency } = useAppContext();
    const state = window.history.state?.usr || { amount: 0, iva: 0, type: 'Granos' };
    
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <div className="flex items-center justify-between p-4">
                <span className="material-symbols-outlined text-3xl text-primary cursor-pointer" onClick={() => navigate('/home')}>close</span>
                <h2 className="text-lg font-bold flex-1 text-center pr-8">Confirmación</h2>
            </div>

            <div className="flex-1 flex flex-col items-center p-6 pt-10">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
                </div>

                <h1 className="text-3xl font-bold text-center text-text-main mb-4">¡Venta cargada con éxito!</h1>
                <p className="text-center text-gray-500 text-lg mb-10 max-w-xs">
                    La operación de <strong className="text-text-main">{state.type}</strong> por <strong className="text-text-main">{formatCurrency(state.amount)}</strong> ha sido registrada correctamente.
                </p>

                <div className="w-full bg-surface border border-gray-100 rounded-xl p-6 shadow-card">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                        <span className="material-symbols-outlined text-primary">receipt_long</span>
                        <span className="text-lg font-bold text-text-main">Resumen de Impuestos</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-text-sec font-medium">IVA generado</span>
                            <span className="text-text-main font-bold text-lg">{formatCurrency(state.iva)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-sec font-medium">Retención cargada</span>
                            <span className="text-text-main font-bold text-lg">$0,00</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-surface border-t border-gray-100 flex flex-col gap-3">
                <button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20"
                >
                    VOLVER AL INICIO
                </button>
                <button 
                    onClick={() => navigate('/history')}
                    className="w-full bg-transparent border-2 border-primary text-primary font-bold h-14 rounded-xl"
                >
                    VER HISTORIAL DE MOVIMIENTOS
                </button>
            </div>
        </div>
    );
};