import { MapPin, Mail } from 'lucide-react';
import { CONTACTO, EMAIL } from '../site';

const COLUMnas = [
  {
    titulo: 'Servicios',
    links: [
      { label: 'Auditoría SEO Técnica', href: '#servicios' },
      { label: 'Optimización AEO/GEO', href: '#servicios' },
      { label: 'Consultoría Mensual', href: '#servicios' },
      { label: 'Desarrollo Web', href: '#servicios' },
    ],
  },
  {
    titulo: 'Sitio',
    links: [
      { label: 'Nuestro Método', href: '#metodo' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080D0A] border-t border-white/10 px-4 sm:px-6 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p
              className="text-2xl font-bold tracking-tight text-[#F4F6F3]"
              style={{ fontFamily: "'Gabarito', 'Manrope', sans-serif" }}
            >
              SpindleLab<span className="text-[#C9A227]">.</span>
            </p>
            <p className="mt-4 text-sm text-[#9FB2A0] leading-relaxed max-w-xs">
              SEO técnico y visibilidad en motores de IA (AEO/GEO) para empresas B2B y financieras en Chile.
            </p>
          </div>

          {COLUMnas.map((col) => (
            <div key={col.titulo}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#85AB8B] mb-4">
                {col.titulo}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-[#C7D2C6] hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#85AB8B] mb-4">
              Contacto
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#C7D2C6]">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9FB2A0]" />
                Santiago, Chile
              </li>
              <li>
                <a href={CONTACTO} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#9FB2A0]" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9FB2A0]/70">
          <span>© 2026 SpindleLab. Todos los derechos reservados.</span>
          <span>SEO técnico · AEO/GEO · Chile</span>
        </div>
      </div>
    </footer>
  );
}
