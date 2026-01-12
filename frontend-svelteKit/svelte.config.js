import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
const config = {
	preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: '../backend/dist', // ← här skickas byggda filer
      precompress: true       // valfritt, gzip/brotli
    }),
    // Basväg om din backend serverar från /dist
    paths: {
      base: '',
    }
  }
}

export default config;
