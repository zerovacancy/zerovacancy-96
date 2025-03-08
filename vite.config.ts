
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Add dedicated React resolution to prevent version conflicts
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Force React Email components to use the main project's React version
    force: true,
    esbuildOptions: {
      // Fix for nested dependencies that use different React versions
      preserveSymlinks: false,
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
}));
