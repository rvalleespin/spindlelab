import { ScanSearch, Bot, LineChart, Code2, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

type Servicio = {
  icon: LucideIcon;
  titulo: string;
  desc: string;
  nuevo?: boolean;
};

const SERVICIOS: Servicio[] = [
  {
    icon: ScanSearch,
    titulo: 'Auditoría SEO Técnica',
    desc: 'Diagnóstico profundo de tu arquitectura web: rastreo, indexación, Core Web Vitals, datos estructurados y señales de autoridad.',
  },
  {
    icon: Bot,
    titulo: 'Visibilidad en IA (AEO/GEO)',
    desc: 'Optimizamos tu contenido y estructura para que los modelos de lenguaje te citen como fuente confiable en ChatGPT, Gemini y Perplexity.',
  },
  {
    icon: LineChart,
    titulo: 'Acompañamiento Mensual',
    desc: 'Monitoreo continuo, informes quincenales y ajustes tácticos para mantener tu ventaja competitiva en SEO e IA.',
  },
  {
    icon: Code2,
    titulo: 'Desarrollo Web',
    desc: 'Sitios 100% a medida, sin plantillas ni WordPress, con SEO técnico incorporado desde el primer commit. Construcción asistida por IA, supervisión humana en cada fase.',
    nuevo: true,
  },
];

const CIFRAS = [
  { valor: '48 h', label: 'Entrega del diagnóstico inicial' },
  { valor: '1 sitio', label: 'Para dominar tu nicho en IA' },
  { valor: '20 min', label: 'Reunión de alineación estratégica' },
  { valor: '3 capas', label: 'SEO técnico, contenido y autoridad' },
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative bg-[#0E1712] py-24 md:py-32 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#85AB8B] mb-4">
            Nuestros servicios
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] text-[#EAF1EA]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Especialistas en la infraestructura del nuevo SEO
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-5">
          {SERVICIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.titulo} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 transition-colors duration-300 hover:border-[#85AB8B]/40 hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#85AB8B]/12 text-[#85AB8B]">
                      <Icon className="w-5 h-5" />
                    </span>
                    {s.nuevo && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#85AB8B] border border-[#85AB8B]/30 rounded-full px-2.5 py-1">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#EAF1EA] mb-2.5">{s.titulo}</h3>
                  <p className="text-sm text-[#9FB2A0] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Banda de cifras */}
        <Reveal delay={120}>
          <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 rounded-2xl border border-white/10 bg-[#0B120E]/60 px-6 py-8 md:py-10">
            {CIFRAS.map((c) => (
              <div key={c.label} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-semibold text-[#EAF1EA]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {c.valor}
                </div>
                <div className="mt-1.5 text-xs text-[#9FB2A0] leading-snug max-w-[18ch] mx-auto">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
