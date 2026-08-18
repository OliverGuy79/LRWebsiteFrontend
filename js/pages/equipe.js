import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

export async function equipe() {
    let team = [];

    const c = await tAll({
        'equipe.title': 'Notre Équipe',
        'equipe.subtitle': 'Des hommes et des femmes passionnés pour servir Dieu et son Église.',
        'equipe.kicker': 'Les personnes derrière la vision',
        'equipe.empty': 'L’équipe sera bientôt présentée ici.',
        'equipe.cta.kicker': 'Servir ensemble',
        'equipe.cta.title': 'Il y a une place pour toi.',
        'equipe.cta.button': 'Nous contacter',
    });
    const titleWords = c['equipe.title'].trim().split(/\s+/);
    const titleAccent = titleWords.pop() || '';

    try {
        const response = await api.getTeamMembers();
        team = Array.isArray(response) ? response : (response?.team || []);
        team = team
            .filter(member => !member.status || member.status === 'published')
            .sort((a, b) => (Number(a.display_order) || 99) - (Number(b.display_order) || 99));
    } catch (error) {
        console.error('Erreur chargement équipe :', error);
    }

    const renderSocials = (member) => {
        const links = [
            member.instagram && `<a href="${member.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>`,
            member.facebook && `<a href="${member.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>`,
            member.linkedin && `<a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`,
            member.email && `<a href="mailto:${member.email}">Email</a>`,
        ].filter(Boolean);

        return links.length ? `
            <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-widest text-black/40">
                ${links.join('')}
            </div>
        ` : '';
    };

    const membersHtml = team.map((member, index) => {
        const fullName = `${member.first_name || ''} ${member.last_name || ''}`.trim();
        const image = member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=111111&color=ffffff&size=900`;

        return `
            <article class="group ${index % 3 === 1 ? 'md:translate-y-16' : ''}">
                <div class="relative aspect-[4/5] overflow-hidden bg-black/5">
                    <img src="${image}" alt="${fullName}"
                         class="h-full w-full object-cover grayscale-[15%] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:grayscale-0">
                    ${member.bio ? `
                        <div class="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-5 text-sm leading-relaxed text-white/80 backdrop-blur transition duration-500 group-hover:translate-y-0">
                            ${member.bio}
                        </div>
                    ` : ''}
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-black/20 py-5">
                    <div>
                        <h2 class="font-display text-2xl font-bold leading-none md:text-3xl">${fullName}</h2>
                        <p class="mt-2 text-sm text-black/55">${member.role || member.title || 'Équipe pastorale'}</p>
                        ${renderSocials(member)}
                    </div>
                    <span class="font-serif text-xl italic text-punch">${String(index + 1).padStart(2, '0')}</span>
                </div>
            </article>
        `;
    }).join('');

    return `
        <div class="min-h-screen overflow-hidden bg-[#f2efe8] text-ink">
            <header class="mx-auto max-w-[1500px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
                <p class="mb-6 text-xs font-black uppercase tracking-[0.28em] text-black/45">${c['equipe.kicker']}</p>
                <div class="grid items-end gap-8 lg:grid-cols-12">
                    <h1 class="font-display text-[19vw] font-extrabold leading-[0.72] tracking-[-0.08em] sm:text-[8rem] lg:col-span-8 lg:text-[10rem]">
                        ${titleWords.join(' ')} <span class="font-serif font-medium italic text-punch">${titleAccent}</span>
                    </h1>
                    <p class="max-w-lg font-serif text-xl leading-relaxed text-black/60 md:text-2xl lg:col-span-4 lg:pb-2">
                        ${c['equipe.subtitle']}
                    </p>
                </div>
            </header>

            <main class="mx-auto max-w-[1500px] px-5 pb-28 md:px-10 md:pb-40">
                ${team.length ? `
                    <div class="grid gap-x-6 gap-y-16 sm:grid-cols-2 md:gap-x-8 md:gap-y-28 lg:grid-cols-3">
                        ${membersHtml}
                    </div>
                ` : `
                    <div class="border-y border-black/20 py-20 text-center">
                        <p class="font-serif text-2xl italic text-black/50">${c['equipe.empty']}</p>
                    </div>
                `}
            </main>

            <section class="bg-ink px-5 py-20 text-white md:px-10 md:py-28">
                <div class="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/45">${c['equipe.cta.kicker']}</p>
                        <h2 class="max-w-4xl font-display text-5xl font-extrabold leading-[0.9] md:text-8xl">
                            ${c['equipe.cta.title']}
                        </h2>
                    </div>
                    <a href="#/contact" class="shrink-0 rounded-full bg-glow px-8 py-4 font-black text-ink transition hover:scale-105">${c['equipe.cta.button']}</a>
                </div>
            </section>
        </div>
    `;
}
