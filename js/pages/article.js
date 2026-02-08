export function article() {
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
            <span class="px-2 py-1 rounded-full border border-rule">Essai</span>
            <span>•</span>
            <span>Culture</span>
            <span>•</span>
            <span>Dimanche 8 février 2026</span>
          </div>

          <h1 class="mt-4 text-4xl md:text-6xl font-black leading-[1.03] font-serif tracking-tight text-ink">
            Pourquoi le style “journal” revient en force dans le web design
          </h1>

          <p class="mt-5 text-lg md:text-xl text-black/75 font-serif leading-relaxed">
            Une mise en page inspirée de la presse : typographie serif, colonnes, règles fines,
            respiration et hiérarchie forte. Le résultat : un site qui se lit comme un magazine.
          </p>

          <!-- Author line -->
          <div class="mt-6 flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-[linear-gradient(135deg,rgba(0,0,0,.08),rgba(124,58,237,.15))] border border-rule"></div>
            <div>
              <div class="font-bold">Par Jeanne Martin</div>
              <div class="text-sm text-black/60">12 min de lecture • Mis à jour à 10:45</div>
            </div>
          </div>
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="rounded-3xl overflow-hidden border border-rule shadow-soft">
            <div class="aspect-[16/9] bg-[linear-gradient(135deg,rgba(124,58,237,.20),rgba(0,0,0,.08))] relative">
                 <div class="absolute inset-0 flex items-center justify-center text-punch opacity-20 font-serif text-4xl italic">
                    Visuel Hero
                 </div>
            </div>
          </div>
          <p class="mt-3 text-xs text-black/55">
            Photo : Exemple de visuel hero. Ajoute ici une légende.
          </p>
        </section>

        <!-- Article grid -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Article body -->
          <article class="lg:col-span-8">
            <div class="prose prose-lg max-w-none">
              <!-- Content placeholder -->
            </div>

            <!-- Paragraphs -->
            <div class="space-y-6 text-lg leading-relaxed text-black/80 font-serif">
              <p>
                <span class="float-left mr-3 mt-2 text-6xl font-black text-ink leading-none">
                  L
                </span>
                e web moderne est souvent dominé par des interfaces minimalistes, rapides,
                orientées conversion. Pourtant, un mouvement inverse se dessine :
                le retour des mises en page “papier”, qui privilégient la lecture.
              </p>

              <p>
                Dans un contexte où l’attention est fragmentée, le design type journal agit
                comme une promesse : “ici, tu peux prendre ton temps”.
                C’est une esthétique, mais aussi une philosophie.
              </p>

              <div class="border-l-4 border-punch pl-6 py-2 bg-haze rounded-xl my-8">
                <p class="text-xl font-semibold text-black/80 font-serif italic">
                  “Un bon article se lit comme une conversation lente : il faut de l’air,
                  des pauses, et une hiérarchie claire.”
                </p>
                <p class="mt-2 text-sm text-black/60 font-sans font-bold tracking-wide uppercase">
                  — Citation éditoriale
                </p>
              </div>

              <h2 class="text-2xl md:text-3xl font-black text-ink font-serif pt-4">
                1. Le pouvoir de la typographie serif
              </h2>

              <p>
                Les polices serif donnent une sensation d’autorité et de confort.
                Elles évoquent les livres, les journaux, les magazines.
                Sur écran, elles fonctionnent très bien si la taille est généreuse.
              </p>

              <p>
                La clé est de mélanger serif et sans-serif : la serif pour la narration,
                la sans-serif pour la structure (menu, tags, boutons).
              </p>

              <!-- Inline image -->
              <figure class="mt-8 mb-8">
                <div class="rounded-2xl overflow-hidden border border-rule">
                  <div class="aspect-[3/2] bg-[linear-gradient(135deg,rgba(0,0,0,.10),rgba(124,58,237,.10))]"></div>
                </div>
                <figcaption class="mt-3 text-xs text-black/55 font-sans">
                  Exemple de visuel inséré au milieu d’un article.
                </figcaption>
              </figure>

              <h2 class="text-2xl md:text-3xl font-black text-ink font-serif pt-4">
                2. Les règles fines créent la structure
              </h2>

              <p>
                Dans la presse, les séparateurs sont partout. Sur le web, on peut reproduire cela
                avec des bordures très légères (<span class="font-sans font-semibold">border-rule</span>),
                ce qui donne immédiatement une sensation “éditoriale”.
              </p>

              <div class="rounded-2xl border border-rule p-6 bg-paper shadow-soft my-8">
                <div class="text-xs font-black tracking-widest uppercase text-black/60 font-sans">
                  Encadré
                </div>
                <h3 class="mt-2 text-xl font-black text-ink font-serif">
                  Les 4 ingrédients d’une page magazine
                </h3>
                <ul class="mt-4 space-y-2 text-black/75">
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-punch"></span> Titres en serif</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-punch"></span> Colonnes (grilles)</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-punch"></span> Règles fines (bordures)</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-punch"></span> Beaucoup de blanc (respiration)</li>
                </ul>
              </div>

              <h2 class="text-2xl md:text-3xl font-black text-ink font-serif pt-4">
                3. Le rythme de lecture
              </h2>

              <p>
                Un bon article doit avoir du rythme : paragraphes courts, sous-titres fréquents,
                citations, images, et parfois une liste.
              </p>

              <p>
                L’objectif est simple : donner l’impression qu’on peut lire longtemps,
                sans fatigue.
              </p>
            </div>

            <!-- Tags + Share -->
            <div class="mt-12 border-t border-rule pt-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-black tracking-widest uppercase text-black/50">Tags :</span>
                <a href="#/actu" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                  Design
                </a>
                <a href="#/actu" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                  UI/UX
                </a>
                <a href="#/actu" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                  Web
                </a>
                <a href="#/actu" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                  Culture
                </a>
              </div>

              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  Partager l’article
                </a>
                <a href="#/actu" class="inline-flex justify-center rounded-full px-6 py-3 font-bold border border-rule hover:border-black/30 transition-colors">
                  Lire plus d’essais
                </a>
              </div>
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4 hidden lg:block">
            <div class="sticky top-24 space-y-6">
              <!-- Table of contents -->
              <div class="rounded-2xl border border-rule p-6 bg-haze">
                <div class="text-xs font-black tracking-widest uppercase text-black/60">
                  Sommaire
                </div>
                <div class="mt-4 space-y-3 text-sm font-semibold">
                  <a href="#" class="block hover:text-punch transition-colors">1. Typographie serif</a>
                  <a href="#" class="block hover:text-punch transition-colors">2. Règles fines</a>
                  <a href="#" class="block hover:text-punch transition-colors">3. Rythme de lecture</a>
                </div>
              </div>

              <!-- Related articles -->
              <div class="rounded-2xl border border-rule overflow-hidden">
                <div class="p-5 border-b border-rule bg-paper">
                  <div class="text-xs font-black tracking-widest uppercase text-black/60">
                    Articles liés
                  </div>
                </div>

                <div class="divide-y divide-rule">
                  <a href="#/article" class="block p-5 hover:bg-haze transition-colors group">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                      Critique
                    </div>
                    <div class="mt-2 font-black font-serif text-lg leading-snug">
                      Une interface minimaliste peut-elle être chaleureuse ?
                    </div>
                    <div class="mt-2 text-xs text-black/55">6 min</div>
                  </a>

                  <a href="#/article" class="block p-5 hover:bg-haze transition-colors group">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                      Guide
                    </div>
                    <div class="mt-2 font-black font-serif text-lg leading-snug">
                      Grilles CSS : construire une mise en page “presse”
                    </div>
                    <div class="mt-2 text-xs text-black/55">9 min</div>
                  </a>
                </div>
              </div>

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
