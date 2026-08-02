import { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Play, Sparkles, Menu, X } from 'lucide-react';
import VideoBg from './VideoBg';

const CONTACTO =
  'mailto:hola@spindlelab.cl?subject=Quiero%20mi%20diagn%C3%B3stico%20gratis';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#metodo', label: 'Método' },
    { href: '#taller', label: 'El Taller' },
  ];

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#0B120E]">
      <VideoBg src="/hero-hilo-de-oro.mp4" className="absolute inset-0 w-full h-full object-cover" />
      {/* Velo oscuro para legibilidad del texto sobre el video macro */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,18,14,0.74) 0%, rgba(11,18,14,0.38) 26%, rgba(11,18,14,0.38) 54%, rgba(11,18,14,0.88) 100%)',
        }}
      />

      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-[#F4F6F3]">
          <span
            className="text-xl sm:text-2xl md:text-[1.75rem] font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Gabarito', 'Manrope', sans-serif" }}
          >
            SpindleLab<span className="text-[#C9A227]">.</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/[0.06] backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 transition-colors ${
                i === 0 ? 'font-semibold text-white' : 'font-medium text-[#AFC0AF] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACTO}
            className="ml-2 bg-[#F4F6F3] hover:bg-white text-[#12201A] text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Diagnóstico gratis
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-[#C7D2C6]">
          <a href="#taller" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            El Taller
          </a>
          <a href={CONTACTO} className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
            Contacto
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-white/10"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Overlay del menú móvil */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#050807]/70 backdrop-blur-sm" />
      </div>

      {/* Cajón del menú móvil */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-[#0E1712]/95 backdrop-blur-xl shadow-2xl border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-white py-4 border-b border-white/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <a href={CONTACTO} className="flex items-center gap-2 text-sm font-medium text-[#C7D2C6]">
              <Mail className="w-4 h-4" />
              hola@spindlelab.cl
            </a>
            <a
              href={CONTACTO}
              className="mt-2 bg-[#F4F6F3] hover:bg-white text-[#12201A] text-sm font-semibold px-5 py-3 rounded-full transition-colors text-center"
            >
              Diagnóstico gratis
            </a>
          </div>
        </div>
      </div>

      {/* Texto del hero */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
        <h1
          className="font-normal leading-[0.95] text-[#EAF1EA] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl"
          style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.035em' }}
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

export default App;
