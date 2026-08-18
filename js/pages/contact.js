// Page Contact - Style inspiré Transform Church
import { tAll } from '../services/site-content.service.js';
import { api } from '../services/api.service.js';

export async function contact() {
    const c = await tAll({
        'contact.description': 'Nous sommes là pour vous. N\'hésitez pas à nous rejoindre ou à nous écrire.',
        'contact.address.street': '1 rue des Braves',
        'contact.address.postal_city': '31300 Toulouse',
        'contact.address.country': 'France',
        'contact.address.city': 'Toulouse, France',
        'contact.address.transit': 'Tram T1 — Zénith | Métro Ligne A — Pâte d\'Oie',
        'contact.email': 'larencontrefr@gmail.com',
        'contact.service_times.title': 'Horaires des cultes',
        'contact.service_times.sunday.day': 'Dimanche',
        'contact.service_times.sunday.time': '10h00',
        'contact.form.title': 'Envoyez-nous un message',
        'contact.form.subtitle': 'Nous vous répondrons dans les plus brefs délais.',
        'contact.kicker': 'Parlons ensemble',
        'contact.title': 'Nous contacter',
        'contact.address.label': 'Adresse',
        'contact.email.label': 'Email',
        'contact.form.name': 'Votre nom',
        'contact.form.first_name': 'Prénom',
        'contact.form.last_name': 'Nom',
        'contact.form.phone': 'Téléphone',
        'contact.form.email': 'Votre email',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Votre message',
        'contact.form.submit': 'Envoyer le message',
        'contact.form.subject.general': 'Question générale',
        'contact.form.subject.groups': 'Home Groups',
        'contact.form.subject.baptism': 'Baptême',
        'contact.form.subject.prayer': 'Demande de prière',
        'contact.form.subject.other': 'Autre',
        'contact.form.message.placeholder': 'Comment pouvons-nous vous aider ?',
        'contact.form.success.title': 'Message envoyé avec succès !',
        'contact.form.success.text': 'Nous vous répondrons bientôt.',
        'contact.map.placeholder': 'Carte interactive bientôt disponible',
    });

    setTimeout(() => {
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('contact-success');
        const errorMessage = document.getElementById('contact-error');
        const submitButton = form?.querySelector('button[type="submit"]');

        if (!form || !submitButton) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            errorMessage?.classList.add('hidden');
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours…';

            const formData = new FormData(form);
            const payload = {
                first_name: String(formData.get('first_name') || '').trim(),
                last_name: String(formData.get('last_name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                phone: String(formData.get('phone') || '').trim(),
                subject: String(formData.get('subject') || 'general'),
                message: String(formData.get('message') || '').trim(),
            };

            try {
                await api.post('/api/contact', payload);
                form.reset();
                form.classList.add('hidden');
                successMessage?.classList.remove('hidden');
            } catch (error) {
                if (errorMessage) {
                    errorMessage.textContent = error.message || 'Le message n’a pas pu être envoyé. Veuillez réessayer.';
                    errorMessage.classList.remove('hidden');
                }
                submitButton.disabled = false;
                submitButton.textContent = c['contact.form.submit'];
            }
        });
    }, 100);

    const fullAddress = `${c['contact.address.street']}, ${c['contact.address.postal_city']}, ${c['contact.address.country']}`;
    const encodedAddress = encodeURIComponent(fullAddress);

    return `
    <div class="elr-page font-sans">
        <!-- Header -->
        <section class="elr-page-hero">
            <p class="elr-kicker">${c['contact.kicker']}</p>
            <h1 class="elr-page-title">${c['contact.title']}</h1>
            <p class="elr-page-lead">
                ${c['contact.description']}
            </p>
        </section>

        <!-- Contact Content -->
        <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="grid gap-8 lg:grid-cols-2">
                <!-- Contact Info -->
                <div class="space-y-6">
                    <!-- Address Card -->
                    <div class="elr-surface p-6 shadow-soft md:p-8">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-punch/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">${c['contact.address.label']}</h3>
                                <address class="mt-1 not-italic leading-relaxed text-black/70">
                                    ${c['contact.address.street']}<br>
                                    ${c['contact.address.postal_city']}<br>
                                    ${c['contact.address.country']}
                                </address>
                                <p class="mt-3 text-sm text-black/50">${c['contact.address.transit']}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Email Card -->
                    <div class="elr-surface p-6 shadow-soft md:p-8">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-ink/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">${c['contact.email.label']}</h3>
                                <p class="mt-1 text-black/70">${c['contact.email']}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Service Times -->
                    <div class="rounded-3xl p-6 md:p-8 bg-ink text-paper shadow-soft">
                        <h3 class="text-lg font-black flex items-center gap-2">
                            <svg class="h-5 w-5 text-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ${c['contact.service_times.title']}
                        </h3>
                        <ul class="mt-4 space-y-2 text-paper/80">
                            <li class="flex justify-between">
                                <span>${c['contact.service_times.sunday.day']}</span>
                                <span class="font-bold">${c['contact.service_times.sunday.time']}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="elr-surface p-6 shadow-soft md:p-8">
                    <h2 class="text-2xl md:text-3xl font-black mb-2">${c['contact.form.title']}</h2>
                    <p class="text-black/60 mb-8">${c['contact.form.subtitle']}</p>

                    <form id="contact-form" class="space-y-6">
                        <div class="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.first_name']}</label>
                            <input
                                type="text"
                                name="first_name"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                autocomplete="given-name"
                                placeholder="Marie">
                          </div>
                          <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.last_name']}</label>
                            <input
                                type="text"
                                name="last_name"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                autocomplete="family-name"
                                placeholder="Dupont">
                          </div>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.email']}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="jean@exemple.fr">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.phone']}</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                minlength="6"
                                autocomplete="tel"
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="+33 6 12 34 56 78">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.subject']}</label>
                            <select
                                name="subject"
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition">
                                <option value="general">${c['contact.form.subject.general']}</option>
                                <option value="home-group">${c['contact.form.subject.groups']}</option>
                                <option value="baptism">${c['contact.form.subject.baptism']}</option>
                                <option value="prayer">${c['contact.form.subject.prayer']}</option>
                                <option value="other">${c['contact.form.subject.other']}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${c['contact.form.message']}</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition resize-none"
                                placeholder="${c['contact.form.message.placeholder']}"></textarea>
                        </div>

                        <button
                            type="submit"
                            class="w-full rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition text-lg">
                            ${c['contact.form.submit']}
                        </button>
                    </form>

                    <div id="contact-success" class="hidden mt-6 p-4 rounded-2xl bg-glow/20 text-center">
                        <p class="font-bold text-ink">${c['contact.form.success.title']}</p>
                        <p class="text-black/70 text-sm mt-1">${c['contact.form.success.text']}</p>
                    </div>
                    <div id="contact-error" role="alert" class="hidden mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"></div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="mx-auto max-w-6xl px-4 pb-16">
            <div class="relative overflow-hidden rounded-[2rem] border border-black/10 bg-haze shadow-soft md:rounded-[3rem]">
                <iframe
                    title="Localisation de l’Église La Rencontre"
                    src="https://www.google.com/maps?q=${encodedAddress}&output=embed"
                    class="h-[360px] w-full border-0 md:h-[520px]"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen>
                </iframe>
                <div class="m-4 rounded-2xl border border-black/10 bg-white p-5 shadow-soft md:absolute md:bottom-4 md:left-4 md:m-0 md:max-w-sm">
                    <p class="text-[10px] font-black uppercase tracking-[0.18em] text-punch">Nous trouver</p>
                    <address class="mt-2 font-serif text-lg font-semibold not-italic leading-snug text-ink">${fullAddress}</address>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}"
                       target="_blank" rel="noopener noreferrer"
                       class="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-punch">
                        Obtenir l’itinéraire <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </section>

    </div>
    `;
}
