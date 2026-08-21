import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

const kidzHeroVideoUrl = new URL('../../assets/videos/kidz-hero.mp4', import.meta.url).href;

export async function kidz() {
    // Récupération des articles filtrés par tag "kidz" + contenu éditorial
    let articles = [];
    const [articlesResponse, c] = await Promise.all([
        api.getArticles(null, 3, false, 'kidz').catch(() => null),
        tAll({
            'kidz.hero.tags': 'FUN • SÉCURITÉ • JÉSUS',
            'kidz.hero.title': 'Un endroit où les enfants se sentent aimés, en sécurité et grandissent avec Jésus.',
            'kidz.hero.subtitle': 'Kidz, c\'est le programme des enfants de La Rencontre. Chaque dimanche, vos enfants vivent un moment spécial adapté à leur âge.',
            'kidz.values.title': 'Ce que les enfants vivent ici',
            'kidz.values.subtitle': 'Nos valeurs pour chaque enfant : vu, en sécurité, heureux, connecté et sauvé.',
            'kidz.values.vu.title': 'Vu',
            'kidz.values.vu.description': 'Un endroit où chaque enfant est vu et aimé.',
            'kidz.values.safe.title': 'En sécurité',
            'kidz.values.safe.description': 'La sécurité est notre priorité (accueil et remise sécurisés).',
            'kidz.values.happy.title': 'Heureux',
            'kidz.values.happy.description': 'On s\'amuse, on apprend, on repart avec le sourire.',
            'kidz.values.connected.title': 'Connecté',
            'kidz.values.connected.description': 'Des amitiés durables se créent chaque semaine.',
            'kidz.values.saved.title': 'Sauvé',
            'kidz.values.saved.description': 'Le but : une relation personnelle avec Jésus-Christ.',
            'kidz.groups.title': 'Groupes d\'âge',
            'kidz.groups.subtitle': 'Des espaces adaptés à chaque âge pour que chaque enfant vive une expérience adaptée.',
            'kidz.groups.petits.label': 'Petits',
            'kidz.groups.petits.age': '3 — 6 ans',
            'kidz.groups.petits.description': 'Un espace joyeux et sécurisé pour découvrir Dieu à travers le jeu, les chansons et les histoires bibliques.',
            'kidz.groups.grands.label': 'Grands',
            'kidz.groups.grands.age': '7 — 11 ans',
            'kidz.groups.grands.description': 'Des leçons engageantes, des activités interactives et des temps de louange pour rendre la Bible vivante.',
            'kidz.steps.title': 'Comment ça se passe',
            'kidz.steps.subtitle': 'Accueil de votre enfant au début du service, puis culte en famille, puis Kidz.',
            'kidz.steps.1.title': 'Accueil',
            'kidz.steps.1.description': 'Arrivez un peu avant le début du culte. L\'équipe Kidz accueille votre enfant et vous donne toutes les informations utiles.',
            'kidz.steps.2.title': 'Moment Kidz',
            'kidz.steps.2.description': 'Pendant le culte, les enfants vivent un temps dédié : louange, histoire biblique, jeux et activités créatives.',
            'kidz.steps.3.title': 'Retrouvailles',
            'kidz.steps.3.description': 'À la fin du service, venez récupérer votre enfant. Il repartira avec un grand sourire et plein de choses à raconter !',
        }).catch(() => ({}))
    ]);

    if (articlesResponse && articlesResponse.articles) {
        articles = articlesResponse.articles;
    }

    // Construction HTML dynamique des articles
    const articlesHtml = articles.length > 0
        ? articles.map(article => {
            const imageUrl = article.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80';
            return `
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] overflow-hidden">
                    <img src="${imageUrl}" alt="${article.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">${article.category || 'Kidz'}</p>
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
                <div class="aspect-[16/10] bg-gradient-to-br from-purple-400/20 to-green-400/10"></div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">À venir</p>
                    <h3 class="mt-2 text-lg font-black">Restez connectés</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">De nouvelles actualités Kidz arrivent bientôt...</p>
                </div>
            </article>
        `.repeat(3);

    return `
    <div class="elr-page font-sans">

        <!-- HERO -->
        <section class="relative min-h-[82vh] overflow-hidden bg-ink text-white md:min-h-[88vh]">
            <video class="absolute inset-0 h-full w-full object-cover" autoplay muted loop playsinline preload="metadata"
                   poster="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80"
                   aria-label="Des enfants participent à un atelier créatif">
                <source src="${kidzHeroVideoUrl}" type="video/mp4">
            </video>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10"></div>
            <div class="pointer-events-none absolute inset-0 bg-punch/15 mix-blend-color"></div>

            <div class="relative mx-auto flex min-h-[82vh] max-w-[1500px] flex-col justify-between px-5 py-8 md:min-h-[88vh] md:px-10 md:py-12">
                <div class="flex items-start justify-between gap-4">
                    <p class="rounded-full border border-white/40 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">${c['kidz.hero.tags'] || 'Fun • Sécurité • Jésus'}</p>
                    <p class="hidden rounded-full bg-glow px-5 py-2 text-sm font-black text-ink shadow-lg sm:block">Chaque dimanche · 9h et 11h</p>
                </div>

                <div class="grid items-end gap-8 pb-3 lg:grid-cols-12">
                    <div class="lg:col-span-7">
                        <p class="font-display text-[26vw] font-extrabold uppercase leading-[0.62] tracking-[-0.09em] text-white sm:text-[10rem] lg:text-[12rem]">Kidz<span class="text-glow">.</span></p>
                        <h1 class="mt-8 max-w-4xl font-display text-3xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">${c['kidz.hero.title'] || 'Un endroit où les enfants se sentent aimés, en sécurité et grandissent avec Jésus.'}</h1>
                    </div>
                    <div class="rounded-[1.5rem] border border-white/20 bg-black/45 p-5 backdrop-blur-md md:p-7 lg:col-span-5">
                        <p class="font-serif text-lg leading-relaxed text-white/80 md:text-xl">${c['kidz.hero.subtitle'] || "Kidz, c'est le programme des enfants de La Rencontre."}</p>
                        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a href="#expect" class="inline-flex justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">À quoi s’attendre</a>
                            <a href="#serve" class="inline-flex justify-center rounded-full border border-white/50 px-6 py-3 font-black transition hover:bg-white hover:text-ink">Groupes d’âge</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- VALUES -->
        <section id="values" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Nos valeurs</p>
                    <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-7xl">${c['kidz.values.title'] || 'Ce que les enfants vivent ici'}</h2>
                    <p class="mt-2 text-black/70">${c['kidz.values.subtitle'] || 'Nos valeurs pour chaque enfant.'}</p>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <!-- card -->
                <div class="rounded-3xl border-2 border-ink bg-punch p-6 text-white shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">V</div>
                    <h3 class="mt-4 font-black text-lg">${c['kidz.values.vu.title'] || 'Vu'}</h3>
                    <p class="mt-2 text-sm text-white/80">${c['kidz.values.vu.description'] || 'Un endroit où chaque enfant est vu et aimé.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-glow p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✔</div>
                    <h3 class="mt-4 font-black text-lg">${c['kidz.values.safe.title'] || 'En sécurité'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['kidz.values.safe.description'] || 'La sécurité est notre priorité.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ff7fbf] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">☺</div>
                    <h3 class="mt-4 font-black text-lg">${c['kidz.values.happy.title'] || 'Heureux'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['kidz.values.happy.description'] || 'On s\'amuse, on apprend, on repart avec le sourire.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#73d7ff] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">⟡</div>
                    <h3 class="mt-4 font-black text-lg">${c['kidz.values.connected.title'] || 'Connecté'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['kidz.values.connected.description'] || 'Des amitiés durables se créent chaque semaine.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ffd84d] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✝</div>
                    <h3 class="mt-4 font-black text-lg">${c['kidz.values.saved.title'] || 'Sauvé'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['kidz.values.saved.description'] || 'Le but : une relation personnelle avec Jésus-Christ.'}</p>
                </div>
            </div>
        </section>

        <!-- WHO WE SERVE -->
        <section id="serve" class="border-y border-black/10 bg-punch text-white">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-white/50 uppercase">Groupes d'âge</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold md:text-8xl">${c['kidz.groups.title'] || 'Groupes d\'âge'}</h2>
                    <p class="mt-4 font-serif text-xl italic text-white/70">
                        ${c['kidz.groups.subtitle'] || 'Des espaces adaptés à chaque âge.'}
                    </p>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <article class="overflow-hidden rounded-[2rem] border-2 border-white/30 bg-paper text-ink shadow-xl">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85" alt="Groupe des petits" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${c['kidz.groups.petits.label'] || 'Petits'}</p>
                            <h3 class="mt-2 text-xl font-black">${c['kidz.groups.petits.age'] || '3 — 6 ans'}</h3>
                            <p class="mt-2 text-black/70">
                                ${c['kidz.groups.petits.description'] || 'Un espace joyeux et sécurisé pour découvrir Dieu.'}
                            </p>
                        </div>
                    </article>

                    <article class="overflow-hidden rounded-[2rem] border-2 border-white/30 bg-paper text-ink shadow-xl">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1526634332515-d56c5fd16991?auto=format&fit=crop&w=1000&q=85" alt="Groupe des grands" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${c['kidz.groups.grands.label'] || 'Grands'}</p>
                            <h3 class="mt-2 text-xl font-black">${c['kidz.groups.grands.age'] || '7 — 11 ans'}</h3>
                            <p class="mt-2 text-black/70">
                                ${c['kidz.groups.grands.description'] || 'Des leçons engageantes et des activités interactives.'}
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- WHAT TO EXPECT -->
        <section id="expect" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Déroulement</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold leading-tight md:text-8xl">${c['kidz.steps.title'] || 'Comment ça se passe'}</h2>
                    <p class="mt-2 text-black/70">
                        ${c['kidz.steps.subtitle'] || 'Accueil de votre enfant au début du service.'}
                    </p>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#7c3aed]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">1</div>
                    <h3 class="mt-4 text-xl font-black">${c['kidz.steps.1.title'] || 'Accueil'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['kidz.steps.1.description'] || 'Arrivez un peu avant le début du culte.'}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-punch"></div>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#a3ff12]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">2</div>
                    <h3 class="mt-4 text-xl font-black">${c['kidz.steps.2.title'] || 'Moment Kidz'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['kidz.steps.2.description'] || 'Pendant le culte, les enfants vivent un temps dédié.'}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-glow"></div>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#ff7fbf]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">3</div>
                    <h3 class="mt-4 text-xl font-black">${c['kidz.steps.3.title'] || 'Retrouvailles'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['kidz.steps.3.description'] || 'À la fin du service, venez récupérer votre enfant.'}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-[#ff7fbf]"></div>
                </article>
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold bg-ink text-paper hover:opacity-90"
                    href="#/contact">
                    Nous contacter
                </a>
            </div>
        </section>

        <!-- ACTUALITÉS KIDZ -->
        <section id="actu-kidz" class="bg-haze">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Actualités</p>
                        <h2 class="mt-3 font-display text-5xl font-extrabold md:text-7xl">Dernières actus <span class="font-serif font-medium italic text-punch">Kidz</span></h2>
                        <p class="mt-2 text-black/70">Restez informé de tout ce qui se passe chez Kidz</p>
                    </div>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-3">
                    ${articlesHtml}
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="bg-ink text-paper">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="max-w-3xl">
                    <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Questions</p>
                    <h2 class="mt-3 font-display text-6xl font-extrabold md:text-8xl">FAQ<span class="text-glow">.</span></h2>
                    <p class="mt-2 text-paper/80">Questions fréquentes sur Kidz.</p>
                </div>

                <div class="mt-8 grid gap-4">
                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quel âge pour Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Deux groupes : les Petits (3-6 ans) et les Grands (7-11 ans). Chaque groupe a son propre espace et ses activités adaptées.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quand a lieu Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Chaque dimanche matin pendant le culte de 10h00. Les enfants rejoignent leur groupe après la louange.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Mes enfants d’âges différents peuvent rester ensemble ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Les espaces et programmes sont pensés par tranche d’âge ; pour la sécurité, les enfants restent
                            dans leur groupe.
                        </p>
                    </details>
                </div>

                <div class="mt-10 flex flex-col sm:flex-row gap-3">
                    <a class="inline-flex justify-center rounded-full px-6 py-3 font-black bg-glow text-ink hover:opacity-90"
                        href="#/contact">
                        Nous contacter
                    </a>
                </div>
            </div>
        </section>
    </div>
    `;
}
