import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: (() => {
				console.log("HERE")
				let x = process.argv.includes('dev') ? '' : process.env.BASE_PATH
				console.log(x);
				return x
			})()
		}
	}
};

export default config;
