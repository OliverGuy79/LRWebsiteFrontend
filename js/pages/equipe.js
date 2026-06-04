import { api } from '../services/api.service.js';

export async function equipe() {
    let team = [];
    let loading = true;
    let error = null;

    try {
        const response = await api.getTeamMembers();
        if (response && Array.isArray(response.team)) {
            team = response.team;
        } else if (Array.isArray(response)) {
            team = response;
        }

        // Filtrer les brouillons si nécessaire (l'API le fait peut-être déjà, mais sécu)
        team = team.filter(m => m.status === 'published');

        // Trier par display_order
        team.sort((a, b) => (parseInt(a.display_order) || 99) - (parseInt(b.display_order) || 99));

    } catch (err) {
        console.error("Erreur chargement équipe:", err);
        error = "Impossible de charger l'équipe.";
    }

    loading = false;

    if (loading) {
        return `
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement de l'équipe...</div>
            </div>
        </div>`;
    }

    if (error) {
        return `
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${error}</p>
            <a href="#/" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour à l'accueil
            </a>
        </div>`;
    }

    // Séparer le pasteur principal des autres
    // Note: is_senior_pastor peut être une string "TRUE" ou un booléen selon l'API
    const seniorPastor = team.find(m => String(m.is_senior_pastor).toUpperCase() === 'TRUE' || m.is_senior_pastor === true);
    const otherMembers = team.filter(m => m !== seniorPastor);

    // Fonction helper pour les liens sociaux
    const renderSocials = (member) => {
        let html = '';
        if (member.facebook) html += `<a href="${member.facebook}" target="_blank" class="text-black/40 hover:text-punch transition"><svg class="h-3.5 w-3.5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>FB</a>`;
        if (member.twitter) html += `<a href="${member.twitter}" target="_blank" class="text-black/40 hover:text-punch transition"><svg class="h-3.5 w-3.5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X</a>`;
        if (member.instagram) html += `<a href="${member.instagram}" target="_blank" class="text-black/40 hover:text-punch transition"><svg class="h-3.5 w-3.5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>IG</a>`;
        if (member.linkedin) html += `<a href="${member.linkedin}" target="_blank" class="text-black/40 hover:text-punch transition"><svg class="h-3.5 w-3.5 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>IN</a>`;
        if (member.email) html += `<a href="mailto:${member.email}" class="text-black/40 hover:text-punch transition"><svg class="h-3.5 w-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Email</a>`;
        return html ? `<div class="flex gap-3 text-xs font-bold mt-4">${html}</div>` : '';
    };

    // HTML du Senior Pastor
    let seniorHtml = '';
    if (seniorPastor) {
        const image = seniorPastor.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000';
        seniorHtml = `
        <section class="mb-20">
            <div class="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 border border-rule shadow-soft">
                <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                    <img src="${image}" alt="${seniorPastor.first_name} ${seniorPastor.last_name}" class="w-full h-full object-cover">
                </div>
                <div>
                    <div class="text-xs font-black tracking-widest uppercase text-punch mb-2">${seniorPastor.role || seniorPastor.title || 'Pasteur Senior'}</div>
                    <h2 class="text-4xl md:text-5xl font-black font-serif text-ink mb-6">
                        ${seniorPastor.first_name} ${seniorPastor.last_name}
                    </h2>
                    <div class="prose text-black/70 text-lg leading-relaxed mb-6">
                        ${seniorPastor.bio || 'Aucune biographie disponible.'}
                    </div>
                    ${renderSocials(seniorPastor)}
                </div>
            </div>
        </section>
        `;
    }

    // HTML des autres membres
    const othersHtml = otherMembers.map(member => {
        const image = member.photo || `https://ui-avatars.com/api/?name=${member.first_name}+${member.last_name}&background=random&size=512`;
        return `
         <div class="group">
            <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-rule relative">
                <img src="${image}" alt="${member.first_name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <p class="text-white text-sm line-clamp-3">${member.bio || ''}</p>
                </div>
            </div>
            <div class="text-xl font-black font-serif text-ink">${member.first_name} ${member.last_name}</div>
            <div class="text-sm font-bold text-black/50 uppercase tracking-widest mt-1">${member.role || member.title || 'Membre équipe'}</div>
            ${renderSocials(member)}
         </div>
         `;
    }).join('');

    return `
    <div class="bg-paper text-ink font-sans min-h-screen">
        <!-- Header -->
        <section class="pt-20 pb-12 px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">Notre Équipe</h1>
            <p class="text-xl text-black/60 max-w-2xl mx-auto italic font-serif">
                Des hommes et des femmes passionnés pour servir Dieu et son Église.
            </p>
            <div class="mx-auto mt-8 h-1 w-24 bg-punch"></div>
        </section>

        <main class="mx-auto max-w-6xl px-4 pb-20">
            ${seniorHtml}

            ${otherMembers.length > 0 ? `
                <div class="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    ${othersHtml}
                </div>
            ` : (!seniorPastor ? '<p class="text-center text-gray-500 italic">Aucun membre d\'équipe trouvé.</p>' : '')}
        </main>
    </div>
    `;
}
