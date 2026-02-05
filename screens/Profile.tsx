import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Mi Perfil" />

      <main className="p-4 flex flex-col gap-6">
        
        {/* Avatar Section */}
        <section className="flex flex-col items-center py-4">
            <div className="flex items-center justify-center bg-primary rounded-full w-32 h-32 border-4 border-white shadow-lg mb-4">
                <span className="text-white text-4xl font-bold">JR</span>
            </div>
            <h2 className="text-2xl font-bold text-text-main">Juan Rodríguez</h2>
            <p className="text-text-sec font-medium">Productor Agropecuario</p>
        </section>

        {/* Section 1 */}
        <section>
            <h3 className="text-text-main font-bold text-lg mb-3 px-1">Datos Fiscales</h3>
            <div className="bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <ListItem icon="fingerprint" title="20-12345678-9" subtitle="CUIT" />
                <ListItem icon="agriculture" title="Cultivo de cereales" subtitle="Actividad" />
                <ListItem icon="description" title="Responsable Inscripto" subtitle="Condición IVA" last />
            </div>
        </section>

        {/* Section 2 */}
        <section>
            <h3 className="text-text-main font-bold text-lg mb-3 px-1">Estado SISA</h3>
            <div className="bg-surface rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-text-main">Estado Actual</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/30">ESTADO 1</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-text-sec">Última verificación</span>
                    <span className="text-text-main font-medium">10/10/2023</span>
                </div>
            </div>
        </section>

        {/* Settings */}
        <section>
            <h3 className="text-text-main font-bold text-lg mb-3 px-1">Configuración</h3>
            <div className="bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <span className="font-medium text-text-main">Notificaciones</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined">language</span>
                        </div>
                        <span className="font-medium text-text-main">Idioma</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-sec">
                        <span className="text-sm">Español</span>
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined">help</span>
                        </div>
                        <span className="font-medium text-text-main">Centro de ayuda</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
            </div>
        </section>

        <button 
            onClick={() => navigate('/')}
            className="w-full py-4 border-2 border-red-500/20 text-red-600 font-bold rounded-xl hover:bg-red-50 uppercase tracking-wider mb-8"
        >
            <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">logout</span>
                Cerrar Sesión
            </span>
        </button>

      </main>
    </div>
  );
};

const ListItem = ({ icon, title, subtitle, last }: any) => (
    <div className={`flex items-center gap-4 px-4 py-3 min-h-[72px] ${!last ? 'border-b border-gray-50' : ''}`}>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-col justify-center">
            <p className="text-text-main font-semibold line-clamp-1">{title}</p>
            <p className="text-text-sec text-sm line-clamp-1">{subtitle}</p>
        </div>
    </div>
);

export default Profile;