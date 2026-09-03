import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_SITE = 'https://pontehercilio.com';
const configuredSite = process.env.SITE_URL?.trim();
const site = (configuredSite || DEFAULT_SITE).replace(/\/+$/, '');

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
