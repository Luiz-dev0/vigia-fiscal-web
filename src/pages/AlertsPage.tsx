import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  TrendingUp,
  Zap,
  ShieldCheck,
  MessageSquare,
  Mail,
  Smartphone,
  Trash2
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { cn } from '../lib/utils';
import { alertService } from '../services/alertService';
import { cnpjService } from '../services/cnpjService';
import { AlertRuleResponse, CnpjResponse } from '../types';

export const AlertsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState<AlertRuleResponse[]>([]);
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [newRule, setNewRule] = useState({
    cnpjId: '',
    tipoEvento: 'CANCELAMENTO',
    canalNotificacao: 'WHATSAPP',
    destino: '',
    antecedenciaMinutos: 30
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rulesData, cnpjsData] = await Promise.all([
        alertService.listar(),
        cnpjService.listar()
      ]);
      setRules(rulesData);
      setCnpjs(cnpjsData);
      if (cnpjsData.length > 0) {
        setNewRule(prev => ({ ...prev, cnpjId: cnpjsData[0].id }));
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateRule = async () => {
    if (!newRule.cnpjId || !newRule.destino) return;
    
    setSubmitting(true);
    try {
      await alertService.criar(newRule);
      setIsModalOpen(false);
      fetchData();
      setNewRule({
        cnpjId: cnpjs[0]?.id || '',
        tipoEvento: 'CANCELAMENTO',
        canalNotificacao: 'WHATSAPP',
        destino: '',
        antecedenciaMinutos: 30
      });
    } catch (error) {
      console.error('Erro ao criar regra:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta regra?')) return;
    try {
      await alertService.remover(id);
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir regra:', error);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Regras de Alerta</h1>
          <p className="text-slate-500 font-medium">Configure como e quando você deseja ser notificado sobre eventos fiscais.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto h-14 px-8 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20 flex gap-3">
          <Plus className="w-5 h-5" />
          Nova Regra
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Alertas Ativos', value: rules.length.toString(), sub: 'Sincronização Real', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Disparos (Mês)', value: '0', sub: 'Histórico Mensal', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Canais Ativos', value: Array.from(new Set(rules.map(r => r.canalNotificacao))).length.toString(), sub: 'WhatsApp & Email', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Saúde da Integração', value: '99.9%', sub: 'Uptime Garantido', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-500 border-none shadow-xl shadow-slate-200/50">
            <div className="space-y-4 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <div className="space-y-1">
                <h3 className={cn('text-4xl font-black tracking-tight', stat.color)}>{stat.value}</h3>
                <p className="text-[10px] font-bold text-slate-500 bg-slate-50 inline-flex px-3 py-1 rounded-full border border-slate-100 shadow-sm">{stat.sub}</p>
              </div>
            </div>
            <div className={cn('absolute top-8 right-8 p-4 rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3', stat.bg, stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={cn("absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-1000", stat.bg)} />
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden" padding="none">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between items-center bg-white">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-vigia-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Filtrar regras por CNPJ ou Evento..." 
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-vigia-blue transition-all"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full md:w-auto h-12 px-6 border-2 font-black uppercase tracking-widest text-[10px] flex gap-3">
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50">
                <th className="px-8 py-6">Empresa (CNPJ)</th>
                <th className="px-8 py-6">Evento Monitorado</th>
                <th className="px-8 py-6">Canal de Notificação</th>
                <th className="px-8 py-6">Destinatário</th>
                <th className="px-8 py-6">Antecedência</th>
                <th className="px-8 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue mx-auto"></div>
                  </td>
                </tr>
              ) : rules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 shadow-inner">
                        <Bell className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Nenhuma regra configurada</p>
                        <p className="text-xs text-slate-300 font-bold">Clique em "Nova Regra" para começar o monitoramento</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer">
                  <td className="px-8 py-6 text-sm font-black text-slate-900">{rule.cnpjId}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 shadow-sm">
                      {rule.tipoEvento}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border',
                        rule.canalNotificacao === 'WHATSAPP' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      )}>
                        {rule.canalNotificacao === 'WHATSAPP' ? <MessageSquare className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                      </div>
                      <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{rule.canalNotificacao}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{rule.destino}</td>
                  <td className="px-8 py-6 text-sm font-black text-slate-900">{rule.antecedenciaMinutos} <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">min</span></td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-10 h-10 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Rule Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nova Regra de Alerta"
        footer={
          <div className="flex gap-4 w-full">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 font-black uppercase tracking-widest text-xs">Cancelar</Button>
            <Button onClick={handleCreateRule} loading={submitting} disabled={!newRule.cnpjId || !newRule.destino} className="flex-[2] h-14 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20">Criar Regra de Alerta</Button>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Empresa (CNPJ)</label>
              <select 
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-vigia-blue transition-all appearance-none"
                value={newRule.cnpjId}
                onChange={(e) => setNewRule({ ...newRule, cnpjId: e.target.value })}
              >
                <option value="">Selecione um CNPJ</option>
                {cnpjs.map(cnpj => (
                  <option key={cnpj.id} value={cnpj.id}>{cnpj.cnpj} - {cnpj.razaoSocial}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Tipo de Evento</label>
              <select 
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-vigia-blue transition-all appearance-none"
                value={newRule.tipoEvento}
                onChange={(e) => setNewRule({ ...newRule, tipoEvento: e.target.value })}
              >
                <option value="CANCELAMENTO">Prazo de Cancelamento</option>
                <option value="REJEICAO">Nota Rejeitada</option>
                <option value="DENEGADA">Nota Denegada</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Canal de Notificação</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] border-2 transition-all duration-300',
                    newRule.canalNotificacao === 'WHATSAPP' 
                      ? 'border-vigia-blue bg-blue-50 text-vigia-blue shadow-lg shadow-blue-900/5' 
                      : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                  )}
                  onClick={() => setNewRule({ ...newRule, canalNotificacao: 'WHATSAPP' })}
                >
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                </button>
                <button 
                  type="button"
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] border-2 transition-all duration-300',
                    newRule.canalNotificacao === 'EMAIL' 
                      ? 'border-vigia-blue bg-blue-50 text-vigia-blue shadow-lg shadow-blue-900/5' 
                      : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                  )}
                  onClick={() => setNewRule({ ...newRule, canalNotificacao: 'EMAIL' })}
                >
                  <Mail className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                </button>
              </div>
            </div>
            <Input 
              label="Destino da Notificação" 
              placeholder={newRule.canalNotificacao === 'WHATSAPP' ? 'Ex: 5511999999999' : 'Ex: email@exemplo.com'} 
              icon={newRule.canalNotificacao === 'WHATSAPP' ? <Smartphone className="w-5 h-5" /> : <Mail className="w-5 h-5" />} 
              value={newRule.destino}
              onChange={(e) => setNewRule({ ...newRule, destino: e.target.value })}
            />
            <div className="p-6 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex items-center justify-between gap-6">
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Antecedência</h5>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={newRule.antecedenciaMinutos} 
                    onChange={(e) => setNewRule({ ...newRule, antecedenciaMinutos: parseInt(e.target.value) })}
                    className="w-20 bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-sm font-black text-slate-900 focus:outline-none focus:border-vigia-blue transition-colors" 
                  />
                  <span className="text-xs font-bold text-slate-500">minutos antes do prazo</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-50 text-vigia-blue text-[8px] font-black uppercase tracking-widest rounded-full border border-blue-100 shadow-sm text-center max-w-[120px]">
                Apenas para cancelamento
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
