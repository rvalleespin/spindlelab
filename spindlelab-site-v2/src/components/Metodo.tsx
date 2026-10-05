import Reveal from './Reveal';

const PASOS = [
  {
    n: '01',
    titulo: 'Diagnóstico técnico',
    desc: 'Auditamos tu sitio en profundidad: rastreo, indexación, velocidad y datos estructurados.',
  },
  {
    n: '02',
    titulo: 'Estrategia AEO/GEO',
    desc: 'Diseñamos la hoja de ruta para que los modelos de IA te citen y recomienden.',
  },
  {
    n: '03',
    titulo: 'Implementación',
    desc: 'Ejecutamos los cambios técnicos y de contenido en conjunto con tu equipo.',
  },
  {
    n: '04',
    titulo: 'Monitoreo',
    desc: 'Medimos menciones en IA, posiciones clásicas y tráfico orgánico quincenalmente.',
  },
];

export default function Metodo() {
  return (
    <section id="metodo" className="relative bg-[#0B120E] py-24 md:py-32 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#85AB8B] mb-4">
            Método Señal
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] text-[#EAF1EA]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Cuatro pasos. Resultados medibles.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <div
                  className="text-4xl md:text-5xl font-semibold text-[#85AB8B]/70 mb-5"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {p.n}
                </div>
                <h3 className="text-lg font-semibold text-[#EAF1EA] mb-2.5">{p.titulo}</h3>
                <p className="text-sm text-[#9FB2A0] leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
