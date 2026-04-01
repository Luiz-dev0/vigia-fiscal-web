import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  Trash2,
  RefreshCw,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { cn } from '../lib/utils';
import { cnpjService } from '../services/cnpjService';
import { CnpjResponse, CnpjRequest } from '../types';

export const CnpjsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState<CnpjRequest>({
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    inscricaoEstadual: '',
    uf: '',
    emailContato: ''
  });

  const fetchCnpjs = async () => {
    setLoading(true);
    try {
      const data = await cnpjService.listar();
      setCnpjs(data);
    } catch (err) {
      console.error('Erro ao carregar CNPJs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCnpjs();
  }, []);

  const handleAddCnpj = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await cnpjService.cadastrar(formData);
      setIsModalOpen(false);
      setFormData({
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        inscricaoEstadual: '',
        uf: '',
        emailContato: ''
      });
      fetchCnpjs();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar CNPJ. Verifique os dados.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCnpj = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este CNPJ?')) {
      try {
        await cnpjService.remover(id);
        fetchCnpjs();
      } catch (err) {
        console.error('Erro ao remover CNPJ:', err);
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Meus CNPJs</h1>
          <p className="text-slate-500 font-medium">Gerencie as empresas monitoradas no seu cofre digital.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex gap-2 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Adicionar Novo CNPJ
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total de Empresas', value: cnpjs.length.toString(), sub: 'Unidades', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Monitorando', value: cnpjs.length.toString(), sub: 'Ativos', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Alertas Ativos', value: '0', sub: 'Pendências', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'NF-es (Mês)', value: '0', sub: 'Documentos', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                </div>
                <p className="text-[10px] font-bold text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded-lg">{stat.sub}</p>
              </div>
              <div className={cn('p-4 rounded-2xl shadow-sm', stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card padding="none">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filtrar por CNPJ, Razão Social..." 
              className="w-full pl-12 pr-6 py-3 bg-slate-50/50 border-2 border-slate-50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 focus:border-vigia-blue/20 transition-all"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="flex gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50">
                <th className="px-8 py-5">CNPJ</th>
                <th className="px-8 py-5">Razão Social / Fantasia</th>
                <th className="px-8 py-5">UF</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-vigia-blue mx-auto"></div>
                  </td>
                </tr>
              ) : cnpjs.length > 0 ? cnpjs.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-black text-vigia-blue">{company.cnpj}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-900">{company.razaoSocial}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{company.nomeFantasia}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-blue-50 text-vigia-blue text-[10px] font-black rounded-lg border border-blue-100/50">
                      {company.uf}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Ativo</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteCnpj(company.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-300 hover:text-vigia-blue hover:bg-blue-50">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Building2 className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Nenhum CNPJ cadastrado</p>
                    </div>
                  </td>
                </tr>
              )}
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
