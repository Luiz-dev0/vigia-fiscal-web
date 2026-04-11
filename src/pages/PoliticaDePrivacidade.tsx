import { Link } from 'react-router-dom'
 
export function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
 
        <div className="mb-10">
          <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
            ← Voltar para o início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
          <p className="text-gray-500 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800">
            ✅ Em conformidade com a <strong>LGPD — Lei nº 13.709/2018</strong>
          </div>
        </div>
 
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8 text-gray-700 leading-relaxed">
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Controlador dos Dados</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
              <p><strong>Nome:</strong> Patrick Luiz da Silva</p>
              <p><strong>CPF:</strong> 056.210.431-38</p>
              <p><strong>E-mail do encarregado:</strong> privacidade@vigiafiscal.com.br</p>
            </div>
            <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3">
              ⚠️ O Vigia Fiscal é atualmente operado por pessoa física. Recomendamos consultar um
              advogado especializado em LGPD para adequação completa caso o volume de dados tratados
              aumente significativamente.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Dados que Coletamos</h2>
 
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.1 Fornecidos pelo Usuário</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nome completo</li>
              <li>E-mail</li>
              <li>Telefone (WhatsApp) — opcional</li>
              <li>CNPJ(s) para monitoramento</li>
              <li>Dados de pagamento — processados pelo Stripe; <strong>não armazenamos cartões</strong></li>
            </ul>
 
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.2 Coletados automaticamente</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Endereço IP</li>
              <li>Dados de navegação (páginas, horário, duração)</li>
              <li>Informações do dispositivo e navegador</li>
              <li>Logs técnicos de operação</li>
            </ul>
 
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">2.3 Dados de NF-e (domínio público)</h3>
            <p>
              O sistema consulta e armazena temporariamente dados de NF-e retornados pela SEFAZ.
              O Usuário declara ter legitimidade legal para monitorar os CNPJs cadastrados.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalidade e Base Legal (LGPD)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold border border-gray-200">Finalidade</th>
                    <th className="text-left p-3 font-semibold border border-gray-200">Base Legal</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Prestação do serviço de monitoramento', 'Execução de contrato (Art. 7º, V)'],
                    ['Envio de alertas e notificações', 'Execução de contrato (Art. 7º, V)'],
                    ['Processamento de pagamentos (Stripe)', 'Execução de contrato (Art. 7º, V)'],
                    ['Diagnóstico técnico e melhorias', 'Legítimo interesse (Art. 7º, IX)'],
                    ['Obrigações legais e fiscais', 'Obrigação legal (Art. 7º, II)'],
                    ['Comunicações de marketing (opt-out disponível)', 'Consentimento (Art. 7º, I)'],
                  ].map(([fin, base], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border border-gray-200">{fin}</td>
                      <td className="p-3 border border-gray-200 text-blue-800">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Compartilhamento de Dados</h2>
            <p>Seus dados não são vendidos. Compartilhamos apenas com operadores essenciais ao serviço:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Stripe Inc.</strong> — pagamentos. <a href="https://stripe.com/br/privacy" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Política ↗</a></li>
              <li><strong>Resend</strong> — e-mails transacionais</li>
              <li><strong>Evolution API / Meta</strong> — alertas WhatsApp (número de telefone)</li>
              <li><strong>Hostinger</strong> — hospedagem VPS</li>
              <li><strong>Crisp</strong> — chat de suporte. <a href="https://crisp.chat/en/privacy/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Política ↗</a></li>
              <li><strong>SEFAZ</strong> — consulta de NF-e (recebe apenas o CNPJ)</li>
            </ul>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Retenção de Dados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold border border-gray-200">Tipo de dado</th>
                    <th className="text-left p-3 font-semibold border border-gray-200">Período</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Dados de conta (nome, e-mail)', 'Enquanto ativa + 5 anos (obrigação legal)'],
                    ['Histórico de NF-e — Plano Básico', 'Últimos 3 meses'],
                    ['Histórico de NF-e — Plano Pro', 'Últimos 12 meses'],
                    ['Histórico de NF-e — Enterprise', 'Sem limite'],
                    ['Logs de acesso', '90 dias'],
                    ['Após encerramento da conta', 'Excluídos em até 30 dias'],
                  ].map(([tipo, periodo], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 border border-gray-200">{tipo}</td>
                      <td className="p-3 border border-gray-200">{periodo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Segurança</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Transmissão via HTTPS/TLS</li>
              <li>Senhas com hash BCrypt</li>
              <li>Autenticação JWT com expiração</li>
              <li>Banco de dados isolado na rede interna do servidor</li>
              <li>Isolamento por tenant — cada conta acessa apenas seus próprios dados</li>
            </ul>
            <p className="mt-3">
              Em caso de incidente de segurança com dados pessoais, notificaremos a ANPD e os
              Usuários afetados dentro de <strong>72 horas</strong>, conforme a LGPD.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Seus Direitos (LGPD)</h2>
            <p>
              Você tem direito a: confirmação e acesso, correção, anonimização/bloqueio/eliminação,
              portabilidade, revogação de consentimento e informação sobre compartilhamento.
            </p>
            <p className="mt-3">
              Envie solicitação para <strong>privacidade@vigiafiscal.com.br</strong>. Respondemos em até{' '}
              <strong>15 dias úteis</strong>.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies e Armazenamento Local</h2>
            <p>
              Usamos <strong>localStorage</strong> para o token JWT da sessão. Não usamos cookies de
              rastreamento publicitário. O Crisp pode usar cookies funcionais próprios para o histórico
              de suporte.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Alterações</h2>
            <p>
              Alterações relevantes serão comunicadas por e-mail com 15 dias de antecedência.
            </p>
          </section>
 
          <section className="bg-blue-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contato e Encarregado (DPO)</h2>
            <ul className="space-y-1">
              <li>📧 <strong>privacidade@vigiafiscal.com.br</strong></li>
              <li>🌐 <strong>vigiafiscal.com.br</strong></li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Reclamações também podem ser enviadas à ANPD:{' '}
              <a href="https://www.gov.br/anpd" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                www.gov.br/anpd ↗
              </a>
            </p>
          </section>
 
        </div>
 
        <div className="mt-6 text-center text-sm text-gray-500 space-x-4">
          <Link to="/termos" className="hover:underline">Termos de Uso</Link>
          <span>·</span>
          <Link to="/planos" className="hover:underline">Ver Planos</Link>
        </div>
 
      </div>
    </div>
  )
}
