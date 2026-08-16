import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['methodology','product','industry','research','evidence','glossary','use-case']),
    status: z.enum(['draft','review','published']).default('draft'),
    pillar: z.string().optional(),
    related: z.array(z.string()).default([]),
    evidence: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    canonical: z.string().optional()
  })
});

export const collections = { knowledge };
