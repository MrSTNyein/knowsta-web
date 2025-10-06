import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/knowsta-web/', // THIS is important for GitHub Pages
  plugins: [react()],
});
