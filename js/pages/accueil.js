// Page Accueil - Style inspiré Transform Church
export function accueil() {
    return `
        <!-- HERO -->
        <section class="relative overflow-hidden">
            <div class="absolute inset-0">
                <video 
                    class="h-full w-full object-cover" 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    poster="https://images.unsplash.com/photo-1519491050282-cf00c82424bd?auto=format&fit=crop&w=1920&q=80">
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <!-- Overlay sombre pour la lisibilité du texte -->
                <div class="absolute inset-0 bg-ink/60"></div>
                <!-- Dégradé subtil en bas -->
                <div class="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent"></div>
            </div>

            <div class="relative mx-auto max-w-[95%] px-4 pt-16 pb-12 md:pt-24 md:pb-20">
                <div class="max-w-3xl">
                    <p class="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-4 py-1.5 text-xs font-bold tracking-wide">
                        <span class="h-2 w-2 rounded-full bg-glow"></span>
                        DIMANCHE • 10:00
                    </p>

                    <h1 class="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-[1.02] text-paper">
                        Bienvenue à <span class="text-punch">La Rencontre</span>.<br />
                        Une église <span class="text-paper underline decoration-glow decoration-8 underline-offset-4">vivante</span>.
                    </h1>

                    <p class="mt-5 text-base md:text-lg text-paper/90 max-w-2xl">
                        Un lieu de foi, d'espérance et d'amour où chacun peut rencontrer Dieu et grandir ensemble.
                    </p>

                    <div class="mt-8 flex flex-col sm:flex-row gap-3">
                        <a href="#/elrtv" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-glow text-ink hover:opacity-90">
                            Regarder en ligne
                        </a>
                        <a href="#/eglise" class="inline-flex justify-center rounded-full px-6 py-3 font-bold border border-paper/30 text-paper hover:bg-paper/10">
                            Découvrir l'église
                        </a>
                    </div>

                    <div class="mt-10 flex items-center gap-6 text-sm text-paper/80">
                        <div class="flex items-center gap-2">
                            <span class="h-2.5 w-2.5 rounded-full bg-punch"></span> Louange • Message • Communauté
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- DERNIER SERMON -->
        <section class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Watch</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Dernier sermon</h2>
                    <p class="mt-2 text-black/70">Regardez le message le plus récent</p>
                </div>
                <a class="hidden md:inline-flex rounded-full px-5 py-2 font-bold border border-black/10 hover:border-black/30" href="#/elrtv">
                    Voir plus
                </a>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-5">
                <div class="md:col-span-3 rounded-3xl overflow-hidden shadow-soft border border-black/5 bg-ink">
                    <div class="aspect-video bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,.45),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(163,255,18,.30),transparent_55%)]"></div>
                    <div class="p-6 text-paper">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center rounded-full bg-paper/10 px-3 py-1 text-xs font-bold">SERMON</span>
                        </div>
                        <h3 class="mt-3 text-2xl font-black tracking-tight">Message du dimanche</h3>
                        <div class="mt-6 flex flex-col sm:flex-row gap-3">
                            <a class="inline-flex justify-center rounded-full px-6 py-3 font-black bg-paper text-ink hover:opacity-90" href="#/elrtv">
                                Regarder maintenant
                            </a>
                        </div>
                    </div>
                </div>

                <aside class="md:col-span-2 rounded-3xl p-6 bg-haze border border-black/5 shadow-soft">
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Horaires</p>
                    <h4 class="mt-2 text-lg font-black">Nos célébrations</h4>
                    <ul class="mt-3 space-y-2 text-sm text-black/70">
                        <li>• Dimanche 10h00 - Culte principal</li>
                        <li>• Mercredi 19h30 - Prière</li>
                        <li>• Samedi 18h00 - Jeunesse</li>
                    </ul>
                </aside>
            </div>
        </section>

        <!-- PROCHAINS ÉVÉNEMENTS -->
        <section class="bg-haze border-y border-black/5">
            <div class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Événements</p>
                        <h2 class="mt-2 text-2xl md:text-3xl font-black">Prochains événements</h2>
                        <p class="mt-2 text-black/70">Rejoignez-nous lors de nos prochains rassemblements</p>
                    </div>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <!-- Image à gauche -->
                    <div class="rounded-3xl overflow-hidden shadow-soft border border-black/5">
                        <img src="https://images.unsplash.com/photo-1519491050282-cf00c82424bd?auto=format&fit=crop&w=800&q=80" 
                             alt="Événements de l'église" 
                             class="h-full w-full object-cover min-h-[300px] md:min-h-full" />
                    </div>

                    <!-- 3 événements à droite (verticaux) -->
                    <div class="flex flex-col gap-4">
                        <article class="rounded-2xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition flex">
                            <div class="w-2 bg-punch flex-shrink-0"></div>
                            <div class="p-5 flex-1">
                                <p class="text-xs font-black tracking-widest text-black/50 uppercase">Dim 9 Fév • 10:00</p>
                                <h3 class="mt-1 text-lg font-black">Culte dominical</h3>
                                <p class="mt-1 text-black/70 text-sm">Rejoignez-nous pour un temps de louange et d'enseignement.</p>
                            </div>
                        </article>

                        <article class="rounded-2xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition flex">
                            <div class="w-2 bg-glow flex-shrink-0"></div>
                            <div class="p-5 flex-1">
                                <p class="text-xs font-black tracking-widest text-black/50 uppercase">Sam 15 Fév • 18:00</p>
                                <h3 class="mt-1 text-lg font-black">Soirée Next Gen</h3>
                                <p class="mt-1 text-black/70 text-sm">Le rendez-vous mensuel des jeunes de l'église.</p>
                            </div>
                        </article>

                        <article class="rounded-2xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition flex">
                            <div class="w-2 bg-punch flex-shrink-0"></div>
                            <div class="p-5 flex-1">
                                <p class="text-xs font-black tracking-widest text-black/50 uppercase">Mer 19 Fév • 19:30</p>
                                <h3 class="mt-1 text-lg font-black">Soirée de prière</h3>
                                <p class="mt-1 text-black/70 text-sm">Un moment pour chercher Dieu ensemble.</p>
                            </div>
                        </article>

                        <a href="#/actu" class="mt-2 inline-flex justify-center rounded-full px-5 py-3 font-bold bg-ink text-paper hover:opacity-90">
                            Voir tous les événements
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ACTUALITÉS -->
        <section id="actu-section" class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">News</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Dernières actualités</h2>
                    <p class="mt-2 text-black/70">Restez informé de la vie de l'église</p>
                </div>
                <a class="hidden md:inline-flex rounded-full px-5 py-2 font-bold border border-black/10 hover:border-black/30" href="#/actu">
                    Voir toutes les actus
                </a>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                    <div class="aspect-[16/10] bg-[linear-gradient(135deg,rgba(124,58,237,.15),rgba(163,255,18,.10))]"></div>
                    <div class="p-6">
                        <p class="text-xs font-bold text-punch uppercase">Témoignage</p>
                        <h3 class="mt-2 text-lg font-black">Une vie transformée</h3>
                        <p class="mt-2 text-black/60 text-sm line-clamp-2">Découvrez le témoignage inspirant de Marie qui a rencontré Jésus...</p>
                        <a href="#/actu" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                            Lire la suite →
                        </a>
                    </div>
                </article>

                <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                    <div class="aspect-[16/10] bg-[linear-gradient(135deg,rgba(163,255,18,.15),rgba(124,58,237,.10))]"></div>
                    <div class="p-6">
                        <p class="text-xs font-bold text-glow uppercase">Annonce</p>
                        <h3 class="mt-2 text-lg font-black">Nouveau groupe de maison</h3>
                        <p class="mt-2 text-black/60 text-sm line-clamp-2">Un nouveau groupe démarre dans le quartier Nord...</p>
                        <a href="#/actu" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                            Lire la suite →
                        </a>
                    </div>
                </article>

                <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                    <div class="aspect-[16/10] bg-[linear-gradient(135deg,rgba(124,58,237,.12),rgba(0,0,0,.05))]"></div>
                    <div class="p-6">
                        <p class="text-xs font-bold text-ink/60 uppercase">Rétrospective</p>
                        <h3 class="mt-2 text-lg font-black">Le bilan de janvier</h3>
                        <p class="mt-2 text-black/60 text-sm line-clamp-2">Retour sur les moments forts du mois écoulé...</p>
                        <a href="#/actu" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                            Lire la suite →
                        </a>
                    </div>
                </article>
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold border border-black/10 hover:border-black/30" href="#/actu">
                    Voir toutes les actus
                </a>
            </div>
        </section>

        <!-- MOSAÏQUE -->
        <section class="w-full bg-paper">
            <div class="mx-auto max-w-[95%] px-4 md:px-8 py-12 md:py-16">
                <h2 class="text-center text-3xl md:text-5xl font-black tracking-tight">
                    UNE ÉGLISE POUR TOUS !
                </h2>

                <div class="mt-10 grid gap-0 overflow-hidden rounded-3xl border border-black/10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <a href="#/actu" class="group relative aspect-square overflow-hidden bg-black">
                            <img src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=600&q=80" alt="Nos actus" class="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                            <div class="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"></div>
                            <div class="absolute inset-0 grid place-items-center">
                                <span class="text-white font-black tracking-wide uppercase text-sm md:text-base">NOS ACTUS</span>
                            </div>
                        </a>

                        <a href="#/contact" class="group relative aspect-square bg-pink-200/70 overflow-hidden">
                            <div class="absolute inset-0 bg-white/0 transition group-hover:bg-white/10"></div>
                            <div class="absolute inset-0 grid place-items-center text-center px-6">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="h-14 w-14 rounded-2xl bg-black/10 grid place-items-center">
                                        <span class="text-2xl">❤</span>
                                    </div>
                                    <span class="font-black tracking-wide uppercase text-sm md:text-base">NOUS CONTACTER</span>
                                </div>
                            </div>
                        </a>

                        <a href="#/eglise" class="group relative aspect-square overflow-hidden bg-black">
                            <img src="https://images.unsplash.com/photo-1520975958225-6b0f6c4f1b0a?auto=format&fit=crop&w=600&q=80" alt="L'église" class="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                            <div class="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"></div>
                            <div class="absolute inset-0 grid place-items-center px-6">
                                <span class="text-white font-black tracking-wide uppercase text-sm md:text-base text-center">DÉCOUVRIR L'ÉGLISE</span>
                            </div>
                        </a>

                        <a href="#/elrtv" class="group relative aspect-square overflow-hidden bg-black">
                            <img src="https://images.unsplash.com/photo-1520975693411-6c9b26a3bca7?auto=format&fit=crop&w=600&q=80" alt="ELR TV" class="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                            <div class="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"></div>
                            <div class="absolute inset-0 grid place-items-center">
                                <span class="text-white font-black tracking-wide uppercase text-sm md:text-base">ELR TV</span>
                            </div>
                        </a>

                        <a href="#/nextgen" class="group relative aspect-square bg-sky-200/70 overflow-hidden">
                            <div class="absolute inset-0 bg-white/0 transition group-hover:bg-white/10"></div>
                            <div class="absolute inset-0 grid place-items-center text-center px-6">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="h-14 w-14 rounded-2xl bg-black/10 grid place-items-center">
                                        <span class="text-2xl">⚡</span>
                                    </div>
                                    <span class="font-black tracking-wide uppercase text-sm md:text-base">NEXT GEN</span>
                                </div>
                            </div>
                        </a>

                        <a href="#/boutique" class="group relative aspect-square bg-emerald-200/70 overflow-hidden">
                            <div class="absolute inset-0 bg-white/0 transition group-hover:bg-white/10"></div>
                            <div class="absolute inset-0 grid place-items-center text-center px-6">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="h-14 w-14 rounded-2xl bg-black/10 grid place-items-center">
                                        <span class="text-2xl">🛍</span>
                                    </div>
                                    <span class="font-black tracking-wide uppercase text-sm md:text-base">BOUTIQUE</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- NEWSLETTER -->
        <section class="bg-ink text-paper">
            <div class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
                <div class="grid gap-8 md:grid-cols-2 md:items-center">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Newsletter</p>
                        <h2 class="mt-2 text-2xl md:text-3xl font-black">Restez informé</h2>
                        <p class="mt-3 text-paper/80">Recevez nos actualités et annonces directement dans votre boîte mail.</p>
                    </div>

                    <form class="rounded-3xl bg-paper/10 border border-paper/10 p-6">
                        <label class="text-sm font-bold">Email</label>
                        <div class="mt-2 flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="votre@email.com" class="w-full rounded-2xl px-4 py-3 bg-paper text-ink placeholder:text-black/40 outline-none" />
                            <button class="rounded-2xl px-6 py-3 font-black bg-glow text-ink hover:opacity-90" type="button">
                                S'inscrire
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
}
