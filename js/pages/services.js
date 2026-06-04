import { api } from '../services/api.service.js';

export async function services() {
    let servicesList = [];
    let loading = true;
    let error = null;

    try {
        // Fetch services
        const response = await api.getServices();
        if (response && Array.isArray(response.services)) {
            servicesList = response.services;
        } else if (Array.isArray(response)) {
            servicesList = response;
        }

        // Filter published
        servicesList = servicesList.filter(s => s.status === 'published');

        // Sort by display_order
        servicesList.sort((a, b) => (parseInt(a.display_order) || 99) - (parseInt(b.display_order) || 99));

    } catch (err) {
        console.error("Erreur chargement services:", err);
        error = "Impossible de charger les services.";
    }

    loading = false;

    if (loading) {
        return `
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement des services...</div>
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

    // Helper to format time (remove seconds if present)
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        return `${hours}h${minutes}`;
    };

    const renderServiceCard = (service) => {
        const image = service.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1000';

        return `
        <div class="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] group relative overflow-hidden rounded-3xl border border-rule shadow-soft bg-paper transition-all hover:scale-[1.01]">
             <!-- Layout Vertical for Carousel -->
            <div class="flex flex-col h-full">
                <!-- Image -->
                <div class="h-56 relative overflow-hidden">
                    <img src="${image}" alt="${service.name}" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    
                    <!-- Badge Jour/Heure sur l'image -->
                    <div class="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-black/5 shadow-sm">
                        ${service.day_of_week} • ${formatTime(service.start_time)}
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <h2 class="text-2xl md:text-3xl font-black font-serif text-ink mb-3 leading-tight">
                        ${service.name}
                    </h2>

                    <p class="text-black/70 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                        ${service.description}
                    </p>

                    <div class="flex flex-wrap gap-4 text-sm text-black/60 font-medium mt-auto border-t border-rule pt-4">
                        <div class="flex items-center gap-2 w-full">
                            <i class="fas fa-map-marker-alt text-punch w-4 text-center"></i>
                            <span>${service.location}</span>
                        </div>
                        ${service.leaders ? `
                        <div class="flex items-center gap-2 w-full">
                            <i class="fas fa-user text-punch w-4 text-center"></i>
                            <span>${service.leaders}</span>
                        </div>` : ''}
                        ${String(service.has_childcare).toUpperCase() === 'TRUE' || service.has_childcare === true ? `
                        <div class="flex items-center gap-2 text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100 mt-2 w-full justify-center">
                            <i class="fas fa-child"></i>
                            <span>Garderie disponible</span>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    const servicesHtml = servicesList.map(renderServiceCard).join('');

    return `
    <div class="bg-paper text-ink font-sans min-h-screen">
        <!-- Header -->
        <section class="pt-20 pb-12 px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">Vivre l'Église Ensemble</h1>
            <p class="text-xl text-black/60 max-w-2xl mx-auto italic font-serif">
                Se rassembler pour célébrer, s'encourager et grandir dans la foi : des moments essentiels à notre vie spirituelle.
            </p>
            <div class="mx-auto mt-8 h-1 w-24 bg-punch"></div>
        </section>

        <!-- Liste des services (Carousel Horizontal) -->
        <main class="w-full pb-20">
             <!-- Container Scrollable -->
            <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-8 scrollbar-hide">
                ${servicesHtml || '<p class="text-center text-gray-500 italic w-full">Aucun service programmé pour le moment.</p>'}
            </div>
            
            <!-- Scroll Hint (Visible only if overflow needed) -->
            ${servicesList.length > 1 ? `
            <div class="text-center text-black/40 text-sm mt-2 animate-bounce lg:hidden">
                ← Balayez pour voir plus →
            </div>` : ''}

            <!-- Info Banner -->
            <div class="mx-auto max-w-5xl px-4 mt-16">
                <div class="rounded-2xl bg-ink text-paper p-8 md:p-12 text-center">
                    <h3 class="text-2xl font-black font-serif mb-4">Besoin de plus d'infos ?</h3>
                    <p class="text-paper/80 max-w-xl mx-auto mb-8">
                        Si vous avez des questions sur nos cultes, la garderie ou l'accessibilité, n'hésitez pas à nous contacter.
                    </p>
                    <a href="#/contact" class="inline-flex rounded-full bg-paper text-ink px-8 py-3 font-bold hover:bg-gray-100 transition-colors">
                        Nous contacter
                    </a>
                </div>
            </div>
        </main>
    </div>
    `;
}
