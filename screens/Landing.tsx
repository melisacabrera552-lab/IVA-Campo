import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-surface flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-primary/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[30%] bg-primary/10 rounded-full blur-[60px]"></div>

      {/* Top Status Bar Placeholder */}
      <div className="flex items-center justify-end gap-2 p-4 pt-8">
         <span className="material-symbols-outlined text-primary text-[20px]">signal_cellular_4_bar</span>
         <span className="material-symbols-outlined text-primary text-[20px]">wifi</span>
         <span className="material-symbols-outlined text-primary text-[20px]">battery_5_bar</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10">
         <h1 className="text-[36px] font-bold text-primary flex items-center gap-3 mb-4">
            <span>🌾</span>
            <span>IVA CAMPO</span>
            <span>🌾</span>
         </h1>
         
         <div className="max-w-[280px]">
             <p className="text-[#4A4A4A] text-lg font-medium italic leading-relaxed">
                "Tu plata en el campo, no atrapada en el Estado"
             </p>
         </div>
      </div>

      <div className="p-6 pb-12 z-10">
         <button 
            onClick={() => navigate('/home')}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg active:scale-95 transition-all mb-4"
         >
            EMPEZAR A USAR
         </button>
         
         <p className="text-center text-sm text-gray-400">
            Diseñado para el productor argentino.
         </p>
      </div>
    </div>
  );
};

export default Landing;