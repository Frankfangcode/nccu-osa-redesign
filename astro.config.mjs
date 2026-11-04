import { defineConfig } from 'astro/config';

// BASE_PATH lets the same build live at the repo root or in a sub-folder
// of the Pages site (e.g. /nccu-osa-redesign/v2 for side-by-side review).
export default defineConfig({
  site: 'https://frankfangcode.github.io',
  base: process.env.BASE_PATH || '/nccu-osa-redesign',
  trailingSlash: 'always',
});
