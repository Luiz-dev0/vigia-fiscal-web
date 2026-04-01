import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Bell, 
  CreditCard, 
  Settings, 
  LogOut,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'CNPJs', path: '/cnpjs' },
  { icon: FileText, label: 'NF-es', path: '/nfes' },
  { icon: Bell, label: 'Alertas', path: '/alerts' },
  { icon: CreditCard, label: 'Assinatura', path: '/subscription' },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-vigia-bg flex font-sans selection:bg-vigia-blue/10 selection:text-vigia-blue">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 z-20 shadow-2xl shadow-slate-900/5">
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-vigia-navy to-vigia-blue rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20 transform hover:rotate-3 transition-transform duration-500">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <div className="space-y-0.5">
            <h1 className="font-black text-slate-900 text-xl leading-none tracking-tight uppercase">Vigia Fiscal</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">Cofre Digital</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-3">
          <div className="px-4 mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Menu Principal</p>
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center justify-between px-5 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-500 group',
                  isActive
                    ? 'bg-gradient-to-r from-vigia-navy to-vigia-blue text-white shadow-xl shadow-blue-900/20 scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-5 h-5 transition-all duration-500", isActive ? "text-white scale-110" : "text-slate-300 group-hover:text-vigia-blue group-hover:scale-110")} />
                  <span className="text-[11px]">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50 animate-in slide-in-from-left-2 duration-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 space-y-6">
          {/* Trial Status Widget */}
          <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-blue-200/50 transition-colors duration-500" />
            <div className="space-y-1 relative z-10">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Status do Trial</p>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">7 Dias Restantes</h4>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative z-10">
              <div className="w-1/3 h-full bg-vigia-blue rounded-full shadow-sm" />
            </div>
            <Link to="/subscription" className="block text-[10px] font-black text-vigia-blue uppercase tracking-widest hover:underline underline-offset-4 relative z-10">Fazer Upgrade</Link>
          </div>

          <div className="space-y-2">
            <Link
              to="/settings"
              className="flex items-center gap-4 px-5 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all group"
            >
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-vigia-blue transition-colors" />
              Configurações
            </Link>
            <button
              className="w-full flex items-center gap-4 px-5 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-600 transition-all group"
            >
              <LogOut className="w-5 h-5 text-red-300 group-hover:text-red-600 transition-colors" />
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative max-w-lg w-full hidden lg:block group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-vigia-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar notas, CNPJs ou alertas..." 
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-[20px] py-3.5 pl-14 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-vigia-blue transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-vigia-blue rounded-2xl transition-all relative group">
                <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
              </button>
            </div>
            
            <div className="flex items-center gap-5 pl-8 border-l border-slate-100">
              <div className="text-right hidden sm:block space-y-0.5">
                <p className="text-sm font-black text-slate-900 leading-none uppercase tracking-tight">Protocolo Redes</p>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Plano Enterprise</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white shadow-lg overflow-hidden ring-4 ring-slate-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                <img 
                  src="https://i.pravatar.cc/150?u=protocolo" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-12 flex-1 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
