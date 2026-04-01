import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { 
  Building2, 
  FileText, 
  Bell, 
  RefreshCw, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { cnpjService } from '../services/cnpjService';
import { nfeService } from '../services/nfeService';
import { alertService } from '../services/alertService';
import { CnpjResponse, NfeResponse, AlertRuleResponse } from '../types';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [nfes, setNfes] = useState<NfeResponse[]>([]);
  const [alerts, setAlerts] = useState<AlertRuleResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cnpjsData, nfesData, alertsData] = await Promise.all([
          cnpjService.listar(),
          nfeService.listar(),
          alertService.listar()
        ]);
        setCnpjs(cnpjsData);
        setNfes(nfesData);
        setAlerts(alertsData);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'CNPJs Monitorados', value: cnpjs.length.toString(), sub: 'Ativos no sistema', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'NF-es Monitoradas', value: nfes.length.toString(), sub: 'Total no sistema', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Regras de Alerta', value: alerts.length.toString(), sub: 'Configuradas', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Consulta SEFAZ', value: 'Online', sub: 'Status: Conectado', icon: RefreshCw, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const recentNfes = nfes.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue"></div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Carregando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel de Monitoramento</h1>
        <p className="text-slate-500 font-medium">Bem-vindo ao seu cofre digital de inteligência fiscal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-500 border-none shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                <div className="space-y-1">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-slate-500 bg-slate-50 inline-flex px-3 py-1 rounded-full border border-slate-100 shadow-sm">{stat.sub}</p>
                </div>
              </div>
              <div className={cn('w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3', stat.bg, stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
            <div className={cn("absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-1000", stat.bg)} />
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-lg shadow-slate-200/50 bg-gradient-to-br from-vigia-navy to-slate-900 text-white group cursor-pointer hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Building2 className="w-7 h-7 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-400">Novo CNPJ</h4>
              <p className="text-sm font-bold text-slate-300">Adicionar empresa para monitoramento</p>
            </div>
            <ArrowUpRight className="w-5 h-5 ml-auto text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </Card>
        <Card className="p-6 border-none shadow-lg shadow-slate-200/50 bg-white group cursor-pointer hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <RefreshCw className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black uppercase tracking-widest text-xs text-emerald-600">Sincronizar</h4>
              <p className="text-sm font-bold text-slate-500">Buscar novas notas na SEFAZ</p>
            </div>
            <ArrowUpRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-emerald-600 transition-colors" />
          </div>
        </Card>
        <Card className="p-6 border-none shadow-lg shadow-slate-200/50 bg-white group cursor-pointer hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <Bell className="w-7 h-7 text-indigo-600" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black uppercase tracking-widest text-xs text-indigo-600">Nova Regra</h4>
              <p className="text-sm font-bold text-slate-500">Configurar alerta inteligente</p>
            </div>
            <ArrowUpRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-indigo-600 transition-colors" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent NF-es Table */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 overflow-hidden" padding="none">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">NF-es Recentes</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Últimas notas fiscais sincronizadas</p>
            </div>
            <Link to="/nfes">
              <Button variant="secondary" size="sm" className="font-black uppercase tracking-widest text-[10px] px-6 h-10">Ver Tudo</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50">
                  <th className="px-8 py-6">Chave de Acesso</th>
                  <th className="px-8 py-6">Emitente</th>
                  <th className="px-8 py-6 text-right">Valor Total</th>
                  <th className="px-8 py-6">Data Emissão</th>
                  <th className="px-8 py-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {recentNfes.length > 0 ? recentNfes.map((nfe) => (
                  <tr key={nfe.id} className="hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer">
                    <td className="px-8 py-6 text-sm font-black text-vigia-blue truncate max-w-[140px]">
                      <Link to={`/nfes/${nfe.id}`} className="hover:underline underline-offset-4">{nfe.chave.substring(0, 12)}...</Link>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-700 max-w-[200px] truncate">{nfe.emitenteNome}</td>
                    <td className="px-8 py-6 text-sm font-black text-slate-900 text-right">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nfe.valorTotal)}
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-400">
                      {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border',
                        nfe.status === 'AUTORIZADA' && 'bg-blue-50 text-blue-600 border-blue-100',
                        nfe.status === 'CANCELADA' && 'bg-red-50 text-red-600 border-red-100',
                        nfe.status === 'PENDENTE' && 'bg-amber-50 text-amber-600 border-amber-100',
                        nfe.status === 'REJEITADA' && 'bg-slate-100 text-slate-600 border-slate-200'
                      )}>
                        {nfe.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 shadow-inner">
                          <FileText className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Nenhuma nota encontrada</p>
                          <p className="text-xs text-slate-300 font-bold">Sincronize seus CNPJs para começar</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Alerts (Rules) */}
        <Card className="flex flex-col border-none shadow-xl shadow-slate-200/50 overflow-hidden" padding="none">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Alertas</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Monitoramento ativo</p>
            </div>
            <Link to="/alerts">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-300 hover:text-vigia-blue hover:bg-blue-50 transition-all">
                <TrendingUp className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="flex-1 p-8 space-y-8 bg-white">
            {alerts.length > 0 ? alerts.slice(0, 4).map((alert, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className={cn(
                  'w-1.5 h-16 rounded-full transition-all duration-700 group-hover:scale-y-110',
                  alert.ativo ? 'bg-vigia-blue shadow-lg shadow-blue-100' : 'bg-slate-200'
                )} />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-vigia-blue transition-colors uppercase tracking-tight">{alert.nome}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{alert.tipoAlerta}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {alert.canais.map(canal => (
                      <span key={canal} className="text-[9px] font-black text-vigia-blue uppercase tracking-widest bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100/50">
                        {canal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-16 space-y-5">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto flex items-center justify-center text-slate-200 shadow-inner">
                  <Bell className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Sem regras ativas</p>
                  <p className="text-xs text-slate-300 font-bold">Configure alertas para ser notificado</p>
                </div>
              </div>
            )}
          </div>
          <div className="p-8 border-t border-slate-50 bg-slate-50/30">
            <Link to="/alerts">
              <Button variant="outline" className="w-full font-black uppercase tracking-widest text-[10px] h-12 border-2 shadow-sm">Configurar Alertas</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
