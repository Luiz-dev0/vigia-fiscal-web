import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Building2, Calendar, Copy, User } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { NfeStatusBadge } from '@/components/Badge';
import { nfeService } from '@/services/nfeService';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { NfeResponse } from '@/types';

export function NfeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [nfe, setNfe] = useState<NfeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    nfeService.buscarPorId(id)
      .then(setNfe)
      .catch(() => console.error('Erro ao buscar NF-e'))
      .finally(() => setLoading(false));
  }, [id]);

  function handleCopy() {
    if (!nfe) return;
    navigator.clipboard.writeText(nfe.chaveAcesso);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-vigia-blue" />
      </div>
    );
  }

  if (!nfe) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 font-bold">Nota fiscal não encontrada.</p>
        <Link to="/nfes" className="text-vigia-blue hover:underline mt-2 block font-bold">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/nfes">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            NF-es / Detalhes
          </p>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Nota Fiscal Eletrônica
          </h1>
        </div>
      </div>

      {(nfe.status === 'CANCELADA' || nfe.status === 'REJEITADA') && (
        <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
          <p className="text-sm font-bold text-red-700">
            Esta NF-e foi <strong>{nfe.status.toLowerCase()}</strong> e não possui validade jurídica. Verifique os impactos fiscais.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Dados da Nota</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Informações de autorização</p>
              </div>
              <NfeStatusBadge status={nfe.status} />
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                  Chave de Acesso
                </label>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <span className="text-xs font-mono font-bold text-vigia-blue flex-1 break-all">
                    {nfe.chaveAcesso}
                  </span>
                  <Button variant="ghost" size="icon" className="rounded-xl shrink-0" onClick={handleCopy}>
                    <Copy className="w-4 h-4 text-slate-400" />
                  </Button>
                  {copied && (
                    <span className="text-[10px] font-black text-emerald-600 uppercase">Copiado!</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                    Valor Total
                  </label>
                  <p className="text-3xl font-black text-slate-900">
                    {formatCurrency(nfe.valorTotal)}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                    Número / Série
                  </label>
                  <p className="text-xl font-black text-slate-900">
                    {nfe.numero} / {nfe.serie}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-300" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emissão</p>
                    <p className="text-sm font-bold text-slate-700">{formatDateTime(nfe.dataEmissao)}</p>
                  </div>
                </div>
                {nfe.dataAutorizacao && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-300" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Autorização</p>
                      <p className="text-sm font-bold text-slate-700">{formatDateTime(nfe.dataAutorizacao)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-black text-slate-900 mb-6">Partes Envolvidas</h3>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-vigia-blue shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emitente</p>
                  <p className="text-sm font-black text-slate-900 mt-1">{nfe.emitenteNome}</p>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">{nfe.emitenteCnpj}</p>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-100" />

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Destinatário</p>
                  <p className="text-sm font-black text-slate-900 mt-1">{nfe.destinatarioNome}</p>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">{nfe.destinatarioCnpj}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
