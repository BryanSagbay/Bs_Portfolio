import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['admin-portfolio-kz2q.onrender.com']
  }
})
