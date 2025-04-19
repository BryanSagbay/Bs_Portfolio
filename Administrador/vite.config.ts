import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['admin-portfolio-ipdo.onrender.com'],
  },
})
