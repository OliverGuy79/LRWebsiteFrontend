// Service API centralisé pour communiquer avec le backend
// Documentation API : https://lrwebsitebackend.onrender.com/docs

export class ApiService {
    constructor() {
        // En prod, l'URL est https://lrwebsitebackend.onrender.com
        // Pour le développement local avec proxy, on veut une URL vide (relative).
        // Vite expose uniquement les variables commençant par VITE_.
        this.baseUrl = import.meta.env.VITE_API_URL || '';
        console.log("API Base URL:", this.baseUrl || '(relative/proxy)');
    }

    /**
     * Méthode générique GET
     * @param {string} endpoint 
     * @param {object} params - Paramètres de requête (query params)
     */
    async get(endpoint, params = {}) {
        try {
            let url;
            // Gestion des URLs absolues vs relatives
            if (this.baseUrl && this.baseUrl.startsWith('http')) {
                url = new URL(`${this.baseUrl}${endpoint}`);
            } else {
                // Utilise l'origine actuelle (localhost:5173 en dev)
                // baseUrl peut être vide ou '/'
                const base = window.location.origin + (this.baseUrl || '');
                // endpoint commence par /, donc on fait attention aux doubles slashes
                const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
                url = new URL(cleanEndpoint, base);
            }
            console.log(`API Call: ${url.toString()}`);
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });

            console.log(`API GET: ${url.toString()}`);
            const response = await fetch(url.toString());

            if (!response.ok) {
                // Tenter de lire le message d'erreur JSON si disponible
                let errorMessage = `Erreur API (${response.status}): ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = `Erreur API: ${JSON.stringify(errorData.detail)}`;
                } catch (e) {
                    // Ignorer si pas de JSON
                }
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.error(`API GET Error for ${endpoint}:`, error);
            throw error;
        }
    }

    // --- ARTICLES (BLOG/ACTUALITÉS) ---
    async getArticles(category = null, limit = null, preview = false) {
        return this.get('/api/articles', { category, limit, preview });
    }

    async getArticle(slug, preview = false) {
        return this.get(`/api/articles/${slug}`, { preview });
    }

    // --- BOUTIQUE ---
    async getProducts(category = null, inStock = null, preview = false) {
        return this.get('/api/boutique', { category, in_stock: inStock, preview });
    }

    async getProduct(productId, preview = false) {
        return this.get(`/api/boutique/${productId}`, { preview });
    }

    // --- ÉVÉNEMENTS ---
    async getEvents(category = null, limit = null, preview = false) {
        return this.get('/api/events', { category, limit, preview });
    }

    async getUpcomingEvents(limit = 5, preview = false) {
        return this.get('/api/events/upcoming', { limit, preview });
    }

    async getEvent(eventId, preview = false) {
        return this.get(`/api/events/${eventId}`, { preview });
    }

    // --- INFOS ÉGLISE ---
    async getChurchInfo() {
        return this.get('/api/church-info');
    }

    // --- GROUPES DE MAISON ---
    async getHomeGroups(frequency = null, preview = false) {
        return this.get('/api/home-groups', { frequency, preview });
    }

    // --- ÉQUIPE PASTORALE ---
    async getTeamMembers(role = null, preview = false) {
        return this.get('/api/pastoral-team', { role, preview });
    }

    // --- CULTES / SERVICES ---
    async getServices(lang = null, serviceType = null, preview = false) {
        return this.get('/api/services', { lang, service_type: serviceType, preview });
    }

    // --- VISION ---
    async getVision(preview = false) {
        return this.get('/api/vision', { preview });
    }

    // --- SYSTEM ---
    async getHealth() {
        return this.get('/api/health');
    }
}

export const api = new ApiService();
