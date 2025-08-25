import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // If hosting at https://username.github.io/ResourceHub/, set base to "/ResourceHub/"
  // Otherwise (Netlify, Vercel, own domain, localhost), set base to "/"
  base: "/",
  plugins: [react()],
  server: { port: 5173 }
})
