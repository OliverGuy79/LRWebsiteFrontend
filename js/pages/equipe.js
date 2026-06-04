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
        if (member.facebook) html += `<a href="${member.facebook}" target="_blank" class="text-black/40 hover:text-punch transition"><i class="fab fa-facebook"></i> FB</a>`;
        if (member.twitter) html += `<a href="${member.twitter}" target="_blank" class="text-black/40 hover:text-punch transition"><i class="fab fa-twitter"></i> X</a>`;
        if (member.instagram) html += `<a href="${member.instagram}" target="_blank" class="text-black/40 hover:text-punch transition"><i class="fab fa-instagram"></i> IG</a>`;
        if (member.linkedin) html += `<a href="${member.linkedin}" target="_blank" class="text-black/40 hover:text-punch transition"><i class="fab fa-linkedin"></i> IN</a>`;
        if (member.email) html += `<a href="mailto:${member.email}" class="text-black/40 hover:text-punch transition"><i class="fas fa-envelope"></i> Email</a>`;
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
