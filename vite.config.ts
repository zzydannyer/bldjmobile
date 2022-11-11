import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
//自动导入
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: './auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@store': resolve(__dirname, 'src/store/modules'),
      // '@img': resolve(__dirname, 'src/static/images'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/static/scss/global.scss"; ',
      },
    },
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
  },
})
