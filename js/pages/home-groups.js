import { api } from '../services/api.service.js';

export async function homeGroups() {
    let groupsList = [];
    let loading = true;
    let error = null;

    try {
        // Fetch home groups
        const response = await api.getHomeGroups();
        console.log("Home Groups Response:", response);

        if (response) {
            if (Array.isArray(response.home_groups)) {
                groupsList = response.home_groups;
            } else if (Array.isArray(response.groups)) {
                groupsList = response.groups;
            } else if (Array.isArray(response)) {
                groupsList = response;
            } else {
                // Try to find any property that is an array
                const arrayProp = Object.keys(response).find(key => Array.isArray(response[key]));
                if (arrayProp) {
                    groupsList = response[arrayProp];
                }
            }
        }

        console.log("Processed Groups List:", groupsList);

        // Sort by display_order
        groupsList.sort((a, b) => (parseInt(a.display_order) || 99) - (parseInt(b.display_order) || 99));

    } catch (err) {
        console.error("Erreur chargement groups:", err);
        error = "Impossible de charger les groupes de maison.";
    }

    loading = false;

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

    const renderGroupCard = (group) => {
        const image = group.image || 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=1000';
        const name = group.home || group.name || 'Groupe de Maison';

        return `
        <div class="snap-center shrink-0 w-full md:w-[45vw] lg:w-[30vw] group/card relative overflow-hidden rounded-3xl border border-rule shadow-soft bg-paper transition-all hover:scale-[1.01]">
            <div class="flex flex-col h-full">
                <!-- Image -->
                <div class="h-56 relative overflow-hidden">
                    <img src="${image}" alt="${name}" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover/card:scale-110">
                    <div class="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors"></div>
                    
                    ${group.frequency ? `
                    <div class="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-black/5 shadow-sm">
                        ${group.frequency}
                    </div>` : ''}
                </div>
                
                <!-- Content -->
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                         <h2 class="text-2xl md:text-3xl font-black font-serif text-ink leading-tight">
                            ${name}
                        </h2>
                    </div>

                    <p class="text-black/70 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                        ${group.description || 'Un groupe de partage et de fraternité pour grandir ensemble dans la foi.'}
                    </p>

                    <div class="flex flex-wrap gap-4 text-sm text-black/60 font-medium mt-auto border-t border-rule pt-4">
                        <div class="flex items-center gap-2 w-full">
                             <svg class="h-4 w-4 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>${group.location || 'Lieu à confirmer'}</span>
                        </div>
                        
                        ${group.leaders ? `
                        <div class="flex items-center gap-2 w-full">
                             <svg class="h-4 w-4 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Responsable(s) : ${group.leaders}</span>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    const groupsHtml = groupsList.length > 0
        ? groupsList.map(renderGroupCard).join('')
        : '<p class="text-center text-gray-400 italic w-full py-10">Aucun groupe de maison disponible pour le moment.</p>';

    // Logic to scroll carousel
    setTimeout(() => {
        const carousel = document.getElementById('groups-carousel');
        const prevBtn = document.getElementById('prev-groups-btn');
        const nextBtn = document.getElementById('next-groups-btn');

        if (carousel && prevBtn && nextBtn) {
            const getScrollAmount = () => {
                if (window.innerWidth >= 1024) return carousel.clientWidth * 0.33;
                if (window.innerWidth >= 768) return carousel.clientWidth * 0.5;
                return carousel.clientWidth * 0.85;
            };

            prevBtn.onclick = () => {
                carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            };
            nextBtn.onclick = () => {
                carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            };

            const updateButtons = () => {
                if (window.innerWidth < 768) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    return;
                }
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';

                const sl = carousel.scrollLeft;
                const cw = carousel.clientWidth;
                const sw = carousel.scrollWidth;

                prevBtn.style.opacity = sl <= 10 ? '0' : '1';
                prevBtn.style.pointerEvents = sl <= 10 ? 'none' : 'auto';

                nextBtn.style.opacity = (sl + cw >= sw - 10) ? '0' : '1';
                nextBtn.style.pointerEvents = (sl + cw >= sw - 10) ? 'none' : 'auto';
            };

            carousel.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            // Initial call
            setTimeout(updateButtons, 100);
        }
    }, 100);

    return `
    <div class="bg-paper text-ink font-sans min-h-screen">
        <!-- Header -->
        <section class="pt-24 pb-12 px-6 text-center">
            <h1 class="text-4xl md:text-7xl font-black mb-6 font-serif tracking-tighter">Les Home Groups</h1>
            <p class="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto italic font-serif leading-relaxed">
                Connectez-vous, partagez et grandissez au cœur de petits groupes conviviaux.
            </p>
            <div class="mx-auto mt-10 h-1 w-24 bg-punch"></div>
        </section>

        <!-- Carousel -->
        <main class="w-full pb-20">
            <div class="relative group max-w-[1400px] mx-auto">
                <!-- Navigation Arrows -->
                <button id="prev-groups-btn" class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-paper/90 border border-rule shadow-soft p-3 rounded-full hover:bg-punch hover:text-white transition-all duration-300 md:flex hidden opacity-0 pointer-events-none">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button id="next-groups-btn" class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-paper/90 border border-rule shadow-soft p-3 rounded-full hover:bg-punch hover:text-white transition-all duration-300 md:flex hidden opacity-0 pointer-events-none">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <!-- Container: Vertical on mobile, Scroll horizontal on MD+ -->
                <div id="groups-carousel" class="flex flex-col md:flex-row md:overflow-x-auto snap-y md:snap-x snap-mandatory gap-8 px-6 md:px-12 pb-12 scrollbar-hide">
                    ${groupsHtml}
                </div>
            </div>
            
            ${groupsList.length > 3 ? `
            <div class="text-center text-black/30 text-xs font-bold uppercase tracking-widest animate-pulse mb-10 md:block hidden">
                ← Glissez pour découvrir nos groupes →
            </div>` : ''}

            <!-- CTA Section -->
            <div class="mx-auto max-w-5xl px-6 mt-16">
                <div class="rounded-[2.5rem] bg-ink text-paper p-10 md:p-16 text-center shadow-soft overflow-hidden relative">
                    <!-- Subtle background decoration -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-punch/10 rounded-full -mr-32 -mt-32"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-glow/5 rounded-full -ml-24 -mb-24"></div>

                    <h3 class="text-3xl md:text-4xl font-black font-serif mb-6 relative z-10">Envie de nous rejoindre ?</h3>
                    <p class="text-paper/70 max-w-xl mx-auto mb-10 text-lg relative z-10">
                        Il y a forcément un groupe près de chez vous. Pour toute question ou pour trouver le groupe qui vous correspond, nous sommes à votre écoute.
                    </p>
                    <a href="#/contact" class="inline-flex rounded-full bg-paper text-ink px-10 py-4 font-black text-lg hover:scale-105 transition-transform duration-300 relative z-10">
                        Trouver mon groupe
                    </a>
                </div>
            </div>
        </main>
    </div>
    `;
}
