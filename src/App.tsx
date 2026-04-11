import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/components/PrivateRoute';
import { PublicRoute } from '@/components/PublicRoute';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CrispChat } from '@/components/CrispChat';

const LandingPage      = lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage        = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage     = lazy(() => import('@/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage    = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CnpjsPage        = lazy(() => import('@/pages/CnpjsPage').then(m => ({ default: m.CnpjsPage })));
const NfesPage         = lazy(() => import('@/pages/NfesPage').then(m => ({ default: m.NfesPage })));
const NfeDetailPage    = lazy(() => import('@/pages/NfeDetailPage').then(m => ({ default: m.NfeDetailPage })));
const AlertsPage       = lazy(() => import('@/pages/AlertsPage').then(m => ({ default: m.AlertsPage })));
const SubscriptionPage = lazy(() => import('@/pages/SubscriptionPage').then(m => ({ default: m.SubscriptionPage })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vigia-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Carregando...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CrispChat />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Pública */}
          <Route path="/" element={<LandingPage />} />

          {/* Públicas — redireciona para /dashboard se autenticado */}
          <Route element={<PublicRoute />}>
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Privadas — redireciona para /login se não autenticado */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard"    element={<DashboardPage />} />
              <Route path="/cnpjs"        element={<CnpjsPage />} />
              <Route path="/nfes"         element={<NfesPage />} />
              <Route path="/nfes/:id"     element={<NfeDetailPage />} />
              <Route path="/alerts"       element={<AlertsPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
