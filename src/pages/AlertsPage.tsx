import { useEffect, useState } from 'react';
import { Bell, Mail, MessageSquare, Plus, Smartphone, Trash2 } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { EmptyState } from '@/components/EmptyState';
import { alertService } from '@/services/alertService';
import { cnpjService } from '@/services/cnpjService';
import { cn } from '@/lib/utils';
import type { AlertRuleResponse, AlertRuleRequest, CnpjResponse, AlertEventType, AlertChannel } from '@/types';

const EVENT_LABELS: Record<AlertEventType, string> = {
  PRAZO_CANCELAMENTO: 'Prazo de Cancelamento',
  NOTA_REJEITADA: 'Nota Rejeitada',
  NOTA_CANCELADA: 'Nota Cancelada',
  NOTA_DENEGADA: 'Nota Denegada',
};

const EVENT_COLORS: Record<AlertEventType, string> = {
  PRAZO_CANCELAMENTO: 'bg-amber-50 text-amber-700 border-amber-100',
  NOTA_REJEITADA: 'bg-red-50 text-red-700 border-red-100',
  NOTA_CANCELADA: 'bg-red-50 text-red-700 border-red-100',
  NOTA_DENEGADA: 'bg-orange-50 text-orange-700 border-orange-100',
};

const EMPTY_FORM: AlertRuleRequest = {
  cnpjId: undefined,
  eventType: 'NOTA_CANCELADA',
  channel: 'WHATSAPP',
  destination: '',
  minutesBefore: 30,
};

export function AlertsPage() {
  const [rules, setRules] = useState<AlertRuleResponse[]>([]);
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<AlertRuleRequest>(EMPTY_FORM);

  async function fetchData() {
    setLoading(true);
    try {
      const [rulesData, cnpjsData] = await Promise.all([
        alertService.listar(),
        cnpjService.listar(),
      ]);
      setRules(rulesData);
      setCnpjs(cnpjsData);
    } catch {
      console.error('Erro ao carregar alertas');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.destination) return;
    setSubmitting(true);
    try {
      await alertService.criar(form);
      setIsModalOpen(false);
      setForm(EMPTY_FORM);
      fetchData();
    } catch {
      console.error('Erro ao criar regra');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover esta regra de alerta?')) return;
    try {
      await alertService.remover(id);
      fetchData();
    } catch {
      console.error('Erro ao remover regra');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Regras de Alerta</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Configure como e quando ser notificado sobre eventos fiscais.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Nova Regra
        </Button>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50">
                <th className="px-6 py-4">Evento</th>
                <th className="px-6 py-4">Canal</th>
                <th className="px-6 py-4">Destino</th>
                <th className="px-6 py-4">Antecedência</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-100 border-t-vigia-blue mx-auto" />
                  </td>
                </tr>
              ) : rules.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      icon={<Bell className="w-8 h-8" />}
                      title="Nenhuma regra configurada"
                      description="Crie uma regra para começar a receber alertas"
                      action={{ label: 'Nova Regra', onClick: () => setIsModalOpen(true) }}
                    />
                  </td>
                </tr>
              ) : rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border',
                      EVENT_COLORS[rule.eventType]
                    )}>
                      {EVENT_LABELS[rule.eventType]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center border',
                        rule.channel === 'WHATSAPP'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      )}>
                        {rule.channel === 'WHATSAPP'
                          ? <MessageSquare className="w-4 h-4" />
                          : <Mail className="w-4 h-4" />
                        }
                      </div>
                      <span className="text-sm font-black text-slate-700 uppercase text-[10px] tracking-wider">
                        {rule.channel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">
                    {rule.destination}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">
                    {rule.minutesBefore}{' '}
                    <span className="text-[10px] text-slate-400 font-bold">min</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${rule.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="text-[10px] font-black uppercase text-slate-600">
                        {rule.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(rule.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setForm(EMPTY_FORM); }}
        title="Nova Regra de Alerta"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} loading={submitting} disabled={!form.destination}>
              Criar Regra
            </Button>
          </>
        }
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">CNPJ (opcional)</label>
            <select
              className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-4 py-3 text-sm font-medium focus:border-vigia-blue/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all"
              value={form.cnpjId ?? ''}
              onChange={(e) => setForm({ ...form, cnpjId: e.target.value || undefined })}
            >
              <option value="">Todos os CNPJs</option>
              {cnpjs.map((c) => (
                <option key={c.id} value={c.id}>{c.cnpj} — {c.razaoSocial}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tipo de Evento</label>
            <select
              className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-4 py-3 text-sm font-medium focus:border-vigia-blue/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all"
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value as AlertEventType })}
            >
              {Object.entries(EVENT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Canal de Notificação</label>
            <div className="grid grid-cols-2 gap-3">
              {(['WHATSAPP', 'EMAIL'] as AlertChannel[]).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
                    form.channel === ch
                      ? 'border-vigia-blue bg-blue-50 text-vigia-blue'
                      : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  )}
                  onClick={() => setForm({ ...form, channel: ch })}
                >
                  {ch === 'WHATSAPP' ? <MessageSquare className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{ch}</span>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Destino"
            placeholder={form.channel === 'WHATSAPP' ? 'Ex: 5511999999999' : 'Ex: email@empresa.com'}
            icon={form.channel === 'WHATSAPP' ? <Smartphone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            required
          />

          {form.eventType === 'PRAZO_CANCELAMENTO' && (
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Antecedência (minutos)
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.minutesBefore}
                  onChange={(e) => setForm({ ...form, minutesBefore: parseInt(e.target.value) || 30 })}
                  className="w-24 bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-sm font-black text-slate-900 focus:outline-none focus:border-vigia-blue transition-colors"
                />
              </div>
              <p className="text-xs font-bold text-slate-400 mt-4">minutos antes do prazo de cancelamento</p>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
