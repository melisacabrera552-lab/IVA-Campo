import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ icon, label, path, filled = false }: { icon: string; label: string; path: string, filled?: boolean }) => (
    <button 
      onClick={() => navigate(path)}
      className={`flex flex-col items-center gap-1 w-full py-2 ${isActive(path) ? 'text-primary' : 'text-text-sec'}`}
    >
      <span className={`material-symbols-outlined ${filled || isActive(path) ? 'filled' : ''}`}>{icon}</span>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] bg-white border-t border-gray-100 flex justify-between px-2 py-1 z-30 pb-safe">
      <NavItem icon="home" label="Inicio" path="/home" />
      <NavItem icon="description" label="Documentos" path="/export" /> 
      <NavItem icon="bar_chart" label="Reportes" path="/history" /> 
      <NavItem icon="person" label="Mi Perfil" path="/profile" />
    </nav>
  );
};

export default BottomNav;