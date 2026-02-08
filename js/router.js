// --------------------------------------------------
// Routeur minimaliste SPA
// --------------------------------------------------

// Import des pages
import { accueil } from './pages/accueil.js';
import { actu } from './pages/actu.js';
import { eglise } from './pages/eglise.js';
import { elrtv } from './pages/elrtv.js';
import { nextgen } from './pages/nextgen.js';
import { boutique } from './pages/boutique.js';
import { contact } from './pages/contact.js';

// Conteneur principal
const contentElement = document.getElementById('content');

// Fonction pour charger une page
function loadPage(pageName) {
    console.log(`Chargement de la page: ${pageName}`);

    const pages = {
        accueil,
        actu,
        eglise,
        elrtv,
        nextgen,
        boutique,
        contact
    };

    const pageContent = pages[pageName];
    if (pageContent) {
        contentElement.innerHTML = pageContent();
    } else {
        contentElement.innerHTML = '<h1>Page non trouvée</h1>';
    }
}

// Définit les routes (correspondant aux liens dans index.html)
const routes = {
    '/': () => loadPage('accueil'),
    '/actu': () => {
        loadPage('accueil');
        setTimeout(() => {
            const section = document.getElementById('actu-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    },
    '/eglise': () => loadPage('eglise'),
    '/elrtv': () => loadPage('elrtv'),
    '/nextgen': () => loadPage('nextgen'),
    '/boutique': () => loadPage('boutique'),
    '/contact': () => loadPage('contact'),
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