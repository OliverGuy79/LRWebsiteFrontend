import { api } from '../services/api.service.js';

export async function vision() {
  let sections = [];
  try {
    const response = await api.getVision();
    if (response && Array.isArray(response.sections)) {
      sections = response.sections;
    } else if (Array.isArray(response)) {
      sections = response;
    }

    // Trier par display_order
    sections.sort((a, b) => (parseInt(a.display_order) || 0) - (parseInt(b.display_order) || 0));

  } catch (error) {
    console.error("Erreur chargement vision:", error);
    // Fallback or empty state could be handled here
  }

  // Fonction pour générer le HTML d'une section (avec alternance)
  const renderSection = (section, index) => {
    const isEven = index % 2 === 0; // Pair: Texte gauche, Image droite
    const image = section.image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2000&q=80';

    // Contenu texte
    const textContent = `
            <div class="bg-ink text-paper p-8 md:p-10 flex">
                <div class="my-auto">
                    <h2 class="text-2xl md:text-3xl font-black leading-tight font-serif">
                        ${section.title}
                    </h2>
                    <p class="mt-4 text-paper/90 leading-relaxed">
                        ${section.content}
                    </p>
                    ${section.subtitle ? `
                    <p class="mt-4 text-sm italic text-paper/70 font-serif">
                         « ${section.subtitle} »
                    </p>` : ''}
                </div>
            </div>
        `;

    // Contenu image
    const imageContent = `
            <div class="bg-black">
                <img class="h-[260px] md:h-full w-full object-cover"
                     src="${image}"
                     alt="${section.title}" />
            </div>
        `;

    // Application de l'alternance
    if (isEven) {
      return `
            <section class="grid md:grid-cols-2 gap-0 border-x border-b border-rule overflow-hidden first:rounded-t-3xl last:rounded-b-3xl first:border-t">
                ${textContent}
                ${imageContent}
            </section>`;
    } else {
      return `
            <section class="grid md:grid-cols-2 gap-0 border-x border-b border-rule overflow-hidden first:rounded-t-3xl last:rounded-b-3xl first:border-t">
                ${imageContent}
                ${textContent}
            </section>`;
    }
  };

  const sectionsHtml = sections.map((s, i) => renderSection(s, i)).join('');

  return `
    <div class="bg-paper text-ink font-sans">
    
      <!-- Simple Header -->
      <section class="pt-20 pb-12 px-4 text-center">
          <h1 class="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">Notre Vision</h1>
          <p class="text-xl text-black/60 max-w-2xl mx-auto italic font-serif">
              « J’ai mis devant toi une porte ouverte que nul ne peut fermer » — Apocalypse 3:8
          </p>
          <div class="mx-auto mt-8 h-1 w-24 bg-punch"></div>
      </section>
    
      <!-- VALUES BLOCKS (alternance ink + image) -->
      <main class="mx-auto max-w-6xl px-4 pb-14">
    
        ${sectionsHtml || '<p class="text-center text-gray-500">Chargement des sections...</p>'}
        
        <!-- Bottom CTAs (2 cards) -->
        <section class="mt-12 grid gap-6 md:grid-cols-2">
            <a href="#/equipe" class="group rounded-3xl overflow-hidden border border-rule shadow-soft bg-haze">
                <div class="p-6 font-black text-lg text-ink">L’équipe pastorale</div>
                <div class="px-6 pb-6">
                    <div class="rounded-2xl overflow-hidden">
                        <img class="h-56 w-full object-cover group-hover:scale-[1.02] transition"
                             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                             alt="Equipe" />
                    </div>
                </div>
            </a>
    
            <a href="#/elrtv" class="group rounded-3xl overflow-hidden border border-rule shadow-soft bg-ink text-paper">
                <div class="p-6 font-black text-lg">ELR TV</div>
                <div class="px-6 pb-6">
                    <div class="rounded-2xl overflow-hidden">
                        <img class="h-56 w-full object-cover opacity-90 group-hover:opacity-100 transition"
                             src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80"
                             alt="TV" />
                    </div>
                </div>
            </a>
        </section>
    
      </main>
    </div>
    `;
}
