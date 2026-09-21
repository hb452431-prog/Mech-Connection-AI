import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Landing Page
import LandingPage from './pages/LandingPage';

// Mechanic Portal Pages
import MechanicAuthPage from './pages/mechanic/MechanicAuthPage';
import MechanicHomePage from './pages/mechanic/MechanicHomePage';
import MechanicRequestsPage from './pages/mechanic/MechanicRequestsPage';
import MechanicCompletedPage from './pages/mechanic/MechanicCompletedPage';
import MechanicProfilePage from './pages/mechanic/MechanicProfilePage';

// User / Driver Portal Pages
import UserAuthPage from './pages/user/UserAuthPage';
import UserHomePage from './pages/user/UserHomePage';
import FindGaragePage from './pages/user/FindGaragePage';
import AiHelpPage from './pages/user/AiHelpPage';
import EmergencyPage from './pages/user/EmergencyPage';
import UserProfilePage from './pages/user/UserProfilePage';

export const App = () => {
  return (
    <Routes>
      {/* 1. Main Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. Mechanic Portal Routes */}
      <Route path="/mechanic/auth" element={<MechanicAuthPage />} />
      <Route path="/mechanic" element={<MechanicHomePage />} />
      <Route path="/mechanic/requests" element={<MechanicRequestsPage />} />
      <Route path="/mechanic/completed" element={<MechanicCompletedPage />} />
      <Route path="/mechanic/profile" element={<MechanicProfilePage />} />

      {/* 3. User / Driver Portal Routes */}
      <Route path="/user/auth" element={<UserAuthPage />} />
      <Route path="/user" element={<UserHomePage />} />
      <Route path="/user/garages" element={<FindGaragePage />} />
      <Route path="/user/ai-help" element={<AiHelpPage />} />
      <Route path="/user/emergency" element={<EmergencyPage />} />
      <Route path="/user/profile" element={<UserProfilePage />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
