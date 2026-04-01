import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Building2,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { NfeStatusBadge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';
import { cnpjService } from '@/services/cnpjService';
import { nfeService } from '@/services/nfeService';
import { alertService } from '@/services/alertService';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import type { CnpjResponse, NfeResponse, AlertRuleResponse } from '@/types';
import { cn } from '@/lib/utils';


export function DashboardPage() {
  const { user } = useAuth();
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [nfes, setNfes] = useState<NfeResponse[]>([]);
  const [alerts, setAlerts] = useState<AlertRuleResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cnpjsData, nfesData, alertsData] = await Promise.all([
          cnpjService.listar(),
          nfeService.listar(),
          alertService.listar(),
        ]);
        setCnpjs(cnpjsData);
        setNfes(nfesData);
        setAlerts(alertsData);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      label: 'CNPJs Monitorados',
      value: cnpjs.length,
      sub: 'Ativos no sistema',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      href: '/cnpjs',
    },
    {
      label: 'NF-es Registradas',
      value: nfes.length,
      sub: 'Total sincronizado',
      icon: FileText,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      href: '/nfes',
    },
    {
      label: 'Regras de Alerta',
      value: alerts.length,
      sub: 'Configuradas',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      href: '/alerts',
    },
    {
      label: 'Status SEFAZ',
      value: 'Online',
      sub: 'Conectado',
      icon: RefreshCw,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      href: '/nfes',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Bom dia, {user?.nome?.split(' ')[0] ?? 'usuário'}.
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Aqui está o resumo do seu monitoramento fiscal.
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded-lg border border-slate-100">
                    {stat.sub}
                  </p>
                </div>
                <div className={cn('p-3 rounded-2xl', stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* NF-es Recentes */}
        <Card className="lg:col-span-2" padding="none">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-black text-slate-900 uppercase tracking-tight">
                NF-es Recentes
              </h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">
                Últimas notas sincronizadas
              </p>
            </div>
            <Link to="/nfes">
              <Button variant="secondary" size="sm">
                Ver todas
              </Button>
            </Link>
          </div>

          {nfes.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-8 h-8" />}
              title="Nenhuma nota encontrada"
              description="Sincronize seus CNPJs para começar"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50">
                    <th className="px-6 py-4">Emitente</th>
                    <th className="px-6 py-4 text-right">Valor</th>
                    <th className="px-6 py-4">Emissão</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {nfes.slice(0, 6).map((nfe) => (
                    <tr
                      key={nfe.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/nfes/${nfe.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-vigia-blue transition-colors block truncate max-w-[180px]"
                        >
                          {nfe.emitenteNome}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {nfe.emitenteCnpj}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                        {formatCurrency(nfe.valorTotal)}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500">
                        {formatDate(nfe.dataEmissao)}
                      </td>
                      <td className="px-6 py-4">
                        <NfeStatusBadge status={nfe.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Alertas Ativos */}
        <Card padding="none" className="flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-black text-slate-900 uppercase tracking-tight">
                Alertas
              </h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">
                Regras ativas
              </p>
            </div>
            <Link to="/alerts">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </Button>
            </Link>
          </div>

          <div className="flex-1 p-6">
            {alerts.length === 0 ? (
              <EmptyState
                icon={<Bell className="w-8 h-8" />}
                title="Sem alertas configurados"
                description="Configure alertas para ser notificado"
              />
            ) : (
              <div className="space-y-4">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div className={cn(
                      'w-2 h-10 rounded-full shrink-0 mt-1',
                      alert.active ? 'bg-vigia-blue' : 'bg-slate-200'
                    )} />
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {alert.eventType.replace('_', ' ')}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">
                        {alert.channel} · {alert.destination}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-50">
            <Link to="/alerts">
              <Button variant="outline" className="w-full">
                Configurar alertas
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
