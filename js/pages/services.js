import { tAll } from '../services/site-content.service.js';

export async function services() {
    const c = await tAll({
        'connect.hero.kicker': 'Église La Rencontre',
        'connect.what.title': 'Quoi',
        'connect.what.text': 'Découvrir la vision, les valeurs et comment trouver ta place dans l’église.',
        'connect.when.title': 'Quand',
        'connect.when.text': 'Chaque 2e dimanche du mois, pendant 3 semaines, à 9h00.',
        'connect.how.title': 'Comment',
        'connect.how.text': 'Inscris-toi à la table d’accueil pour le prochain parcours.',
        'connect.journey.kicker': 'Le parcours',
        'connect.journey.title': 'Trois semaines pour te connecter.',
        'connect.step.discover.title': 'Découvrir',
        'connect.step.discover.text': 'La vision et le cœur de La Rencontre.',
        'connect.step.grow.title': 'Grandir',
        'connect.step.grow.text': 'Nos valeurs et la manière dont nous vivons la foi ensemble.',
        'connect.step.place.title': 'Trouver ta place',
        'connect.step.place.text': 'Les prochaines étapes pour servir et t’engager.',
        'connect.cta.kicker': 'Prochain parcours',
        'connect.cta.title': 'Prêt à te connecter ?',
        'connect.cta.text': 'Rends-toi à la table d’accueil le dimanche ou écris-nous pour recevoir les prochaines dates.',
        'connect.cta.button': 'Nous contacter',
    });
    return `
        <div class="min-h-screen overflow-hidden bg-[#abc4ce] text-white">
            <!-- Hero LR Connect -->
            <section class="relative px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
                <div class="pointer-events-none absolute inset-0 opacity-25"
                     style="background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,.55) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 65%, rgba(255,255,255,.35) 0 1px, transparent 1.5px); background-size: 38px 38px, 57px 57px;"></div>

                <div class="relative mx-auto max-w-[1500px]">
                    <p class="text-xs font-black uppercase tracking-[0.3em] text-white/65">${c['connect.hero.kicker']}</p>
                    <h1 class="mt-5 font-display text-[19vw] font-extrabold leading-[0.72] tracking-[-0.085em] text-white sm:text-[8rem] lg:text-[10rem]">
                        LR <span class="font-serif font-medium italic">Connect</span>
                    </h1>

                    <div class="mt-14 grid items-center gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
                        <div class="lg:col-span-7">
                            <div class="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] border-[7px] border-white shadow-2xl md:rounded-[2.5rem]">
                                <img src="/assets/images/une-place-pour-toi.jpg" alt="Une communauté qui avance ensemble"
                                     class="h-full w-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"></div>
                                <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
                                    <p class="font-serif text-xl font-medium tracking-wide md:text-3xl">église <span class="font-sans font-black uppercase">La Rencontre</span></p>
                                    <p class="font-display text-5xl font-extrabold leading-none tracking-[-0.06em] md:text-8xl">connect<span class="text-glow">.</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-11 lg:col-span-5 lg:space-y-14">
                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${c['connect.what.title']}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${c['connect.what.text']}
                                </p>
                            </article>

                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${c['connect.when.title']}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${c['connect.when.text']}
                                </p>
                            </article>

                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${c['connect.how.title']}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${c['connect.how.text']}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Déroulé du parcours -->
            <section class="bg-[#f2efe8] px-5 py-20 text-ink md:px-10 md:py-28">
                <div class="mx-auto max-w-[1500px]">
                    <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
                        <div class="lg:col-span-7">
                            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">${c['connect.journey.kicker']}</p>
                            <h2 class="font-display text-5xl font-extrabold leading-[0.86] tracking-[-0.06em] md:text-8xl">
                                ${c['connect.journey.title']}
                            </h2>
                        </div>
                        <p class="max-w-xl font-serif text-xl italic leading-relaxed text-black/55 md:text-2xl lg:col-span-4 lg:col-start-9">
                            Un espace simple et convivial pour comprendre qui nous sommes et avancer avec nous.
                        </p>
                    </div>

                    <div class="mt-14 grid gap-5 md:grid-cols-3">
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-punch p-7 text-white md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">01</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${c['connect.step.discover.title']}</h3><p class="mt-4 text-white/75">${c['connect.step.discover.text']}</p></div>
                        </article>
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-glow p-7 md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">02</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${c['connect.step.grow.title']}</h3><p class="mt-4 text-black/60">${c['connect.step.grow.text']}</p></div>
                        </article>
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-ink p-7 text-white md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">03</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${c['connect.step.place.title']}</h3><p class="mt-4 text-white/65">${c['connect.step.place.text']}</p></div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Inscription -->
            <section class="bg-punch px-5 py-20 md:px-10 md:py-24">
                <div class="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/55">${c['connect.cta.kicker']}</p>
                        <h2 class="max-w-4xl font-display text-5xl font-extrabold leading-[0.88] md:text-8xl">${c['connect.cta.title']}</h2>
                        <p class="mt-6 max-w-2xl font-serif text-xl text-white/75">${c['connect.cta.text']}</p>
                    </div>
                    <a href="#/contact" class="shrink-0 rounded-full bg-white px-8 py-4 font-black text-ink transition hover:scale-105">${c['connect.cta.button']}</a>
                </div>
            </section>
        </div>
    `;
}
