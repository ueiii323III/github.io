import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5174,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist-admin',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'admin.html')
      }
    }
  }
})