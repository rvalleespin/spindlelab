import { useState, useEffect } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { NAV_LINKS, CONTACTO, EMAIL } from '../site';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 transition-colors duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#0B120E]/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 text-[#F4F6F3]">
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Gabarito', 'Manrope', sans-serif" }}
          >
            SpindleLab<span className="text-[#C9A227]">.</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 bg-white/[0.06] backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm px-3 py-2 font-medium text-[#AFC0AF] hover:text-white transition-colors"
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
          <a
            href={CONTACTO}
            className="hidden sm:flex lg:hidden items-center gap-2 text-sm font-medium hover:text-white transition-colors"
          >
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
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#050807]/70 backdrop-blur-sm" />
      </div>

      {/* Cajón del menú móvil */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-sm bg-[#0E1712]/95 backdrop-blur-xl shadow-2xl border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
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
              {EMAIL}
            </a>
            <a
              href={CONTACTO}
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-[#F4F6F3] hover:bg-white text-[#12201A] text-sm font-semibold px-5 py-3 rounded-full transition-colors text-center"
            >
              Diagnóstico gratis
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
