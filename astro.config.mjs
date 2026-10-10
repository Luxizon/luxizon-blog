// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Use rendered routes and robots metadata so custom slugs and YAML syntax
// cannot make sitemap policy disagree with the actual article pages.
const excludedRoutes = new Set();
/** @type {import('astro').AstroIntegration} */
const excludeNoindex = {
  name: 'exclude-noindex-from-sitemap',
  hooks: {
    'astro:build:done': ({ dir }) => {
      excludedRoutes.clear();
      const root = fileURLToPath(dir);
      for (const file of globSync('**/*.html', { cwd: root })) {
        const html = readFileSync(join(root, file), 'utf8');
        if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*\bnoindex\b/.test(html)) {
          const path = file.replaceAll('\\', '/');
          excludedRoutes.add(path === 'index.html' ? '/' : '/' + path.replace(/\/index\.html$/, '/'));
        }
      }
    },
  },
};
export default defineConfig({
  site: 'https://luxizon-blog.pages.dev',
  output: 'static',
  integrations: [mdx(), excludeNoindex, sitemap({
    filter: page => !excludedRoutes.has(decodeURIComponent(new URL(page).pathname)),
  })],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false, wrap: false },
  },
});
