import { api } from '../services/api.service.js';

// Page ELR TV - Lecteur média avec style Tailwind
export async function elrtv() {
    let playlists = [];
    let activePlaylistId = 'UUJ6ItUaNtiSYZBy2sUavMFQ'; // Default to "Uploads"
    let loading = true;
    let error = null;

    // Load data from YouTube API
    try {
        const response = await api.getYoutubePlaylists();
        if (response && response.items) {
            playlists = response.items;
        }
    } catch (err) {
        console.warn("YouTube API Fetch failed:", err.message);
        // If it fails (e.g. no API key), we'll still show the default player
        // but maybe a note for the developer
        if (err.message.includes("manquante")) {
            error = "Clé d'API YouTube non configurée. Affichage du mode limité.";
        }
    }

    loading = false;

    // Small delay to attach event listeners
    setTimeout(() => {
        const playlistLinks = document.querySelectorAll('.playlist-btn');
        const player = document.getElementById('youtube-player-iframe');
        const playerTitle = document.getElementById('player-playlist-name');

        playlistLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.dataset.id;
                const title = link.dataset.title;

                if (player) {
                    player.src = `https://www.youtube.com/embed/videoseries?list=${id}`;
                    if (playerTitle) playerTitle.textContent = title;

                    // Update active class
                    playlistLinks.forEach(l => l.classList.remove('bg-punch', 'text-white'));
                    playlistLinks.forEach(l => l.classList.add('bg-paper', 'text-ink'));
                    link.classList.remove('bg-paper', 'text-ink');
                    link.classList.add('bg-punch', 'text-white');

                    // Scroll to player
                    window.scrollTo({ top: document.getElementById('player-section').offsetTop - 100, behavior: 'smooth' });
                }
            });
        });

        // Local media players logic (from original code)
        document.querySelectorAll('.media-card[data-type]').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                const url = card.dataset.url;
                playMedia(type, url);
            });
        });
    }, 100);

    const renderPlaylistCard = (item) => {
        const isDefault = item.id === activePlaylistId;
        return `
        <button data-id="${item.id}" data-title="${item.snippet.title}" class="playlist-btn text-left group/playlist shrink-0 w-64 md:w-80 rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 transition-all hover:scale-[1.02] ${isDefault ? 'ring-2 ring-punch' : ''}">
            <div class="aspect-video relative">
                <img src="${item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url}" alt="${item.snippet.title}" class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/20 group-hover/playlist:bg-transparent transition-colors"></div>
                <div class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    ${item.contentDetails?.itemCount || '?'} vidéos
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-black text-sm md:text-base line-clamp-1">${item.snippet.title}</h3>
                <p class="text-xs text-black/50 mt-1 line-clamp-2">${item.snippet.description || 'Pas de description.'}</p>
            </div>
        </button>
        `;
    };

    return `
        <!-- Header -->
        <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Watch & Listen</p>
                    <h1 class="mt-2 text-4xl md:text-5xl font-black font-serif">ELR TV</h1>
                    <p class="mt-2 text-black/60 max-w-md">Retrouvez nos prédications, célébrations et contenus multimédias pour grandir ensemble.</p>
                </div>
                
                ${error ? `
                <div class="bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-xl text-xs text-yellow-800 flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>${error}</span>
                </div>` : ''}
            </div>

            <div class="mt-8 h-px bg-rule"></div>
        </section>

        <!-- Dynamic Player Section -->
        <section id="player-section" class="mx-auto max-w-6xl px-4 pb-16">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 id="player-playlist-name" class="text-xl md:text-2xl font-black">Dernières Vidéos</h2>
                    <p class="text-sm text-black/50">Flux de la chaîne @EgliseLaRencontre</p>
                </div>
                <a href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" class="hidden md:flex items-center gap-2 rounded-full bg-punch px-4 py-2 text-white text-sm font-bold shadow-sm hover:opacity-90">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    S'abonner
                </a>
            </div>
            
            <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-heavy border border-black/5 bg-ink">
                <iframe 
                    id="youtube-player-iframe"
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/videoseries?list=${activePlaylistId}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
        </section>

        <!-- Playlists Selector -->
        ${playlists.length > 0 ? `
        <section class="bg-black/5 py-16">
            <div class="mx-auto max-w-6xl px-4">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-black font-serif">Toutes nos Playlists</h2>
                    <span class="text-xs font-bold uppercase tracking-widest text-black/30 md:block hidden">← Glisser pour explorer →</span>
                </div>
                
                <div class="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x">
                    ${playlists.map(renderPlaylistCard).join('')}
                </div>
            </div>
        </section>` : ''}

        <!-- Local / Audio Section -->
        <section class="mx-auto max-w-6xl px-4 py-20">
            <h2 class="text-xl md:text-2xl font-black mb-10">Médias complémentaires</h2>
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <article class="media-card group rounded-[2.5rem] overflow-hidden bg-paper shadow-soft border border-rule cursor-pointer hover:shadow-xl transition-all duration-500" data-type="audio" data-url="https://www.w3schools.com/html/horse.mp3">
                    <div class="aspect-video relative overflow-hidden bg-ink/5 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full bg-paper/90 backdrop-blur-sm shadow-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span class="text-2xl">🎧</span>
                        </div>
                    </div>
                    <div class="p-8">
                        <span class="inline-flex items-center rounded-full bg-glow/30 text-ink px-4 py-1.5 text-[10px] font-black tracking-widest uppercase">Podcast</span>
                        <h3 class="mt-4 text-xl font-black font-serif">Podcast hebdomadaire</h3>
                        <p class="mt-2 text-black/50 text-sm leading-relaxed">Découvrez nos enseignements format audio pour vous accompagner partout.</p>
                    </div>
                </article>

                <article class="media-card group rounded-[2.5rem] overflow-hidden bg-paper shadow-soft border border-rule cursor-pointer hover:shadow-xl transition-all duration-500" data-type="video" data-url="https://www.w3schools.com/html/mov_bbb.mp4">
                    <div class="aspect-video relative overflow-hidden bg-ink/5 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full bg-paper/90 backdrop-blur-sm shadow-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span class="text-2xl">▶️</span>
                        </div>
                    </div>
                    <div class="p-8">
                        <span class="inline-flex items-center rounded-full bg-punch/10 text-punch px-4 py-1.5 text-[10px] font-black tracking-widest uppercase">Étude</span>
                        <h3 class="mt-4 text-xl font-black font-serif">Approfondissement</h3>
                        <p class="mt-2 text-black/50 text-sm leading-relaxed">Des vidéos courtes pour approfondir certains thèmes bibliques.</p>
                    </div>
                </article>
            </div>
        </section>
    `;
}

// Fonction pour lire les médias locaux
function playMedia(type, url) {
    const audioPlayer = document.getElementById('audio-player');
    const videoPlayer = document.getElementById('video-player');
    const playerContainer = document.getElementById('player-container');

    if (playerContainer) playerContainer.classList.remove('hidden');

    if (type === 'audio') {
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.classList.add('hidden');
        }
        if (audioPlayer) {
            audioPlayer.classList.remove('hidden');
            audioPlayer.src = url;
            audioPlayer.controls = true;
            audioPlayer.play();
        }
    } else {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.classList.add('hidden');
        }
        if (videoPlayer) {
            videoPlayer.classList.remove('hidden');
            videoPlayer.src = url;
            videoPlayer.controls = true;
            videoPlayer.play();
        }
    }
}
