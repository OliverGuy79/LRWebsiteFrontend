// Service pour le contenu éditorial du site (Google Sheets → API)
import { api } from './api.service.js';

let _cache = null;
let _fetchPromise = null;

// Les feuilles de contenu peuvent contenir des libellés d'aide à la saisie
// (par exemple « Ligne 1 du titre hero accueil ») à la place d'un vrai texte.
// Ces libellés ne doivent jamais être publiés sur le site.
function isEditorialPlaceholder(value) {
    if (typeof value !== 'string') return true;

    const normalized = value.trim().toLocaleLowerCase('fr-FR');
    if (!normalized) return true;

    // Les descriptions de colonnes du fichier source commencent toutes par
    // le type de champ (« Titre playlist », « Description CTA », etc.).
    const editorialFieldLabel = /^(?:titre|sous[ -]?titre|bouton|cta|description|texte|libellé|label|info(?:rmation)? pratique|ligne [12](?: du titre)?|tags?)(?:\s|:|$)/;

    // Autres intitulés courts utilisés dans les feuilles comme aide de saisie.
    const dataFieldLabel = /^(?:ville|adresse(?: e-?mail)?|e-?mail|infos? transports?|jour (?:du )?dimanche|heure (?:du )?dimanche|horaire(?:s)? (?:du )?culte)(?:\s|:|$)/;

    return editorialFieldLabel.test(normalized) || dataFieldLabel.test(normalized);
}

function publishedValue(value, fallback) {
    return isEditorialPlaceholder(value) ? fallback : value.trim();
}

/**
 * Fetch all site content from the API and cache it as a key→content map.
 */
async function loadAll() {
    if (_cache) return _cache;
    if (_fetchPromise) return _fetchPromise;

    _fetchPromise = (async () => {
        try {
            const response = await api.get('/api/site-content');
            const items = response.items || response || [];
            _cache = {};
            for (const item of items) {
                if (item.key) {
                    // Le fichier site_content.csv stocke le texte publié dans
                    // `content`. `title` reste accepté pour compatibilité avec
                    // une ancienne version de l'API.
                    _cache[item.key] = typeof item.content === 'string'
                        ? item.content
                        : (typeof item.title === 'string' ? item.title : '');
                }
            }
            return _cache;
        } catch (err) {
            console.warn('Site content unavailable, using defaults.', err);
            _cache = {};
            return _cache;
        } finally {
            _fetchPromise = null;
        }
    })();

    return _fetchPromise;
}

/**
 * Get a content value by key.
 * @param {string} key - e.g. "accueil.hero.line1"
 * @param {string} fallback - fallback value if key not found
 * @returns {Promise<string>}
 */
export async function t(key, fallback = '') {
    const map = await loadAll();
    return publishedValue(map[key], fallback);
}

/**
 * Get multiple content values at once (single API call).
 * @param {Record<string, string>} defaults - { key: fallbackValue }
 * @returns {Promise<Record<string, string>>}
 */
export async function tAll(defaults) {
    const map = await loadAll();
    const result = {};
    for (const [key, fallback] of Object.entries(defaults)) {
        result[key] = publishedValue(map[key], fallback);
    }
    return result;
}

/**
 * Preload site content (call once at app boot).
 */
export async function preloadSiteContent() {
    await loadAll();
}
