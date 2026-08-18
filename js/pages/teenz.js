import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

export async function teenz() {
    let articles = [];
    const [articlesResponse, c] = await Promise.all([
        api.getArticles(null, 3, false, 'teenz').catch(() => null),
        tAll({
            'teenz.hero.tags': 'FUN • REAL • JÉSUS',
            'teenz.hero.title': "L'endroit où ta génération se retrouve, se sent comprise et impacte le monde.",
            'teenz.hero.subtitle': 'Des rencontres authentiques, des discussions vraies et une foi qui bouge les lignes.',
            'teenz.values.title': 'Notre Culture',
            'teenz.values.subtitle': 'Connecter • Grandir • Servir • Influencer',
            'teenz.values.connect.title': 'Connecter',
            'teenz.values.connect.description': 'Des relations fortes pour ne jamais marcher seul.',
            'teenz.values.grow.title': 'Grandir',
            'teenz.values.grow.description': 'Découvrir son identité et son potentiel en Dieu.',
            'teenz.values.serve.title': 'Servir',
            'teenz.values.serve.description': 'Utiliser ses talents pour faire une différence.',
            'teenz.values.influence.title': 'Influencer',
            'teenz.values.influence.description': 'Être une lumière dans son lycée et sa ville.',
            'teenz.groups.title': 'Groupes',
            'teenz.groups.subtitle': 'Collège et Lycée — Des moments adaptés à ta réalité.',
            'teenz.groups.college.label': 'Collège',
            'teenz.groups.college.subtitle': 'La Relève (11-14 ans)',
            'teenz.groups.college.description': 'Fun, jeux, et discussions autour de la Bible pour naviguer les années collège.',
            'teenz.groups.lycee.label': 'Lycée',
            'teenz.groups.lycee.subtitle': 'Impact (15-18 ans)',
            'teenz.groups.lycee.description': 'Des soirées pour aller plus loin, aborder les vrais sujets et vivre une louange intense.',
            'teenz.steps.title': "À quoi t'attendre",
            'teenz.steps.1.title': 'Chill',
            'teenz.steps.1.description': 'Un temps pour se poser, manger un bout et discuter avec les potes avant que ça commence.',
            'teenz.steps.2.title': 'Message',
            'teenz.steps.2.description': 'Un enseignement pertinent qui connecte la Bible à ta vie de tous les jours.',
            'teenz.steps.3.title': 'Small Groups',
            'teenz.steps.3.description': 'Le moment le plus important : on se divise en petits groupes pour parler vrai et prier.',
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
                    <p class="text-xs font-bold text-punch uppercase">${article.category || 'Teenz'}</p>
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
                <div class="aspect-[16/10] bg-gradient-to-br from-pink-400/20 to-purple-400/10"></div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">À venir</p>
                    <h3 class="mt-2 text-lg font-black">Restez connectés</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">De nouvelles actualités Teenz arrivent bientôt...</p>
                </div>
            </article>
        `.repeat(3);

    return `
    <div class="elr-page font-sans">
        <!-- HERO -->
        <section class="relative min-h-[82vh] overflow-hidden bg-ink text-white md:min-h-[88vh]">
            <video class="absolute inset-0 h-full w-full object-cover" autoplay muted loop playsinline preload="metadata"
                   poster="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
                   aria-label="Un groupe de jeunes partage un moment ensemble">
                <source src="/assets/videos/teenz-hero.mp4" type="video/mp4">
            </video>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/15"></div>
            <div class="pointer-events-none absolute inset-0 bg-punch/20 mix-blend-color"></div>

            <div class="relative mx-auto flex min-h-[82vh] max-w-[1500px] flex-col justify-between px-5 py-8 md:min-h-[88vh] md:px-10 md:py-12">
                <div class="flex items-start justify-between gap-4">
                    <p class="rounded-full border border-white/40 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">${c['teenz.hero.tags'] || 'Fun • Real • Jésus'}</p>
                    <p class="hidden rounded-full bg-punch px-5 py-2 text-sm font-black text-white shadow-lg sm:block">Connecter · Grandir · Impacter</p>
                </div>

                <div class="grid items-end gap-8 pb-3 lg:grid-cols-12">
                    <div class="lg:col-span-7">
                        <p class="font-display text-[24vw] font-extrabold uppercase leading-[0.62] tracking-[-0.09em] text-white sm:text-[9rem] lg:text-[11rem]">Teenz<span class="text-punch">.</span></p>
                        <h1 class="mt-8 max-w-4xl font-display text-3xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">${c['teenz.hero.title'] || "L'endroit où ta génération se retrouve, se sent comprise et impacte le monde."}</h1>
                    </div>
                    <div class="rounded-[1.5rem] border border-white/20 bg-black/50 p-5 backdrop-blur-md md:p-7 lg:col-span-5">
                        <p class="font-serif text-lg leading-relaxed text-white/80 md:text-xl">${c['teenz.hero.subtitle'] || 'Des rencontres authentiques, des discussions vraies et une foi qui bouge les lignes.'}</p>
                        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a href="#expect" class="inline-flex justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">À quoi t’attendre</a>
                            <a href="#serve" class="inline-flex justify-center rounded-full border border-white/50 px-6 py-3 font-black transition hover:bg-white hover:text-ink">Nos groupes</a>
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
                    <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-7xl">${c['teenz.values.title'] || 'Notre Culture'}</h2>
                    <p class="mt-2 text-black/70">${c['teenz.values.subtitle'] || 'Connecter • Grandir • Servir • Influencer'}</p>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-3xl border-2 border-ink bg-punch p-6 text-white shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">C</div>
                    <h3 class="mt-4 font-black text-lg">${c['teenz.values.connect.title'] || 'Connecter'}</h3>
                    <p class="mt-2 text-sm text-white/80">${c['teenz.values.connect.description'] || 'Des relations fortes pour ne jamais marcher seul.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-glow p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">G</div>
                    <h3 class="mt-4 font-black text-lg">${c['teenz.values.grow.title'] || 'Grandir'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['teenz.values.grow.description'] || 'Découvrir son identité et son potentiel en Dieu.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#73d7ff] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">S</div>
                    <h3 class="mt-4 font-black text-lg">${c['teenz.values.serve.title'] || 'Servir'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['teenz.values.serve.description'] || 'Utiliser ses talents pour faire une différence.'}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ff7fbf] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">I</div>
                    <h3 class="mt-4 font-black text-lg">${c['teenz.values.influence.title'] || 'Influencer'}</h3>
                    <p class="mt-2 text-sm text-black/70">${c['teenz.values.influence.description'] || 'Être une lumière dans son lycée et sa ville.'}</p>
                </div>
            </div>
        </section>

        <!-- WHO WE SERVE -->
        <section id="serve" class="border-y border-black/10 bg-glow">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Nos groupes</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold md:text-8xl">${c['teenz.groups.title'] || 'Groupes'}</h2>
                    <p class="mt-4 font-serif text-xl italic text-black/60">
                        ${c['teenz.groups.subtitle'] || 'Collège et Lycée — Des moments adaptés à ta réalité.'}
                    </p>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <article class="overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[7px_7px_0_#0b0b0f]">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" alt="Groupe collège" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${c['teenz.groups.college.label'] || 'Collège'}</p>
                            <h3 class="mt-2 text-xl font-black">${c['teenz.groups.college.subtitle'] || 'La Relève (11-14 ans)'}</h3>
                            <p class="mt-2 text-black/70">
                                ${c['teenz.groups.college.description'] || 'Fun, jeux, et discussions autour de la Bible.'}
                            </p>
                        </div>
                    </article>

                    <article class="overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[7px_7px_0_#0b0b0f]">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85" alt="Groupe lycée" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${c['teenz.groups.lycee.label'] || 'Lycée'}</p>
                            <h3 class="mt-2 text-xl font-black">${c['teenz.groups.lycee.subtitle'] || 'Impact (15-18 ans)'}</h3>
                            <p class="mt-2 text-black/70">
                                ${c['teenz.groups.lycee.description'] || 'Des soirées pour aller plus loin, aborder les vrais sujets et vivre une louange intense.'}
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
                    <h2 class="mt-3 font-display text-5xl font-extrabold leading-tight md:text-8xl">${c['teenz.steps.title'] || "À quoi t'attendre"}</h2>
                </div>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#7c3aed]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">1</div>
                    <h3 class="mt-4 text-xl font-black">${c['teenz.steps.1.title'] || 'Chill'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['teenz.steps.1.description'] || 'Un temps pour se poser, manger un bout et discuter.'}
                    </p>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#a3ff12]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">2</div>
                    <h3 class="mt-4 text-xl font-black">${c['teenz.steps.2.title'] || 'Message'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['teenz.steps.2.description'] || 'Un enseignement pertinent qui connecte la Bible à ta vie.'}
                    </p>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#ff7fbf]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">3</div>
                    <h3 class="mt-4 text-xl font-black">${c['teenz.steps.3.title'] || 'Small Groups'}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${c['teenz.steps.3.description'] || 'On se divise en petits groupes pour parler vrai et prier.'}
                    </p>
                </article>
            </div>
        </section>

        <!-- ACTUALITÉS TEENZ -->
        <section id="actu-teenz" class="bg-haze">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Actualités</p>
                        <h2 class="mt-3 font-display text-5xl font-extrabold md:text-7xl">Dernières actus <span class="font-serif font-medium italic text-punch">Teenz</span></h2>
                        <p class="mt-2 text-black/70">Reste au courant de tout ce qui bouge chez Teenz</p>
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
                </div>

                <div class="mt-8 grid gap-4">
                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">C'est quand ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Tous les vendredis soirs à 19h30 pour les lycéens, et le dimanche matin pour les collégiens.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Je peux venir avec un ami ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Absolument ! Teenz est ouvert à tous, croyants ou non. Tout le monde est bienvenu.
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
