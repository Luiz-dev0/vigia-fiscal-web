/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CnpjsPage } from './pages/CnpjsPage';
import { NfesPage } from './pages/NfesPage';
import { NfeDetailPage } from './pages/NfeDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        } />
        <Route path="/cnpjs" element={
          <DashboardLayout>
            <CnpjsPage />
          </DashboardLayout>
        } />
        <Route path="/nfes" element={
          <DashboardLayout>
            <NfesPage />
          </DashboardLayout>
        } />
        <Route path="/nfes/detail" element={
          <DashboardLayout>
            <NfeDetailPage />
          </DashboardLayout>
        } />
        <Route path="/alerts" element={
          <DashboardLayout>
            <AlertsPage />
          </DashboardLayout>
        } />
        <Route path="/subscription" element={
          <DashboardLayout>
            <SubscriptionPage />
          </DashboardLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

