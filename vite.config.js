import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` → standard multi-file build in dist/
// `npm run build:single` → one self-contained dist-single/index.html
// Relative base so the build works under the GitHub Pages subpath (/FFI-website-seamless/)
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  build: mode === 'single' ? { outDir: 'dist-single' } : {},
}))
