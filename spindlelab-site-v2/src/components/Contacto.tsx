import { ArrowRight, Mail } from 'lucide-react';
import Reveal from './Reveal';
import { CONTACTO, EMAIL } from '../site';

export default function Contacto() {
  return (
    <section id="contacto" className="relative bg-[#0E1712] py-24 md:py-32 px-4 sm:px-6 scroll-mt-20 overflow-hidden">
      {/* Glow sutil de fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(133,171,139,0.14) 0%, rgba(133,171,139,0) 70%)' }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#85AB8B] mb-4">
            Hablemos
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-[#EAF1EA]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Empecemos con un diagnóstico sin costo.
          </h2>
          <p className="mt-6 text-[#9FB2A0] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Revisamos tu sitio, tu competencia y tu presencia en IA. Sin compromiso.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACTO}
              className="inline-flex items-center gap-2 bg-[#F4F6F3] hover:bg-white text-[#12201A] text-sm font-semibold px-7 py-3.5 rounded-full transition-colors shadow-sm"
            >
              Agenda tu diagnóstico gratis
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-[#C7D2C6] text-sm font-medium hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
