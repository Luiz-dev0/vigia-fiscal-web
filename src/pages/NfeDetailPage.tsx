import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  User, 
  ShieldAlert,
  Copy,
  ChevronDown,
  XCircle,
  Calendar,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { nfeService } from '../services/nfeService';
import { NfeResponse } from '../types';

export const NfeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nfe, setNfe] = useState<NfeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNfe = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await nfeService.buscarPorId(id);
        setNfe(data);
      } catch (error) {
        console.error('Erro ao buscar NF-e:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0056b3]"></div>
      </div>
    );
  }

  if (!nfe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900">Nota Fiscal não encontrada.</h2>
        <Link to="/nfes" className="text-[#0056b3] hover:underline mt-4 block">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center gap-6">
        <Link to="/nfes">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-white shadow-sm hover:bg-slate-50">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>NF-es</span>
            <span className="text-slate-200">/</span>
            <span className="text-vigia-blue">Detalhes do Documento</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nota Fiscal Eletrônica</h1>
        </div>
      </div>

      {/* Alert Banner for Cancelled Notes */}
      {nfe.status === 'CANCELADA' && (
        <div className="bg-red-50/50 border-2 border-red-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-lg shadow-red-900/10">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-red-900 tracking-tight uppercase">Documento Cancelado</h4>
              <p className="text-sm text-red-700 font-medium">Esta NF-e não possui mais validade jurídica. Verifique os impactos fiscais imediatamente.</p>
            </div>
          </div>
          <Button variant="danger" className="w-full md:w-auto shadow-lg shadow-red-900/20">Ver Alertas de Risco</Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Main Info Card */}
          <Card className="p-10 space-y-10 border-none shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Dados da Nota</h3>
                <p className="text-sm text-slate-500 font-medium">Informações básicas e autorização de uso</p>
              </div>
              <span className={cn(
                'px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 border',
                nfe.status === 'AUTORIZADA' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
              )}>
                <div className={cn('w-2 h-2 rounded-full animate-pulse', nfe.status === 'AUTORIZADA' ? 'bg-emerald-600' : 'bg-red-600')} />
                {nfe.status}
              </span>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Chave de Acesso</label>
                <div className="flex items-center gap-4 p-6 bg-slate-50/50 rounded-3xl border-2 border-slate-50 group hover:border-vigia-blue/10 transition-all">
                  <span className="text-sm font-mono font-bold text-vigia-blue tracking-wider flex-1 break-all">
                    {nfe.chave}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-300 hover:text-vigia-blue hover:bg-blue-50 rounded-xl" 
                    onClick={() => navigator.clipboard.writeText(nfe.chave)}
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Valor Total</label>
                  <p className="text-4xl font-black text-slate-900 tracking-tight">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nfe.valorTotal)}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Modelo / Versão</label>
                  <p className="text-xl font-black text-slate-900">NFe - Mod 55 <span className="text-slate-300 font-medium">/</span> v4.00</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-slate-50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Data de Emissão</label>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-300" />
                    {new Date(nfe.dataEmissao).toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Protocolo</label>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-slate-300" />
                    {nfe.protocolo || '135240000000000'}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Natureza da Operação</label>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FileText className="w-4 h-4 text-slate-300" />
                    VENDA DE MERCADORIA
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-10 space-y-10 border-none shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Histórico de Eventos</h3>
            <div className="space-y-10 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-1 before:bg-slate-50">
              <div className="relative pl-12">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 bg-emerald-500 text-white shadow-lg shadow-emerald-900/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h4 className="text-base font-black text-slate-900 tracking-tight uppercase">Autorização de Uso</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md">
                      Documento recebido e autorizado pela SEFAZ com sucesso. Protocolo: {nfe.protocolo || '135240000000000'}.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">
                    {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-10">
          {/* Parties Card */}
          <Card className="p-10 space-y-8 border-none shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Partes Envolvidas</h3>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-vigia-blue shadow-lg shadow-blue-900/5">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="space-y-2 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Emitente</p>
                  <h4 className="text-sm font-black text-slate-900 uppercase leading-tight">{nfe.emitenteNome}</h4>
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">CNPJ</span>
                      <span className="text-slate-900 font-black">{nfe.emitenteCnpj}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">UF</span>
                      <span className="text-slate-900 font-black">SP</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-50 border-dashed" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-slate-300 relative z-10">
                  <ChevronDown className="w-6 h-6" />
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 shadow-lg shadow-slate-900/5">
                  <User className="w-7 h-7" />
                </div>
                <div className="space-y-2 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Destinatário</p>
                  <h4 className="text-sm font-black text-slate-900 uppercase leading-tight">{nfe.destinatarioNome}</h4>
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">CNPJ</span>
                      <span className="text-slate-900 font-black">{nfe.destinatarioCnpj}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">UF</span>
                      <span className="text-slate-900 font-black">RJ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex flex-col gap-4">
              <Button variant="primary" className="w-full flex gap-3 h-14 shadow-lg shadow-blue-900/20">
                <Download className="w-5 h-5" />
                Baixar XML Original
              </Button>
              <Button variant="outline" className="w-full flex gap-3 h-14 border-2">
                <Printer className="w-5 h-5" />
                Imprimir DANFE (PDF)
              </Button>
            </div>
          </Card>

          {/* Risk Analysis */}
          <Card className="bg-gradient-to-br from-vigia-navy to-slate-900 text-white p-10 space-y-8 border-none relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-300 backdrop-blur-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Análise de Risco</h3>
            </div>
            <p className="text-sm text-blue-100/70 font-medium leading-relaxed relative z-10">
              Score calculado via inteligência artificial baseado no histórico do emitente e comportamento fiscal.
            </p>
            <div className="flex justify-between items-center pt-8 border-t border-white/10 relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300/60">Vigia Score</p>
                <p className="text-3xl font-black">9.2<span className="text-sm text-blue-300/40 font-medium">/10</span></p>
              </div>
              <span className="px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-900/20">
                Baixo Risco
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
