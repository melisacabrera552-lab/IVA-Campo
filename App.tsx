import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './screens/Landing';
import Dashboard from './screens/Dashboard';
import { SaleTypeSelect, SaleForm, SaleSuccess } from './screens/Sales';
import { ExpenseCategory, ExpenseWarning } from './screens/Expenses';
import SisaStatus from './screens/SisaStatus';
import Simulator from './screens/Simulator';
import History from './screens/History';
import Alerts from './screens/Alerts';
import Profile from './screens/Profile';
import ExportReport from './screens/ExportReport';
import BottomNav from './components/BottomNav';

const AppContent = () => {
  const location = useLocation();
  // Show bottom nav only on specific main screens
  const showBottomNav = ['/home', '/history', '/profile', '/export'].includes(location.pathname);

  return (
    <div className="max-w-[480px] mx-auto bg-background min-h-screen relative shadow-2xl overflow-hidden">
      <div className={`flex-1 ${showBottomNav ? 'pb-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Dashboard />} />
          
          {/* Sales Flow */}
          <Route path="/sales/type" element={<SaleTypeSelect />} />
          <Route path="/sales/form" element={<SaleForm />} />
          <Route path="/sales/success" element={<SaleSuccess />} />
          
          {/* Expenses Flow */}
          <Route path="/expenses/category" element={<ExpenseCategory />} />
          <Route path="/expenses/warning" element={<ExpenseWarning />} />
          
          {/* Tools & Status */}
          <Route path="/sisa" element={<SisaStatus />} />
          <Route path="/simulator" element={<Simulator />} />
          
          {/* Management */}
          <Route path="/history" element={<History />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/export" element={<ExportReport />} />
        </Routes>
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}