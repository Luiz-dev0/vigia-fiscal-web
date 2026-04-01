import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import { nfeService } from '../services/nfeService';
import { cnpjService } from '../services/cnpjService';
import { NfeResponse, CnpjResponse } from '../types';

export const NfesPage = () => {
  const [nfes, setNfes] = useState<NfeResponse[]>([]);
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedCnpj, setSelectedCnpj] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [nfesData, cnpjsData] = await Promise.all([
        nfeService.listar(),
        cnpjService.listar()
      ]);
      setNfes(nfesData);
      setCnpjs(cnpjsData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSync = async () => {
    if (!selectedCnpj) {
      alert('Selecione um CNPJ para sincronizar.');
      return;
    }
    setSyncing(true);
    try {
      await nfeService.sincronizar(selectedCnpj);
      fetchData();
      alert('Sincronização concluída com sucesso!');
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      alert('Erro ao sincronizar notas fiscais.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notas Fiscais</h1>
          <p className="text-slate-500 font-medium">Acompanhe todos os documentos emitidos e recebidos em tempo real.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-none flex gap-2 group" 
            onClick={handleSync} 
            disabled={syncing || !selectedCnpj}
          >
            <RefreshCw className={cn('w-5 h-5 text-vigia-blue', syncing && 'animate-spin')} />
            {syncing ? 'Sincronizando...' : 'Sincronizar Agora'}
          </Button>
          <Button className="flex-1 md:flex-none flex gap-2 shadow-lg shadow-blue-900/20">
            <Download className="w-5 h-5" />
            Exportação Inteligente
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="p-8 border-none bg-white shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Filtro por Empresa</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-sm font-bold text-slate-700 focus:border-vigia-blue/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all appearance-none"
                value={selectedCnpj}
                onChange={(e) => setSelectedCnpj(e.target.value)}
              >
                <option value="">Selecione um CNPJ</option>
                {cnpjs.map(cnpj => (
                  <option key={cnpj.id} value={cnpj.id}>{cnpj.nomeFantasia || cnpj.razaoSocial} ({cnpj.cnpj})</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Status do Documento</label>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-sm font-bold text-slate-700 focus:border-vigia-blue/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all appearance-none">
                <option>Status (Todos)</option>
                <option>AUTORIZADA</option>
                <option>CANCELADA</option>
                <option>PENDENTE</option>
                <option>REJEITADA</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Período de Emissão</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="01/01/2024 - 31/01/2024" 
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50/50 text-sm font-bold text-slate-700 focus:border-vigia-blue/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-vigia-blue/5 transition-all" 
              />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <Button className="flex-1 flex gap-2 h-[52px]">
              <Search className="w-5 h-5" />
              Filtrar
            </Button>
            <Button variant="outline" size="icon" className="h-[52px] w-[52px] rounded-2xl">
              <Download className="w-5 h-5 text-slate-400" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Table Section */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50">
                <th className="px-8 py-5">Chave de Acesso</th>
                <th className="px-8 py-5">Emitente</th>
                <th className="px-8 py-5">Destinatário</th>
                <th className="px-8 py-5">Valor</th>
                <th className="px-8 py-5">Data Emissão</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-vigia-blue mx-auto"></div>
                  </td>
                </tr>
              ) : nfes.length > 0 ? nfes.map((nfe) => (
                <tr key={nfe.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block w-32 truncate group-hover:text-vigia-blue transition-colors">
                      {nfe.chave}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-900">{nfe.emitenteNome}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{nfe.emitenteCnpj}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-900">{nfe.destinatarioNome}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{nfe.destinatarioCnpj}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nfe.valorTotal)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      'px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border',
                      nfe.status === 'AUTORIZADA' && 'bg-emerald-50 text-emerald-600 border-emerald-100',
                      nfe.status === 'CANCELADA' && 'bg-red-50 text-red-600 border-red-100',
                      nfe.status === 'PENDENTE' && 'bg-amber-50 text-amber-600 border-amber-100'
                    )}>
                      {nfe.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link to={`/nfes/${nfe.id}`}>
                      <Button variant="ghost" size="icon" className="text-slate-300 hover:text-vigia-blue hover:bg-blue-50">
                        <Eye className="w-5 h-5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Nenhuma nota fiscal encontrada</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exibindo {nfes.length} registros</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-vigia-navy to-vigia-blue text-white p-10 flex flex-col md:flex-row justify-between items-center gap-10 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Monitoramento Ativo</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight">Sincronização em Tempo Real</h3>
            <p className="text-blue-100/80 font-medium leading-relaxed max-w-md">
              O Vigia Fiscal monitora a SEFAZ 24/7. Novos documentos são sincronizados automaticamente a cada 15 minutos para garantir total conformidade.
            </p>
            <div className="flex gap-10 pt-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/60">Última Sincronização</p>
                <p className="text-xl font-black">Agora mesmo</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/60">Total de Notas</p>
                <p className="text-xl font-black">{nfes.length}</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500" />
            <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 relative z-10">
              <ShieldCheck className="w-20 h-20 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-10 flex flex-col justify-between group border-none shadow-xl shadow-slate-200/50">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-vigia-blue group-hover:scale-110 transition-transform duration-500">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Exportação em Massa</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Gere pacotes XML ou PDF consolidados para seu ERP ou contabilidade com filtros avançados.
              </p>
            </div>
          </div>
          <Button variant="ghost" className="text-vigia-blue font-black p-0 justify-start hover:bg-transparent hover:translate-x-2 transition-transform mt-10">
            Central de Exportação <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
};
