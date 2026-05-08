import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'CNPJs', path: '/cnpjs' },
  { icon: FileText, label: 'NF-es', path: '/nfes' },
  { icon: Bell, label: 'Alertas', path: '/alerts' },
  { icon: CreditCard, label: 'Assinatura', path: '/subscription' },
];

export function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-vigia-bg flex font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 z-20 shadow-2xl shadow-slate-900/5">
        {/* logo */}
        <div className="p-10 flex items-center">
          <div className="space-y-0.5">
            <h1 className="font-black text-slate-900 text-xl leading-none tracking-tight uppercase">
              Vigia Fiscal
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-6 py-4 space-y-3 flex flex-col">
          <div className="px-4 mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Menu Principal
            </p>
          </div>
          <div className="space-y-3 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center justify-between px-5 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-300 group',
                    isActive
                      ? 'bg-gradient-to-r from-vigia-navy to-vigia-blue text-white shadow-xl shadow-blue-900/20'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon
                      className={cn(
                        'w-5 h-5 transition-all duration-300',
                        isActive
                          ? 'text-white'
                          : 'text-slate-300 group-hover:text-vigia-blue'
                      )}
                    />
                    <span className="text-[11px]">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </Link>
              );
            })}
          </div>

          {/* Separador com Configurações */}
          <div className="border-t border-slate-100 mt-4 pt-4 px-6">
            <Link
              to="/configuracoes"
              className={cn(
                'flex items-center gap-4 px-5 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-300 group',
                location.pathname === '/configuracoes'
                  ? 'bg-gradient-to-r from-vigia-navy to-vigia-blue text-white shadow-xl shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Settings
                className={cn(
                  'w-5 h-5 transition-all duration-300',
                  location.pathname === '/configuracoes'
                    ? 'text-white'
                    : 'text-slate-300 group-hover:text-vigia-blue'
                )}
              />
              <span className="text-[11px]">Configurações</span>
            </Link>
          </div>
        </nav>

      </aside>

      {/* conteúdo principal */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-end px-12 sticky top-0 z-10 shadow-sm">
          {/* sino */}
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-vigia-blue rounded-2xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </header>

        <div className="p-10 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}