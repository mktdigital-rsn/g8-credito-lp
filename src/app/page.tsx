import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarClock,
  ChevronDown,
  Clock,
  CreditCard,
  Headphones,
  Landmark,
  Mail,
  Medal,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { brand } from "@/config/brand";

const advantages = [
  {
    icon: Zap,
    title: "Dinheiro rápido e fácil",
    text: "Análise ágil do seu perfil, mesmo com restrição no nome.*",
  },
  {
    icon: CalendarClock,
    title: "Até 45 dias para pagar",
    text: "Comece a pagar a primeira parcela em até 45 dias.*",
  },
  {
    icon: Smartphone,
    title: "Contratação 100% online",
    text: "Solicite sem sair de casa, direto pelo celular ou computador.",
  },
  {
    icon: Banknote,
    title: "Crédito em até 24h",
    text: "Com a proposta aprovada, o dinheiro cai na sua conta em até 24h úteis.*",
  },
];

const audience = [
  { icon: UserRound, label: "Aposentados" },
  { icon: Users, label: "Pensionistas" },
  { icon: Landmark, label: "Servidores Públicos" },
  { icon: Medal, label: "Militares" },
];

const steps = [
  { n: "01", title: "Preencha o formulário", text: "Informe seus dados básicos em menos de 2 minutos." },
  { n: "02", title: "Análise do seu perfil", text: "Nosso time avalia sua proposta e as melhores condições." },
  { n: "03", title: "Receba o dinheiro", text: "Contrato aprovado, crédito liberado direto na sua conta." },
];

const faq = [
  {
    q: "Tenho restrição no nome, posso fazer um empréstimo?",
    a: "Sim. A G8 analisa o seu perfil de forma individual, e a liberação do crédito depende apenas dessa análise e da documentação necessária.",
  },
  {
    q: "Preciso comprovar renda?",
    a: "Sim. Para contratar o empréstimo pessoal é necessário apresentar comprovação de renda (contracheque, extrato de benefício do INSS ou similar).",
  },
  {
    q: "Quais documentos são necessários?",
    a: "Documento de identificação com foto (RG ou CNH), CPF, comprovante de residência atualizado, comprovante de renda e os dois últimos extratos bancários da conta onde você recebe o salário ou benefício.",
  },
  {
    q: "Meu CPF está irregular. Posso contratar?",
    a: "Não. Para contratar é necessário que a situação cadastral do seu CPF esteja regular junto à Receita Federal.",
  },
  {
    q: "Em quanto tempo recebo o dinheiro?",
    a: "Após a aprovação da proposta, o valor é creditado em até 24 horas úteis na conta informada.",
  },
  {
    q: "Qual o valor máximo que posso conseguir?",
    a: "O valor liberado depende da análise do seu perfil e dos documentos apresentados. Preencha o formulário para receber uma proposta personalizada.",
  },
];

