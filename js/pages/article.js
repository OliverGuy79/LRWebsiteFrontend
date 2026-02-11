import { api } from '../services/api.service.js';

export async function article() {
  // 1. Récupérer l'ID depuis l'URL (ex: #/article?id=123)
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const articleId = params.get('id');

  let article = null;
  let loading = true;
  let error = null;

  if (articleId) {
    try {
      // On essaie de récupérer l'article par son ID
      // Si l'API attend un slug mais qu'on a un ID, on peut devoir adapter si nécessaire.
      // Pour l'instant on suppose que l'endpoint accepte l'ID.
      article = await api.getArticle(articleId);

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
            <a href="#/actu" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour au journal
            </a>
        </div>`;
  }

  // --- RENDU DE L'ARTICLE ---
  const date = new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const image = article.image || 'https://images.unsplash.com/photo-1493612276216-9c782cb70dad?auto=format&fit=crop&q=80&w=1000';

  // Contenu : on utilise content ou une description si content est vide
  const contentHtml = article.content ? article.content.replace(/\n/g, '<br>') : '<p>Contenu non disponible.</p>';

  return `
    <div class="bg-paper text-ink font-sans">
      
      <!-- Journal Header (Sub-header for the Blog section) -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-6xl px-4 py-6">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/actu" class="text-center md:text-left group">
              <div class="font-black tracking-tight text-4xl md:text-5xl leading-none group-hover:text-punch transition-colors">
                LE JOURNAL
              </div>
              <div class="mt-1 text-sm text-black/70">
                Une mise en page magazine
              </div>
            </a>

            <div class="flex items-center justify-center md:justify-end gap-2">
              <a class="rounded-full px-4 py-2 text-sm font-bold border border-rule hover:border-black/30 transition-colors" href="#/actu">
                Retour
              </a>
              <a class="rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90 transition-opacity" href="#/contact">
                S’abonner
              </a>
            </div>
          </div>
        </div>

        <nav class="border-t border-rule">
          <div class="mx-auto max-w-6xl px-4">
            <div class="flex gap-6 overflow-x-auto py-3 text-sm font-semibold whitespace-nowrap">
              <a class="hover:text-punch transition-colors" href="#/actu">Actualités</a>
              <a class="hover:text-punch transition-colors" href="#/actu">Critiques</a>
              <a class="hover:text-punch transition-colors" href="#/actu">Interviews</a>
              <a class="hover:text-punch transition-colors" href="#/actu">Essais</a>
              <a class="hover:text-punch transition-colors" href="#/actu">Guides</a>
            </div>
          </div>
        </nav>
      </header>

      <!-- Article layout -->
      <main class="mx-auto max-w-6xl px-4 py-10">
        <!-- Category + Title -->
        <section class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
            <span class="px-2 py-1 rounded-full border border-rule">${article.category || 'Article'}</span>
            <span>•</span>
            <span class="capitalize">${date}</span>
          </div>

          <h1 class="mt-4 text-4xl md:text-6xl font-black leading-[1.03] font-serif tracking-tight text-ink">
            ${article.title}
          </h1>

          <p class="mt-5 text-lg md:text-xl text-black/75 font-serif leading-relaxed">
            ${article.excerpt || ''}
          </p>

          <!-- Author line -->
          <div class="mt-6 flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-cover bg-center border border-rule" style="background-image: url('https://ui-avatars.com/api/?name=${article.author || 'Admin'}&background=random')"></div>
            <div>
              <div class="font-bold">Par ${article.author || 'La Rédaction'}</div>
              <div class="text-sm text-black/60">Temps de lecture estimé : 5 min</div>
            </div>
          </div>
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="rounded-3xl overflow-hidden border border-rule shadow-soft">
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
            <div class="prose prose-lg max-w-none text-lg leading-relaxed text-black/80 font-serif">
               ${contentHtml}
            </div>

            <!-- Tags + Share -->
            <div class="mt-12 border-t border-rule pt-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-black tracking-widest uppercase text-black/50">Tags :</span>
                ${(article.tags || 'Journal,Église').split(',').map(tag => `
                    <a href="#/actu" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                      ${tag.trim()}
                    </a>
                `).join('')}
              </div>

              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <button onclick="navigator.share({title: '${article.title}', url: window.location.href})" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  Partager l’article
                </button>
                <a href="#/actu" class="inline-flex justify-center rounded-full px-6 py-3 font-bold border border-rule hover:border-black/30 transition-colors">
                  Lire plus d’essais
                </a>
              </div>
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4 hidden lg:block">
            <div class="sticky top-24 space-y-6">
              
              <!-- Promo box -->
              <div class="rounded-2xl border border-rule p-6 bg-paper shadow-soft">
                <div class="text-xs font-black tracking-widest uppercase text-black/60">
                  Dossier spécial
                </div>
                <div class="mt-2 font-black text-xl font-serif leading-snug">
                  “Web & Foi” : quand le design sert un message
                </div>
                <p class="mt-2 text-sm text-black/70">
                  Découvrir comment L'Église La Rencontre utilise le digital.
                </p>
                <a class="mt-4 inline-flex rounded-full px-5 py-2.5 font-bold bg-ink text-paper hover:opacity-90 transition-opacity" href="#/vision">
                  Explorer
                </a>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
    `;
}
