// Page Contact - Style inspiré Transform Church
export function contact() {
    return `
    <div class="bg-paper text-ink font-sans min-h-screen">
        <!-- Header -->
        <section class="pt-24 pb-12 px-6 text-center bg-gradient-to-b from-haze to-paper">
            <h1 class="text-4xl md:text-7xl font-black mb-6 font-serif tracking-tighter">Contact</h1>
            <p class="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto italic font-serif leading-relaxed">
                Nous sommes là pour vous. N'hésitez pas à nous rejoindre ou à nous écrire.
            </p>
            <div class="mx-auto mt-10 h-1 w-24 bg-punch"></div>
        </section>

        <!-- Contact Content -->
        <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="grid gap-8 lg:grid-cols-2">
                <!-- Contact Info -->
                <div class="space-y-6">
                    <!-- Address Card -->
                    <div class="rounded-3xl p-6 md:p-8 bg-haze border border-black/5 shadow-soft">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-punch/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">Adresse</h3>
                                <p class="mt-1 text-black/70">123 Rue de l'Église<br />75000 Paris, France</p>
                            </div>
                        </div>
                    </div>

                    <!-- Phone Card -->
                    <div class="rounded-3xl p-6 md:p-8 bg-haze border border-black/5 shadow-soft">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-glow/20 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">Téléphone</h3>
                                <p class="mt-1 text-black/70">01 23 45 67 89</p>
                            </div>
                        </div>
                    </div>

                    <!-- Email Card -->
                    <div class="rounded-3xl p-6 md:p-8 bg-haze border border-black/5 shadow-soft">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-ink/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">Email</h3>
                                <p class="mt-1 text-black/70">contact@eglise-larencontre.fr</p>
                            </div>
                        </div>
                    </div>

                    <!-- Service Times -->
                    <div class="rounded-3xl p-6 md:p-8 bg-ink text-paper shadow-soft">
                        <h3 class="text-lg font-black flex items-center gap-2">
                            <svg class="h-5 w-5 text-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Horaires des cultes
                        </h3>
                        <ul class="mt-4 space-y-2 text-paper/80">
                            <li class="flex justify-between">
                                <span>Dimanche</span>
                                <span class="font-bold">10h00</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Mercredi (Prière)</span>
                                <span class="font-bold">19h30</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Samedi (Jeunesse)</span>
                                <span class="font-bold">18h00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="rounded-3xl p-6 md:p-8 bg-paper border border-black/5 shadow-soft">
                    <h2 class="text-2xl md:text-3xl font-black mb-2">Envoyez-nous un message</h2>
                    <p class="text-black/60 mb-8">Nous vous répondrons dans les plus brefs délais.</p>

                    <form id="contact-form" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">Votre nom</label>
                            <input
                                type="text"
                                name="name"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="Jean Dupont">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">Votre email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="jean@exemple.fr">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">Sujet</label>
                            <select
                                name="subject"
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition">
                                <option value="general">Question générale</option>
                                <option value="home-group">Home Groups</option>
                                <option value="baptism">Baptême</option>
                                <option value="prayer">Demande de prière</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">Votre message</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition resize-none"
                                placeholder="Comment pouvons-nous vous aider ?"></textarea>
                        </div>

                        <button
                            type="submit"
                            class="w-full rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition text-lg">
                            Envoyer le message
                        </button>
                    </form>

                    <div id="contact-success" class="hidden mt-6 p-4 rounded-2xl bg-glow/20 text-center">
                        <p class="font-bold text-ink">Message envoyé avec succès !</p>
                        <p class="text-black/70 text-sm mt-1">Nous vous répondrons bientôt.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section (placeholder) -->
        <section class="mx-auto max-w-6xl px-4 pb-16">
            <div class="rounded-3xl overflow-hidden border border-black/5 shadow-soft h-64 md:h-96 bg-haze flex items-center justify-center">
                <div class="text-center">
                    <svg class="h-16 w-16 text-black/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p class="mt-4 text-black/40 font-bold">Carte interactive bientôt disponible</p>
                </div>
            </div>
        </section>

        <!-- Script for form handling -->
        <script>
            setTimeout(() => {
                const form = document.getElementById('contact-form');
                const successMsg = document.getElementById('contact-success');

                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();

                        // Simulate form submission
                        const btn = form.querySelector('button[type="submit"]');
                        btn.disabled = true;
                        btn.textContent = 'Envoi en cours...';

                        setTimeout(() => {
                            form.reset();
                            form.classList.add('hidden');
                            successMsg.classList.remove('hidden');

                            // Reset after 5 seconds
                            setTimeout(() => {
                                form.classList.remove('hidden');
                                successMsg.classList.add('hidden');
                                btn.disabled = false;
                                btn.textContent = 'Envoyer le message';
                            }, 5000);
                        }, 1500);
                    });
                }
            }, 100);
        </script>
    </div>
    `;
}