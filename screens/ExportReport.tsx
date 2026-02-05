import React, { useState } from 'react';
import Header from '../components/Header';

const ExportReport = () => {
  const [selectedFormat, setSelectedFormat] = useState('excel');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Exportar al Contador" />

      <main className="flex-1 p-4 pb-24">
        {/* Month Summary Card */}
        <div className="bg-surface p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4 mb-6">
            <div className="flex-1">
                <p className="text-text-main font-bold">Resumen del Mes: Octubre 2023</p>
                <p className="text-text-sec text-sm">Periodo impositivo actual</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
            </div>
        </div>

        <h3 className="text-lg font-bold text-text-main mb-3 px-1">Seleccionar formato de archivo</h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
                onClick={() => setSelectedFormat('excel')}
                className={`relative flex flex-col gap-4 rounded-xl justify-center items-center p-6 aspect-square border-2 transition-all ${selectedFormat === 'excel' ? 'bg-surface border-primary ring-2 ring-primary/20' : 'bg-surface border-transparent hover:border-gray-200'}`}
            >
                {selectedFormat === 'excel' && (
                    <div className="absolute top-3 right-3 text-primary">
                        <span className="material-symbols-outlined filled">check_circle</span>
                    </div>
                )}
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-4xl">table_view</span>
                </div>
                <p className="text-sm font-bold text-text-main">Planilla Excel (.xlsx)</p>
            </button>

            <button 
                onClick={() => setSelectedFormat('pdf')}
                className={`relative flex flex-col gap-4 rounded-xl justify-center items-center p-6 aspect-square border-2 transition-all ${selectedFormat === 'pdf' ? 'bg-surface border-primary ring-2 ring-primary/20' : 'bg-surface border-transparent hover:border-gray-200'}`}
            >
                {selectedFormat === 'pdf' && (
                    <div className="absolute top-3 right-3 text-primary">
                        <span className="material-symbols-outlined filled">check_circle</span>
                    </div>
                )}
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-500 text-4xl">picture_as_pdf</span>
                </div>
                <p className="text-sm font-bold text-text-main">Resumen PDF</p>
            </button>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-gray-200">
            <label className="block w-full">
                <p className="text-text-main font-medium mb-2">Email del Contador</p>
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="ejemplo@estudio.com"
                        className="w-full h-12 rounded-lg border border-gray-300 pl-10 focus:ring-primary focus:border-primary placeholder:text-gray-400"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                </div>
            </label>
        </div>

        <p className="text-center text-text-sec text-sm italic mt-6 px-4">
            Se enviará un detalle de todas tus ventas, compras y retenciones del mes.
        </p>
      </main>

      <div className="fixed bottom-[88px] left-0 right-0 max-w-[480px] mx-auto px-4 z-20">
         <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">send</span>
            ENVIAR REPORTE
         </button>
      </div>
    </div>
  );
};

export default ExportReport;