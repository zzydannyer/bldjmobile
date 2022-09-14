import { defineConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [uni()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/static/scss/global.scss"; '
			}
		}
	},
	server: {
		// 代理
		/* proxy: {
			'/api': {
				target: 'http://xxx.xxx.xx',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		} */
	}
});
