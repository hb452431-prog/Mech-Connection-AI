import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';

import LandingPage from './pages/LandingPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import SosPage from './pages/SosPage';
import MechanicsPage from './pages/MechanicsPage';
import DashboardPage from './pages/DashboardPage';
import PartnerPortalPage from './pages/PartnerPortalPage';
import CostEstimatorPage from './pages/CostEstimatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Layout = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="diagnose" element={<DiagnosticsPage />} />
        <Route path="sos" element={<SosPage />} />
        <Route path="mechanics" element={<MechanicsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="partner-portal" element={<PartnerPortalPage />} />
        <Route path="cost-estimator" element={<CostEstimatorPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
