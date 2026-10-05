import { Play, Sparkles } from 'lucide-react';
import VideoBg from '../VideoBg';
import { CONTACTO } from '../site';

export default function Hero() {
  return (
    <section id="top" className="relative w-full min-h-screen overflow-hidden bg-[#0B120E]">
      <VideoBg src="/hero-hilo-de-oro.mp4" className="absolute inset-0 w-full h-full object-cover" />
      {/* Velo oscuro para legibilidad del texto sobre el video macro */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,18,14,0.74) 0%, rgba(11,18,14,0.38) 26%, rgba(11,18,14,0.38) 54%, rgba(11,18,14,0.92) 100%)',
        }}
      />

      {/* Texto del hero */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">
        <h1
          className="font-normal leading-[0.95] text-[#EAF1EA] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl"
          style={{
            fontFamily:
              '"Neue Haas Grotesk Display Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
            letterSpacing: '-0.035em',
          }}
        >
          No compites solo en Google.{' '}
          <span className="text-[#85AB8B]">
            Compites en las
            <br className="hidden sm:block" /> respuestas de la IA.
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-[#9FB2A0] text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
          SEO técnico y visibilidad en IA para que los motores te recomienden antes que a tu competencia.
        </p>
        <p className="mt-4 text-[#9FB2A0]/70 text-xs sm:text-sm font-medium tracking-wide">
          Optimizamos para ChatGPT · Gemini · Perplexity · Google SGE
        </p>
      </div>

      {/* Bloque CTA inferior izquierdo */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-[#EAF1EA] mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">Diagnóstico en 48 h</span>
        </div>
        <p className="text-[#C7D2C6]/85 text-xs leading-relaxed mb-6 max-w-xs">
          Reviso tu sitio, tu competencia y tu presencia en IA, y te entrego en una página qué te frena y qué mueve la aguja. Sin costo, sin compromiso.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={CONTACTO}
            className="bg-[#F4F6F3] hover:bg-white text-[#12201A] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm"
          >
            Agenda tu diagnóstico
          </a>
          <a
            href="#servicios"
            className="text-[#C7D2C6] text-sm font-semibold hover:text-white transition-colors"
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Enlace inferior derecho al método */}
      <a
        href="#metodo"
        className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/85 text-sm hover:text-white transition-colors"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors">
          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
        </span>
        <span className="font-medium">Método Señal</span>
        <span className="text-white/50">4 pasos</span>
      </a>
    </section>
  );
}
