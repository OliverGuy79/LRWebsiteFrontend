// --------------------------------------------------
// Routeur minimaliste SPA
// --------------------------------------------------

// Import des pages (Integration Base + Custom Additions)
import { accueil } from './pages/accueil.js';
import { eglise } from './pages/eglise.js'; // Base
import { elrtv } from './pages/elrtv.js';
import { nextgen } from './pages/nextgen.js'; // Base
import { contact } from './pages/contact.js';
import { article } from './pages/article.js';

// Custom Additions (Restored)
import { actu } from './pages/actu.js';
import { kidz } from './pages/kidz.js';
import { teenz } from './pages/teenz.js';
import { vision } from './pages/vision.js';
import { equipe } from './pages/equipe.js';
import { homeGroups } from './pages/home-groups.js';
import { services } from './pages/services.js';
import { boutique } from './pages/boutique.js';

// Conteneur principal
const contentElement = document.getElementById('content');

// Fonction pour charger une page
async function loadPage(pageName) {
    console.log(`Chargement de la page: ${pageName}`);

    const pages = {
        accueil,
        actu,
        eglise,
        elrtv,
        nextgen,
        kidz,
        teenz,
        vision,
        equipe,
        homeGroups,
        services,
        boutique,
        contact,
        article
    };

    const pageContent = pages[pageName];
    if (pageContent) {
        try {
            // Support both sync and async pages
            const content = await pageContent();
            contentElement.innerHTML = content;
        } catch (error) {
            console.error("Erreur lors du chargement de la page:", error);
            contentElement.innerHTML = `
                <div class="mx-auto max-w-4xl px-4 py-20 text-center">
                    <h1 class="text-3xl font-bold text-punch">Oups ! Une erreur est survenue.</h1>
                    <p class="mt-4 text-black/60">Impossible de charger le contenu. Veuillez réessayer plus tard.</p>
                </div>
            `;
        }
    } else {
        contentElement.innerHTML = '<h1>Page non trouvée</h1>';
    }
}

// Définit les routes (correspondant aux liens dans index.html)
const routes = {
    '/': () => loadPage('accueil'),
    '/actu': async () => {
        await loadPage('actu');
    },
    '/eglise': () => loadPage('eglise'),
    '/elrtv': () => loadPage('elrtv'),
    '/nextgen': () => loadPage('nextgen'),
    '/kidz': () => loadPage('kidz'),
    '/teenz': () => loadPage('teenz'),
    '/vision': () => loadPage('vision'),
    '/equipe': () => loadPage('equipe'),
    '/homes': () => loadPage('homeGroups'),
    '/services': () => loadPage('services'),
    '/boutique': () => loadPage('boutique'),
    '/contact': () => loadPage('contact'),
    '/article': () => loadPage('article'),
};

// Chargement initial au démarrage
window.addEventListener('DOMContentLoaded', () => {
    console.log("Chargement initial au démarrage");
    const path = window.location.hash.slice(1) || '/';
    routes[path]?.();
});

// Permet de charger des pages sans recharger la page
window.addEventListener('hashchange', () => {
    console.log("hashchange");
    const path = window.location.hash.slice(1) || '/';
    routes[path]?.();
});