function Cta({ className = "" }: { className?: string }) {
  return (
    <a
      href="#formulario"
      className={`group inline-flex h-14 items-center justify-center gap-3 rounded-[2px] bg-brand-accent px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-brand-accent/25 transition-all hover:bg-brand-accent-hover ${className}`}
    >
      Contrate agora
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" aria-label={brand.name}>
            <Image src={brand.logoOnDark} alt={`${brand.name} Logo`} width={120} height={50} priority className="h-10 w-auto" />
          </a>
          <nav className="hidden items-center gap-8 text-xs font-black uppercase tracking-widest text-white/70 md:flex">
            <a href="#vantagens" className="transition-colors hover:text-white">Vantagens</a>
            <a href="#quem-pode" className="transition-colors hover:text-white">Quem pode contratar</a>
            <a href="#faq" className="transition-colors hover:text-white">Dúvidas</a>
          </nav>
          <a
            href="#formulario"
            className="rounded-[2px] border border-brand-accent/60 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
          >
            Simular
          </a>
        </div>
      </header>

      <main>
        {/* HERO + FORMULÁRIO */}
        <section className="relative overflow-hidden bg-ink pt-28 pb-16 lg:pt-36 lg:pb-24">
          <Image
            src="/g8_background.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.12] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
          <div className="absolute -top-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-brand-accent/15 blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-brand-accent/10 blur-[100px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
            <div className="space-y-7">
              <span className="inline-flex w-fit items-center rounded-[2px] border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/70">
                Empréstimo Pessoal
              </span>
              <h1 className="text-[clamp(2.4rem,6vw,4.25rem)] font-black leading-[1.02] tracking-tighter text-white">
                Dinheiro na mão, <br />
                <span className="italic text-brand-accent">sem burocracia.</span>
              </h1>
              <p className="max-w-lg text-base font-medium leading-relaxed text-neutral-300 sm:text-lg">
                Facilidade e agilidade para ter crédito com a segurança e a confiança da {brand.shortName}.
                Contrate sem sair de casa, parcele em até <strong className="text-white">15 vezes</strong> e
                tenha até <strong className="text-white">45 dias</strong> para começar a pagar.*
              </p>

              <ul className="grid max-w-lg gap-3 sm:grid-cols-2">
                {["Mesmo com nome negativado*", "100% online", "Resposta rápida", "Sem taxa antecipada"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="inline-flex w-fit items-center gap-3 rounded-sm border border-amber-500/20 bg-amber-400/20 p-3 text-white shadow-lg shadow-amber-400/10">
                <ShieldCheck className="h-4 w-4 opacity-90" />
                <span className="text-[10px] font-bold uppercase leading-none tracking-[0.2em]">Ambiente 100% seguro</span>
              </div>
            </div>

            <div id="formulario" className="scroll-mt-24">
              <div className="rounded-[2px] bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
                <div className="mb-6 border-l-4 border-brand-accent pl-4">
                  <h2 className="text-xl font-black leading-tight tracking-tight sm:text-2xl">
                    Preencha o formulário e contrate o seu empréstimo.
                  </h2>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                    Leva menos de 2 minutos
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* VANTAGENS */}
        <section id="vantagens" className="scroll-mt-10 bg-neutral-50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-accent">Por que a G8</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Vantagens que você só encontra na {brand.shortName}
              </h2>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group rounded-[2px] border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-accent/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-brand-accent-light text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-black tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEGURO + RESTRIÇÃO */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="relative aspect-[470/503] w-full max-w-md overflow-hidden rounded-[2px] shadow-2xl lg:mx-0 mx-auto">
              <Image src="/g8_background.webp" alt={`Sede ${brand.name}`} fill sizes="(max-width: 480px) 100vw, 448px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <Image
                src={brand.logoOnDark}
                alt={`${brand.name} Logo`}
                width={160}
                height={66}
                className="absolute bottom-6 left-6 h-12 w-auto"
              />
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Fazer um empréstimo com restrição no nome é seguro?
                </h2>
                <p className="mt-4 font-medium leading-relaxed text-neutral-600">
                  Claro! Na hora de precisar de dinheiro, o importante é contar com uma empresa sólida e que cumpra o
                  que promete. A {brand.shortName} confia em você: analisamos o seu perfil e oferecemos o produto ideal
                  para você ter dinheiro na mão com rapidez.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Estou negativado, posso contratar?
                </h2>
                <p className="mt-4 font-medium leading-relaxed text-neutral-600">
                  Sim. A {brand.shortName} concede crédito a servidores públicos, aposentados, pensionistas e militares
                  mesmo com restrição no nome. A liberação depende apenas da análise do seu perfil e da documentação
                  necessária.
                </p>
              </div>
              <Cta />
            </div>
          </div>
        </section>

        {/* QUEM PODE CONTRATAR */}
        <section id="quem-pode" className="relative scroll-mt-10 overflow-hidden bg-ink py-20 lg:py-28">
          <div className="absolute -top-[20%] left-1/2 h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-brand-accent/10 blur-[140px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-accent">Quem pode contratar</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Empréstimo pessoal para quem está com restrição no nome
              </h2>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {audience.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-[2px] border border-white/10 bg-ink-soft p-6 transition-colors hover:border-brand-accent/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-black text-white">{label}</span>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-neutral-400">
              Também atendemos servidores federais, estaduais e municipais, beneficiários do INSS e de fundos de
              previdência privada.
            </p>
            <div className="mt-10 flex justify-center">
              <Cta />
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-accent">Como funciona</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Rápido, fácil e sem burocracia</h2>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="relative border-t-2 border-neutral-100 pt-8">
                  <span className="absolute -top-[2px] left-0 h-[2px] w-16 bg-brand-accent" />
                  <span className="text-5xl font-black tracking-tighter text-brand-accent/20">{s.n}</span>
                  <h3 className="mt-2 text-xl font-black tracking-tight">{s.title}</h3>
                  <p className="mt-2 font-medium text-neutral-500">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                { icon: CreditCard, title: "Até 15 parcelas", text: "Prazo estendido para caber no seu orçamento." },
                { icon: Clock, title: "Dinheiro em até 24h", text: "Crédito na sua conta após a aprovação.*" },
                { icon: ShieldCheck, title: "Segurança G8", text: "Seus dados protegidos com criptografia." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4 rounded-[2px] bg-neutral-50 p-6">
                  <Icon className="h-6 w-6 shrink-0 text-brand-accent" />
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-1 text-sm font-medium text-neutral-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALERTA DE FRAUDE */}
        <section className="bg-brand-accent">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <ShieldAlert className="h-10 w-10 shrink-0 text-white" />
            <p className="text-sm font-bold uppercase leading-relaxed tracking-wide text-white">
              Atenção! A {brand.shortName} não cobra nenhum tipo de taxa antecipada para liberação de crédito. Caso isso
              aconteça, cuidado: trata-se de fraude.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-10 bg-neutral-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-accent">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Perguntas frequentes</h2>
            </div>
            <div className="mt-12 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-[2px] border border-neutral-200 bg-white open:border-brand-accent/40 open:shadow-lg open:shadow-brand-accent/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-brand-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm font-medium leading-relaxed text-neutral-600">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Cta />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-ink text-neutral-400">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4">
              <Image src={brand.logoOnDark} alt={`${brand.name} Logo`} width={140} height={58} className="h-11 w-auto" />
              <p className="max-w-xs text-sm font-medium">
                Crédito pessoal rápido, seguro e sem burocracia para você.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Atendimento</h4>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Phone className="h-4 w-4 text-brand-accent" /> {brand.supportPhone}
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4 text-brand-accent" /> {brand.supportEmail}
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Headphones className="h-4 w-4 text-brand-accent" /> Seg. a sex., das 9h às 18h
              </p>
            </div>
            <div id="privacidade" className="space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Privacidade</h4>
              <p className="text-sm font-medium leading-relaxed">
                Respeitamos a privacidade e a proteção dos seus dados. As informações enviadas são utilizadas apenas
                para análise e contato sobre a sua solicitação de crédito, conforme a LGPD.
              </p>
            </div>
          </div>

          <p className="mt-12 border-t border-white/5 pt-8 text-[11px] font-medium uppercase leading-relaxed tracking-wide text-neutral-500">
            *Crédito sujeito a análise e aprovação. O prazo de liberação em até 24h úteis e o pagamento da primeira
            parcela em até 45 dias dependem da data de contratação e do recebimento do salário ou benefício do cliente.
            O Custo Efetivo Total (CET) é informado previamente no ato da solicitação. Condições sujeitas a alteração sem
            aviso prévio. Contrate com responsabilidade.
          </p>
          <p className="mt-6 text-xs font-semibold text-neutral-600">
            © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
