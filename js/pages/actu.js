export function actu() {
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
                <article class="lg:col-span-8">
                    <a href="#/article" class="group block">
                        <div class="rounded-2xl overflow-hidden shadow-soft border border-rule">
                            <div
                                class="aspect-[16/9] bg-[linear-gradient(135deg,rgba(124,58,237,.18),rgba(0,0,0,.06))]">
                            </div>
                        </div>

                        <div class="mt-5">
                            <div
                                class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
                                <span class="px-2 py-1 rounded-full border border-rule">À la une</span>
                                <span>•</span>
                                <span>Interview</span>
                            </div>

                            <h1 class="mt-3 font-black tracking-tight leading-[1.05] text-3xl md:text-5xl font-serif">
                                Le retour des “albums-concepts” : pourquoi ils captivent encore
                            </h1>

                            <p class="mt-3 text-black/75 text-base md:text-lg max-w-3xl">
                                Une maquette typée journal : une grande une, des colonnes, des règles fines,
                                une hiérarchie forte, et une sidebar qui “fait presse”.
                            </p>

                            <div class="mt-4 flex items-center gap-3 text-sm text-black/60">
                                <span class="font-semibold text-black/70">Par Jeanne Martin</span>
                                <span class="text-black/30">•</span>
                                <span>8 min de lecture</span>
                                <span class="text-black/30">•</span>
                                <span>Aujourd’hui</span>
                            </div>
                        </div>
                    </a>
                </article>

                <!-- Sidebar: trending / picks -->
                <aside class="lg:col-span-4">
                    <div class="sticky top-6">
                        <div class="flex items-end justify-between">
                            <h2 class="text-sm font-black tracking-widest uppercase text-black/60">À lire</h2>
                            <a class="text-xs font-bold hover:text-accent" href="#/article">Voir tout</a>
                        </div>

                        <div class="mt-4 divide-y divide-rule border border-rule rounded-2xl overflow-hidden">
                            <a href="#/article" class="block p-4 bg-paper hover:bg-haze">
                                <div class="text-xs font-bold uppercase tracking-widest text-black/60">Critique</div>
                                <div class="mt-1 font-black leading-snug">
                                    10 morceaux qui redéfinissent la pop minimaliste
                                </div>
                                <div class="mt-2 text-xs text-black/55">4 min • Par R. Diallo</div>
                            </a>
                            <a href="#/article" class="block p-4 bg-paper hover:bg-haze">
                                <div class="text-xs font-bold uppercase tracking-widest text-black/60">News</div>
                                <div class="mt-1 font-black leading-snug">
                                    Un festival annonce une scène “zéro plastique” — comment ça marche ?
                                </div>
                                <div class="mt-2 text-xs text-black/55">3 min • Par N. Petit</div>
                            </a>
                            <a href="#/article" class="block p-4 bg-paper hover:bg-haze">
                                <div class="text-xs font-bold uppercase tracking-widest text-black/60">Essai</div>
                                <div class="mt-1 font-black leading-snug">
                                    Le streaming a-t-il tué la “face B” ?
                                </div>
                                <div class="mt-2 text-xs text-black/55">6 min • Par L. Ben</div>
                            </a>
                            <a href="#/article" class="block p-4 bg-paper hover:bg-haze">
                                <div class="text-xs font-bold uppercase tracking-widest text-black/60">Playlist</div>
                                <div class="mt-1 font-black leading-snug">
                                    45 minutes pour écrire, respirer, recommencer
                                </div>
                                <div class="mt-2 text-xs text-black/55">Sélection • Mise à jour</div>
                            </a>
                        </div>

                        <!-- Mini ad / promo -->
                        <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                            <div class="text-xs font-black tracking-widest uppercase text-black/60">Dossier</div>
                            <div class="mt-2 font-black text-lg leading-snug font-serif">
                                “La décennie 2010” — notre série en 12 épisodes
                            </div>
                            <a href="#/article"
                                class="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90">
                                Découvrir
                            </a>
                        </div>
                    </div>
                </aside>
            </section>

            <!-- Three-column strip -->
            <section id="latest" class="mt-12">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-black font-serif">Dernières publications</h2>
                        <p class="mt-2 text-black/70">Disposition en grille avec “règles” fines, comme un vrai journal.
                        </p>
                    </div>
                    <a class="hidden md:inline text-sm font-bold hover:text-accent" href="#/article">Tout voir →</a>
                </div>

                <div class="mt-8 grid gap-8 lg:grid-cols-12">
                    <!-- Column A -->
                    <div class="lg:col-span-4">
                        <div class="border-t border-rule pt-6">
                            <article class="group">
                                <a href="#/article" class="block">
                                    <div class="text-xs font-bold tracking-widest uppercase text-black/60">News</div>
                                    <h3
                                        class="mt-2 font-black text-xl leading-snug font-serif group-hover:text-accent">
                                        La résurgence du vinyle : hype ou retour durable ?
                                    </h3>
                                    <p class="mt-2 text-black/70">
                                        Un format court, très “papier”, qui va droit au point.
                                    </p>
                                    <div class="mt-3 text-xs text-black/55">2 min • 10:15</div>
                                </a>
                            </article>

                            <div class="my-6 h-px bg-rule"></div>

                            <article class="group">
                                <a href="#/article" class="block">
                                    <div class="text-xs font-bold tracking-widest uppercase text-black/60">Interview
                                    </div>
                                    <h3
                                        class="mt-2 font-black text-xl leading-snug font-serif group-hover:text-accent">
                                        “Je compose comme on monte un film”
                                    </h3>
                                    <div class="mt-3 text-xs text-black/55">7 min • 09:40</div>
                                </a>
                            </article>

                            <div class="my-6 h-px bg-rule"></div>

                            <article class="group">
                                <a href="#/article" class="block">
                                    <div class="text-xs font-bold tracking-widest uppercase text-black/60">Essai</div>
                                    <h3
                                        class="mt-2 font-black text-xl leading-snug font-serif group-hover:text-accent">
                                        Le silence, nouvel instrument des producteurs
                                    </h3>
                                    <div class="mt-3 text-xs text-black/55">5 min • 08:55</div>
                                </a>
                            </article>
                        </div>
                    </div>

                    <!-- Column B (with image cards) -->
                    <div class="lg:col-span-5">
                        <div class="border-t border-rule pt-6">
                            <div class="grid gap-6">
                                <article
                                    class="group rounded-2xl overflow-hidden border border-rule bg-paper hover:bg-haze">
                                    <a href="#/article" class="block">
                                        <div
                                            class="aspect-[16/9] bg-[linear-gradient(135deg,rgba(0,0,0,.06),rgba(124,58,237,.12))]">
                                        </div>
                                        <div class="p-5">
                                            <div
                                                class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Critique</div>
                                            <h3
                                                class="mt-2 font-black text-2xl leading-snug font-serif group-hover:text-accent">
                                                Un disque “petit” mais immense : écoute guidée
                                            </h3>
                                            <p class="mt-2 text-black/70">
                                                Carte image + texte : très magazine, très lisible.
                                            </p>
                                            <div class="mt-3 text-xs text-black/55">8 min • 07:30</div>
                                        </div>
                                    </a>
                                </article>

                                <article
                                    class="group rounded-2xl overflow-hidden border border-rule bg-paper hover:bg-haze">
                                    <a href="#/article" class="block">
                                        <div
                                            class="aspect-[16/9] bg-[linear-gradient(135deg,rgba(124,58,237,.10),rgba(0,0,0,.06))]">
                                        </div>
                                        <div class="p-5">
                                            <div
                                                class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Playlist</div>
                                            <h3
                                                class="mt-2 font-black text-2xl leading-snug font-serif group-hover:text-accent">
                                                20 titres pour une nuit sans notifications
                                            </h3>
                                            <div class="mt-3 text-xs text-black/55">Sélection • 06:20</div>
                                        </div>
                                    </a>
                                </article>
                            </div>
                        </div>
                    </div>

                    <!-- Column C (reviews box) -->
                    <div class="lg:col-span-3">
                        <div class="border-t border-rule pt-6">
                            <div class="flex items-end justify-between">
                                <h3 class="text-sm font-black tracking-widest uppercase text-black/60">Reviews</h3>
                                <a class="text-xs font-bold hover:text-accent" href="#/article">Plus</a>
                            </div>

                            <div class="mt-4 space-y-4">
                                <a href="#/article" class="block rounded-2xl border border-rule p-4 hover:bg-haze">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="h-14 w-14 rounded-xl bg-[linear-gradient(135deg,rgba(0,0,0,.08),rgba(124,58,237,.12))] border border-rule">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Album</div>
                                            <div class="mt-1 font-black leading-snug font-serif truncate">
                                                L’album qui réconcilie groove et mélancolie
                                            </div>
                                            <div class="mt-2 text-xs text-black/55">Note: 8.3 • 4 min</div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#/article" class="block rounded-2xl border border-rule p-4 hover:bg-haze">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="h-14 w-14 rounded-xl bg-[linear-gradient(135deg,rgba(124,58,237,.12),rgba(0,0,0,.06))] border border-rule">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Livre</div>
                                            <div class="mt-1 font-black leading-snug font-serif truncate">
                                                Une histoire orale des scènes DIY
                                            </div>
                                            <div class="mt-2 text-xs text-black/55">Note: 7.8 • 3 min</div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#/article" class="block rounded-2xl border border-rule p-4 hover:bg-haze">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="h-14 w-14 rounded-xl bg-[linear-gradient(135deg,rgba(0,0,0,.06),rgba(0,0,0,.10))] border border-rule">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Concert</div>
                                            <div class="mt-1 font-black leading-snug font-serif truncate">
                                                Le live comme rituel collectif
                                            </div>
                                            <div class="mt-2 text-xs text-black/55">Note: 9.0 • 5 min</div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <!-- Subscribe -->
                            <div id="subscribe" class="mt-8 rounded-2xl border border-rule p-5 bg-ink text-paper">
                                <div class="text-xs font-black tracking-widest uppercase text-paper/70">Newsletter
                                </div>
                                <div class="mt-2 font-black text-lg font-serif leading-snug">
                                    Une sélection hebdo, sans bruit.
                                </div>

                                <div class="mt-4 flex flex-col gap-2">
                                    <input class="rounded-xl px-4 py-3 text-ink placeholder:text-black/40 outline-none"
                                        placeholder="ton@email.com" />
                                    <button
                                        class="rounded-xl px-4 py-3 font-black bg-paper text-ink hover:opacity-90">
                                        S’inscrire
                                    </button>
                                </div>

                                <p class="mt-3 text-xs text-paper/70">
                                    Tu peux remplacer ce bloc par un CTA “Donner”, “Rejoindre”, etc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Simple list section -->
            <section class="mt-14">
                <div class="flex items-end justify-between gap-6">
                    <h2 class="text-2xl md:text-3xl font-black font-serif">En ce moment</h2>
                    <a class="text-sm font-bold hover:text-accent" href="#/article">Explorer →</a>
                </div>

                <div class="mt-6 border-t border-rule">
                    <div class="grid gap-0 lg:grid-cols-12">
                        <!-- left list -->
                        <div class="lg:col-span-8 border-r border-rule">
                            <div class="divide-y divide-rule">
                                <a href="#/article" class="block py-5 pr-0 lg:pr-8 hover:bg-haze">
                                    <div class="flex items-start gap-5">
                                        <div
                                            class="hidden sm:block h-20 w-20 rounded-xl border border-rule bg-[linear-gradient(135deg,rgba(0,0,0,.06),rgba(124,58,237,.10))]">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Reportage</div>
                                            <div class="mt-2 font-black text-2xl leading-snug font-serif">
                                                Dans les coulisses d’un label indépendant
                                            </div>
                                            <div class="mt-2 text-black/70">
                                                Ligne de texte courte. Comme un sommaire papier.
                                            </div>
                                            <div class="mt-3 text-xs text-black/55">12 min • Par A. Kouyaté</div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#/article" class="block py-5 pr-0 lg:pr-8 hover:bg-haze">
                                    <div class="flex items-start gap-5">
                                        <div
                                            class="hidden sm:block h-20 w-20 rounded-xl border border-rule bg-[linear-gradient(135deg,rgba(124,58,237,.10),rgba(0,0,0,.06))]">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Analyse</div>
                                            <div class="mt-2 font-black text-2xl leading-snug font-serif">
                                                Pourquoi la scène locale redevient centrale
                                            </div>
                                            <div class="mt-3 text-xs text-black/55">9 min • Par S. N’Diaye</div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#/article" class="block py-5 pr-0 lg:pr-8 hover:bg-haze">
                                    <div class="flex items-start gap-5">
                                        <div
                                            class="hidden sm:block h-20 w-20 rounded-xl border border-rule bg-[linear-gradient(135deg,rgba(0,0,0,.08),rgba(0,0,0,.02))]">
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold tracking-widest uppercase text-black/60">
                                                Portrait</div>
                                            <div class="mt-2 font-black text-2xl leading-snug font-serif">
                                                Une artiste qui “écrit” avec des textures
                                            </div>
                                            <div class="mt-3 text-xs text-black/55">6 min • Par M. Lopez</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <!-- right rail -->
                        <div class="lg:col-span-4">
                            <div class="py-6 lg:pl-8">
                                <div class="text-xs font-black tracking-widest uppercase text-black/60">Agenda</div>
                                <div class="mt-3 space-y-3">
                                    <div class="rounded-2xl border border-rule p-4">
                                        <div class="font-black">Ce soir • 20:00</div>
                                        <div class="text-black/70">Session d’écoute & débat</div>
                                    </div>
                                    <div class="rounded-2xl border border-rule p-4">
                                        <div class="font-black">Jeudi • 18:30</div>
                                        <div class="text-black/70">Rencontre : écrire une critique</div>
                                    </div>
                                    <div class="rounded-2xl border border-rule p-4">
                                        <div class="font-black">Samedi • 15:00</div>
                                        <div class="text-black/70">Atelier : photo de concert</div>
                                    </div>
                                </div>

                                <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                                    <div class="text-xs font-black tracking-widest uppercase text-black/60">Astuce UI
                                    </div>
                                    <p class="mt-2 text-black/70">
                                        Pour un effet “journal”, garde :
                                        <span class="font-semibold">règles fines</span>,
                                        <span class="font-semibold">titres serif</span>,
                                        <span class="font-semibold">colonnes</span>,
                                        et beaucoup d’air.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    `;
}
