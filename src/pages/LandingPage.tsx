import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Bell, 
  LayoutDashboard,
  PlayCircle,
  Zap,
  Users,
  Lock,
  ChevronDown,
  ChevronUp,
  Globe,
  FileText,
  Smartphone,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <span className="text-lg font-bold text-gray-900 group-hover:text-[#0056b3] transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-[#0056b3]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#0056b3] w-8 h-8" />
            <h1 className="font-bold text-2xl text-gray-900 tracking-tight">Vigia Fiscal</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-gray-500 hover:text-[#0056b3] transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-sm font-bold text-gray-500 hover:text-[#0056b3] transition-colors">Planos</a>
            <a href="#faq" className="text-sm font-bold text-gray-500 hover:text-[#0056b3] transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="font-bold">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="font-bold px-6">Começar Agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0056b3] text-[10px] font-bold uppercase tracking-widest border border-blue-100">
              <Zap className="w-3 h-3 fill-current" />
              Monitoramento Fiscal Inteligente
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight">
              O Cofre Digital da sua <span className="text-[#0056b3]">Gestão Fiscal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Monitore todas as suas notas fiscais em tempo real, receba alertas via WhatsApp e garanta conformidade total com a SEFAZ em uma única plataforma robusta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="px-10 py-6 text-lg font-bold shadow-xl shadow-blue-200 hover:shadow-2xl transition-all">
                  Começar Trial Grátis
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-bold flex gap-3 group">
                <PlayCircle className="w-6 h-6 text-[#0056b3] group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map(i => <Zap key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-gray-500 font-medium">+2.000 contadores confiam</p>
              </div>
            </div>
          </div>
          <div className="relative lg:ml-8">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#0056b3] to-blue-400 rounded-[2.5rem] blur opacity-20" />
            <div className="relative bg-white rounded-[2rem] p-2 shadow-2xl border border-gray-100 overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/dashboard-v2/1200/900" 
                alt="Dashboard Preview" 
                className="rounded-[1.5rem] w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 animate-bounce-slow hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">NF-e Autorizada</p>
                  <p className="text-sm font-bold text-gray-900">R$ 12.450,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-[10px] font-bold text-[#0056b3] uppercase tracking-[0.3em]">Funcionalidades</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Tudo o que você precisa para um <span className="italic text-[#0056b3]">compliance</span> impecável.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Consulta Automática SEFAZ',
                desc: 'Nossos robôs consultam a SEFAZ 24/7, garantindo que nenhuma nota emitida contra seu CNPJ passe despercebida.'
              },
              {
                icon: Bell,
                title: 'Alertas via WhatsApp',
                desc: 'Seja notificado instantaneamente sobre cancelamentos, rejeições ou notas denegadas diretamente no seu celular.'
              },
              {
                icon: LayoutDashboard,
                title: 'Gestão Multi-CNPJ',
                desc: 'Ideal para contadores e holdings. Gerencie centenas de empresas em uma única interface organizada e intuitiva.'
              },
              {
                icon: FileText,
                title: 'Manifestação do Destinatário',
                desc: 'Realize a manifestação de ciência, confirmação ou desconhecimento da operação com apenas um clique.'
              },
              {
                icon: Smartphone,
                title: 'App Mobile Nativo',
                desc: 'Leve sua gestão fiscal no bolso. Acesse documentos e receba alertas onde quer que você esteja.'
              },
              {
                icon: BarChart3,
                title: 'Relatórios Avançados',
                desc: 'Exporte relatórios em PDF, Excel ou XML para facilitar o fechamento mensal e a auditoria fiscal.'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 space-y-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#0056b3] group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-20 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-[10px] font-bold text-[#0056b3] uppercase tracking-[0.3em]">Preços</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Planos que crescem com o seu negócio.
            </h2>
            <p className="text-gray-500 text-lg">Comece grátis e mude de plano quando precisar. Sem fidelidade.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                name: 'Básico',
                price: '97',
                desc: 'Para monitoramento individual simples.',
                features: ['1 CNPJ monitorado', 'Alertas por E-mail', 'Suporte via Ticket', 'Histórico de 3 meses'],
                cta: 'Começar Grátis',
                popular: false
              },
              {
                name: 'Pro',
                price: '197',
                desc: 'Escalabilidade para pequenos escritórios.',
                features: ['Até 5 CNPJs', 'Alertas WhatsApp + E-mail', 'Suporte Prioritário', 'Histórico de 12 meses', 'Relatórios Mensais'],
                cta: 'Assinar Pro',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '497',
                desc: 'Potência total para grandes operações.',
                features: ['CNPJs Ilimitados', 'API de Integração', 'Gerente de Conta', 'Histórico Ilimitado', 'Treinamento de Equipe'],
                cta: 'Falar com Vendas',
                popular: false
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-10 rounded-[2.5rem] border transition-all duration-500 space-y-8 flex flex-col",
                  plan.popular ? "border-[#0056b3] bg-white shadow-2xl scale-105 z-10" : "border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl"
                )}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                    {plan.popular && <span className="bg-blue-50 text-[#0056b3] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Popular</span>}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 pt-4">
                    <span className="text-sm font-bold text-gray-400">R$</span>
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-sm font-bold text-gray-400">/mês</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {plan.features.map(f => (
                    <div key={f} className="flex gap-3 items-center text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0056b3]" />
                      {f}
                    </div>
                  ))}
                </div>

                <Link to="/register">
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full py-6 font-bold text-lg rounded-2xl">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-[10px] font-bold text-[#0056b3] uppercase tracking-[0.3em]">Dúvidas Frequentes</h3>
            <h2 className="text-4xl font-extrabold text-gray-900">Ainda tem perguntas?</h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <FAQItem 
              question="Preciso de certificado digital para usar?"
              answer="Sim, para que nossos robôs possam consultar as notas fiscais diretamente na SEFAZ em seu nome, é necessário o uso de um certificado digital (A1 ou A3). O processo é 100% seguro e criptografado."
            />
            <FAQItem 
              question="Como funciona o período de teste grátis?"
              answer="Você tem 14 dias para testar todas as funcionalidades do plano Pro sem custo algum. Não pedimos cartão de crédito para começar. Se gostar, basta escolher um plano ao final do período."
            />
            <FAQItem 
              question="Posso cancelar minha assinatura a qualquer momento?"
              answer="Sim! Não trabalhamos com contratos de fidelidade. Você pode cancelar sua assinatura diretamente pelo painel de controle a qualquer momento, sem taxas ocultas."
            />
            <FAQItem 
              question="O Vigia Fiscal é seguro?"
              answer="Segurança é nossa prioridade número um. Utilizamos criptografia de nível bancário (SSL/TLS), seguimos rigorosamente a LGPD e nossos servidores estão hospedados em infraestrutura de alta confiabilidade."
            />
            <FAQItem 
              question="Quantos CNPJs posso monitorar?"
              answer="Depende do seu plano. O plano Básico permite 1 CNPJ, o Pro até 5, e o Enterprise é ilimitado. Você pode fazer o upgrade ou downgrade a qualquer momento."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0056b3] rounded-[3rem] p-12 md:p-24 text-center text-white space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Pronto para blindar sua gestão fiscal?
              </h2>
              <p className="text-xl text-blue-100 font-medium opacity-90">
                Junte-se a milhares de empresas que já automatizaram seu compliance. Comece seu trial de 14 dias agora.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="px-12 py-8 text-xl font-bold shadow-2xl hover:scale-105 transition-transform">
                  Criar Minha Conta Grátis
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="px-12 py-8 text-xl font-bold text-white hover:bg-white/10 border border-white/20">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#0056b3] w-8 h-8" />
                <h1 className="font-bold text-2xl text-gray-900 tracking-tight">Vigia Fiscal</h1>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                A plataforma líder em monitoramento fiscal inteligente para empresas brasileiras. Segurança, agilidade e conformidade em um só lugar.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-[#0056b3] transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-[#0056b3] transition-colors cursor-pointer">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Produto</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><a href="#" className="hover:text-[#0056b3]">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Integrações</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Preços</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Changelog</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Empresa</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><a href="#" className="hover:text-[#0056b3]">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Carreiras</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Blog</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Contato</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Legal</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><a href="#" className="hover:text-[#0056b3]">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Cookies</a></li>
                <li><a href="#" className="hover:text-[#0056b3]">Segurança</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-400 font-medium">
              © 2026 Vigia Fiscal. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                Criptografia SSL 256-bit
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                LGPD Compliant
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
