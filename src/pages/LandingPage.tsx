import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  LayoutDashboard,
  Lock,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left group"
      >
        <span className="text-base font-bold text-gray-900 group-hover:text-vigia-blue transition-colors">
          {question}
        </span>
        {open
          ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
          : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        }
      </button>
      {open && (
        <p className="mt-3 text-gray-500 leading-relaxed text-sm">{answer}</p>
      )}
    </div>
  );
}

const features = [
  {
    icon: Search,
    title: 'Consulta Automática SEFAZ',
    desc: 'Nossos robôs consultam a SEFAZ a cada 5 minutos, garantindo que nenhuma nota emitida contra seu CNPJ passe despercebida.',
  },
  {
    icon: Bell,
    title: 'Alertas via WhatsApp',
    desc: 'Seja notificado instantaneamente sobre cancelamentos, rejeições ou notas denegadas diretamente no seu celular.',
  },
  {
    icon: LayoutDashboard,
    title: 'Gestão Multi-CNPJ',
    desc: 'Ideal para contadores e holdings. Gerencie todas as empresas em uma única interface organizada.',
  },
  {
    icon: FileText,
    title: 'Histórico Completo',
    desc: 'Acesse o histórico completo de eventos fiscais com filtros avançados por período, status e CNPJ.',
  },
  {
    icon: Smartphone,
    title: 'Acesso em Qualquer Lugar',
    desc: 'Painel responsivo acessível do celular, tablet ou desktop com total sincronização em tempo real.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios Avançados',
    desc: 'Exporte relatórios em PDF ou Excel para facilitar o fechamento mensal e a auditoria fiscal.',
  },
];

const plans = [
  {
    name: 'Básico',
    price: '97',
    desc: 'Para monitoramento individual simples.',
    features: ['1 CNPJ monitorado', 'Alertas por e-mail', 'Suporte via ticket', 'Histórico 3 meses'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '197',
    desc: 'Escalabilidade para pequenos escritórios.',
    features: ['Até 5 CNPJs', 'Alertas WhatsApp + e-mail', 'Suporte prioritário', 'Histórico 12 meses'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '297',
    desc: 'Potência total para grandes operações.',
    features: ['CNPJs ilimitados', 'API de integração', 'Gerente de conta', 'Histórico ilimitado'],
    popular: false,
  },
];

const faqs = [
  {
    question: 'Preciso de certificado digital para usar?',
    answer: 'Sim. Para consultar as notas diretamente na SEFAZ em seu nome é necessário um certificado digital A1. O processo é 100% seguro e criptografado.',
  },
  {
    question: 'Como funciona o período de teste grátis?',
    answer: 'Você tem 14 dias para testar todas as funcionalidades sem custo algum. Não pedimos cartão de crédito para começar.',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim. Não trabalhamos com contratos de fidelidade. Cancele diretamente pelo painel, sem taxas ocultas.',
  },
  {
    question: 'O Vigia Fiscal é seguro?',
    answer: 'Segurança é nossa prioridade. Utilizamos criptografia SSL, seguimos a LGPD e nossos servidores ficam em infraestrutura de alta disponibilidade.',
  },
  {
    question: 'Quantos CNPJs posso monitorar?',
    answer: 'Depende do plano: Básico permite 1 CNPJ, Pro até 5 e Enterprise é ilimitado. Você pode fazer upgrade a qualquer momento.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-vigia-blue w-7 h-7" />
            <span className="font-black text-xl text-gray-900 tracking-tight">Vigia Fiscal</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-gray-500 hover:text-vigia-blue transition-colors">Funcionalidades</a>
            <a href="#pricing"  className="text-sm font-bold text-gray-500 hover:text-vigia-blue transition-colors">Planos</a>
            <a href="#faq"      className="text-sm font-bold text-gray-500 hover:text-vigia-blue transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Começar grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-vigia-blue text-[11px] font-black uppercase tracking-widest border border-blue-100">
            <Zap className="w-3 h-3 fill-current" />
            Monitoramento Fiscal em Tempo Real
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            O cofre digital da sua{' '}
            <span className="text-vigia-blue">gestão fiscal</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Monitore todas as suas notas fiscais em tempo real, receba alertas via WhatsApp e garanta conformidade total com a SEFAZ.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/register">
              <Button size="lg" className="px-10 shadow-xl shadow-blue-200">
                Começar Trial Grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-10">
                Já tenho conta
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 pt-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              14 dias grátis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Cancele quando quiser
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-[11px] font-black text-vigia-blue uppercase tracking-widest">Funcionalidades</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Tudo que você precisa para um compliance impecável
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-vigia-blue group-hover:text-white transition-all duration-300">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-[11px] font-black text-vigia-blue uppercase tracking-widest">Planos</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Preços que crescem com o seu negócio
            </h2>
            <p className="text-gray-500 font-medium">Comece grátis e mude de plano quando precisar. Sem fidelidade.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'p-10 rounded-[2rem] border transition-all duration-300 flex flex-col',
                  plan.popular
                    ? 'border-vigia-blue shadow-2xl shadow-blue-900/10 scale-105 z-10 bg-white'
                    : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg'
                )}
              >
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                    {plan.popular && (
                      <span className="bg-blue-50 text-vigia-blue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-sm font-black text-gray-400">R$</span>
                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-sm font-bold text-gray-400">/mês</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-vigia-blue shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/register">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full h-12"
                  >
                    {plan.popular ? 'Assinar Pro' : `Escolher ${plan.name}`}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <p className="text-[11px] font-black text-vigia-blue uppercase tracking-widest">FAQ</p>
            <h2 className="text-4xl font-black text-gray-900">Dúvidas frequentes</h2>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-1">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-vigia-blue rounded-[3rem] p-16 text-center text-white space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Pronto para blindar sua gestão fiscal?
              </h2>
              <p className="text-blue-100 text-lg font-medium">
                Comece seu trial de 14 dias agora. Sem cartão de crédito.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="px-12">
                  Criar Minha Conta Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-vigia-blue w-6 h-6" />
            <span className="font-black text-gray-900">Vigia Fiscal</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            © 2026 Vigia Fiscal. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold text-gray-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              SSL 256-bit
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              LGPD Compliant
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              +2.000 usuários
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
