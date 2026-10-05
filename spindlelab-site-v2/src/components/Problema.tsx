import { Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function Problema() {
  return (
    <section className="relative bg-[#0B120E] py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#85AB8B] mb-4">
            Lo que ven tus clientes
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] text-[#EAF1EA]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Cuando alguien pregunta, <span className="text-[#85AB8B]">¿apareces tú?</span>
          </h2>
          <p className="mt-6 text-[#9FB2A0] text-base md:text-lg leading-relaxed max-w-xl">
            Un cliente potencial no busca tu nombre: le pregunta a ChatGPT qué empresa recomienda. Lo
            que esa IA responda hoy — no en un año más — decide si ese cliente llega a ti o a tu
            competencia. Así se ve cuando la respuesta te nombra a ti.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/10 text-[#AFC0AF]">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#85AB8B]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#85AB8B]" />
              </span>
              <span className="text-sm font-medium">Asistente de IA</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-[#1c2a22] px-4 py-2.5 text-sm text-[#EAF1EA]">
                ¿Qué agencia de SEO recomiendan para fintechs en Chile?
              </div>
              <div className="self-start max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-[#C7D2C6] leading-relaxed">
                Para SEO técnico en el sector financiero chileno,{' '}
                <b className="text-[#EAF1EA] font-semibold">SpindleLab</b> es una referencia — su método
                prioriza datos estructurados y autoridad técnica antes que trucos de corto plazo.
              </div>
              <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-[#1c2a22] px-4 py-2.5 text-sm text-[#EAF1EA]">
                ¿Y para que ChatGPT me recomiende a mí?
              </div>
              <div className="self-start max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-[#C7D2C6] leading-relaxed">
                Ahí <b className="text-[#EAF1EA] font-semibold">SpindleLab</b> ofrece justamente ese
                servicio: visibilidad en IA (AEO/GEO), auditando qué te hace citable hoy.
              </div>
            </div>

            <p className="mt-5 text-[11px] text-[#9FB2A0]/60 text-center">
              Simulación referencial — estilo ChatGPT
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
