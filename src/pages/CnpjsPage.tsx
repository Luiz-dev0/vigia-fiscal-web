import { useEffect, useState } from 'react';
import { Building2, Plus, Trash2, Search } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { EmptyState } from '@/components/EmptyState';
import { cnpjService } from '@/services/cnpjService';
import { formatCnpj } from '@/lib/utils';
import type { CnpjResponse, CnpjRequest } from '@/types';

const UF_LIST = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

const EMPTY_FORM: CnpjRequest = {
  cnpj: '',
  razaoSocial: '',
  nomeFantasia: '',
  ie: '',
  uf: '',
  emailContato: '',
};

export function CnpjsPage() {
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<CnpjRequest>(EMPTY_FORM);

  async function fetchCnpjs() {
    setLoading(true);
    try {
      const data = await cnpjService.listar();
      setCnpjs(data);
    } catch {
      console.error('Erro ao carregar CNPJs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchCnpjs(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await cnpjService.cadastrar(form);
      setIsModalOpen(false);
      setForm(EMPTY_FORM);
      fetchCnpjs();
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message ?? 'Erro ao cadastrar CNPJ.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover este CNPJ do monitoramento?')) return;
    try {
      await cnpjService.remover(id);
      fetchCnpjs();
    } catch {
      console.error('Erro ao remover CNPJ');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Meus CNPJs</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Empresas monitoradas no seu painel.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Adicionar CNPJ
        </Button>
      </div>

      {/* Table Section */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50">
                <th className="px-6 py-4">CNPJ</th>
                <th className="px-6 py-4">Razão Social</th>
                <th className="px-6 py-4">UF</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-100 border-t-vigia-blue mx-auto" />
                  </td>
                </tr>
              ) : cnpjs.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      icon={<Building2 className="w-8 h-8" />}
                      title="Nenhum CNPJ cadastrado"
                      description="Adicione uma empresa para iniciar o monitoramento"
                      action={{ label: 'Adicionar CNPJ', onClick: () => setIsModalOpen(true) }}
                    />
                  </td>
                </tr>
              ) : cnpjs.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-black text-vigia-blue">
                    {formatCnpj(c.cnpj)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{c.razaoSocial}</p>
                    {c.nomeFantasia && (
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{c.nomeFantasia}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-vigia-blue text-[10px] font-black rounded-lg border border-blue-100">
                      {c.uf}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${c.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="text-[10px] font-black uppercase text-slate-600">
                        {c.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mostrando {cnpjs.length} empresas</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl" disabled>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="primary" size="sm" className="w-10 h-10 p-0 text-xs font-black rounded-xl">1</Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl" disabled>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Add CNPJ Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Novo CNPJ"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddCnpj} disabled={submitting}>
              {submitting ? 'Processando...' : 'Confirmar Cadastro'}
            </Button>
          </>
        }
      >
        <form className="space-y-8" onSubmit={handleAddCnpj}>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">Insira os dados da empresa para iniciar o monitoramento 24/7 na SEFAZ.</p>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <Input 
              label="CNPJ da Empresa" 
              placeholder="00.000.000/0000-00" 
              icon={<Search className="w-5 h-5" />}
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              required
            />
            <Input 
              label="Razão Social" 
              placeholder="Nome jurídico completo" 
              value={formData.razaoSocial}
              onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
              required
            />
            <Input 
              label="Nome Fantasia" 
              placeholder="Como a empresa é conhecida" 
              value={formData.nomeFantasia}
              onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Inscrição Estadual" 
                placeholder="Nº ou Isento" 
                value={formData.inscricaoEstadual}
                onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">UF</label>
                <select 
                  className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-4 py-3 text-sm font-medium focus:border-vigia-blue/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all"
                  value={formData.uf}
                  onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                  required
                >
                  <option value="">--</option>
                  {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
            <Input 
              label="E-mail de Notificações" 
              placeholder="financeiro@empresa.com.br" 
              icon={<Mail className="w-5 h-5" />}
              value={formData.emailContato}
              onChange={(e) => setFormData({ ...formData, emailContato: e.target.value })}
              required
            />
          </div>

          <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cota de Monitoramento</span>
              <span className="text-xs font-black text-vigia-blue">{cnpjs.length} de 5</span>
            </div>
            <div className="h-2 w-full bg-blue-100/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(cnpjs.length / 5) * 100}%` }}
                className="h-full bg-vigia-blue" 
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold italic leading-relaxed">
              Seu plano atual permite monitorar até 5 CNPJs simultaneamente.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};
