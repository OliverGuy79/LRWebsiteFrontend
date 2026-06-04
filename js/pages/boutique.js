import { api } from '../services/api.service.js';

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
        document.getElementById('reservation-form').classList.remove('hidden');
    }, 300);
};

window.submitReservation = (event) => {
    event.preventDefault();

    const formData = {
        product: window.currentReservationProduct,
        name: document.getElementById('res-name').value,
        firstname: document.getElementById('res-firstname').value,
        phone: document.getElementById('res-phone').value,
        quantity: document.getElementById('res-qty').value,
        size: document.getElementById('res-size').value,
        color: document.getElementById('res-color').value
    };

    console.log("Réservation envoyée :", formData);

    // Afficher le message de succès
    document.getElementById('reservation-form').classList.add('hidden');
    document.getElementById('reservation-success').classList.remove('hidden');
};

export async function boutique() {
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
            stockBadge = '<span class="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">Rupture</span>';
        } else {
            stockBadge = '<span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">En stock</span>';
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
                class="block w-full text-center bg-ink text-paper font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                ${product.is_in_stock === "FALSE" ? 'disabled' : ''}>
                ${product.is_in_stock === "FALSE" ? 'Rupture de stock' : 'Réserver cet article'}
            </button>
        `;

        return `
        <article class="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-lg transition-all duration-300 relative flex flex-col h-full">
            <div class="${isBook ? 'aspect-[3/4]' : 'aspect-square'} bg-haze relative overflow-hidden flex-shrink-0">
                ${visualContent}
                ${priceDisplay}
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div class="text-xs font-bold text-punch uppercase tracking-widest">${product.category}</div>
                    ${stockBadge}
                </div>
                
                <h3 class="text-xl font-black mb-1">${product.name}</h3>
                
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
    <div class="bg-paper text-ink font-sans min-h-screen relative">
        <header class="sticky top-16 z-30 bg-paper/95 backdrop-blur border-b border-black/5 py-4">
            <div class="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="font-black text-2xl tracking-tight">BOUTIQUE</div>
                <nav>
                    <ul class="flex gap-6 text-sm font-bold uppercase tracking-wide text-black/60">
                        <li><a href="#vetements" class="hover:text-punch transition-colors">Vêtements</a></li>
                        <li><a href="#ressources" class="hover:text-punch transition-colors">Ressources</a></li>
                        <li><a href="#contact-shop" class="hover:text-punch transition-colors">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-20">
            <section id="vetements" class="scroll-mt-32">
                <div class="flex items-end justify-between mb-8">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-black">Nos Vêtements</h2>
                        <p class="mt-2 text-black/60">Portez le message.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${vetementsHtml || '<p class="text-black/50 italic">Aucun vêtement disponible pour le moment.</p>'}
                </div>
            </section>

            <section id="ressources" class="scroll-mt-32 border-t border-black/5 pt-16">
                 <div class="flex items-end justify-between mb-8">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-black">Ressources</h2>
                        <p class="mt-2 text-black/60">Livres, Musique & enseignements pour grandir.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${ressourcesHtml || '<p class="text-black/50 italic">Aucune ressource disponible pour le moment.</p>'}
                </div>
            </section>

            <section id="contact-shop" class="scroll-mt-32 mt-20 bg-haze rounded-3xl p-8 md:p-12 border border-black/5 text-center">
                <h2 class="text-2xl font-black mb-4">Une question sur un article ?</h2>
                <p class="text-black/60 max-w-xl mx-auto mb-8">
                    Notre équipe est là pour vous aider à choisir la bonne taille ou vous conseiller sur nos ressources.
                </p>
                <a href="#/contact" class="inline-flex rounded-full px-8 py-4 font-black bg-punch text-paper hover:bg-punch/90 transition-colors shadow-lg shadow-punch/30">
                    Contacter la boutique
                </a>
            </section>
        </main>

        <!-- --- RESERVATION MODAL --- -->
        <div id="reservation-modal" class="fixed inset-0 z-50 hidden transition-opacity duration-300 opacity-0" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onclick="window.closeReservationModal()"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    
                    <div class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg scale-95 opacity-0 duration-300">
                        
                        <div class="bg-haze px-6 py-4 border-b border-black/5 flex justify-between items-center">
                            <h3 class="text-lg font-black leading-6 text-gray-900" id="modal-title">Réserver un article</h3>
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
