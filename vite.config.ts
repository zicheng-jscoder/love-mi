import { defineConfig, ServerOptions } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: { assetsInlineLimit: 4096, copyPublicDir: true },
  optimizeDeps: { entries: ['@dcloudio/uni-ui'] },
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts',
    }),
  ],
  server: resolvedServerOptions(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~@': path.resolve(__dirname, 'static'),
      '~com': path.resolve(__dirname, 'components'),
    },
  },
  define: {
    'process.env': {},
  },
})

// 处理server 逻辑
function resolvedServerOptions() {
  const proxy: ServerOptions['proxy'] = {
    ['/dev-api']: {
      // target: 'http://love-api.jstec.pro',
      target: 'http://150.158.79.142:80',
      changeOrigin: true,
      rewrite: (path) => path.replace('/dev-api', ''),
    },
  }

  const server: ServerOptions = {
    port: 9999,
    https: false,
    open: 'index.html',
    proxy,
  }
  return server
}
