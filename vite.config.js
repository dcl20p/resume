import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                    'animations': ['framer-motion'],
                    'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
                    'forms': ['@hookform/resolvers', 'zod'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
        minify: 'esbuild',
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
        exclude: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    },
    server: {
        host: '0.0.0.0',
        port: 5179,
        strictPort: true,
        hmr: { 
            host: 'localhost'
        },
        cors: {
            origin: [
                "https://resume.local"
            ],
            credentials: true,
        },
    },
});
