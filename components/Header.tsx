import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = true, rightAction, transparent = false }) => {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-20 flex items-center justify-between p-4 ${transparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'}`}>
      <div className="flex items-center w-12">
        {showBack && (
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
            <span className="text-base font-medium ml-1">Volver</span>
          </button>
        )}
      </div>
      
      <h1 className="text-lg font-bold text-text-main text-center flex-1">{title}</h1>
      
      <div className="flex items-center justify-end w-12">
        {rightAction}
      </div>
    </header>
  );
};

export default Header;