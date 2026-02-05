import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

const Simulator = () => {
  const { formatCurrency } = useAppContext();
  const [sales, setSales] = useState(5000000);
  const [expenses, setExpenses] = useState(3500000);

  const ivaSales = sales * 0.105;
  const ivaExpenses = expenses * 0.21;
  const balance = ivaExpenses - ivaSales; // Positive means user has credit

  // Calculate percentages relative to a base max for bar visualization
  const maxVal = Math.max(ivaSales, ivaExpenses) * 1.2;
  const salesW = (ivaSales / maxVal) * 100;
  const expW = (ivaExpenses / maxVal) * 100;

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header title="Simulador 🔮" />
      
      <div className="p-4 flex flex-col gap-6">
        
        <section>
            <h3 className="text-xs font-bold text-text-sec uppercase tracking-wider mb-3 px-1">PROYECTÁ TU AÑO</h3>
            <div className="space-y-4">
                <InputCard 
                    label="Ventas estimadas (sin IVA)" 
                    value={sales} 
                    onChange={setSales} 
                />
                <InputCard 
                    label="Compras/Gastos estimados" 
                    value={expenses} 
                    onChange={setExpenses} 
                />
            </div>
        </section>

        <section className="bg-[#F1F8E9] rounded-3xl p-6 border border-primary/10 shadow-inner">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-6 text-center">RESULTADO PROYECTADO</h3>
            
            <div className="space-y-6">
                <ProgressBar label="IVA Ventas (10,5%)" amount={formatCurrency(ivaSales)} percent={`${salesW}%`} color="bg-accent" />
                <ProgressBar label="IVA Compras (21%)" amount={formatCurrency(ivaExpenses)} percent={`${expW}%`} color="bg-primary" />
            </div>

            <div className="mt-8 pt-6 border-t border-primary/10 text-center">
                <p className="text-2xl font-black text-primary mb-2">
                    {balance >= 0 ? '💰 SALDO A FAVOR: ' : '💸 A PAGAR: '} 
                    {formatCurrency(Math.abs(balance))}
                </p>
                <div className="bg-white/50 p-3 rounded-xl inline-block">
                    <p className="text-sm text-text-sec font-medium leading-tight">
                        {balance >= 0 
                            ? '⚠️ "Plata atrapada" en el Estado que pierde valor con la inflación'
                            : 'ℹ️ Deberás pagar este monto a la AFIP'
                        }
                    </p>
                </div>
            </div>
        </section>

        <section>
            <h3 className="text-xs font-bold text-text-sec uppercase tracking-wider mb-4 px-1">💡 SUGERENCIAS PARA VOS:</h3>
            <div className="space-y-3">
                <SuggestionCard title="Usá CANJE para insumos" subtitle="Alineás el IVA con la cosecha" />
                <SuggestionCard title="Hacé gastos de mantenimiento ahora" subtitle="Usás el IVA a favor" />
            </div>
        </section>

      </div>
    </div>
  );
};

const InputCard = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
        <label className="block text-xs font-semibold text-text-sec mb-1">{label}</label>
        <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-400 mr-1">$</span>
            <input 
                type="number" 
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="bg-transparent border-none p-0 text-2xl font-black focus:ring-0 w-full text-text-main" 
            />
        </div>
    </div>
);

const ProgressBar = ({ label, amount, percent, color }: any) => (
    <div>
        <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-text-main">{label}</span>
            <span className="text-sm font-bold text-text-main">{amount}</span>
        </div>
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div className={`${color} h-full rounded-full transition-all duration-300`} style={{ width: percent }}></div>
        </div>
    </div>
);

const SuggestionCard = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <button className="w-full flex items-center justify-between bg-surface p-5 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform text-left">
        <div className="pr-4">
            <p className="font-bold text-text-main mb-1">{title}</p>
            <p className="text-sm text-text-sec">{subtitle}</p>
        </div>
        <span className="material-symbols-outlined text-gray-300">chevron_right</span>
    </button>
);

export default Simulator;