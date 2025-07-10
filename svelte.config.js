import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({}),
		preprocess({
			postcss: true
		})
	],

	kit: {
		version: {
            name: "2.0.0"
        },
		adapter: adapter(),
		alias: {
			$i18n: './src/i18n',
			$assets: './src/assets',
			$components: './src/components',
			$modals: './src/modals'
		}
	}
};

export default config;
