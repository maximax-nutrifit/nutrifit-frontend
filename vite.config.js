import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'NutriFit',
        short_name: 'NutriFit',
        description: 'Your nutrition and fitness app',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'nutrifit192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'nutrifit512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})