import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://research.tamver.eu',
  output: 'static',
  integrations: [react()]
});
