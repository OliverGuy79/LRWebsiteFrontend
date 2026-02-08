import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://lrwebsitebackend.onrender.com', // L'URL de votre backend distant
                changeOrigin: true, // Nécessaire pour les CORS virtuelles
                secure: false, // Si le certificat SSL distant pose problème (rarement nécessaire pour Render)
                // rewrite: (path) => path.replace(/^\/api/, ''), // Si le backend n'attend pas /api en préfixe. Ici il semble attendre /api.
            },
        },
    },
});
