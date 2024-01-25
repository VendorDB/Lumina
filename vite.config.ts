import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$api: path.resolve('./src/lib/api'),
			$util: path.resolve('./src/lib/util')
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});
