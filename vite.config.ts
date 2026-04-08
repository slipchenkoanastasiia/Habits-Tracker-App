import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// export default з динамічним base
export default defineConfig(({ mode }) => ({
  // Якщо збірка для продакшн (npm run build), ставимо підпапку GitHub Pages
  // Локально (npm run dev) — просто '/'
  base: mode === 'production' ? '/Habits-Tracker-App/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.vue'],
  },
  server: {
    watch: { usePolling: true },
  },
}))