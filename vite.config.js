import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      
      '/gamesapi': {
        target: 'https://www.freetogame.com/api',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gamesapi/, ''),
      },
    },
  },
})
