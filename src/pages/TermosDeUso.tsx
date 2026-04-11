import { Link } from 'react-router-dom'
 
export function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
 
        <div className="mb-10">
          <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
            ← Voltar para o início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
          <p className="text-gray-500 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
 
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8 text-gray-700 leading-relaxed">
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar a plataforma <strong>Vigia Fiscal</strong> (vigiafiscal.com.br),
              desenvolvida e operada por <strong>Patrick Luiz da Silva, CPF 056.210.431-38</strong>
              ("Vigia Fiscal", "nós"), você ("Usuário") concorda integralmente com estes Termos de Uso
              e com nossa{' '}
              <Link to="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</Link>.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Descrição do Serviço</h2>
            <p>
              O Vigia Fiscal é um serviço SaaS que realiza consultas automatizadas à SEFAZ via protocolo
              SOAP/NF-e, monitorando Notas Fiscais Eletrônicas vinculadas aos CNPJs cadastrados pelo
              Usuário. O sistema envia notificações via e-mail e WhatsApp conforme regras configuradas
              pelo próprio Usuário.
            </p>
            <p className="mt-2">
              O Vigia Fiscal <strong>não emite, cancela ou altera</strong> Notas Fiscais Eletrônicas —
              atua exclusivamente como serviço de consulta e monitoramento passivo de dados disponibilizados
              pela SEFAZ.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cadastro e Conta</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>O Usuário deve fornecer informações verdadeiras e atualizadas no cadastro.</li>
              <li>É vedado criar contas em nome de terceiros sem autorização.</li>
              <li>O Usuário é responsável pela confidencialidade de sua senha.</li>
              <li>Em caso de acesso não autorizado, notifique imediatamente o suporte.</li>
            </ul>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Planos e Pagamento</h2>
            <p>
              O Vigia Fiscal oferece planos pagos (Básico R$97, Pro R$197, Enterprise R$497) com cobrança
              recorrente mensal processada pelo <strong>Stripe</strong>. O plano Básico oferece{' '}
              <strong>7 dias de teste gratuito</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Cancelamento pode ser feito a qualquer momento pelo painel. O acesso permanece ativo até o fim do período pago.</li>
              <li>Não há reembolso proporcional por cancelamento antecipado dentro de um ciclo pago, exceto nos casos previstos pelo CDC.</li>
              <li>Inadimplência pode resultar em suspensão do acesso após notificação.</li>
            </ul>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Uso Aceitável</h2>
            <p>É proibido:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Usar a plataforma para fins ilegais ou que violem a legislação brasileira.</li>
              <li>Tentar acessar CNPJs de terceiros sem autorização legal.</li>
              <li>Realizar engenharia reversa ou extrair o código-fonte da plataforma.</li>
              <li>Revender ou sublicenciar o acesso sem autorização prévia.</li>
            </ul>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma (código, design, marca, textos) é de propriedade de
              Patrick Luiz da Silva e protegido pela legislação brasileira de propriedade intelectual.
              O Usuário recebe licença de uso não exclusiva e intransferível.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disponibilidade do Serviço</h2>
            <p>
              Empreendemos esforços razoáveis para manter a plataforma disponível, mas não garantimos
              disponibilidade ininterrupta. Instabilidades nos webservices da SEFAZ são externas ao
              nosso controle e não constituem falha do Vigia Fiscal.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitação de Responsabilidade</h2>
            <p>O Vigia Fiscal não se responsabiliza por:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Decisões fiscais ou contábeis tomadas com base nas informações da plataforma.</li>
              <li>Prejuízos decorrentes de atrasos ou falhas nas consultas à SEFAZ.</li>
              <li>Perda de dados causada por fatores externos (ataques, desastres naturais, etc.).</li>
            </ul>
            <p className="mt-2">
              A responsabilidade máxima fica limitada ao valor pago nos últimos 3 meses de assinatura.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Encerramento de Conta</h2>
            <p>
              O Usuário pode encerrar sua conta a qualquer momento pelo painel ou por{' '}
              <strong>suporte@vigiafiscal.com.br</strong>. Contas que violem estes termos podem ser
              encerradas sem aviso prévio.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Alterações nos Termos</h2>
            <p>
              Alterações relevantes serão comunicadas por e-mail com pelo menos{' '}
              <strong>15 dias de antecedência</strong>. O uso continuado após a vigência implica aceitação.
            </p>
          </section>
 
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Lei Aplicável e Foro</h2>
            <p>
              Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do
              Usuário nos termos do art. 101, I do CDC (Lei nº 8.078/1990).
            </p>
          </section>
 
          <section className="bg-blue-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contato</h2>
            <ul className="space-y-1">
              <li>📧 <strong>suporte@vigiafiscal.com.br</strong></li>
              <li>🌐 <strong>vigiafiscal.com.br</strong></li>
            </ul>
          </section>
 
        </div>
 
        <div className="mt-6 text-center text-sm text-gray-500 space-x-4">
          <Link to="/privacidade" className="hover:underline">Política de Privacidade</Link>
          <span>·</span>
          <Link to="/planos" className="hover:underline">Ver Planos</Link>
        </div>
 
      </div>
    </div>
  )
}
