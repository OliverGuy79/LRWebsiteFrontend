import { api } from '../services/api.service.js';

export async function event() {
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
  const image = eventData.image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80';

  // Préparer le contenu HTML
  const rawContent = eventData.content_html || eventData.description || '<p>Contenu non disponible.</p>';
  const safeContent = rawContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `
    <div class="bg-paper text-ink font-sans">

      <!-- Header -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-6xl px-4 py-6">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/" class="text-center md:text-left group">
              <div class="font-black tracking-tight text-4xl md:text-5xl leading-none group-hover:text-punch transition-colors">
                ELR EVENTS
              </div>
              <div class="mt-1 text-sm text-black/70">
                Les événements de l'Église La Rencontre
              </div>
            </a>
          </div>
        </div>
      </header>

      <!-- Event layout -->
      <main class="mx-auto max-w-6xl px-4 py-10">
        <!-- Category + Title -->
        <section class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
            <span class="px-2 py-1 rounded-full border border-rule">${eventData.category || 'Événement'}</span>
            <span>•</span>
            <span class="capitalize">${dateStr}</span>
            ${timeStr ? `<span>•</span><span>${timeStr}</span>` : ''}
          </div>

          <h1 class="mt-4 text-4xl md:text-6xl font-black leading-[1.03] font-serif tracking-tight text-ink">
            ${eventData.title}
          </h1>

          ${eventData.description ? `
          <p class="mt-5 text-lg md:text-xl text-black/75 font-serif leading-relaxed">
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
              S'inscrire
            </a>
          </div>
          ` : ''}
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="rounded-3xl overflow-hidden border border-rule shadow-soft">
            <div class="aspect-[16/9] relative bg-gray-100">
                 <img src="${image}" alt="${eventData.title}" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
        </section>

        <!-- Event content -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Content body -->
          <article class="lg:col-span-8">
            <div id="article-content" class="prose prose-lg max-w-none text-lg leading-relaxed text-black/80 font-serif">
               ${safeContent}
            </div>

            <!-- Info box -->
            ${eventData.location || eventData.address || eventData.start_time || eventData.end_time ? `
            <div class="mt-12 rounded-2xl border border-rule p-6 bg-haze">
              <h3 class="font-black text-lg mb-4">Informations pratiques</h3>
              <div class="grid gap-4 sm:grid-cols-2">
                ${eventData.start_time ? `
                <div>
                  <p class="text-xs font-bold text-black/50 uppercase">Horaires</p>
                  <p class="mt-1 font-bold">${eventData.start_time}${eventData.end_time ? ` - ${eventData.end_time}` : ''}</p>
                </div>
                ` : ''}
                ${eventData.location ? `
                <div>
                  <p class="text-xs font-bold text-black/50 uppercase">Lieu</p>
                  <p class="mt-1 font-bold">${eventData.location}</p>
                </div>
                ` : ''}
                ${eventData.address ? `
                <div class="sm:col-span-2">
                  <p class="text-xs font-bold text-black/50 uppercase">Adresse</p>
                  <p class="mt-1">${eventData.address}</p>
                </div>
                ` : ''}
              </div>
            </div>
            ` : ''}
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4 hidden lg:block">
            <div class="sticky top-24 space-y-6">

              <!-- Promo box -->
              <div class="rounded-2xl border border-rule p-6 bg-paper shadow-soft">
                <div class="text-xs font-black tracking-widest uppercase text-black/60">
                  Rejoignez-nous
                </div>
                <div class="mt-2 font-black text-xl font-serif leading-snug">
                  Tous les dimanches à 10h
                </div>
                <p class="mt-2 text-sm text-black/70">
                  Culte du dimanche à l'Église La Rencontre
                </p>
                <a class="mt-4 inline-flex rounded-full px-5 py-2.5 font-bold bg-ink text-paper hover:opacity-90 transition-opacity" href="#/services">
                  Voir les horaires
                </a>
              </div>

              ${eventData.registration_required === 'true' || eventData.registration_required === 'oui' ? `
              <div class="rounded-2xl border border-punch p-6 bg-punch/5">
                <div class="text-xs font-black tracking-widest uppercase text-punch">
                  Inscription requise
                </div>
                <p class="mt-2 text-sm text-black/70">
                  Cet événement nécessite une inscription préalable.
                </p>
                <a href="${eventData.registration_link || '#'}" class="mt-4 inline-flex rounded-full px-5 py-2.5 font-bold bg-punch text-paper hover:opacity-90 transition-opacity" target="_blank">
                  S'inscrire maintenant
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