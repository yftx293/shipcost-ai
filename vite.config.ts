import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the same build works at a domain root and when
  // served from a sub-path. The app is a single page with no client-side
  // routing, so relative paths are safe either way.
  base: './',
  plugins: [react(), tailwindcss()],
})
