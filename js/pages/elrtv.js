// Page ELR TV - Lecteur média avec style Tailwind
export function elrtv() {
    // Ajouter les event listeners après le rendu
    setTimeout(() => {
        document.querySelectorAll('.media-card[data-type]').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                const url = card.dataset.url;
                playMedia(type, url);
            });
        });
    }, 0);

    return `
        <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div>
                <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Watch</p>
                <h1 class="mt-2 text-3xl md:text-4xl font-black">ELR TV</h1>
                <p class="mt-2 text-black/70">Retrouvez nos prédications et contenus audio/vidéo</p>
            </div>

            <div class="mt-6 rounded-2xl bg-yellow-100/70 border border-yellow-200 p-4">
                <p class="text-sm text-yellow-800">💡 <strong>Astuce :</strong> Le lecteur reste actif même en changeant de page !</p>
            </div>
        </section>

        <section class="mx-auto max-w-6xl px-4 pb-12">
            <h2 class="text-xl font-black mb-6">Dernières vidéos</h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <article class="media-card rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 cursor-pointer hover:shadow-lg transition" data-type="video" data-url="https://www.w3schools.com/html/mov_bbb.mp4">
                    <div class="aspect-video bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,.35),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(163,255,18,.25),transparent_55%)] grid place-items-center">
                        <span class="text-5xl">▶️</span>
                    </div>
                    <div class="p-5">
                        <span class="inline-flex items-center rounded-full bg-punch/10 text-punch px-3 py-1 text-xs font-bold">VIDÉO</span>
                        <h3 class="mt-2 text-lg font-black">Prédication du dimanche</h3>
                        <p class="mt-1 text-black/60 text-sm">45:00</p>
                    </div>
                </article>

                <article class="media-card rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 cursor-pointer hover:shadow-lg transition" data-type="audio" data-url="https://www.w3schools.com/html/horse.mp3">
                    <div class="aspect-video bg-[radial-gradient(circle_at_70%_30%,rgba(163,255,18,.35),transparent_55%),radial-gradient(circle_at_30%_70%,rgba(124,58,237,.25),transparent_55%)] grid place-items-center">
                        <span class="text-5xl">🎧</span>
                    </div>
                    <div class="p-5">
                        <span class="inline-flex items-center rounded-full bg-glow/30 text-ink px-3 py-1 text-xs font-bold">AUDIO</span>
                        <h3 class="mt-2 text-lg font-black">Podcast hebdomadaire</h3>
                        <p class="mt-1 text-black/60 text-sm">30:00</p>
                    </div>
                </article>

                <article class="media-card rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 cursor-pointer hover:shadow-lg transition" data-type="video" data-url="https://www.w3schools.com/html/mov_bbb.mp4">
                    <div class="aspect-video bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,.30),transparent_60%)] grid place-items-center">
                        <span class="text-5xl">▶️</span>
                    </div>
                    <div class="p-5">
                        <span class="inline-flex items-center rounded-full bg-punch/10 text-punch px-3 py-1 text-xs font-bold">VIDÉO</span>
                        <h3 class="mt-2 text-lg font-black">Étude biblique</h3>
                        <p class="mt-1 text-black/60 text-sm">1:15:00</p>
                    </div>
                </article>
            </div>
        </section>

        <section class="bg-ink text-paper">
            <div class="mx-auto max-w-6xl px-4 py-12">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-black">Notre chaîne YouTube</h2>
                        <p class="mt-2 text-paper/70">Retrouvez tous nos contenus sur YouTube</p>
                    </div>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" class="hidden md:inline-flex rounded-full px-6 py-3 font-bold bg-paper text-ink hover:opacity-90">
                        S'abonner
                    </a>
                </div>
            </div>
        </section>
    `;
}

// Fonction pour lire les médias
function playMedia(type, url) {
    const audioPlayer = document.getElementById('audio-player');
    const videoPlayer = document.getElementById('video-player');
    const playerContainer = document.getElementById('player-container');

    // Afficher le conteneur du player (retirer hidden, pas besoin de .active)
    playerContainer.classList.remove('hidden');

    if (type === 'audio') {
        videoPlayer.pause();
        videoPlayer.classList.add('hidden');
        audioPlayer.classList.remove('hidden');
        audioPlayer.src = url;
        audioPlayer.controls = true;
        audioPlayer.play();
    } else {
        audioPlayer.pause();
        audioPlayer.classList.add('hidden');
        videoPlayer.classList.remove('hidden');
        videoPlayer.src = url;
        videoPlayer.controls = true;
        videoPlayer.play();
    }
}
