// Page Accueil - Style inspiré Transform Church
import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

const accueilHeroVideoUrl = new URL('../../assets/videos/accueil.mp4', import.meta.url).href;

const YOUTUBE_PLAYLIST_ID = 'PLJpx00qiABt1FSmOul4Oo4LmmB6FXJBbd';

export async function accueil() {
    console.log("Chargement accueil...");

    const routeParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const activeEventCategory = (routeParams.get('category') || '').trim();

    // Récupération des données API
    let homeGroups = [];
    let nextEvents = [];
    let youtubeVideos = [];
    let currentVideoId = null;
    let articles = [];

    // Récupération du contenu éditorial + données dynamiques
    const [homeGroupsResponse, eventsResponse, playlistResponse, articlesResponse, content] = await Promise.all([
        // Le backend ne doit pas empêcher le rendu de la page d'accueil.
        // Chaque section dynamique utilise son état vide si l'API est indisponible.
        api.getHomeGroups().catch((error) => {
            console.warn('Groupes de maison indisponibles, affichage sans groupes.', error);
            return null;
        }),
        (activeEventCategory
            ? api.getEvents(activeEventCategory, 40)
            : api.getUpcomingEvents(40)).catch((error) => {
            console.warn('Événements indisponibles, affichage du contenu par défaut.', error);
            return null;
        }),
        api.getYoutubePlaylistItems(YOUTUBE_PLAYLIST_ID).catch(() => null),
        api.getArticles(null, 3).catch(() => null),
        tAll({
            'accueil.hero.line1': 'Bienvenue à',
            'accueil.hero.line2': 'La Rencontre',
            'accueil.hero.cta': 'Notre Vision',
            'accueil.hero.info1': 'Service du dimanche à 10h00',
            'accueil.hero.info2': 'Église La Rencontre — Toulouse, France',
            'accueil.last_message.title': 'Dernier Message',
            'accueil.last_message.subtitle': 'Regardez le message le plus récent',
            'accueil.last_message.cta': 'Voir plus',
            'accueil.last_message.playlist': 'Messages récents',
            'accueil.events.title': 'Événements à venir',
            'accueil.events.subtitle': 'Rejoins-nous en présentiel ou en ligne.',
            'accueil.actu.title': 'Dernières Actualités',
            'accueil.actu.subtitle': 'Restez informé de la vie de l\'église',
            'accueil.actu.cta': 'Voir toutes les actus',
            'accueil.groups.title': 'Rejoignez un Groupe de Maison',
            'accueil.groups.subtitle': 'La vie d\'église se vit aussi en semaine. Trouvez un groupe près de chez vous pour partager, prier et grandir ensemble.',
            'accueil.groups.cta': 'Voir tous les groupes',
            'accueil.newsletter.title': 'Restez Informé',
            'accueil.newsletter.subtitle': 'Recevez nos actualités et annonces directement dans votre boîte mail.',
            'accueil.newsletter.cta': 'S\'inscrire',
        }).catch(() => ({}))
    ]);

    // Met en valeur le dernier mot sans le répéter : les valeurs du CMS sont
    // des titres complets (ex. « Restez Informé »), pas seulement leur préfixe.
    const styledTitle = (title, accentClass = 'text-punch') => {
        const words = String(title || '').trim().split(/\s+/);
        const lastWord = words.pop() || '';
        const prefix = words.join(' ');
        return `${prefix}${prefix ? ' ' : ''}<span class="font-serif italic font-semibold ${accentClass}">${lastWord}</span>`;
    };

    try {
        // YouTube videos
        if (playlistResponse && playlistResponse.items) {
            youtubeVideos = playlistResponse.items
                .filter(item => {
                    const title = item.snippet?.title?.trim().toLowerCase() || '';
                    const privacy = item.status?.privacyStatus;
                    const unavailableTitle = ['private video', 'deleted video', 'vidéo privée', 'vidéo supprimée'].includes(title);

                    return Boolean(item.contentDetails?.videoId)
                        && !unavailableTitle
                        && (!privacy || privacy === 'public');
                })
                .map(item => ({
                    videoId: item.contentDetails.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
                    publishedAt: item.snippet.publishedAt
                }))
                .filter(video => video.thumbnail);
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
            let eventsData = Array.isArray(eventsResponse) ? eventsResponse : (eventsResponse.events || []);
            if (activeEventCategory) {
                eventsData = eventsData.filter(event =>
                    String(event.category || '').localeCompare(activeEventCategory, 'fr', { sensitivity: 'base' }) === 0
                );
            }

            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);

            const normalizeEventValue = value => String(value || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim()
                .toLowerCase()
                .replace(/\s+/g, ' ');

            // L'API peut renvoyer plusieurs occurrences d'une même série.
            // Après le tri chronologique, la première occurrence rencontrée
            // est forcément la prochaine : les suivantes sont donc ignorées.
            const uniqueUpcomingEvents = [...eventsData]
                .filter(event => {
                    const timestamp = new Date(event.start_date).getTime();
                    return Number.isFinite(timestamp) && timestamp >= startOfToday.getTime();
                })
                .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                .filter((event, index, sortedEvents) => {
                    const seriesId = event.series_id || event.recurrence_id || event.parent_event_id || event.recurring_event_id;
                    const eventKey = seriesId
                        ? `series:${seriesId}`
                        : [event.title, event.location, event.category].map(normalizeEventValue).join('|');

                    return sortedEvents.findIndex(candidate => {
                        const candidateSeriesId = candidate.series_id || candidate.recurrence_id || candidate.parent_event_id || candidate.recurring_event_id;
                        const candidateKey = candidateSeriesId
                            ? `series:${candidateSeriesId}`
                            : [candidate.title, candidate.location, candidate.category].map(normalizeEventValue).join('|');
                        return candidateKey === eventKey;
                    }) === index;
                });

            nextEvents = uniqueUpcomingEvents.slice(0, 4).map(e => {
                // Formatage de la date
                const dateObj = new Date(e.start_date);
                const dateStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
                const apiStartTime = String(e.start_time || '').trim();
                const dateContainsTime = /T\d{2}:\d{2}/.test(String(e.start_date || ''));
                const timeStr = apiStartTime
                    ? apiStartTime.slice(0, 5).replace(':', 'h')
                    : dateContainsTime
                        ? dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
                        : '';

                return {
                    id: e.id,
                    slug: e.slug,
                    link: e.link,
                    date: `${dateStr}${timeStr ? ` • ${timeStr}` : ''}`,
                    title: e.title,
                    description: e.description || "Aucune description",
                    location: e.location,
                    category: e.category,
                    image: e.media || e.image || e.cover_image || e.thumbnail,
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

    const eventColors = ['bg-punch text-white', 'bg-glow text-ink', 'bg-ink text-white'];

    // Construction HTML dynamique des événements (agenda éditorial)
    const eventsHtml = nextEvents.map((event, i) => {
        const color = eventColors[i % eventColors.length];
        // Extraire le jour et le mois depuis event.date (format: "dim. 8 juin • 10:00")
        const dateParts = event.date.split('•');
        const dayMonth = dateParts[0].trim();
        const time = dateParts[1] ? dateParts[1].trim() : '';
        const dayMatch = dayMonth.match(/(\d+)/);
        const day = dayMatch ? dayMatch[1] : '';
        const monthMatch = dayMonth.match(/[a-zA-Zéû]+$/);
        const month = monthMatch ? monthMatch[0] : '';

        return `
        <a href="#/event?id=${event.id || ''}"
           class="group grid overflow-hidden border-t border-black/20 transition duration-300 last:border-b hover:translate-x-1 md:grid-cols-[170px_1fr_auto]">
            <div class="${color} flex min-h-[145px] items-center gap-4 p-5 md:min-h-[170px] md:flex-col md:justify-center md:gap-0 md:p-7 md:text-center">
                <span class="font-display text-6xl font-extrabold leading-none md:text-7xl">${day || '—'}</span>
                <span class="text-sm font-black uppercase tracking-[0.2em] md:mt-2">${month || 'À venir'}</span>
            </div>
            <div class="flex flex-col justify-center bg-[#f2efe8] px-6 py-7 transition group-hover:bg-white md:px-10">
                <div class="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-black/40">
                    ${i === 0 ? '<span class="rounded-full bg-punch px-3 py-1 text-white">Prochainement</span>' : ''}
                    ${time ? `<span>${time}</span>` : ''}
                    ${event.location ? `<span>• ${event.location}</span>` : ''}
                </div>
                <h3 class="mt-4 font-display text-2xl font-extrabold leading-tight md:text-4xl">${event.title}</h3>
                ${event.description ? `<p class="mt-3 line-clamp-1 max-w-3xl font-serif text-lg italic text-black/50">${event.description}</p>` : ''}
            </div>
            <div class="hidden min-w-[110px] items-center justify-center bg-[#f2efe8] text-4xl transition group-hover:bg-white group-hover:text-punch md:flex">
                <span class="transition duration-300 group-hover:translate-x-2">→</span>
            </div>
        </a>
    `}).join('');

    // Construction HTML dynamique des articles
    const categoryColors = {
        'témoignage': 'bg-punch text-white',
        'annonce': 'bg-glow text-ink',
        'rétrospective': 'bg-white text-ink',
        'default': 'bg-punch text-white'
    };

    const articlesHtml = articles.length > 0
        ? articles.slice(0, 3).map((article, index) => {
            const categoryClass = categoryColors[article.category?.toLowerCase()] || categoryColors['default'];
            const imageUrl = article.image || `https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80`;
            const publishedDate = article.published_at || article.publication_date || article.created_at;
            const dateLabel = publishedDate
                ? new Date(publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Actualité';
            const layout = index === 0
                ? 'md:col-span-7 md:row-span-2 min-h-[520px] md:min-h-[720px]'
                : 'md:col-span-5 min-h-[360px]';
            const titleSize = index === 0 ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl';

            return `
            <a href="#/article?slug=${article.slug}" class="group relative overflow-hidden rounded-[1.75rem] bg-ink ${layout}">
                <img src="${imageUrl}" alt="${article.title}" class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-9 ${index === 0 ? 'lg:p-12' : ''}">
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${categoryClass}">${article.category || 'Article'}</span>
                        <span class="text-xs font-bold uppercase tracking-wider text-white/50">${dateLabel}</span>
                    </div>
                    <h3 class="mt-5 max-w-4xl font-display font-extrabold leading-[0.95] tracking-tight text-white ${titleSize}">${article.title}</h3>
                    ${index === 0 && article.excerpt ? `<p class="mt-5 line-clamp-2 max-w-2xl font-serif text-lg italic text-white/65 md:text-xl">${article.excerpt}</p>` : ''}
                    <span class="mt-6 inline-flex items-center gap-3 font-black text-glow">Lire l’article <span class="transition duration-300 group-hover:translate-x-2">→</span></span>
                </div>
            </a>
        `}).join('')
        : `
            <a href="#/journal" class="relative min-h-[480px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-punch to-ink md:col-span-12">
                <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <p class="text-xs font-black uppercase tracking-[0.2em] text-glow">À venir</p>
                    <h3 class="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">De nouvelles histoires arrivent bientôt.</h3>
                    <span class="mt-6 font-bold text-white/70">Découvrir le journal →</span>
                </div>
            </a>`;

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

    const html = `
        <!-- HERO - Style inspiré Transform Church -->
        <section class="relative min-h-screen flex items-center overflow-hidden bg-[#464646]">
            <!-- Video Background -->
            <div class="absolute inset-0">
                <video
                    class="absolute inset-0 w-full h-full object-cover"
                    autoplay
                    muted
                    loop
                    playsinline
                    poster="https://images.unsplash.com/photo-1519491050282-cf00c82424bd?auto=format&fit=crop&w=1920&q=80">
                    <source src="${accueilHeroVideoUrl}" type="video/mp4">
                </video>
                <!-- Overlay sombre -->
                <div class="absolute inset-0 bg-black/50"></div>
                <!-- Dégradé en bas vers la section suivante -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            </div>

            <!-- Contenu hero -->
            <div class="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-0">
                <!-- Titre principal : composition éditoriale Syne + Spectral -->
                <h1 class="max-w-6xl text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.35)]">
                    <span class="block font-serif text-4xl font-normal italic leading-none tracking-[-0.035em] text-white/90 md:text-6xl lg:text-[86px]">${content['accueil.hero.line1'] || 'Bienvenue à'}</span>
                    <span class="mt-2 block font-display text-6xl font-extrabold leading-[0.82] tracking-[-0.075em] md:text-8xl lg:text-[138px]">${content['accueil.hero.line2'] || 'La Rencontre'}</span>
                </h1>

                <!-- Boutons CTA inline - style Transform Church -->
                <div class="mt-8 flex flex-wrap gap-4">
                    <a href="#/vision" class="inline-block border-2 border-white text-white px-8 py-3 text-sm md:text-lg font-bold tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300">
                        ${content['accueil.hero.cta'] || 'Notre Vision'}
                    </a>
                </div>

                <!-- Infos pratiques - style Transform Church -->
                <div class="mt-8 text-white/80 text-lg md:text-2xl font-bold leading-relaxed">
                    <p>${content['accueil.hero.info1'] || 'Service du dimanche à 10h00'}</p>
                    <p>${content['accueil.hero.info2'] || 'Église La Rencontre — Toulouse, France'}</p>
                </div>
            </div>
        </section>

        <!-- NOTRE MISSION -->
        <section class="bg-paper px-5 py-20 text-ink md:px-10 md:py-28">
            <div class="mx-auto max-w-[1500px]">
                <p class="mb-9 text-xs font-black uppercase tracking-[0.28em] text-black/40">Notre mission</p>
                <div class="font-display text-[15vw] font-extrabold uppercase leading-[0.82] tracking-[-0.075em] md:text-[8rem]">
                    <p>Aimer <span class="font-serif font-medium italic text-glow">Dieu.</span></p>
                    <p>Aimer les <span class="font-serif font-medium italic text-punch">gens.</span></p>
                    <p>Changer le <span class="font-serif font-medium italic text-ink">monde.</span></p>
                </div>
            </div>
        </section>

        <!-- DERNIERS MESSAGES — expérience vidéo éditoriale -->
        <section class="overflow-hidden bg-ink px-4 py-16 text-paper md:px-8 md:py-24">
            <div class="mx-auto max-w-[1500px]">
                <div class="flex items-end justify-between gap-8">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-paper/40">À regarder maintenant</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                            ${styledTitle(content['accueil.last_message.title'] || 'Derniers Messages', 'text-glow')}
                        </h2>
                    </div>
                    <a class="hidden shrink-0 items-center gap-2 border-b border-paper/30 pb-2 text-sm font-black uppercase tracking-wider transition hover:border-glow hover:text-glow md:inline-flex"
                       href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" rel="noopener noreferrer">
                        Tous les messages <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div class="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl md:mt-16 md:rounded-[2.5rem]">
                    <div class="aspect-video bg-black">
                        <iframe id="youtube-player" class="h-full w-full"
                            src="https://www.youtube.com/embed/${currentVideoId || 'dQw4w9WgXcQ'}?rel=0"
                            title="Message vidéo" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div class="flex flex-col gap-5 border-t border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-9">
                        <div class="min-w-0">
                            <div class="flex items-center gap-3">
                                <span class="rounded-full bg-punch px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">Nouveau</span>
                                <span id="current-video-date" class="text-xs font-bold uppercase tracking-wider text-white/40">${youtubeVideos[0]?.publishedAt ? new Date(youtubeVideos[0].publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Message récent'}</span>
                            </div>
                            <h3 id="current-video-title" class="mt-4 line-clamp-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                                ${youtubeVideos[0]?.title || 'Découvrez notre dernier message'}
                            </h3>
                        </div>
                        <a id="current-video-youtube" href="https://www.youtube.com/watch?v=${currentVideoId || ''}" target="_blank" rel="noopener noreferrer"
                           class="inline-flex shrink-0 items-center justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">
                            Voir sur YouTube ↗
                        </a>
                    </div>
                </div>

                <div class="mt-12 flex items-center justify-between">
                    <h3 class="font-serif text-2xl font-semibold italic md:text-3xl">${content['accueil.last_message.playlist'] || 'Messages récents'}</h3>
                    <div class="flex items-center gap-3">
                        <span class="mr-2 hidden text-xs font-bold uppercase tracking-widest text-white/35 md:inline">Glisser pour explorer</span>
                        <button id="messages-prev-btn" type="button" aria-label="Messages précédents"
                            class="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:border-glow hover:bg-glow hover:text-ink">←</button>
                        <button id="messages-next-btn" type="button" aria-label="Messages suivants"
                            class="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:border-glow hover:bg-glow hover:text-ink">→</button>
                    </div>
                </div>

                <div id="messages-carousel" class="scrollbar-hide mt-6 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-1 pb-4 select-none active:cursor-grabbing">
                    ${youtubeVideos.length > 0 ? youtubeVideos.map((video, index) => `
                        <button data-video-id="${video.videoId}"
                            data-video-title="${video.title.replace(/"/g, '&quot;')}"
                            data-video-date="${video.publishedAt || ''}"
                            class="youtube-video-btn group w-[78vw] max-w-[390px] shrink-0 snap-start text-left sm:w-[44vw] lg:w-[29vw] ${index === 0 ? 'is-active' : ''}">
                            <div class="video-card-frame relative aspect-video overflow-hidden rounded-2xl border-2 ${index === 0 ? 'border-glow' : 'border-transparent'} bg-white/5 transition group-hover:border-white/30">
                                <img src="${video.thumbnail}" alt="" draggable="false" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                                <span class="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/30">
                                    <span class="grid h-12 w-12 place-items-center rounded-full bg-white text-lg text-black shadow-lg transition group-hover:scale-110">▶</span>
                                </span>
                            </div>
                            <p class="mt-4 line-clamp-2 font-display text-lg font-bold leading-tight text-white/80 transition group-hover:text-white">${video.title}</p>
                            <p class="mt-2 text-xs font-bold uppercase tracking-wider text-white/35">${video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Message'}</p>
                        </button>
                    `).join('') : '<p class="py-12 text-white/45">Les prochains messages apparaîtront bientôt ici.</p>'}
                </div>

                <a class="mt-7 inline-flex items-center gap-2 border-b border-paper/30 pb-2 text-sm font-black uppercase tracking-wider md:hidden"
                   href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" rel="noopener noreferrer">Tous les messages ↗</a>
            </div>
        </section>

        <!-- PROCHAINS ÉVÉNEMENTS -->
    <section id="events" class="bg-[#f2efe8] border-y border-black/10">
        <div class="mx-auto max-w-[1500px] px-4 py-16 md:px-8 md:py-28">
            <div class="flex items-end justify-between gap-8">
                <div>
                    <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">Agenda</p>
                    <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">${styledTitle(content['accueil.events.title'] || 'Événements à venir')}</h2>
                    <p class="mt-5 font-serif text-lg italic text-black/50 md:text-2xl">${content['accueil.events.subtitle'] || 'Rejoins-nous en présentiel ou en ligne.'}</p>
                </div>
            </div>

            ${activeEventCategory ? `
            <div class="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-5 py-4">
                <span class="text-xs font-black uppercase tracking-[0.16em] text-black/45">Catégorie</span>
                <span class="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">${activeEventCategory}</span>
                <a href="#/actu" class="ml-auto text-sm font-bold text-punch hover:underline">Tous les événements ×</a>
            </div>` : ''}
            <div class="mt-12">${eventsHtml}</div>

        </div>
    </section>

        <!-- ACTUALITÉS -->
        <section id="actu-section" class="overflow-hidden bg-white px-4 py-16 md:px-8 md:py-28">
          <div class="mx-auto max-w-[1500px]">
            <div class="flex items-end justify-between gap-8">
                <div class="max-w-5xl">
                    <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">Actualités</p>
                    <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">${styledTitle(content['accueil.actu.title'] || 'Dernières Actualités')}</h2>
                    <p class="mt-5 font-serif text-lg italic text-black/50 md:text-2xl">${content['accueil.actu.subtitle'] || 'Restez informé de la vie de l\'église'}</p>
                </div>
                <a class="hidden shrink-0 items-center gap-2 border-b border-black/30 pb-2 text-sm font-black uppercase tracking-wider transition hover:border-punch hover:text-punch md:inline-flex" href="#/journal">
                    ${content['accueil.actu.cta'] || 'Toutes les actualités'} →
                </a>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-12 md:grid-rows-2">
                ${articlesHtml}
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full border border-black/15 px-5 py-4 font-bold hover:border-black/40" href="#/journal">
                    ${content['accueil.actu.cta'] || 'Voir toutes les actus'}
                </a>
            </div>
          </div>

          <div class="mt-16 -mx-4 rotate-[-1deg] overflow-hidden bg-glow py-4 text-ink md:-mx-8 md:mt-24">
            <div class="whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                Actualités&nbsp; • &nbsp;Histoires&nbsp; • &nbsp;Vie d’église&nbsp; • &nbsp;Témoignages&nbsp; • &nbsp;Actualités&nbsp; • &nbsp;Histoires&nbsp; • &nbsp;Vie d’église&nbsp; →
            </div>
          </div>
        </section>

        <!-- MOSAÏQUE - HOME GROUPS -->
        <section class="w-full bg-paper">
            <div class="mx-auto max-w-[95%] px-4 md:px-8 py-12 md:py-16">
                <h2 class="text-center font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-[-0.05rem] lg:tracking-[-0.15rem] leading-[0.9]">
                    ${styledTitle(content['accueil.groups.title'] || 'Rejoignez un Groupe de Maison')}
                </h2>
                <p class="mt-4 text-center font-serif italic text-lg md:text-xl text-black/50 max-w-2xl mx-auto">
                    ${content['accueil.groups.subtitle'] || 'La vie d\'église se vit aussi en semaine. Trouvez un groupe près de chez vous pour partager, prier et grandir ensemble.'}
                </p>

                ${homeGroupsHtml}

                <div class="mt-10 text-center">
                    <a href="#/home-groups" class="inline-flex justify-center rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition">
                        ${content['accueil.groups.cta'] || 'Voir tous les groupes'}
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
                        <h2 class="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-[-0.05rem] lg:tracking-[-0.15rem] leading-[0.9]">${styledTitle(content['accueil.newsletter.title'] || 'Restez Informé', 'text-glow')}</h2>
                        <p class="mt-3 font-serif italic text-lg md:text-xl text-paper/50">${content['accueil.newsletter.subtitle'] || 'Recevez nos actualités et annonces directement dans votre boîte mail.'}</p>
                    </div>

                    <form class="rounded-3xl bg-paper/10 border border-paper/10 p-6">
                        <label class="text-sm font-bold">Email</label>
                        <div class="mt-2 flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="votre@email.com" class="w-full rounded-2xl px-4 py-3 bg-paper text-ink placeholder:text-black/40 outline-none" />
                            <button class="rounded-2xl px-6 py-3 font-black bg-glow text-ink hover:opacity-90" type="button">
                                ${content['accueil.newsletter.cta'] || "S'inscrire"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    `;

    // Attach YouTube playlist click handlers + Events carousel (must run after innerHTML render)
    setTimeout(() => {
        // YouTube playlist
        const videoButtons = document.querySelectorAll('.youtube-video-btn');
        const player = document.getElementById('youtube-player');
        const titleEl = document.getElementById('current-video-title');
        const dateEl = document.getElementById('current-video-date');
        const youtubeLink = document.getElementById('current-video-youtube');

        videoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoId = btn.dataset.videoId;
                const videoTitle = btn.dataset.videoTitle;
                const videoDate = btn.dataset.videoDate;

                if (player) {
                    player.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
                }

                if (titleEl) {
                    titleEl.textContent = videoTitle;
                }

                if (dateEl) {
                    dateEl.textContent = videoDate
                        ? new Date(videoDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Message récent';
                }

                if (youtubeLink) {
                    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
                }

                videoButtons.forEach(b => {
                    b.classList.remove('is-active');
                    b.querySelector('.video-card-frame')?.classList.remove('border-glow');
                    b.querySelector('.video-card-frame')?.classList.add('border-transparent');
                });
                btn.classList.add('is-active');
                btn.querySelector('.video-card-frame')?.classList.remove('border-transparent');
                btn.querySelector('.video-card-frame')?.classList.add('border-glow');
                player?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        // Carrousel des messages : flèches + glisser-déposer à la souris.
        const messagesCarousel = document.getElementById('messages-carousel');
        const messagesPrevBtn = document.getElementById('messages-prev-btn');
        const messagesNextBtn = document.getElementById('messages-next-btn');

        if (messagesCarousel) {
            const scrollMessages = (direction) => {
                const card = messagesCarousel.querySelector('.youtube-video-btn');
                const amount = card ? card.getBoundingClientRect().width + 20 : messagesCarousel.clientWidth * 0.8;
                messagesCarousel.scrollBy({ left: direction * amount, behavior: 'smooth' });
            };

            messagesPrevBtn?.addEventListener('click', () => scrollMessages(-1));
            messagesNextBtn?.addEventListener('click', () => scrollMessages(1));

            let dragging = false;
            let dragged = false;
            let startX = 0;
            let startScrollLeft = 0;
            let lastX = 0;
            let lastTime = 0;
            let velocity = 0;
            let wheelSnapTimer;

            messagesCarousel.addEventListener('pointerdown', (event) => {
                if (event.pointerType !== 'mouse' || event.button !== 0) return;
                dragging = true;
                dragged = false;
                startX = event.clientX;
                startScrollLeft = messagesCarousel.scrollLeft;
                lastX = event.clientX;
                lastTime = performance.now();
                velocity = 0;
                messagesCarousel.style.scrollSnapType = 'none';
                messagesCarousel.style.scrollBehavior = 'auto';
            });

            messagesCarousel.addEventListener('pointermove', (event) => {
                if (!dragging) return;
                const distance = event.clientX - startX;
                if (Math.abs(distance) > 5) dragged = true;
                messagesCarousel.scrollLeft = startScrollLeft - distance;

                const now = performance.now();
                const elapsed = now - lastTime;
                if (elapsed > 0) velocity = (lastX - event.clientX) / elapsed;
                lastX = event.clientX;
                lastTime = now;
            });

            const stopDragging = () => {
                if (!dragging) return;
                dragging = false;

                // Prolonge naturellement le geste, puis réactive l'alignement des cartes.
                messagesCarousel.scrollBy({ left: velocity * 180, behavior: 'smooth' });
                window.setTimeout(() => {
                    messagesCarousel.style.scrollSnapType = '';
                    messagesCarousel.style.scrollBehavior = '';
                }, 350);
            };
            messagesCarousel.addEventListener('pointerup', stopDragging);
            messagesCarousel.addEventListener('pointercancel', stopDragging);
            messagesCarousel.addEventListener('pointerleave', stopDragging);

            // Une molette verticale déplace naturellement le carrousel horizontal.
            messagesCarousel.addEventListener('wheel', (event) => {
                if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
                event.preventDefault();
                messagesCarousel.style.scrollSnapType = 'none';
                messagesCarousel.scrollBy({ left: event.deltaY * 1.15, behavior: 'auto' });
                window.clearTimeout(wheelSnapTimer);
                wheelSnapTimer = window.setTimeout(() => {
                    messagesCarousel.style.scrollSnapType = '';
                }, 160);
            }, { passive: false });
            messagesCarousel.addEventListener('click', (event) => {
                if (dragged) {
                    event.preventDefault();
                    event.stopPropagation();
                    dragged = false;
                }
            }, true);
        }

        // Events carousel navigation
        const eventsCarousel = document.getElementById('events-carousel');
        const prevBtn = document.getElementById('prev-events-btn');
        const nextBtn = document.getElementById('next-events-btn');

        if (eventsCarousel && prevBtn && nextBtn) {
            const getScrollAmount = () => {
                if (window.innerWidth >= 1024) return eventsCarousel.clientWidth * 0.33;
                if (window.innerWidth >= 768) return eventsCarousel.clientWidth * 0.5;
                return eventsCarousel.clientWidth * 0.85;
            };

            prevBtn.onclick = () => {
                eventsCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            };
            nextBtn.onclick = () => {
                eventsCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            };

            const updateButtons = () => {
                if (window.innerWidth < 768) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    return;
                }
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';

                const sl = eventsCarousel.scrollLeft;
                const cw = eventsCarousel.clientWidth;
                const sw = eventsCarousel.scrollWidth;

                prevBtn.style.opacity = sl <= 10 ? '0' : '1';
                prevBtn.style.pointerEvents = sl <= 10 ? 'none' : 'auto';

                nextBtn.style.opacity = (sl + cw >= sw - 10) ? '0' : '1';
                nextBtn.style.pointerEvents = (sl + cw >= sw - 10) ? 'none' : 'auto';
            };

            eventsCarousel.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            setTimeout(updateButtons, 150);
        }
    }, 100);

    return html;
}
