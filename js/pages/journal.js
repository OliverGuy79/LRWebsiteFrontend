import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

export async function journal() {
    const c = await tAll({
        'journal.kicker': 'Le journal de La Rencontre',
        'journal.subtitle': 'Histoires, nouvelles et témoignages de la vie de l’église.',
        'journal.latest.title': 'Dernières publications',
        'journal.latest.subtitle': 'Retrouvez tous nos articles et actualités.',
        'journal.filter.label': 'Filtre actif',
        'journal.filter.clear': 'Afficher tous les articles ×',
        'journal.empty.title': 'Aucune publication trouvée',
        'journal.empty.text': 'Aucun article ne correspond à ce filtre pour le moment.',
        'journal.empty.button': 'Voir tous les articles',
        'journal.read': 'À lire',
        'journal.discover': 'À découvrir',
        'journal.now': 'En ce moment',
    });
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const activeCategory = (params.get('category') || '').trim();
    const activeTag = (params.get('tag') || '').trim();
    let articles = [];
    try {
        const response = await api.getArticles(activeCategory || null, null, false, activeTag || null);
        if (response && Array.isArray(response.articles)) {
            articles = response.articles;
        } else if (Array.isArray(response)) {
            articles = response;
        }

        // Certains environnements de l'API ignorent encore les paramètres de
        // filtre. Ce second contrôle garantit le même résultat côté interface.
        if (activeCategory) {
            articles = articles.filter(article =>
                String(article.category || '').localeCompare(activeCategory, 'fr', { sensitivity: 'base' }) === 0
            );
        }
        if (activeTag) {
            articles = articles.filter(article => {
                const tags = Array.isArray(article.tags)
                    ? article.tags
                    : String(article.tags || '').split(',');
                return tags.some(tag =>
                    String(tag).trim().localeCompare(activeTag, 'fr', { sensitivity: 'base' }) === 0
                );
            });
        }
    } catch (error) {
        console.error("Erreur chargement articles:", error);
    }

    // Fonction utilitaire pour formater la date
    const formatDate = (dateStr) => {
        return new Date(dateStr || Date.now()).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fonction pour obtenir l'image
    const getImage = (article) => {
        return article.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80';
    };

    // En vue filtrée, tous les résultats doivent apparaître dans la section
    // des publications. La une et la sélection latérale restent réservées à
    // la vue générale du journal.
    const isFiltered = Boolean(activeCategory || activeTag);
    const featuredArticle = isFiltered ? null : articles[0];
    const sidebarArticles = isFiltered ? [] : articles.slice(1, 5);
    const columnAArticles = isFiltered ? articles.slice(0, 3) : articles.slice(5, 8);
    const columnBArticles = isFiltered ? articles.slice(3, 5) : articles.slice(8, 10);
    const columnCArticles = isFiltered ? articles.slice(5, 8) : articles.slice(10, 13);
    const listArticles = isFiltered ? articles.slice(8) : articles.slice(13, 16);

    // Rendu de l'article à la une
    const renderFeatured = () => {
        if (!featuredArticle) return '<p class="lg:col-span-8 text-center py-10">Aucun article à la une.</p>';

        return `
        <article class="lg:col-span-8">
            <a href="#/article?slug=${featuredArticle.slug || featuredArticle.id}" class="group block">
                <div class="rounded-2xl overflow-hidden shadow-soft border border-rule">
                    <div class="aspect-[16/9] relative overflow-hidden">
                        <img src="${getImage(featuredArticle)}" alt="${featuredArticle.title}"
                             class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                </div>

                <div class="mt-5">
                    <div class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
                        <span class="px-2 py-1 rounded-full border border-rule">À la une</span>
                        <span>•</span>
                        <span>${featuredArticle.category || 'Actualité'}</span>
                    </div>

                    <h1 class="mt-3 font-black tracking-tight leading-[1.05] text-3xl md:text-5xl font-serif group-hover:text-punch transition-colors">
                        ${featuredArticle.title}
                    </h1>

                    <p class="mt-3 text-black/75 text-base md:text-lg max-w-3xl line-clamp-3">
                        ${featuredArticle.excerpt || ''}
                    </p>

                    <div class="mt-4 flex items-center gap-3 text-sm text-black/60">
                        <span class="font-semibold text-black/70">Par ${featuredArticle.author || 'La Rédaction'}</span>
                        <span class="text-black/30">•</span>
                        <span>${formatDate(featuredArticle.published_at)}</span>
                    </div>
                </div>
            </a>
        </article>`;
    };

    // Rendu des articles sidebar
    const renderSidebar = () => {
        if (sidebarArticles.length === 0) {
            return '<div class="p-4 text-sm text-gray-500">Pas d\'autres articles récents.</div>';
        }

        return sidebarArticles.map(article => `
            <a href="#/article?slug=${article.slug || article.id}" class="block p-4 bg-paper hover:bg-haze transition-colors group">
                <div class="text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-punch transition-colors">
                    ${article.category || 'Actualité'}
                </div>
                <div class="mt-1 font-black leading-snug line-clamp-2">
                    ${article.title}
                </div>
                <div class="mt-2 text-xs text-black/55">${formatDate(article.published_at)} • Par ${article.author || 'Admin'}</div>
            </a>
        `).join('');
    };

    // Rendu des articles en colonne A (liste simple)
    const renderColumnA = () => {
        if (columnAArticles.length === 0) return '';

        return columnAArticles.map((article, index) => `
            <article class="group">
                <a href="#/article?slug=${article.slug || article.id}" class="block">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                        ${article.category || 'Actualité'}
                    </div>
                    <h3 class="mt-2 font-black text-xl leading-snug font-serif">
                        ${article.title}
                    </h3>
                    <p class="mt-2 text-black/70 line-clamp-2">
                        ${article.excerpt || ''}
                    </p>
                    <div class="mt-3 text-xs text-black/55">${formatDate(article.published_at)}</div>
                </a>
            </article>
            ${index < columnAArticles.length - 1 ? '<div class="my-6 h-px bg-rule"></div>' : ''}
        `).join('');
    };

    // Rendu des articles en colonne B (avec images)
    const renderColumnB = () => {
        if (columnBArticles.length === 0) return '';

        return columnBArticles.map(article => `
            <article class="group rounded-2xl overflow-hidden border border-rule bg-paper hover:bg-haze transition-colors">
                <a href="#/article?slug=${article.slug || article.id}" class="block">
                    <div class="aspect-[16/9] relative overflow-hidden">
                        <img src="${getImage(article)}" alt="${article.title}"
                             class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    </div>
                    <div class="p-5">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${article.category || 'Actualité'}
                        </div>
                        <h3 class="mt-2 font-black text-2xl leading-snug font-serif">
                            ${article.title}
                        </h3>
                        <p class="mt-2 text-black/70 line-clamp-2">
                            ${article.excerpt || ''}
                        </p>
                        <div class="mt-3 text-xs text-black/55">${formatDate(article.published_at)}</div>
                    </div>
                </a>
            </article>
        `).join('');
    };

    // Rendu des articles en colonne C (reviews)
    const renderColumnC = () => {
        if (columnCArticles.length === 0) return '';

        return columnCArticles.map(article => `
            <a href="#/article?slug=${article.slug || article.id}" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors group">
                <div class="flex items-start gap-3">
                    <div class="h-14 w-14 rounded-xl overflow-hidden border border-rule flex-shrink-0">
                        <img src="${getImage(article)}" alt="${article.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${article.category || 'Actualité'}
                        </div>
                        <div class="mt-1 font-black leading-snug font-serif line-clamp-2">
                            ${article.title}
                        </div>
                        <div class="mt-2 text-xs text-black/55">${formatDate(article.published_at)}</div>
                    </div>
                </div>
            </a>
        `).join('');
    };

    // Rendu de la liste "En ce moment"
    const renderList = () => {
        if (listArticles.length === 0) return '';

        return listArticles.map(article => `
            <a href="#/article?slug=${article.slug || article.id}" class="block py-5 pr-0 lg:pr-8 hover:bg-haze transition-colors group">
                <div class="flex items-start gap-5">
                    <div class="hidden sm:block h-20 w-20 rounded-xl overflow-hidden border border-rule flex-shrink-0">
                        <img src="${getImage(article)}" alt="${article.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${article.category || 'Actualité'}
                        </div>
                        <div class="mt-2 font-black text-2xl leading-snug font-serif">
                            ${article.title}
                        </div>
                        <p class="mt-2 text-black/70 line-clamp-2">
                            ${article.excerpt || ''}
                        </p>
                        <div class="mt-3 text-xs text-black/55">Par ${article.author || 'La Rédaction'} • ${formatDate(article.published_at)}</div>
                    </div>
                </div>
            </a>
        `).join('');
    };

    // Date du jour en français
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return `
    <div class="elr-page">
      <!-- Top utility bar -->
      <div class="border-b border-rule">
        <div class="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-xs text-black/70">
          <div class="flex items-center gap-3">
            <span class="font-semibold capitalize">${today}</span>
          </div>
          <div class="flex items-center gap-3">
            <a class="hover:text-punch transition-colors" href="#/contact">Contact</a>
          </div>
        </div>
      </div>

      <!-- Masthead -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div class="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <a href="#/journal" class="group text-center md:text-left">
              <div class="text-[10px] font-black uppercase tracking-[0.32em] text-black/40">${c['journal.kicker']}</div>
              <div class="mt-3 flex items-baseline justify-center gap-3 md:justify-start">
                <span class="font-display text-5xl font-extrabold leading-none tracking-[-0.06em] transition-colors group-hover:text-punch md:text-8xl">ELR</span>
                <span class="font-serif text-5xl font-semibold italic leading-none text-punch md:text-8xl">Actu</span>
              </div>
              <div class="mt-4 max-w-xl font-serif text-base italic text-black/55 md:text-lg">
                ${c['journal.subtitle']}
              </div>
            </a>

            <div class="flex items-center justify-center md:justify-end gap-2">
              <a class="rounded-full px-4 py-2 text-sm font-bold border border-rule hover:border-black/30 transition-colors" href="#latest">
                Dernières
              </a>
              <a class="rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90 transition-opacity" href="#/contact">
                Contact
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation -->
      </header>

      <!-- Body -->
      <main class="mx-auto max-w-7xl px-4 py-10">
        ${activeCategory || activeTag ? `
        <div class="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-rule bg-haze px-5 py-4">
          <span class="text-xs font-black uppercase tracking-[0.16em] text-black/45">${c['journal.filter.label']}</span>
          <span class="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
            ${activeTag ? `#${activeTag}` : activeCategory}
          </span>
          <a href="#/journal" class="ml-auto text-sm font-bold text-punch hover:underline">${c['journal.filter.clear']}</a>
        </div>` : ''}
        ${!isFiltered ? `
        <!-- HERO GRID -->
        <section class="grid gap-8 lg:grid-cols-12">
          ${renderFeatured()}

          <!-- Sidebar: trending / picks -->
          <aside class="lg:col-span-4">
            <div class="sticky top-6">
              <div class="flex items-end justify-between">
                <h2 class="text-sm font-black tracking-widest uppercase text-black/60">${c['journal.read']}</h2>
              </div>

              <div class="mt-4 divide-y divide-rule border border-rule rounded-2xl overflow-hidden">
                ${renderSidebar()}
              </div>

              <!-- Mini ad / promo -->
              <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                <div class="text-xs font-black tracking-widest uppercase text-black/60">Notre vision</div>
                <div class="mt-2 font-black text-lg leading-snug font-serif">
                  Découvrez la vision de l'Église La Rencontre
                </div>
                <a href="#/vision" class="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  Découvrir
                </a>
              </div>
            </div>
          </aside>
        </section>
        ` : ''}

        <!-- Three-column strip -->
        <section id="latest" class="mt-12">
          <div class="flex items-end justify-between gap-6">
            <div>
              <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">${c['journal.latest.title']}</h2>
              <p class="mt-2 text-black/70">${c['journal.latest.subtitle']}</p>
            </div>
          </div>

          <div class="mt-8 grid gap-8 lg:grid-cols-12">
            ${articles.length === 0 ? `
            <div class="rounded-3xl border border-rule bg-haze px-6 py-16 text-center lg:col-span-12">
              <h3 class="font-display text-3xl font-extrabold">${c['journal.empty.title']}</h3>
              <p class="mt-3 text-black/60">${c['journal.empty.text']}</p>
              <a href="#/journal" class="mt-6 inline-flex rounded-full bg-ink px-5 py-3 font-bold text-white">${c['journal.empty.button']}</a>
            </div>` : ''}
            <!-- Column A -->
            <div class="lg:col-span-4">
              <div class="border-t border-rule pt-6">
                ${renderColumnA()}
              </div>
            </div>

            <!-- Column B (with image cards) -->
            <div class="lg:col-span-5">
              <div class="border-t border-rule pt-6">
                <div class="grid gap-6">
                  ${renderColumnB()}
                </div>
              </div>
            </div>

            <!-- Column C (reviews box) -->
            <div class="lg:col-span-3">
              <div class="border-t border-rule pt-6">
                <div class="flex items-end justify-between">
                  <h3 class="text-sm font-black tracking-widest uppercase text-black/60">${c['journal.discover']}</h3>
                </div>

                <div class="mt-4 space-y-4">
                  ${renderColumnC()}
                </div>

                <!-- Subscribe -->
                <div class="mt-8 rounded-2xl border border-rule p-5 bg-ink text-paper">
                  <div class="text-xs font-black tracking-widest uppercase text-paper/70">Newsletter</div>
                  <div class="mt-2 font-black text-lg font-serif leading-snug">
                    Restez informé
                  </div>

                  <p class="mt-2 text-sm text-paper/70">
                    Recevez nos actualités directement dans votre boîte mail.
                  </p>

                  <a href="#/contact" class="mt-4 inline-flex rounded-xl px-4 py-3 font-bold bg-paper text-ink hover:opacity-90 transition-opacity">
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Simple list section -->
        ${listArticles.length > 0 ? `
        <section class="mt-14">
          <div class="flex items-end justify-between gap-6">
            <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">${c['journal.now']}</h2>
          </div>

          <div class="mt-6 border-t border-rule">
            <div class="grid gap-0 lg:grid-cols-12">
              <!-- left list -->
              <div class="lg:col-span-8 border-r border-rule">
                <div class="divide-y divide-rule">
                  ${renderList()}
                </div>
              </div>

              <!-- right rail -->
              <div class="lg:col-span-4">
                <div class="py-6 lg:pl-8">
                  <div class="text-xs font-black tracking-widest uppercase text-black/60">Prochains événements</div>
                  <div class="mt-3 space-y-3">
                    <a href="#/contact" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors">
                      <div class="font-black">Dimanche • 10:00</div>
                      <div class="text-black/70">Culte du dimanche</div>
                    </a>
                    <a href="#/home-groups" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors">
                      <div class="font-black">En semaine</div>
                      <div class="text-black/70">Groupes de maison</div>
                    </a>
                  </div>

                  <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                    <div class="text-xs font-black tracking-widest uppercase text-black/60">Nous rejoindre</div>
                    <p class="mt-2 text-black/70">
                      L'Église La Rencontre vous accueille tous les dimanches pour le culte.
                    </p>
                    <a href="#/contact" class="mt-3 inline-flex text-sm font-bold text-punch hover:opacity-80 transition-opacity">
                      Voir les horaires →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        ` : ''}
      </main>
    </div>
    `;
}
