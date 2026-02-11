// --------------------------------------------------
// Routeur minimaliste SPA
// --------------------------------------------------

// Import des pages (Integration Base + Custom Additions)
import { accueil } from './pages/accueil.js';
import { elrtv } from './pages/elrtv.js';
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
        elrtv,
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

    const pageFunction = pages[pageName];

    if (pageFunction) {
        try {
            // Afficher un loader si le chargement prend du temps (optionnel, à styliser)
            contentElement.innerHTML = '<div class="flex h-[50vh] items-center justify-center"><div class="h-10 w-10 animate-spin rounded-full border-4 border-ink border-t-transparent"></div></div>';

            // Exécuter la fonction de page (peut être async)
            const html = await pageFunction();
            contentElement.innerHTML = html;
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
        await loadPage('accueil');
        // Un petit délai supplémentaire pour laisser le temps au navigateur de rendre le DOM
        setTimeout(() => {
            const section = document.getElementById('actu-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    },
    '/elrtv': () => loadPage('elrtv'),
    '/kidz': () => loadPage('kidz'),
    '/teenz': () => loadPage('teenz'),
    '/vision': () => loadPage('vision'),
    '/pastoral-team': () => loadPage('equipe'),
    '/home-groups': () => loadPage('homeGroups'),
    '/services': () => loadPage('services'),
    '/boutique': () => loadPage('boutique'),
    '/contact': () => loadPage('contact'),
    '/article': () => loadPage('article'),
};

// Chargement initial au démarrage
window.addEventListener('DOMContentLoaded', () => {
    console.log("Chargement initial au démarrage");
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    routes[path]?.();
});

// Permet de charger des pages sans recharger la page
window.addEventListener('hashchange', () => {
    console.log("hashchange");
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    routes[path]?.();
});