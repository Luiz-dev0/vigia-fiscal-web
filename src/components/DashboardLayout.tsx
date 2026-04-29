import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  Search,
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
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const initials = user?.nome
    ? user.nome
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'VF';

  return (
    <div className="min-h-screen bg-vigia-bg flex font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 z-20 shadow-2xl shadow-slate-900/5">
        {/* logo */}
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-vigia-navy to-vigia-blue rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
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
        <nav className="flex-1 px-6 py-4 space-y-3">
          <div className="px-4 mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Menu Principal
            </p>
          </div>
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
        </nav>

        {/* rodapé: apenas avatar/nome — sem botão de logout */}
        <div className="p-8 border-t border-slate-50">
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-vigia-blue font-black text-sm shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-900 truncate">
                {user?.nome ?? 'Usuário'}
              </p>
              <p className="text-[10px] text-slate-400 font-bold truncate">
                {user?.email ?? ''}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* conteúdo principal */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-10 shadow-sm">
          {/* busca */}
          <div className="relative max-w-md w-full hidden lg:block">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="text"
              placeholder="Pesquisar notas, CNPJs ou alertas..."
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-[20px] py-3 pl-14 pr-6 text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-vigia-blue transition-all"
            />
          </div>

          {/* lado direito: sino + avatar clicável */}
          <div className="flex items-center gap-4 ml-auto">
            {/* sino */}
            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-vigia-blue rounded-2xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* avatar → /configuracoes */}
            <button
              onClick={() => navigate('/configuracoes')}
              title="Configurações"
              className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-vigia-blue font-black text-sm hover:bg-vigia-blue hover:text-white transition-all duration-300"
            >
              {initials}
            </button>
          </div>
        </header>

        <div className="p-10 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}