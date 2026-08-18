import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

export async function article() {
  const c = await tAll({
    'article.journal.kicker': 'Le journal de La Rencontre',
    'article.reading_time': 'Temps de lecture estimé : 5 min',
    'article.tags.label': 'Tags :',
    'article.share': 'Partager l’article',
    'article.more': 'Lire plus d’articles',
    'article.related.kicker': 'Articles liés',
    'article.related.title': 'À lire sur le même sujet',
    'article.related.empty': 'Aucun autre article ne partage encore ces tags.',
    'article.related.all': 'Découvrir tous les articles →',
  });
  // Récupérer le slug ou l'ID depuis l'URL (ex: #/article?slug=mon-article ou #/article?id=123)
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const articleSlug = params.get('slug');
  const articleId = params.get('id');

  let article = null;
  let loading = true;
  let error = null;

  const identifier = articleSlug || articleId;

  if (identifier) {
    try {
      // Récupérer l'article par son slug ou ID
      article = await api.getArticle(identifier);

      // Si l'API retourne un tableau (filtre), on prend le premier
      if (Array.isArray(article)) {
        article = article[0];
      }
    } catch (err) {
      console.error("Erreur chargement article:", err);
      error = "Impossible de charger l'article.";
    }
  } else {
    error = "Article non spécifié.";
  }

  loading = false;

  // --- GESTION DES ÉTATS (Loading / Error) ---
  if (loading) {
    return `
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement de l'article...</div>
            </div>
        </div>`;
  }

  if (error || !article) {
    return `
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${error || "Article introuvable."}</p>
            <a href="#/journal" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour au journal
            </a>
        </div>`;
  }

  // --- RENDU DE L'ARTICLE ---
  const parseTags = value => (Array.isArray(value) ? value : String(value || '').split(','))
    .map(tag => String(tag).trim())
    .filter(Boolean);
  const articleTags = parseTags(article.tags);
  const normalizedArticleTags = articleTags.map(tag => tag.toLocaleLowerCase('fr'));
  let relatedArticles = [];

  if (articleTags.length > 0) {
    try {
      const relatedResponse = await api.getArticles(null, null, false, articleTags[0]);
      const candidates = Array.isArray(relatedResponse)
        ? relatedResponse
        : (relatedResponse?.articles || []);

      relatedArticles = candidates
        .filter(candidate => String(candidate.id) !== String(article.id) && candidate.slug !== article.slug)
        .map(candidate => ({
          ...candidate,
          sharedTagCount: parseTags(candidate.tags).filter(tag =>
            normalizedArticleTags.includes(tag.toLocaleLowerCase('fr'))
          ).length
        }))
        .filter(candidate => candidate.sharedTagCount > 0)
        .sort((a, b) => b.sharedTagCount - a.sharedTagCount)
        .slice(0, 3);
    } catch (relatedError) {
      console.warn('Articles liés indisponibles.', relatedError);
    }
  }

  const date = new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const image = article.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80';

  // Préparer le contenu HTML en échappant les backticks
  const rawContent = article.content_html || article.content || '<p>Contenu non disponible.</p>';
  const safeContent = rawContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `
    <div class="elr-page font-sans">
      
      <!-- Journal Header (Sub-header for the Blog section) -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-[1500px] px-5 py-7 md:px-10">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/journal" class="text-center md:text-left group">
              <div class="text-[10px] font-black uppercase tracking-[0.28em] text-black/40">${c['article.journal.kicker']}</div>
              <div class="mt-2 flex items-baseline justify-center gap-2 md:justify-start">
                <span class="font-display text-4xl font-extrabold leading-none tracking-[-0.05em] transition-colors group-hover:text-punch md:text-5xl">ELR</span>
                <span class="font-serif text-4xl font-semibold italic leading-none text-punch md:text-5xl">Actu</span>
              </div>
            </a>

          </div>
        </div>
      </header>

      <!-- Article layout -->
      <main class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <!-- Category + Title -->
        <section class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
            <a href="#/journal?category=${encodeURIComponent(article.category || 'Article')}" class="px-2 py-1 rounded-full border border-rule hover:bg-haze hover:border-black/30 transition-colors">${article.category || 'Article'}</a>
            <span>•</span>
            <span class="capitalize">${date}</span>
          </div>

          <h1 class="mt-6 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.055em] text-ink md:text-8xl">
            ${article.title}
          </h1>

          <p class="mt-7 font-serif text-xl italic leading-relaxed text-black/60 md:text-2xl">
            ${article.excerpt || ''}
          </p>

          <!-- Author line -->
          <div class="mt-6 flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-cover bg-center border border-rule" style="background-image: url('https://ui-avatars.com/api/?name=${article.author || 'Admin'}&background=random')"></div>
            <div>
              <div class="font-bold">Par ${article.author || 'La Rédaction'}</div>
              <div class="text-sm text-black/60">${c['article.reading_time']}</div>
            </div>
          </div>
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="overflow-hidden rounded-[2rem] border border-rule shadow-soft md:rounded-[3rem]">
            <div class="aspect-[16/9] relative bg-gray-100">
                 <img src="${image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
          <p class="mt-3 text-xs text-black/55">
            ${article.title}
          </p>
        </section>

        <!-- Article grid -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Article body -->
          <article class="lg:col-span-8">
            <div id="article-content" class="article-reading-surface">
               ${safeContent}
            </div>

            <!-- Tags + Share -->
            <div class="mt-12 border-t border-rule pt-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-black tracking-widest uppercase text-black/50">${c['article.tags.label']}</span>
                ${(articleTags.length ? articleTags : ['Journal', 'Église']).map(tag => `
                    <a href="#/journal?tag=${encodeURIComponent(String(tag).trim())}" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                      ${tag.trim()}
                    </a>
                `).join('')}
              </div>

              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <button onclick="navigator.share({title: '${article.title}', url: window.location.href})" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  ${c['article.share']}
                </button>
                <a href="#/journal" class="inline-flex justify-center rounded-full px-6 py-3 font-bold border border-rule hover:border-black/30 transition-colors">
                  ${c['article.more']}
                </a>
              </div>
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <div class="rounded-[2rem] border border-rule bg-white/70 p-5 shadow-soft md:p-6">
                <div class="text-xs font-black uppercase tracking-[0.2em] text-black/45">${c['article.related.kicker']}</div>
                <h2 class="mt-3 font-serif text-3xl font-bold leading-[1.08] tracking-[-0.025em]">${c['article.related.title']}</h2>
                <div class="mt-6 divide-y divide-rule">
                  ${relatedArticles.length ? relatedArticles.map(related => `
                    <a href="#/article?${related.slug ? `slug=${encodeURIComponent(related.slug)}` : `id=${encodeURIComponent(related.id)}`}" class="group grid grid-cols-[84px_1fr] gap-4 py-4 first:pt-0 last:pb-0">
                      <div class="aspect-square overflow-hidden rounded-xl bg-haze">
                        <img src="${related.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=300&q=75'}" alt="" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                      </div>
                      <div class="min-w-0 self-center">
                        <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${parseTags(related.tags).filter(tag => normalizedArticleTags.includes(tag.toLocaleLowerCase('fr'))).slice(0, 2).join(' · ')}</p>
                        <h3 class="mt-1 line-clamp-3 font-display text-base font-extrabold leading-snug transition-colors group-hover:text-punch">${related.title}</h3>
                      </div>
                    </a>
                  `).join('') : `
                    <p class="py-3 font-serif text-base italic leading-relaxed text-black/55">${c['article.related.empty']}</p>
                    <a href="#/journal" class="mt-3 inline-flex text-sm font-black text-punch hover:underline">${c['article.related.all']}</a>
                  `}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
    `;
}
