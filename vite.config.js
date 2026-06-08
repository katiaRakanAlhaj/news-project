import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://s5.hostorr.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                // Optional: Add these if you're still having issues
                secure: false,
                ws: true,
            }
        }
    }
})