import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Building2, Calendar, Copy, User } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { NfeStatusBadge } from '@/components/Badge';
import { nfeService } from '@/services/nfeService';
import { manifestacaoService } from '@/services/manifestacaoService';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { NfeResponse, ManifestacaoResponse } from '@/types';

const MANIFESTACOES_FINAIS = [
  'CONFIRMACAO_OPERACAO',
  'DESCONHECIMENTO_OPERACAO',
  'OPERACAO_NAO_REALIZADA',
];

export function NfeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [nfe, setNfe] = useState<NfeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [manifestacoes, setManifestacoes] = useState<ManifestacaoResponse[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [senhaManifestacao, setSenhaManifestacao] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loadingManifestacao, setLoadingManifestacao] = useState(false);
  const [erroManifestacao, setErroManifestacao] = useState('');
  const [sucessoManifestacao, setSucessoManifestacao] = useState('');

  useEffect(() => {
    if (!id) return;
    nfeService.buscarPorId(id)
      .then(setNfe)
      .catch(() => console.error('Erro ao buscar NF-e'))
      .finally(() => setLoading(false));
    manifestacaoService.listar(id)
      .then(setManifestacoes)
      .catch(() => {});
  }, [id]);

  const manifestacaoFinal = manifestacoes.find((m) =>
    MANIFESTACOES_FINAIS.includes(m.tipoEvento)
  );

  function handleCopy() {
    if (!nfe) return;
    navigator.clipboard.writeText(nfe.chaveAcesso);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function abrirModal(tipo: string) {
    setTipoSelecionado(tipo);
    setSenhaManifestacao('');
    setErroManifestacao('');
    setSucessoManifestacao('');
    setModalAberto(true);
  }

  async function confirmarManifestacao() {
    if (!senhaManifestacao) {
      setErroManifestacao('Informe a senha do certificado A1.');
      return;
    }
    setLoadingManifestacao(true);
    setErroManifestacao('');
    try {
      const resultado = await manifestacaoService.manifestar(id!, tipoSelecionado, senhaManifestacao);
      setManifestacoes((prev) => [...prev, resultado]);
      setSucessoManifestacao(`Manifestação enviada! Protocolo: ${resultado.protocolo}`);
      setModalAberto(false);
    } catch {
      setErroManifestacao('Erro ao enviar manifestação. Verifique a senha do certificado e tente novamente.');
    } finally {
      setLoadingManifestacao(false);
    }
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
            Esta NF-e foi <strong>{nfe.status === 'CANCELADA' ? 'cancelada' : 'rejeitada'}</strong> e não possui validade jurídica. Verifique os impactos fiscais junto ao seu contador.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
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

        {/* Coluna lateral */}
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

          {/* Card de Manifestação */}
          <Card>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-vigia-navy mb-4">
              Manifestação do Destinatário
            </h3>

            {sucessoManifestacao && (
              <p className="text-xs text-green-600 font-bold mb-3">{sucessoManifestacao}</p>
            )}

            {manifestacaoFinal ? (
              <div className="space-y-2">>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                  ✓ Concluída
                </span>
                <p className="text-sm font-black text-slate-800">
                  {manifestacaoFinal.descricaoEvento}
                </p>
                {manifestacaoFinal.protocolo && (
                  <p className="text-xs text-slate-400 font-bold">
                    Protocolo: {manifestacaoFinal.protocolo}
                  </p>
                )}
                <p className="text-xs text-slate-400 font-bold">
                  {formatDateTime(manifestacaoFinal.enviadoEm)}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-medium mb-3">Selecione o tipo de manifestação para esta nota. A ação será enviada diretamente à SEFAZ.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-500 text-green-700 hover:bg-green-50 font-bold"
                  onClick={() => abrirModal('CONFIRMACAO_OPERACAO')}
                >
                  ✓ Confirmar Operação
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-400 text-red-600 hover:bg-red-50 font-bold"
                  onClick={() => abrirModal('DESCONHECIMENTO_OPERACAO')}
                >
                  ✗ Desconhecer Operação
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-bold"
                  onClick={() => abrirModal('OPERACAO_NAO_REALIZADA')}
                >
                  ⚠ Operação não Realizada
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Modal de senha */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 w-full max-w-sm shadow-xl">
            <h4 className="font-black uppercase tracking-widest text-vigia-navy text-sm mb-1">
              Confirmar Manifestação
            </h4>
            <p className="text-xs text-slate-400 font-bold mb-6">
              {tipoSelecionado === 'CONFIRMACAO_OPERACAO' && 'Confirmação da Operação'}
              {tipoSelecionado === 'DESCONHECIMENTO_OPERACAO' && 'Desconhecimento da Operação'}
              {tipoSelecionado === 'OPERACAO_NAO_REALIZADA' && 'Operação não Realizada'}
            </p>

            <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-wider">
              Senha do Certificado A1
            </label>
            <div className="relative">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senhaManifestacao}
                onChange={(e) => setSenhaManifestacao(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-vigia-blue"
                placeholder="Digite a senha do seu certificado"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setMostrarSenha((v) => !v)}
                tabIndex={-1}
              >
                {mostrarSenha ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.04.158-2.044.45-2.99M6.343 6.343A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10 0 .955-.133 1.878-.382 2.753M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {erroManifestacao && (
              <p className="text-xs text-red-500 font-bold mt-2">{erroManifestacao}</p>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModalAberto(false)}
                disabled={loadingManifestacao}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-vigia-navy text-white"
                onClick={confirmarManifestacao}
                disabled={loadingManifestacao}
              >
                {loadingManifestacao ? 'Enviando...' : 'Enviar Manifestação'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}