import { api } from '../services/api.service.js';

export async function contact() {
    // Fetch real church info from the API
    let churchInfo = null;
    try {
        churchInfo = await api.getChurchInfo();
    } catch (e) {
        console.warn('Could not load church info, using defaults:', e);
    }

    const address = churchInfo?.address
        ? `${churchInfo.address}<br>${churchInfo.postal_code || ''} ${churchInfo.city || ''}`.trim()
        : 'Adresse à confirmer';
    const phone = churchInfo?.phone || 'À venir';
    const email = churchInfo?.email || 'larencontrefr@gmail.com';
    const facebook = churchInfo?.facebook || '';
    const instagram = churchInfo?.instagram || '';
    const youtube = churchInfo?.youtube || '';

    // Build social links HTML
    const socialLinks = [];
    if (facebook) socialLinks.push(`<a href="${facebook}" target="_blank" rel="noopener" class="h-10 w-10 rounded-full bg-punch/10 flex items-center justify-center hover:bg-punch hover:text-white text-punch transition-colors">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>`);
    if (instagram) socialLinks.push(`<a href="${instagram}" target="_blank" rel="noopener" class="h-10 w-10 rounded-full bg-punch/10 flex items-center justify-center hover:bg-punch hover:text-white text-punch transition-colors">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    </a>`);
    if (youtube) socialLinks.push(`<a href="${youtube}" target="_blank" rel="noopener" class="h-10 w-10 rounded-full bg-punch/10 flex items-center justify-center hover:bg-punch hover:text-white text-punch transition-colors">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    </a>`);

    const socialHtml = socialLinks.length > 0
        ? `<div class="flex gap-3 mt-6">${socialLinks.join('')}</div>`
        : '';

    // Google Maps embed — use lat/lng from church info or a default
    const mapQuery = encodeURIComponent(churchInfo?.address || 'Église LaRencontre');

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
                                <p class="mt-1 text-black/70">${address}</p>
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
                                <a href="tel:${phone}" class="mt-1 text-black/70 hover:text-punch transition-colors block">${phone}</a>
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
                                <a href="mailto:${email}" class="mt-1 text-black/70 hover:text-punch transition-colors block">${email}</a>
                            </div>
                        </div>
                    </div>

                    <!-- Social links -->
                    ${socialHtml ? `
                    <div class="rounded-3xl p-6 md:p-8 bg-haze border border-black/5 shadow-soft">
                        <h3 class="text-lg font-black mb-4">Suivez-nous</h3>
                        <div class="flex gap-3">${socialLinks.join('')}</div>
                    </div>
                    ` : ''}

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

                        <div id="contact-error" class="hidden p-4 rounded-2xl bg-red-50 text-red-700 text-sm font-medium"></div>

                        <button
                            type="submit"
                            class="w-full rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition text-lg">
                            Envoyer le message
                        </button>
                    </form>

                    <div id="contact-success" class="hidden mt-6 p-6 rounded-2xl bg-green-50 text-center">
                        <svg class="h-12 w-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="font-bold text-lg text-ink">Message envoyé avec succès !</p>
                        <p class="text-black/70 text-sm mt-1">Nous vous répondrons bientôt.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="mx-auto max-w-6xl px-4 pb-16">
            <div class="rounded-3xl overflow-hidden border border-black/5 shadow-soft h-64 md:h-96">
                <iframe
                    src="https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </section>

        <!-- Script for form handling -->
        <script>
            setTimeout(() => {
                const form = document.getElementById('contact-form');
                const successMsg = document.getElementById('contact-success');
                const errorMsg = document.getElementById('contact-error');

                if (form) {
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();

                        const btn = form.querySelector('button[type="submit"]');
                        const originalText = btn.textContent;
                        btn.disabled = true;
                        btn.textContent = 'Envoi en cours...';
                        errorMsg.classList.add('hidden');

                        const payload = {
                            name: form.querySelector('[name="name"]').value.trim(),
                            email: form.querySelector('[name="email"]').value.trim(),
                            subject: form.querySelector('[name="subject"]').value,
                            message: form.querySelector('[name="message"]').value.trim()
                        };

                        try {
                            const response = await fetch('/api/contact', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });

                            if (!response.ok) {
                                const err = await response.json().catch(() => ({}));
                                throw new Error(err.detail || 'Erreur serveur');
                            }

                            form.reset();
                            form.classList.add('hidden');
                            successMsg.classList.remove('hidden');

                            setTimeout(() => {
                                form.classList.remove('hidden');
                                successMsg.classList.add('hidden');
                            }, 8000);
                        } catch (error) {
                            console.error('Erreur contact:', error);
                            errorMsg.textContent = error.message || 'Impossible d\\'envoyer le message. Veuillez réessayer.';
                            errorMsg.classList.remove('hidden');
                            btn.disabled = false;
                            btn.textContent = originalText;
                        }
                    });
                }
            }, 100);
        </script>
    </div>
    `;
}
