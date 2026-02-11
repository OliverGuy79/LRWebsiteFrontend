export function kidz() {
    return `
    <div class="bg-paper text-ink font-sans">
        <!-- Header specific to Kidz page (optional, or rely on main header) -->
        <!-- Since existing layout has a main header, we might want to keep it or override it. 
             The provided HTML had its own header. I will include it as part of the page content 
             but maybe styling it to fit within the main styling if needed.
             However, the prompt says "integrate it", implying it should likely be the page content.
             The provided HTML has a header with "TC KIDZ". 
             I will render the entire functionality within the main content area, 
             excluding the <html>, <head>, and <body> tags which are handled by index.html.
        -->

        <!-- HERO -->
        <section class="relative overflow-hidden">
            <div class="absolute inset-0">
                <div
                    class="h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,.22),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(163,255,18,.18),transparent_60%)]">
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/35 to-paper"></div>
            </div>

            <div class="relative mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-14">
                <div class="max-w-3xl">
                    <p
                        class="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-4 py-1.5 text-xs font-bold tracking-wide">
                        <span class="h-2 w-2 rounded-full bg-glow"></span>
                        FUN • SAFE • JESUS
                    </p>

                    <h1 class="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
                        Un endroit où les enfants se sentent <span class="text-punch">vus</span>,
                        <span class="underline decoration-glow decoration-8 underline-offset-4">en sécurité</span>
                        et grandissent avec Jésus.
                    </h1>

                    <p class="mt-5 text-base md:text-lg text-black/70 max-w-2xl">
                        Mise en page inspirée : gros titres, sections claires, cartes arrondies, CTA visibles.
                    </p>

                    <div class="mt-8 flex flex-col sm:flex-row gap-3">
                        <a href="#expect"
                            class="inline-flex justify-center rounded-full px-6 py-3 font-black bg-ink text-paper hover:opacity-90">
                            À quoi s’attendre
                        </a>
                        <a href="#serve"
                            class="inline-flex justify-center rounded-full px-6 py-3 font-black border border-black/10 hover:border-black/30">
                            Voir les groupes d’âge
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- VALUES -->
        <section id="values" class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Values</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Ce que les enfants vivent ici</h2>
                    <p class="mt-2 text-black/70">“Seen • Safe • Smiling • Social • Salvation” (inspiré du contenu de la
                        page).</p>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <!-- card -->
                <div class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">S</div>
                    <h3 class="mt-4 font-black text-lg">Seen</h3>
                    <p class="mt-2 text-sm text-black/70">Un endroit où chaque enfant est vu et aimé.</p>
                </div>
                <div class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✔</div>
                    <h3 class="mt-4 font-black text-lg">Safe</h3>
                    <p class="mt-2 text-sm text-black/70">La sécurité est la priorité (check-in / check-out).</p>
                </div>
                <div class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">☺</div>
                    <h3 class="mt-4 font-black text-lg">Smiling</h3>
                    <p class="mt-2 text-sm text-black/70">On s’amuse, on apprend, on repart heureux.</p>
                </div>
                <div class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">⟡</div>
                    <h3 class="mt-4 font-black text-lg">Social</h3>
                    <p class="mt-2 text-sm text-black/70">Des amitiés durables se créent.</p>
                </div>
                <div class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✝</div>
                    <h3 class="mt-4 font-black text-lg">Salvation</h3>
                    <p class="mt-2 text-sm text-black/70">Le but : une relation personnelle avec Christ.</p>
                </div>
            </div>
        </section>

        <!-- WHO WE SERVE -->
        <section id="serve" class="bg-haze border-y border-black/5">
            <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Who we serve</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Groupes d’âge</h2>
                    <p class="mt-2 text-black/70">
                        Early Childhood (6 weeks → Kindergarten) et Elementary (1st grade → 5th grade) — structure inspirée
                        de la page.
                    </p>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5">
                        <div class="aspect-[16/9] bg-[linear-gradient(120deg,rgba(124,58,237,.25),rgba(163,255,18,.18))]">
                        </div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">Early Childhood</p>
                            <h3 class="mt-2 text-xl font-black">6 weeks → Kindergarten</h3>
                            <p class="mt-2 text-black/70">
                                Salles adaptées à l’âge, fun, créativité, découverte de Dieu & vérités bibliques.
                            </p>
                            <div class="mt-5">
                                <a class="inline-flex rounded-full px-5 py-2.5 font-bold bg-ink text-paper hover:opacity-90"
                                    href="#">
                                    Check out our Family Guide
                                </a>
                            </div>
                        </div>
                    </article>

                    <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5">
                        <div class="aspect-[16/9] bg-[linear-gradient(120deg,rgba(163,255,18,.20),rgba(124,58,237,.18))]">
                        </div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">Elementary</p>
                            <h3 class="mt-2 text-xl font-black">1st grade → 5th grade</h3>
                            <p class="mt-2 text-black/70">
                                Leçons engageantes, stations interactives, sessions “live” pour rendre la Bible vivante.
                            </p>
                            <div class="mt-5">
                                <a class="inline-flex rounded-full px-5 py-2.5 font-bold bg-ink text-paper hover:opacity-90"
                                    href="#">
                                    Check out our Family Guide
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- WHAT TO EXPECT -->
        <section id="expect" class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">What to expect</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">Parcours simple en 3 étapes</h2>
                    <p class="mt-2 text-black/70">
                        Check-in au lobby (1er étage, côté gauche), puis service, puis check-out avec sticker/code.
                    </p>
                </div>
                <a class="hidden md:inline-flex rounded-full px-5 py-2 font-bold border border-black/10 hover:border-black/30"
                    href="#">
                    Formulaire “Je suis nouveau”
                </a>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">1</div>
                    <h3 class="mt-4 text-xl font-black">Check-in</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        1ère visite : un guide accueille, collecte les infos (sécurité + suivi). Habitués : kiosk +
                        téléphone.
                    </p>
                    <div class="mt-4 h-32 rounded-2xl bg-paper border border-black/5"></div>
                </article>

                <article class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">2</div>
                    <h3 class="mt-4 text-xl font-black">Profite du service</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        Louange + message pendant que les enfants apprennent Jésus avec l’équipe Kidz.
                    </p>
                    <div class="mt-4 h-32 rounded-2xl bg-paper border border-black/5"></div>
                </article>

                <article class="rounded-3xl bg-haze border border-black/5 p-6 shadow-soft">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">3</div>
                    <h3 class="mt-4 text-xl font-black">Check-out</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        Récupération dans la salle indiquée, avec le sticker de check-in (code d’identification).
                    </p>
                    <div class="mt-4 h-32 rounded-2xl bg-paper border border-black/5"></div>
                </article>
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold bg-ink text-paper hover:opacity-90"
                    href="#">
                    Formulaire “Je suis nouveau”
                </a>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="bg-ink text-paper">
            <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
                <div class="max-w-3xl">
                    <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Answers</p>
                    <h2 class="mt-2 text-2xl md:text-3xl font-black">FAQ</h2>
                    <p class="mt-2 text-paper/80">Questions fréquentes (inspirées des items présents sur la page).</p>
                </div>

                <div class="mt-8 grid gap-4">
                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quel âge pour TC Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Deux groupes : Early Childhood (6 weeks – Kindergarten) et Elementary (1st grade – 5th grade).
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quand a lieu TC Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Le week-end, en même temps que les services adultes + expériences en ligne (YouTube).
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
                        href="#">
                        Family Guide
                    </a>
                    <a class="inline-flex justify-center rounded-full px-6 py-3 font-black border border-paper/20 hover:border-paper/40"
                        href="#">
                        Contact équipe Kidz
                    </a>
                </div>
            </div>
        </section>
    </div>
    `;
}
