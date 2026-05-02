import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, FileText, RefreshCw } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { NfeStatusBadge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';
import { nfeService } from '@/services/nfeService';
import { cnpjService } from '@/services/cnpjService';
import { formatCurrency, formatDate, truncateChave } from '@/lib/utils';
import type { CnpjResponse, NfeResponse } from '@/types';

export function NfesPage() {
  const [nfes, setNfes] = useState<NfeResponse[]>([]);
  const [cnpjs, setCnpjs] = useState<CnpjResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedCnpj, setSelectedCnpj] = useState('');

  async function fetchData() {
    setLoading(true);
    try {
      const [nfesData, cnpjsData] = await Promise.all([
        nfeService.listar(),
        cnpjService.listar(),
      ]);
      setNfes(nfesData);
      setCnpjs(cnpjsData);
    } catch {
      console.error('Erro ao buscar NF-es');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function handleSync() {
    if (!selectedCnpj) return;
    setSyncing(true);
    try {
      await nfeService.sincronizar(selectedCnpj);
      await fetchData();
    } catch {
      console.error('Erro ao sincronizar');
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notas Fiscais</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Documentos emitidos e recebidos em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="rounded-2xl border-2 border-slate-100 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-vigia-blue/30 transition-all"
            value={selectedCnpj}
            onChange={(e) => setSelectedCnpj(e.target.value)}
          >
            <option value="">Selecione um CNPJ</option>
            {cnpjs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nomeFantasia || c.razaoSocial}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={syncing || !selectedCnpj}
            loading={syncing}
          >
            <RefreshCw className="w-4 h-4" />
            Sincronizar
          </Button>
        </div>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50">
                <th className="px-6 py-4">Chave de Acesso</th>
                <th className="px-6 py-4">Emitente</th>
                <th className="px-6 py-4">Destinatário</th>
                <th className="px-6 py-4 text-right">Valor</th>
                <th className="px-6 py-4">Emissão</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-100 border-t-vigia-blue mx-auto" />
                  </td>
                </tr>
              ) : nfes.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState
                      icon={<FileText className="w-8 h-8" />}
                      title="Nenhuma nota encontrada"
                      description="Selecione um CNPJ e sincronize para carregar as notas"
                    />
                  </td>
                </tr>
              ) : nfes.map((nfe) => (
                <tr key={nfe.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {truncateChave(nfe.chaveAcesso)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[140px]">
                      {nfe.emitenteNome}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold">{nfe.emitenteCnpj}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[140px]">
                      {nfe.destinatarioNome}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold">{nfe.destinatarioCnpj}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                    {formatCurrency(nfe.valorTotal)}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">
                    {formatDate(nfe.dataEmissao)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <NfeStatusBadge status={nfe.status} />
                      {nfe.statusManifestacao === 'FINAL' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                          Manifestada
                        </span>
                      )}
                      {nfe.statusManifestacao === 'CIENCIA' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                          Ciência
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/nfes/${nfe.id}`}>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <Eye className="w-4 h-4 text-slate-400" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}