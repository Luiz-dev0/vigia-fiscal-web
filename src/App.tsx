import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/components/PrivateRoute';
import { PublicRoute } from '@/components/PublicRoute';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CnpjsPage } from '@/pages/CnpjsPage';
import { NfesPage } from '@/pages/NfesPage';
import { NfeDetailPage } from '@/pages/NfeDetailPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { SubscriptionPage } from '@/pages/SubscriptionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pública sem redirecionamento */}
        <Route path="/" element={<LandingPage />} />

        {/* Públicas — redireciona para /dashboard se já autenticado */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Privadas — redireciona para /login se não autenticado */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cnpjs" element={<CnpjsPage />} />
            <Route path="/nfes" element={<NfesPage />} />
            <Route path="/nfes/:id" element={<NfeDetailPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

