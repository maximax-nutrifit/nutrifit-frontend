import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',  // Ensure build goes to dist/
    assetsDir: 'assets',  // Ensure assets are inside assets/
    rollupOptions: {
      input: {
        main: 'index.html',
        serviceWorker: 'public/service-worker.js' // Ensure SW is included
      }
    }
  },
  publicDir: 'public' // Ensures public files are copied
})
