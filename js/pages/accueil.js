// Page Accueil - Style inspiré Transform Church
import { api } from '../services/api.service.js';

const YOUTUBE_PLAYLIST_ID = 'PLJpx00qiABt1FSmOul4Oo4LmmB6FXJBbd';

export async function accueil() {
    console.log("Chargement accueil...");

    // Récupération des données API
    let homeGroups = [];
    let nextEvents = [];
    let youtubeVideos = [];
    let currentVideoId = null;
    let articles = [];

    try {
        const [homeGroupsResponse, eventsResponse, playlistResponse, articlesResponse] = await Promise.all([
            api.getHomeGroups(),
            api.getUpcomingEvents(5),
            api.getYoutubePlaylistItems(YOUTUBE_PLAYLIST_ID).catch(() => null),
            api.getArticles(null, 3).catch(() => null)
        ]);

        // YouTube videos
        if (playlistResponse && playlistResponse.items) {
            youtubeVideos = playlistResponse.items.map(item => ({
                videoId: item.contentDetails.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                publishedAt: item.snippet.publishedAt
            }));
            if (youtubeVideos.length > 0) {
                currentVideoId = youtubeVideos[0].videoId;
            }
        }

        if (homeGroupsResponse && homeGroupsResponse.home_groups) {
            homeGroups = homeGroupsResponse.home_groups.slice(0, 9);
        }

        if (eventsResponse) {
            // L'API retourne directement un tableau ou un objet { events: [] } ?
            // Vérifions la structure habituelle. api.service.js retourne response.json()
            // Si l'endpoint est /api/events/upcoming, il retourne probablement une liste.
            // Adaptons au cas où.
            const eventsData = Array.isArray(eventsResponse) ? eventsResponse : (eventsResponse.events || []);

            nextEvents = eventsData.map(e => {
                // Formatage de la date
                console.log("date", e.start_date);
                const dateObj = new Date(e.start_date);
                console.log("dateObj", dateObj);
                const dateStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
                const timeStr = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

                return {
                    date: `${dateStr} • ${timeStr}`,
                    title: e.title,
                    description: e.description || "Aucune description",
                    color: "bg-punch" // Couleur par défaut ou logique basée sur la catégorie si disponible
                };
            });
        }

        // Articles
        if (articlesResponse && articlesResponse.articles) {
            articles = articlesResponse.articles;
        }
    } catch (error) {
        console.error("Erreur chargement données accueil:", error);
    }

    // Si pas d'événements (erreur ou vide), on peut laisser vide ou mettre un message
    if (nextEvents.length === 0) {
        nextEvents.push({
            date: "",
            title: "Aucun événement à venir",
            description: "Consultez notre agenda complet.",
            color: "bg-gray-400"
        });
    }

    // Construction HTML dynamique des événements
    const eventsHtml = nextEvents.map(event => `
        <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5">
            <div class="h-2 ${event.color}"></div>
            <div class="p-6">
                <p class="text-xs font-black tracking-widest text-black/50 uppercase">${event.date}</p>
                <h3 class="mt-2 text-xl font-black">${event.title}</h3>
                <p class="mt-2 text-black/70 text-sm line-clamp-2">${event.description}</p>
                ${event.location ? `<p class="mt-2 text-black/50 text-xs"><span class="font-bold">Lieu:</span> ${event.location}</p>` : ''}
                <div class="mt-5">
                    <a class="inline-flex rounded-full px-5 py-2.5 font-bold bg-ink text-paper hover:opacity-90" href="#/actu">
                        Détails
                    </a>
                </div>
            </div>
        </article>
    `).join('');

    // Construction HTML dynamique des articles
    const categoryColors = {
        'témoignage': 'text-punch',
        'annonce': 'text-glow',
        'rétrospective': 'text-ink/60',
        'default': 'text-punch'
    };

    const articlesHtml = articles.length > 0
        ? articles.map(article => {
            const categoryClass = categoryColors[article.category?.toLowerCase()] || categoryColors['default'];
            const imageUrl = article.image || `https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80`;

            return `
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] overflow-hidden">
                    <img src="${imageUrl}" alt="${article.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-6">
                    <p class="text-xs font-bold ${categoryClass} uppercase">${article.category || 'Article'}</p>
                    <h3 class="mt-2 text-lg font-black">${article.title}</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">${article.excerpt || ''}</p>
                    <a href="#/article?slug=${article.slug}" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                        Lire la suite →
                    </a>
                </div>
            </article>
        `}).join('')
        : `
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] bg-gradient-to-br from-punch/20 to-glow/10"></div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">À venir</p>
                    <h3 class="mt-2 text-lg font-black">Restez connectés</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">De nouvelles actualités arrivent bientôt...</p>
                    <a href="#/actu" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                        Voir toutes les actus →
                    </a>
                </div>
            </article>
        `.repeat(3);

    // Construction HTML dynamique des groupes de maison
    const homeGroupsHtml = `
        <div class="mt-10 grid gap-0 overflow-hidden rounded-3xl border border-black/10">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                ${homeGroups.map(group => `
                    <a href="#/home-groups" class="group relative aspect-square overflow-hidden bg-black">
                        <img src="${group.image || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'}" 
                             alt="${group.home}" 
                             class="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                        <div class="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"></div>
                        <div class="absolute inset-0 grid place-items-center px-4 text-center">
                            <div>
                                <span class="text-white font-black tracking-wide uppercase text-sm md:text-base block mb-2">${group.home}</span>
                                <span class="text-white/80 text-xs font-bold uppercase tracking-widest">${group.frequency || ''}</span>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

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
                        DIMANCHE • 09:00
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

            <div class="mt-8 grid gap-6 lg:grid-cols-5">
                <!-- Lecteur YouTube -->
                <div class="lg:col-span-3 rounded-3xl overflow-hidden shadow-soft border border-black/5 bg-ink">
                    <div class="aspect-video relative bg-black">
                        <iframe
                            id="youtube-player"
                            class="w-full h-full"
                            src="https://www.youtube.com/embed/${currentVideoId || 'dQw4w9WgXcQ'}?rel=0"
                            title="Sermon vidéo"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="p-6 text-paper">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center rounded-full bg-paper/10 px-3 py-1 text-xs font-bold">SERMON</span>
                        </div>
                        <h3 id="current-video-title" class="mt-3 text-xl font-black tracking-tight line-clamp-2">
                            ${youtubeVideos.length > 0 ? youtubeVideos[0].title : 'Chargement...'}
                        </h3>
                    </div>
                </div>

                <!-- Playlist -->
                <aside class="lg:col-span-2 rounded-3xl p-4 bg-haze border border-black/5 shadow-soft max-h-[500px] overflow-hidden flex flex-col">
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase px-2">Playlist</p>
                    <h4 class="mt-1 text-lg font-black px-2">Sermons récents</h4>
                    <div class="mt-3 space-y-2 overflow-y-auto flex-1 pr-1">
                        ${youtubeVideos.length > 0 ? youtubeVideos.map((video, index) => `
                            <button
                                data-video-id="${video.videoId}"
                                data-video-title="${video.title.replace(/"/g, '&quot;')}"
                                class="youtube-video-btn w-full flex gap-3 p-2 rounded-xl hover:bg-black/5 transition text-left ${index === 0 ? 'bg-black/10' : ''}">
                                <img src="${video.thumbnail}" alt="" class="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-bold line-clamp-2 text-black/80">${video.title}</p>
                                </div>
                            </button>
                        `).join('') : '<p class="text-sm text-black/50 px-2">Aucune vidéo disponible</p>'}
                    </div>
                </aside>
            </div>
        </section>

        <!-- PROCHAINS ÉVÉNEMENTS -->
    <section id="events" class="bg-haze border-y border-black/5">
        <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">The latest</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Événements à venir</h2>
                    <p class="mt-2 text-black/70">Rejoins-nous en présentiel ou en ligne.</p>
                </div>

                <a class="hidden md:inline-flex rounded-full px-5 py-2 font-bold bg-ink text-paper hover:opacity-90" href="#/actu">
                    Explorer tous les events
                </a>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                ${eventsHtml}
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold bg-ink text-paper hover:opacity-90" href="#/actu">
                    Explorer tous les events
                </a>
            </div>
        </div>
    </section>

        <!-- ACTUALITÉS -->
        <section id="actu-section" class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Actualités</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Dernières actualités</h2>
                    <p class="mt-2 text-black/70">Restez informé de la vie de l'église</p>
                </div>
                <a class="hidden md:inline-flex rounded-full px-5 py-2 font-bold border border-black/10 hover:border-black/30" href="#/actu">
                    Voir toutes les actus
                </a>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                ${articlesHtml}
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold border border-black/10 hover:border-black/30" href="#/actu">
                    Voir toutes les actus
                </a>
            </div>
        </section>

        <!-- MOSAÏQUE - HOME GROUPS -->
        <section class="w-full bg-paper">
            <div class="mx-auto max-w-[95%] px-4 md:px-8 py-12 md:py-16">
                <h2 class="text-center text-3xl md:text-5xl font-black tracking-tight">
                    REJOIGNEZ UN GROUPE DE MAISON !
                </h2>
                <p class="mt-4 text-center text-lg text-black/60 max-w-2xl mx-auto">
                    La vie d'église se vit aussi en semaine. Trouvez un groupe près de chez vous pour partager, prier et grandir ensemble.
                </p>

                ${homeGroupsHtml}

                <div class="mt-10 text-center">
                    <a href="#/home-groups" class="inline-flex justify-center rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition">
                        Voir tous les groupes
                    </a>
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

        <!-- Script pour la playlist YouTube -->
        <script>
            setTimeout(() => {
                const videoButtons = document.querySelectorAll('.youtube-video-btn');
                const player = document.getElementById('youtube-player');
                const titleEl = document.getElementById('current-video-title');

                videoButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const videoId = btn.dataset.videoId;
                        const videoTitle = btn.dataset.videoTitle;

                        // Update player
                        if (player) {
                            player.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
                        }

                        // Update title
                        if (titleEl) {
                            titleEl.textContent = videoTitle;
                        }

                        // Update active state
                        videoButtons.forEach(b => b.classList.remove('bg-black/10'));
                        btn.classList.add('bg-black/10');
                    });
                });
            }, 100);
        </script>
    `;
}
