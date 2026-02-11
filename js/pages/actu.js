import { api } from '../services/api.service.js';

export async function actu() {
    let articles = [];
    try {
        const response = await api.getArticles();
        if (response && Array.isArray(response.articles)) {
            articles = response.articles;
        } else if (Array.isArray(response)) {
            articles = response;
        }
    } catch (error) {
        console.error("Erreur chargement articles:", error);
    }

    // Fonction utilitaire pour le rendu d'une carte article
    const renderArticleCard = (article, type = 'standard') => {
        // Fallback image
        const image = article.image || 'https://images.unsplash.com/photo-1493612276216-9c782cb70dad?auto=format&fit=crop&q=80&w=1000';
        const date = new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        const category = article.category || 'Actualité';

        if (type === 'hero') {
            return `
            <article class="lg:col-span-8">
                <a href="#/article?id=${article.id}" class="group block">
                    <div class="rounded-2xl overflow-hidden shadow-soft border border-rule">
                        <div class="aspect-[16/9] relative overflow-hidden">
                             <img src="${image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        </div>
                    </div>

                    <div class="mt-5">
                        <div class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
                            <span class="px-2 py-1 rounded-full border border-rule">À la une</span>
                            <span>•</span>
                            <span>${category}</span>
                        </div>

                        <h1 class="mt-3 font-black tracking-tight leading-[1.05] text-3xl md:text-5xl font-serif group-hover:text-punch transition-colors">
                            ${article.title}
                        </h1>

                        <p class="mt-3 text-black/75 text-base md:text-lg max-w-3xl line-clamp-3">
                            ${article.excerpt || article.content?.substring(0, 150) + '...'}
                        </p>

                        <div class="mt-4 flex items-center gap-3 text-sm text-black/60">
                            <span class="font-semibold text-black/70">Par ${article.author || 'La Rédaction'}</span>
                            <span class="text-black/30">•</span>
                            <span>${date}</span>
                        </div>
                    </div>
                </a>
            </article>`;
        }

        if (type === 'sidebar') {
            return `
            <a href="#/article?id=${article.id}" class="block p-4 bg-paper hover:bg-haze transition-colors group">
                <div class="text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-punch transition-colors">${category}</div>
                <div class="mt-1 font-black leading-snug line-clamp-2">
                    ${article.title}
                </div>
                <div class="mt-2 text-xs text-black/55">${date} • Par ${article.author || 'Admin'}</div>
            </a>`;
        }

        if (type === 'grid') {
            return `
            <article class="group">
                <a href="#/article?id=${article.id}" class="block">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">${category}</div>
                    <h3 class="mt-2 font-black text-xl leading-snug font-serif group-hover:text-accent">
                        ${article.title}
                    </h3>
                    <p class="mt-2 text-black/70 line-clamp-2">
                        ${article.excerpt || ''}
                    </p>
                    <div class="mt-3 text-xs text-black/55">${date}</div>
                </a>
                <div class="my-6 h-px bg-rule"></div>
            </article>`;
        }

        return '';
    };

    // Séparer les articles (1 à la une, les autres en liste)
    const featuredArticle = articles[0];
    const sidebarArticles = articles.slice(1, 4); // 3 articles pour la sidebar
    const gridArticles = articles.slice(4); // Le reste

    const featuredHtml = featuredArticle ? renderArticleCard(featuredArticle, 'hero') : '<p>Aucun article à la une.</p>';
    const sidebarHtml = sidebarArticles.map(a => renderArticleCard(a, 'sidebar')).join('');
    // Pour l'exemple, on affiche les autres en colonne simple
    const gridHtml = gridArticles.map(a => renderArticleCard(a, 'grid')).join('');

    return `
    <div class="bg-paper text-ink">
        <!-- Masthead -->
        <header class="border-b border-rule">
            <div class="mx-auto max-w-7xl px-4 py-6">
                <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div class="text-center md:text-left">
                        <div class="font-black tracking-tight text-4xl md:text-6xl leading-none">
                            LE JOURNAL
                        </div>
                        <div class="mt-2 text-sm text-black/70">
                            Culture • Musique • Société — une mise en page “magazine”
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Body -->
        <main class="mx-auto max-w-7xl px-4 py-10">
            <!-- HERO GRID -->
            <section class="grid gap-8 lg:grid-cols-12">
                <!-- Main feature -->
                ${featuredHtml}

                <!-- Sidebar: trending / picks -->
                <aside class="lg:col-span-4">
                    <div class="sticky top-6">
                        <div class="flex items-end justify-between">
                            <h2 class="text-sm font-black tracking-widest uppercase text-black/60">À lire</h2>
                        </div>

                        <div class="mt-4 divide-y divide-rule border border-rule rounded-2xl overflow-hidden">
                            ${sidebarHtml || '<div class="p-4 text-sm text-gray-500">Pas d\'autres articles récents.</div>'}
                        </div>

                        <!-- Mini ad / promo -->
                        <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                            <div class="text-xs font-black tracking-widest uppercase text-black/60">Dossier</div>
                            <div class="mt-2 font-black text-lg leading-snug font-serif">
                                “Web & Foi” : quand le design sert un message
                            </div>
                            <a href="#/vision"
                                class="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90">
                                Découvrir
                            </a>
                        </div>
                    </div>
                </aside>
            </section>

            <!-- Latest Articles Grid -->
            <section id="latest" class="mt-12">
                 <div class="flex items-end justify-between gap-6 mb-8">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-black font-serif">Dernières publications</h2>
                    </div>
                </div>
                
                <div class="lg:col-span-4">
                     <div class="border-t border-rule pt-6">
                        ${gridHtml}
                     </div>
                </div>
            </section>
        </main>
    </div>
    `;
}
