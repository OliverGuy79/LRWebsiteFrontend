import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

// --- FONCTIONS GLOBALES POUR LE MODAL DE RÉSERVATION ---

window.currentReservationProduct = null;

window.openReservationModal = (productId, productName, category, description, dimensions) => {
    window.currentReservationProduct = { id: productId, name: productName, category };

    // Remplir les infos du produit dans le modal
    document.getElementById('modal-product-name').textContent = productName;

    // Ajout: Affichage de la description complète et des dimensions dans le modal
    const detailsContainer = document.getElementById('modal-product-details');
    let detailsHtml = `<p class="text-sm text-gray-600 mb-2">${description || ''}</p>`;
    if (dimensions) {
        detailsHtml += `<p class="text-xs text-gray-500 italic">Dimensions: ${dimensions}</p>`;
    }
    detailsContainer.innerHTML = detailsHtml;

    // Gérer l'affichage des champs spécifiques (Taille/Couleur pour les vêtements)
    const isApparel = ['apparel', 'clothing', 'merchandise', 'vêtement', 'vetement'].includes(category?.toLowerCase());
    const apparelFields = document.getElementById('modal-apparel-fields');

    if (isApparel) {
        apparelFields.classList.remove('hidden');
        document.getElementById('res-size').setAttribute('required', '');
    } else {
        apparelFields.classList.add('hidden');
        document.getElementById('res-size').removeAttribute('required');
    }

    // Afficher le modal avec une animation
    const modal = document.getElementById('reservation-modal');
    modal.classList.remove('hidden');
    // Petit délai pour l'animation d'opacité
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div[class*="transform"]').classList.remove('scale-95', 'opacity-0');
        modal.querySelector('div[class*="transform"]').classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeReservationModal = () => {
    const modal = document.getElementById('reservation-modal');
    // Animation de sortie
    modal.classList.add('opacity-0');
    modal.querySelector('div[class*="transform"]').classList.add('scale-95', 'opacity-0');
    modal.querySelector('div[class*="transform"]').classList.remove('scale-100', 'opacity-100');

    setTimeout(() => {
        modal.classList.add('hidden');
        window.currentReservationProduct = null;
        // Reset form
        document.getElementById('reservation-form').reset();
        document.getElementById('reservation-success').classList.add('hidden');
        document.getElementById('reservation-error')?.classList.add('hidden');
        document.getElementById('reservation-form').classList.remove('hidden');
    }, 300);
};

window.submitReservation = async (event) => {
    event.preventDefault();

    const form = document.getElementById('reservation-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorMessage = document.getElementById('reservation-error');
    errorMessage?.classList.add('hidden');
    submitButton.disabled = true;
    submitButton.textContent = 'Enregistrement…';

    const formData = {
        product: window.currentReservationProduct,
        name: document.getElementById('res-name').value,
        firstname: document.getElementById('res-firstname').value,
        phone: document.getElementById('res-phone').value,
        quantity: Number(document.getElementById('res-qty').value),
        size: document.getElementById('res-size').value,
        color: document.getElementById('res-color').value
    };

    try {
        await api.post('/api/boutique/reservations', formData);
        form.classList.add('hidden');
        document.getElementById('reservation-success').classList.remove('hidden');
    } catch (error) {
        if (errorMessage) {
            errorMessage.textContent = error.message || 'La réservation n’a pas pu être enregistrée. Veuillez réessayer.';
            errorMessage.classList.remove('hidden');
        }
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmer la réservation';
    }
};

export async function boutique() {
    const c = await tAll({
        'boutique.hero.kicker': 'Église La Rencontre',
        'boutique.hero.title': 'La Boutique',
        'boutique.hero.subtitle': 'Des vêtements et des ressources pensés pour porter le message et nourrir ta foi.',
        'boutique.hero.booking': 'Réservation sur place',
        'boutique.nav.clothes': 'Vêtements',
        'boutique.nav.resources': 'Ressources',
        'boutique.nav.contact': 'Contact',
        'boutique.clothes.kicker': 'Collection',
        'boutique.clothes.title': 'Nos vêtements',
        'boutique.clothes.subtitle': 'Portez le message.',
        'boutique.clothes.empty': 'Aucun vêtement disponible pour le moment.',
        'boutique.resources.kicker': 'Pour aller plus loin',
        'boutique.resources.title': 'Nos ressources',
        'boutique.resources.subtitle': 'Livres, musique et enseignements pour grandir.',
        'boutique.resources.empty': 'Aucune ressource disponible pour le moment.',
        'boutique.contact.kicker': 'Besoin d’aide ?',
        'boutique.contact.title': 'Une question sur un article ?',
        'boutique.contact.text': 'Notre équipe est là pour vous aider à choisir la bonne taille ou vous conseiller sur nos ressources.',
        'boutique.contact.button': 'Contacter la boutique',
        'boutique.stock.available': 'En stock',
        'boutique.stock.unavailable': 'Rupture',
        'boutique.reserve': 'Réserver cet article',
        'boutique.reserve.unavailable': 'Rupture de stock',
    });
    let products = [];
    try {
        const response = await api.getProducts();

        // Gestion de la structure spécifique de l'API { products: [...], total: ... }
        if (response && Array.isArray(response.products)) {
            products = response.products;
        } else if (Array.isArray(response)) {
            // Fallback
            products = response;
        } else {
            console.warn("Format de réponse API boutique inattendu:", response);
            products = [];
        }
    } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
    }

    const getFirstImage = (imagesString) => {
        if (!imagesString) return null;
        const images = imagesString.split(',');
        return images[0]?.trim();
    };

    const vetements = products.filter(p => ['apparel', 'clothing', 'merchandise', 'vêtement', 'vetement'].includes(p.category?.toLowerCase()));
    const ressources = products.filter(p => ['books', 'music', 'livre', 'cd', 'album', 'ressource'].includes(p.category?.toLowerCase()));

    const renderProductCard = (product) => {
        const categoryLower = product.category?.toLowerCase() || '';
        const isBook = ['books', 'livre'].includes(categoryLower);
        const isMusic = ['music', 'album'].includes(categoryLower);
        const imageUrl = getFirstImage(product.images);

        // --- GESTION DU PRIX (SOLDES) ---
        let priceDisplay = '';
        if (product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price)) {
            priceDisplay = `
                <div class="absolute top-4 right-4 bg-punch text-paper px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10 flex flex-col items-center leading-tight">
                    <span>${product.sale_price} ${product.currency || '€'}</span>
                    <span class="line-through opacity-75 text-[10px]">${product.price}</span>
                </div>`;
        } else if (product.price) {
            priceDisplay = `
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                    ${product.price} ${product.currency || '€'}
                </div>`;
        }

        // --- DIMENSIONS & BADGE STOCK ---
        const dimensions = product.dimensions ? `<span class="text-xs text-black/50 ml-2 block sm:inline mt-1 sm:mt-0">• ${product.dimensions}</span>` : '';

        let stockBadge;
        if (product.is_in_stock === "FALSE") {
            stockBadge = `<span class="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">${c['boutique.stock.unavailable']}</span>`;
        } else {
            stockBadge = `<span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">${c['boutique.stock.available']}</span>`;
        }

        // --- IMAGE ---
        let visualContent;
        if (imageUrl && !imageUrl.startsWith('/images/')) {
            visualContent = `<img src="${imageUrl}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`;
        } else if (imageUrl && imageUrl.startsWith('/images/')) {
            // Placeholder intelligent pour URL relative
            if (isBook) {
                visualContent = `
                    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.02),rgba(0,0,0,.08))]"></div>
                    <div class="absolute inset-12 bg-white shadow-xl rounded-r-lg border-l-4 border-black/10 flex items-center justify-center text-center p-4 group-hover:scale-105 transition-transform duration-500">
                        <div>
                            <div class="font-serif font-bold text-xl text-ink leading-tight">${product.name.replace(/ /g, '<br>')}</div>
                            <div class="mt-2 w-8 h-1 bg-punch mx-auto"></div>
                        </div>
                    </div>`;
            } else if (isMusic) {
                visualContent = `
                   <div class="absolute inset-0 bg-ink"></div>
                   <div class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <div class="w-24 h-24 rounded-full border-4 border-paper/30 flex items-center justify-center"><div class="w-3 h-3 bg-paper rounded-full"></div></div>
                   </div>
                   <div class="absolute bottom-4 left-0 right-0 text-center text-paper/50 text-xs font-bold tracking-widest">ALBUM</div>`;
            } else {
                visualContent = `
                    <div class="absolute inset-0 bg-haze"></div>
                    <div class="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl rotate-12 group-hover:scale-110 transition-transform duration-500">ELR</div>`;
            }
        } else {
            // Fallback
            visualContent = `
                <div class="absolute inset-0 bg-haze"></div>
                <div class="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl rotate-12 group-hover:scale-110 transition-transform duration-500">ELR</div>`;
        }

        // Préparation des données pour le modal (échappement des caractères spéciaux)
        const safeName = product.name.replace(/'/g, "\\'");
        const safeDesc = (product.description || '').replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, "<br>");
        const safeDim = (product.dimensions || '').replace(/'/g, "\\'");

        const actionButton = `
            <button onclick="window.openReservationModal('${product.id}', '${safeName}', '${product.category}', '${safeDesc}', '${safeDim}')" 
                class="block w-full rounded-full bg-ink py-3.5 text-center font-black text-paper transition hover:bg-punch disabled:cursor-not-allowed disabled:opacity-40"
                ${product.is_in_stock === "FALSE" ? 'disabled' : ''}>
                ${product.is_in_stock === "FALSE" ? c['boutique.reserve.unavailable'] : c['boutique.reserve']}
            </button>
        `;

        return `
        <article class="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/15 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
            <div class="${isBook ? 'aspect-[3/4]' : 'aspect-square'} relative flex-shrink-0 overflow-hidden bg-haze">
                ${visualContent}
                ${priceDisplay}
            </div>
            <div class="flex flex-1 flex-col p-6 md:p-7">
                <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div class="text-xs font-bold text-punch uppercase tracking-widest">${product.category}</div>
                    ${stockBadge}
                </div>
                
                <h3 class="mb-1 font-display text-2xl font-extrabold leading-tight tracking-tight">${product.name}</h3>
                
                <!-- Dimensions si dispo -->
                ${product.dimensions ? `<p class="text-xs text-black/50 mb-2 font-medium">${product.dimensions}</p>` : ''}
                
                <!-- Short Description -->
                <p class="text-black/60 text-sm mb-6 line-clamp-2 flex-1" title="${product.description}">
                    ${product.short_description || product.description}
                </p>
                
                <div class="mt-auto">
                    ${actionButton}
                </div>
            </div>
        </article>
        `;
    };

    const vetementsHtml = vetements.map(renderProductCard).join('');
    const ressourcesHtml = ressources.map(renderProductCard).join('');

    return `
    <div class="elr-page font-sans relative">
        <!-- Hero boutique -->
        <section class="relative overflow-hidden bg-ink px-5 py-20 text-white md:px-10 md:py-28">
            <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-punch/35 blur-3xl"></div>
            <div class="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-glow/20 blur-3xl"></div>
            <div class="relative mx-auto grid max-w-[1500px] items-end gap-10 lg:grid-cols-12">
                <div class="lg:col-span-9">
                    <p class="mb-6 text-xs font-black uppercase tracking-[0.3em] text-white/45">${c['boutique.hero.kicker']}</p>
                    <h1 class="font-display text-[20vw] font-extrabold leading-[0.68] tracking-[-0.09em] sm:text-[9rem] lg:text-[11rem]">
                        ${c['boutique.hero.title']}
                    </h1>
                </div>
                <div class="lg:col-span-3">
                    <p class="font-serif text-xl italic leading-relaxed text-white/65">${c['boutique.hero.subtitle']}</p>
                    <div class="mt-7 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/40">
                        <span>${products.length} article${products.length > 1 ? 's' : ''}</span><span>•</span><span>${c['boutique.hero.booking']}</span>
                    </div>
                </div>
            </div>
        </section>

        <header class="sticky top-16 z-30 border-b border-black/10 bg-[#f2efe8]/90 py-4 backdrop-blur-xl">
            <div class="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-10">
                <div class="font-display text-xl font-extrabold tracking-tight">ELR SHOP<span class="text-punch">.</span></div>
                <nav>
                    <ul class="flex gap-2 text-xs font-black uppercase tracking-wider">
                        <li><a href="#vetements" class="inline-flex rounded-full px-4 py-2 transition hover:bg-ink hover:text-white">${c['boutique.nav.clothes']}</a></li>
                        <li><a href="#ressources" class="inline-flex rounded-full px-4 py-2 transition hover:bg-ink hover:text-white">${c['boutique.nav.resources']}</a></li>
                        <li><a href="#contact-shop" class="inline-flex rounded-full bg-punch px-4 py-2 text-white transition hover:bg-ink">${c['boutique.nav.contact']}</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="mx-auto max-w-[1500px] space-y-28 px-5 py-20 md:px-10 md:py-28">
            <section id="vetements" class="scroll-mt-32">
                <div class="mb-12 flex items-end justify-between">
                    <div>
                        <p class="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/40">${c['boutique.clothes.kicker']}</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.88] tracking-tight md:text-8xl">${c['boutique.clothes.title']}</h2>
                        <p class="mt-5 font-serif text-xl italic text-black/50">${c['boutique.clothes.subtitle']}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    ${vetementsHtml || `<p class="text-black/50 italic">${c['boutique.clothes.empty']}</p>`}
                </div>
            </section>

            <section id="ressources" class="scroll-mt-32 border-t border-black/10 pt-20">
                 <div class="mb-12 flex items-end justify-between">
                    <div>
                        <p class="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/40">${c['boutique.resources.kicker']}</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.88] tracking-tight md:text-8xl">${c['boutique.resources.title']}</h2>
                        <p class="mt-5 font-serif text-xl italic text-black/50">${c['boutique.resources.subtitle']}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    ${ressourcesHtml || `<p class="text-black/50 italic">${c['boutique.resources.empty']}</p>`}
                </div>
            </section>

            <section id="contact-shop" class="relative mt-20 overflow-hidden scroll-mt-32 rounded-[2.5rem] bg-punch p-8 text-white md:p-16">
                <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-glow/30 blur-2xl"></div>
                <p class="relative mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/55">${c['boutique.contact.kicker']}</p>
                <h2 class="relative max-w-4xl font-display text-5xl font-extrabold leading-[0.9] md:text-8xl">${c['boutique.contact.title']}</h2>
                <p class="relative mt-7 max-w-2xl font-serif text-xl text-white/70">
                    ${c['boutique.contact.text']}
                </p>
                <a href="#/contact" class="relative mt-9 inline-flex rounded-full bg-white px-8 py-4 font-black text-ink transition hover:scale-105">
                    ${c['boutique.contact.button']}
                </a>
            </section>
        </main>

        <!-- --- RESERVATION MODAL --- -->
        <div id="reservation-modal" class="fixed inset-0 z-50 hidden transition-opacity duration-300 opacity-0" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onclick="window.closeReservationModal()"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    
                    <div class="relative scale-95 transform overflow-hidden rounded-[2rem] bg-white text-left opacity-0 shadow-2xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg">
                        
                        <div class="flex items-center justify-between border-b border-white/10 bg-ink px-6 py-5 text-white">
                            <h3 class="font-display text-xl font-extrabold leading-6" id="modal-title">Réserver un article</h3>
                            <button type="button" class="text-gray-400 hover:text-gray-500" onclick="window.closeReservationModal()">
                                <span class="sr-only">Fermer</span>
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="px-6 py-6">
                            <form id="reservation-form" onsubmit="window.submitReservation(event)">
                                <div class="mb-6">
                                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Article sélectionné</p>
                                    <h4 id="modal-product-name" class="text-xl font-black text-punch mt-1">Nom du produit</h4>
                                    <!-- Container pour Description et Dimensions -->
                                    <div id="modal-product-details" class="mt-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <!-- Injecté via JS -->
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                                    <div class="col-span-1">
                                         <label for="res-lastname" class="block text-sm font-bold text-gray-700">Nom</label>
                                         <input type="text" id="res-name" required class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                    </div>
                                    <div class="col-span-1">
                                         <label for="res-firstname" class="block text-sm font-bold text-gray-700">Prénom</label>
                                         <input type="text" id="res-firstname" required class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                    </div>
                                    
                                    <div class="col-span-2">
                                         <label for="res-phone" class="block text-sm font-bold text-gray-700">Téléphone</label>
                                         <input type="tel" id="res-phone" required placeholder="06 12 34 56 78" class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                    </div>

                                    <div id="modal-apparel-fields" class="col-span-2 grid grid-cols-2 gap-4 hidden">
                                        <div>
                                            <label for="res-size" class="block text-sm font-bold text-gray-700">Taille</label>
                                            <select id="res-size" class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                                <option value="">Choisir...</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="res-color" class="block text-sm font-bold text-gray-700">Couleur (optionnelle)</label>
                                            <input type="text" id="res-color" placeholder="Ex: Noir" class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                        </div>
                                    </div>

                                    <div class="col-span-2 sm:col-span-1">
                                         <label for="res-qty" class="block text-sm font-bold text-gray-700">Quantité</label>
                                         <input type="number" id="res-qty" value="1" min="1" max="10" required class="mt-1 block w-full rounded-xl border-gray-300 bg-white px-4 py-2 text-sm focus:border-punch focus:ring-punch outline-none border transition">
                                    </div>
                                </div>

                                <div class="mt-8 flex justify-end gap-3">
                                    <button type="button" class="rounded-xl px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 transition" onclick="window.closeReservationModal()">Annuler</button>
                                    <button type="submit" class="rounded-xl bg-ink px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-800 transition">Confirmer la réservation</button>
                                </div>
                                <div id="reservation-error" role="alert" class="mt-4 hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700"></div>
                            </form>

                            <div id="reservation-success" class="hidden text-center py-8">
                                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                                    <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-black text-gray-900">Merci !</h3>
                                <p class="mt-2 text-sm text-gray-500">Votre demande de réservation a bien été prise en compte. Nous vous contacterons très prochainement pour finaliser la commande.</p>
                                <div class="mt-6">
                                    <button type="button" class="inline-flex w-full justify-center rounded-xl bg-punch px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-opacity-90 transition" onclick="window.closeReservationModal()">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
