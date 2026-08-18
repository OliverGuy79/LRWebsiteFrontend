import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

function eventImageUrl(eventData) {
  const media = String(eventData.media || '').trim();
  const driveFileMatch = media.match(/drive\.google\.com\/file\/d\/([^/?#]+)/)
    || media.match(/[?&]id=([^&#]+)/);
  const isDirectImage = /\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i.test(media);

  if (driveFileMatch) return `/api/images/google-drive/${driveFileMatch[1]}`;
  if (isDirectImage) return media;
  return eventData.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80';
}

export async function event() {
  const c = await tAll({
    'event.header.title': 'ELR EVENTS',
    'event.header.subtitle': 'Les événements de l’Église La Rencontre',
    'event.register': 'S’inscrire',
    'event.info.title': 'Informations pratiques',
    'event.info.hours': 'Horaires',
    'event.info.location': 'Lieu',
    'event.info.address': 'Adresse',
  });
  // Récupérer le slug ou l'ID depuis l'URL
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const eventSlug = params.get('slug');
  const eventId = params.get('id');

  let eventData = null;
  let loading = true;
  let error = null;

  const identifier = eventSlug || eventId;

  if (identifier) {
    try {
      eventData = await api.getEvent(identifier);
    } catch (err) {
      console.error("Erreur chargement événement:", err);
      error = "Impossible de charger l'événement.";
    }
  } else {
    error = "Événement non spécifié.";
  }

  loading = false;

  // --- GESTION DES ÉTATS (Loading / Error) ---
  if (loading) {
    return `
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement de l'événement...</div>
            </div>
        </div>`;
  }

  if (error || !eventData) {
    return `
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${error || "Événement introuvable."}</p>
            <a href="#/" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour à l'accueil
            </a>
        </div>`;
  }

  // --- RENDU DE L'ÉVÉNEMENT ---
  const startDate = eventData.start_date ? new Date(eventData.start_date) : null;
  const dateStr = startDate ? startDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const timeStr = eventData.start_time || '';
  const image = eventImageUrl(eventData);

  // Préparer le contenu HTML
  const rawContent = eventData.content_html || eventData.description || '<p>Contenu non disponible.</p>';
  const safeContent = rawContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `
    <div class="elr-page font-sans">

      <!-- Header -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-[1500px] px-5 py-7 md:px-10">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/actu" class="text-center md:text-left group">
              <div class="text-[10px] font-black uppercase tracking-[0.28em] text-black/40">${c['event.header.subtitle']}</div>
              <div class="mt-2 flex items-baseline justify-center gap-2 md:justify-start">
                <span class="font-display text-4xl font-extrabold leading-none tracking-[-0.05em] transition-colors group-hover:text-punch md:text-5xl">ELR</span>
                <span class="font-serif text-4xl font-semibold italic leading-none text-punch md:text-5xl">Events</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <!-- Event layout -->
      <main class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <!-- Category + Title -->
        <section class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
            <a href="#/actu?category=${encodeURIComponent(eventData.category || 'Événement')}" class="px-2 py-1 rounded-full border border-rule hover:bg-haze hover:border-black/30 transition-colors">${eventData.category || 'Événement'}</a>
            <span>•</span>
            <span class="capitalize">${dateStr}</span>
            ${timeStr ? `<span>•</span><span>${timeStr}</span>` : ''}
          </div>

          <h1 class="mt-6 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.055em] text-ink md:text-8xl">
            ${eventData.title}
          </h1>

          ${eventData.description ? `
          <p class="mt-7 font-serif text-xl italic leading-relaxed text-black/60 md:text-2xl">
            ${eventData.description}
          </p>
          ` : ''}

          <!-- Event info -->
          <div class="mt-6 flex flex-wrap items-center gap-4">
            ${eventData.location ? `
            <div class="flex items-center gap-2 text-black/70">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>${eventData.location}</span>
            </div>
            ` : ''}
            ${eventData.address ? `
            <div class="flex items-center gap-2 text-black/70">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <span>${eventData.address}</span>
            </div>
            ` : ''}
          </div>

          ${eventData.registration_required === 'true' || eventData.registration_required === 'oui' ? `
          <div class="mt-6">
            <a href="${eventData.registration_link || '#'}" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-punch text-paper hover:opacity-90 transition-opacity" target="_blank">
              ${c['event.register']}
            </a>
          </div>
          ` : ''}
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="overflow-hidden rounded-[2rem] border border-rule shadow-soft md:rounded-[3rem]">
            <div class="aspect-[16/9] relative bg-gray-100">
                 <img src="${image}" alt="${eventData.title}" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
          <p class="mt-3 text-xs text-black/55">${eventData.title}</p>
        </section>

        <!-- Event content -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Content body -->
          <article class="lg:col-span-8">
            <div id="article-content" class="article-reading-surface">
               ${safeContent}
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <div class="rounded-[2rem] border border-rule bg-white/70 p-5 shadow-soft md:p-6">
                <div class="text-xs font-black uppercase tracking-[0.2em] text-black/45">${c['event.info.title']}</div>
                <h2 class="mt-3 font-serif text-3xl font-bold leading-[1.08] tracking-[-0.025em]">Préparez votre venue</h2>
                <div class="mt-6 divide-y divide-rule">
                  <div class="py-4 first:pt-0">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">Date</p>
                    <p class="mt-1 font-display text-lg font-extrabold capitalize">${dateStr || 'À venir'}</p>
                  </div>
                  ${eventData.start_time ? `
                  <div class="py-4">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${c['event.info.hours']}</p>
                    <p class="mt-1 font-display text-lg font-extrabold">${eventData.start_time}${eventData.end_time ? ` — ${eventData.end_time}` : ''}</p>
                  </div>` : ''}
                  ${eventData.location ? `
                  <div class="py-4">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${c['event.info.location']}</p>
                    <p class="mt-1 font-display text-lg font-extrabold">${eventData.location}</p>
                  </div>` : ''}
                  ${eventData.address ? `
                  <div class="py-4 last:pb-0">
                    <div class="rounded-2xl border border-black/8 bg-haze p-4">
                      <div class="flex items-start gap-3">
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-punch text-white">
                          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s6-5.1 6-11a6 6 0 10-12 0c0 5.9 6 11 6 11z"/>
                            <circle cx="12" cy="10" r="2" stroke-width="2"/>
                          </svg>
                        </span>
                        <div class="min-w-0">
                          <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${c['event.info.address']}</p>
                          <address class="mt-1 font-serif text-base font-semibold not-italic leading-snug text-ink">${eventData.address}</address>
                          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventData.address)}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/45 transition hover:text-punch">
                            Ouvrir dans Maps <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>` : ''}
                </div>
              </div>

              ${eventData.registration_required === 'true' || eventData.registration_required === 'oui' ? `
              <div class="rounded-[2rem] border border-punch bg-punch/5 p-6">
                <div class="text-xs font-black tracking-widest uppercase text-punch">
                  Inscription requise
                </div>
                <p class="mt-2 text-sm text-black/70">
                  Cet événement nécessite une inscription préalable.
                </p>
                <a href="${eventData.registration_link || '#'}" class="mt-4 inline-flex rounded-full px-5 py-2.5 font-bold bg-punch text-paper hover:opacity-90 transition-opacity" target="_blank">
                  ${c['event.register']}
                </a>
              </div>
              ` : ''}
            </div>
          </aside>
        </section>
      </main>
    </div>
    `;
}
