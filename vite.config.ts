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
      dts: './auto-imports.d.ts', // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
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
