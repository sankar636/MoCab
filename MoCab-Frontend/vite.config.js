import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',     // use ws explicitly for local dev
      host: 'localhost',  // where the frontend runs
      clientPort: 5173    // matches Vite dev server port
    },
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
