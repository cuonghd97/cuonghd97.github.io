import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cuonghd97.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
