import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const image = () =>
  z.object({
    src: z.string(),
    alt: z.string(),
    credit: z.string().optional(),
    place: z.string().optional(),
    year: z.string().optional(),
  });

// Obra personal — modelo Kander: proyectos con título y texto propio, sin cliente.
const series = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    excerpt: z.string(),
    order: z.number(),
    cover: image(),
    images: z.array(image()).max(60),
  }),
});

// Trabajo por encargo — editorial y comercial. A diferencia de series, enlaza
// a la publicación externa cuando existe (patrón Kander: la prueba se ve, no se declara).
const encargos = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/encargos' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    year: z.string(),
    excerpt: z.string(),
    order: z.number(),
    cover: image(),
    images: z.array(image()).max(60),
    publication: z
      .object({
        name: z.string(),
        url: z.string().url(),
      })
      .optional(),
  }),
});

export const collections = { series, encargos };
