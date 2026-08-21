(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class Z{constructor(){const a="https://eglise-la-rencontre-api.onrender.com",t=["localhost","127.0.0.1"].includes(window.location.hostname);this.baseUrl=t?"":a,this.youtubeApiKey="AIzaSyAWymhSO-yBRTVl4azijVJMhCSQ6_fpcnQ",this.youtubeBaseUrl="https://www.googleapis.com/youtube/v3",console.log("API Base URL:",this.baseUrl||"(relative/proxy)"),this.youtubeApiKey||console.warn("YouTube API Key missing (VITE_YOUTUBE_API_KEY)")}async get(a,t={}){try{let n;if(this.baseUrl&&this.baseUrl.startsWith("http"))n=new URL(`${this.baseUrl}${a}`);else{const o=window.location.origin+(this.baseUrl||""),l=a.startsWith("/")?a:`/${a}`;n=new URL(l,o)}console.log(`API Call: ${n.toString()}`),Object.keys(t).forEach(o=>{t[o]!==void 0&&t[o]!==null&&n.searchParams.append(o,t[o])}),console.log(`API GET: ${n.toString()}`);const s=await fetch(n.toString());if(!s.ok){let o=`Erreur API (${s.status}): ${s.statusText}`;try{const l=await s.json();l.detail&&(o=`Erreur API: ${JSON.stringify(l.detail)}`)}catch{}throw new Error(o)}return await s.json()}catch(n){throw console.error(`API GET Error for ${a}:`,n),n}}async post(a,t={}){const n=a.startsWith("/")?a:`/${a}`,s=this.baseUrl&&this.baseUrl.startsWith("http")?new URL(`${this.baseUrl}${n}`):new URL(n,window.location.origin+(this.baseUrl||""));try{const o=await fetch(s.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok){let l=`Erreur API (${o.status})`;try{const c=await o.json();c.detail&&(l=typeof c.detail=="string"?c.detail:"Les informations envoyées ne sont pas valides.")}catch{}throw new Error(l)}return await o.json()}catch(o){throw console.error(`API POST Error for ${a}:`,o),o}}async getArticles(a=null,t=null,n=!1,s=null){return this.get("/api/articles",{category:a,limit:t,preview:n,tag:s})}async getArticle(a,t=!1){return this.get(`/api/articles/${a}`,{preview:t})}async getProducts(a=null,t=null,n=!1){return this.get("/api/boutique",{category:a,in_stock:t,preview:n})}async getProduct(a,t=!1){return this.get(`/api/boutique/${a}`,{preview:t})}async getEvents(a=null,t=null,n=!1){return this.get("/api/events",{category:a,limit:t,preview:n})}async getUpcomingEvents(a=5,t=!1){return this.get("/api/events/upcoming",{limit:a,preview:t})}async getEvent(a,t=!1){return this.get(`/api/events/${a}`,{preview:t})}async getChurchInfo(){return this.get("/api/church-info")}async getHomeGroups(a=null,t=!1){return this.get("/api/home-groups",{frequency:a,preview:t})}async getTeamMembers(a=null,t=!1){return this.get("/api/pastoral-team",{role:a,preview:t})}async getVision(a=!1){return this.get("/api/vision",{preview:a})}async getHealth(){return this.get("/api/health")}async getYoutubePlaylists(a="UCJ6ItUaNtiSYZBy2sUavMFQ"){if(!this.youtubeApiKey)throw new Error("Clé d'API YouTube manquante.");const t=new URL(`${this.youtubeBaseUrl}/playlists`);t.searchParams.append("part","snippet,contentDetails,status"),t.searchParams.append("channelId",a),t.searchParams.append("maxResults","10"),t.searchParams.append("key",this.youtubeApiKey);const n=await fetch(t.toString());if(!n.ok)throw new Error(`YouTube API Error: ${n.statusText}`);return await n.json()}async getYoutubePlaylistItems(a){if(!this.youtubeApiKey)throw new Error("Clé d'API YouTube manquante.");const t=new URL(`${this.youtubeBaseUrl}/playlistItems`);t.searchParams.append("part","snippet,contentDetails,status"),t.searchParams.append("playlistId",a),t.searchParams.append("maxResults","10"),t.searchParams.append("key",this.youtubeApiKey);const n=await fetch(t.toString());if(!n.ok)throw new Error(`YouTube API Error: ${n.statusText}`);return await n.json()}}const w=new Z;let N=null,K=null;function ee(e){if(typeof e!="string")return!0;const a=e.trim().toLocaleLowerCase("fr-FR");if(!a)return!0;const t=/^(?:titre|sous[ -]?titre|bouton|cta|description|texte|libellé|label|info(?:rmation)? pratique|ligne [12](?: du titre)?|tags?)(?:\s|:|$)/,n=/^(?:ville|adresse(?: e-?mail)?|e-?mail|infos? transports?|jour (?:du )?dimanche|heure (?:du )?dimanche|horaire(?:s)? (?:du )?culte)(?:\s|:|$)/;return t.test(a)||n.test(a)}function te(e,a){return ee(e)?a:e.trim()}async function se(){return N||K||(K=(async()=>{try{const e=await w.get("/api/site-content"),a=e.items||e||[];N={};for(const t of a)t.key&&(N[t.key]=typeof t.content=="string"?t.content:typeof t.title=="string"?t.title:"");return N}catch(e){return console.warn("Site content unavailable, using defaults.",e),N={},N}finally{K=null}})(),K)}async function _(e){const a=await se(),t={};for(const[n,s]of Object.entries(e))t[n]=te(a[n],s);return t}const ae="PLJpx00qiABt1FSmOul4Oo4LmmB6FXJBbd";async function ie(){var D,H;console.log("Chargement accueil...");const a=(new URLSearchParams(window.location.hash.split("?")[1]||"").get("category")||"").trim();let t=[],n=[],s=[],o=null,l=[];const[c,i,d,v,u]=await Promise.all([w.getHomeGroups().catch(r=>(console.warn("Groupes de maison indisponibles, affichage sans groupes.",r),null)),(a?w.getEvents(a,40):w.getUpcomingEvents(40)).catch(r=>(console.warn("Événements indisponibles, affichage du contenu par défaut.",r),null)),w.getYoutubePlaylistItems(ae).catch(()=>null),w.getArticles(null,3).catch(()=>null),_({"accueil.hero.line1":"Bienvenue à","accueil.hero.line2":"La Rencontre","accueil.hero.cta":"Notre Vision","accueil.hero.info1":"Service du dimanche à 10h00","accueil.hero.info2":"Église La Rencontre — Toulouse, France","accueil.last_message.title":"Dernier Message","accueil.last_message.subtitle":"Regardez le message le plus récent","accueil.last_message.cta":"Voir plus","accueil.last_message.playlist":"Messages récents","accueil.events.title":"Événements à venir","accueil.events.subtitle":"Rejoins-nous en présentiel ou en ligne.","accueil.actu.title":"Dernières Actualités","accueil.actu.subtitle":"Restez informé de la vie de l'église","accueil.actu.cta":"Voir toutes les actus","accueil.groups.title":"Rejoignez un Groupe de Maison","accueil.groups.subtitle":"La vie d'église se vit aussi en semaine. Trouvez un groupe près de chez vous pour partager, prier et grandir ensemble.","accueil.groups.cta":"Voir tous les groupes","accueil.newsletter.title":"Restez Informé","accueil.newsletter.subtitle":"Recevez nos actualités et annonces directement dans votre boîte mail.","accueil.newsletter.cta":"S'inscrire"}).catch(()=>({}))]),g=(r,x="text-punch")=>{const y=String(r||"").trim().split(/\s+/),$=y.pop()||"",p=y.join(" ");return`${p}${p?" ":""}<span class="font-serif italic font-semibold ${x}">${$}</span>`};try{if(d&&d.items&&(s=d.items.filter(r=>{var p,m,q,j;const x=((m=(p=r.snippet)==null?void 0:p.title)==null?void 0:m.trim().toLowerCase())||"",y=(q=r.status)==null?void 0:q.privacyStatus,$=["private video","deleted video","vidéo privée","vidéo supprimée"].includes(x);return!!((j=r.contentDetails)!=null&&j.videoId)&&!$&&(!y||y==="public")}).map(r=>{var x,y,$,p;return{videoId:r.contentDetails.videoId,title:r.snippet.title,thumbnail:((y=(x=r.snippet.thumbnails)==null?void 0:x.medium)==null?void 0:y.url)||((p=($=r.snippet.thumbnails)==null?void 0:$.default)==null?void 0:p.url),publishedAt:r.snippet.publishedAt}}).filter(r=>r.thumbnail),s.length>0&&(o=s[0].videoId)),c&&c.home_groups&&(t=c.home_groups.slice(0,9)),i){let r=Array.isArray(i)?i:i.events||[];a&&(r=r.filter(p=>String(p.category||"").localeCompare(a,"fr",{sensitivity:"base"})===0));const x=new Date;x.setHours(0,0,0,0);const y=p=>String(p||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/\s+/g," ");n=[...r].filter(p=>{const m=new Date(p.start_date).getTime();return Number.isFinite(m)&&m>=x.getTime()}).sort((p,m)=>new Date(p.start_date)-new Date(m.start_date)).filter((p,m,q)=>{const j=p.series_id||p.recurrence_id||p.parent_event_id||p.recurring_event_id,h=j?`series:${j}`:[p.title,p.location,p.category].map(y).join("|");return q.findIndex(k=>{const B=k.series_id||k.recurrence_id||k.parent_event_id||k.recurring_event_id;return(B?`series:${B}`:[k.title,k.location,k.category].map(y).join("|"))===h})===m}).slice(0,4).map(p=>{const m=new Date(p.start_date),q=m.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"}),j=String(p.start_time||"").trim(),h=/T\d{2}:\d{2}/.test(String(p.start_date||"")),k=j?j.slice(0,5).replace(":","h"):h?m.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}).replace(":","h"):"";return{id:p.id,slug:p.slug,link:p.link,date:`${q}${k?` • ${k}`:""}`,title:p.title,description:p.description||"Aucune description",location:p.location,category:p.category,image:p.media||p.image||p.cover_image||p.thumbnail,color:"bg-punch"}})}v&&v.articles&&(l=v.articles)}catch(r){console.error("Erreur chargement données accueil:",r)}n.length===0&&n.push({date:"",title:"Aucun événement à venir",description:"Consultez notre agenda complet.",color:"bg-gray-400"});const f=["bg-punch text-white","bg-glow text-ink","bg-ink text-white"],I=n.map((r,x)=>{const y=f[x%f.length],$=r.date.split("•"),p=$[0].trim(),m=$[1]?$[1].trim():"",q=p.match(/(\d+)/),j=q?q[1]:"",h=p.match(/[a-zA-Zéû]+$/),k=h?h[0]:"";return`
        <a href="#/event?id=${r.id||""}"
           class="group grid overflow-hidden border-t border-black/20 transition duration-300 last:border-b hover:translate-x-1 md:grid-cols-[170px_1fr_auto]">
            <div class="${y} flex min-h-[145px] items-center gap-4 p-5 md:min-h-[170px] md:flex-col md:justify-center md:gap-0 md:p-7 md:text-center">
                <span class="font-display text-6xl font-extrabold leading-none md:text-7xl">${j||"—"}</span>
                <span class="text-sm font-black uppercase tracking-[0.2em] md:mt-2">${k||"À venir"}</span>
            </div>
            <div class="flex flex-col justify-center bg-[#f2efe8] px-6 py-7 transition group-hover:bg-white md:px-10">
                <div class="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-black/40">
                    ${x===0?'<span class="rounded-full bg-punch px-3 py-1 text-white">Prochainement</span>':""}
                    ${m?`<span>${m}</span>`:""}
                    ${r.location?`<span>• ${r.location}</span>`:""}
                </div>
                <h3 class="mt-4 font-display text-2xl font-extrabold leading-tight md:text-4xl">${r.title}</h3>
                ${r.description?`<p class="mt-3 line-clamp-1 max-w-3xl font-serif text-lg italic text-black/50">${r.description}</p>`:""}
            </div>
            <div class="hidden min-w-[110px] items-center justify-center bg-[#f2efe8] text-4xl transition group-hover:bg-white group-hover:text-punch md:flex">
                <span class="transition duration-300 group-hover:translate-x-2">→</span>
            </div>
        </a>
    `}).join(""),C={témoignage:"bg-punch text-white",annonce:"bg-glow text-ink",rétrospective:"bg-white text-ink",default:"bg-punch text-white"},b=l.length>0?l.slice(0,3).map((r,x)=>{var h;const y=C[(h=r.category)==null?void 0:h.toLowerCase()]||C.default,$=r.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80",p=r.published_at||r.publication_date||r.created_at,m=p?new Date(p).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Actualité",q=x===0?"md:col-span-7 md:row-span-2 min-h-[520px] md:min-h-[720px]":"md:col-span-5 min-h-[360px]",j=x===0?"text-3xl md:text-5xl lg:text-6xl":"text-2xl md:text-3xl";return`
            <a href="#/article?slug=${r.slug}" class="group relative overflow-hidden rounded-[1.75rem] bg-ink ${q}">
                <img src="${$}" alt="${r.title}" class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-9 ${x===0?"lg:p-12":""}">
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${y}">${r.category||"Article"}</span>
                        <span class="text-xs font-bold uppercase tracking-wider text-white/50">${m}</span>
                    </div>
                    <h3 class="mt-5 max-w-4xl font-display font-extrabold leading-[0.95] tracking-tight text-white ${j}">${r.title}</h3>
                    ${x===0&&r.excerpt?`<p class="mt-5 line-clamp-2 max-w-2xl font-serif text-lg italic text-white/65 md:text-xl">${r.excerpt}</p>`:""}
                    <span class="mt-6 inline-flex items-center gap-3 font-black text-glow">Lire l’article <span class="transition duration-300 group-hover:translate-x-2">→</span></span>
                </div>
            </a>
        `}).join(""):`
            <a href="#/journal" class="relative min-h-[480px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-punch to-ink md:col-span-12">
                <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <p class="text-xs font-black uppercase tracking-[0.2em] text-glow">À venir</p>
                    <h3 class="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">De nouvelles histoires arrivent bientôt.</h3>
                    <span class="mt-6 font-bold text-white/70">Découvrir le journal →</span>
                </div>
            </a>`,T=`
        <div class="mt-10 grid gap-0 overflow-hidden rounded-3xl border border-black/10">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                ${t.map(r=>`
                    <a href="#/home-groups" class="group relative aspect-square overflow-hidden bg-black">
                        <img src="${r.image||"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"}" 
                             alt="${r.home}" 
                             class="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
                        <div class="absolute inset-0 bg-black/25 transition group-hover:bg-black/35"></div>
                        <div class="absolute inset-0 grid place-items-center px-4 text-center">
                            <div>
                                <span class="text-white font-black tracking-wide uppercase text-sm md:text-base block mb-2">${r.home}</span>
                                <span class="text-white/80 text-xs font-bold uppercase tracking-widest">${r.frequency||""}</span>
                            </div>
                        </div>
                    </a>
                `).join("")}
            </div>
        </div>
    `,L=`
        <!-- HERO - Style inspiré Transform Church -->
        <section class="relative min-h-screen flex items-center overflow-hidden bg-[#464646]">
            <!-- Video Background -->
            <div class="absolute inset-0">
                <video
                    class="absolute inset-0 w-full h-full object-cover"
                    autoplay
                    muted
                    loop
                    playsinline
                    poster="https://images.unsplash.com/photo-1519491050282-cf00c82424bd?auto=format&fit=crop&w=1920&q=80">
                    <source src="assets/videos/accueil.mp4" type="video/mp4">
                </video>
                <!-- Overlay sombre -->
                <div class="absolute inset-0 bg-black/50"></div>
                <!-- Dégradé en bas vers la section suivante -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            </div>

            <!-- Contenu hero -->
            <div class="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-0">
                <!-- Titre principal : composition éditoriale Syne + Spectral -->
                <h1 class="max-w-6xl text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.35)]">
                    <span class="block font-serif text-4xl font-normal italic leading-none tracking-[-0.035em] text-white/90 md:text-6xl lg:text-[86px]">${u["accueil.hero.line1"]||"Bienvenue à"}</span>
                    <span class="mt-2 block font-display text-6xl font-extrabold leading-[0.82] tracking-[-0.075em] md:text-8xl lg:text-[138px]">${u["accueil.hero.line2"]||"La Rencontre"}</span>
                </h1>

                <!-- Boutons CTA inline - style Transform Church -->
                <div class="mt-8 flex flex-wrap gap-4">
                    <a href="#/vision" class="inline-block border-2 border-white text-white px-8 py-3 text-sm md:text-lg font-bold tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300">
                        ${u["accueil.hero.cta"]||"Notre Vision"}
                    </a>
                </div>

                <!-- Infos pratiques - style Transform Church -->
                <div class="mt-8 text-white/80 text-lg md:text-2xl font-bold leading-relaxed">
                    <p>${u["accueil.hero.info1"]||"Service du dimanche à 10h00"}</p>
                    <p>${u["accueil.hero.info2"]||"Église La Rencontre — Toulouse, France"}</p>
                </div>
            </div>
        </section>

        <!-- NOTRE MISSION -->
        <section class="bg-paper px-5 py-20 text-ink md:px-10 md:py-28">
            <div class="mx-auto max-w-[1500px]">
                <p class="mb-9 text-xs font-black uppercase tracking-[0.28em] text-black/40">Notre mission</p>
                <div class="font-display text-[15vw] font-extrabold uppercase leading-[0.82] tracking-[-0.075em] md:text-[8rem]">
                    <p>Aimer <span class="font-serif font-medium italic text-glow">Dieu.</span></p>
                    <p>Aimer les <span class="font-serif font-medium italic text-punch">gens.</span></p>
                    <p>Changer le <span class="font-serif font-medium italic text-ink">monde.</span></p>
                </div>
            </div>
        </section>

        <!-- DERNIERS MESSAGES — expérience vidéo éditoriale -->
        <section class="overflow-hidden bg-ink px-4 py-16 text-paper md:px-8 md:py-24">
            <div class="mx-auto max-w-[1500px]">
                <div class="flex items-end justify-between gap-8">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-paper/40">À regarder maintenant</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                            ${g(u["accueil.last_message.title"]||"Derniers Messages","text-glow")}
                        </h2>
                    </div>
                    <a class="hidden shrink-0 items-center gap-2 border-b border-paper/30 pb-2 text-sm font-black uppercase tracking-wider transition hover:border-glow hover:text-glow md:inline-flex"
                       href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" rel="noopener noreferrer">
                        Tous les messages <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div class="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl md:mt-16 md:rounded-[2.5rem]">
                    <div class="aspect-video bg-black">
                        <iframe id="youtube-player" class="h-full w-full"
                            src="https://www.youtube.com/embed/${o||"dQw4w9WgXcQ"}?rel=0"
                            title="Message vidéo" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div class="flex flex-col gap-5 border-t border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-9">
                        <div class="min-w-0">
                            <div class="flex items-center gap-3">
                                <span class="rounded-full bg-punch px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">Nouveau</span>
                                <span id="current-video-date" class="text-xs font-bold uppercase tracking-wider text-white/40">${(D=s[0])!=null&&D.publishedAt?new Date(s[0].publishedAt).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Message récent"}</span>
                            </div>
                            <h3 id="current-video-title" class="mt-4 line-clamp-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                                ${((H=s[0])==null?void 0:H.title)||"Découvrez notre dernier message"}
                            </h3>
                        </div>
                        <a id="current-video-youtube" href="https://www.youtube.com/watch?v=${o||""}" target="_blank" rel="noopener noreferrer"
                           class="inline-flex shrink-0 items-center justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">
                            Voir sur YouTube ↗
                        </a>
                    </div>
                </div>

                <div class="mt-12 flex items-center justify-between">
                    <h3 class="font-serif text-2xl font-semibold italic md:text-3xl">${u["accueil.last_message.playlist"]||"Messages récents"}</h3>
                    <div class="flex items-center gap-3">
                        <span class="mr-2 hidden text-xs font-bold uppercase tracking-widest text-white/35 md:inline">Glisser pour explorer</span>
                        <button id="messages-prev-btn" type="button" aria-label="Messages précédents"
                            class="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:border-glow hover:bg-glow hover:text-ink">←</button>
                        <button id="messages-next-btn" type="button" aria-label="Messages suivants"
                            class="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl transition hover:border-glow hover:bg-glow hover:text-ink">→</button>
                    </div>
                </div>

                <div id="messages-carousel" class="scrollbar-hide mt-6 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-1 pb-4 select-none active:cursor-grabbing">
                    ${s.length>0?s.map((r,x)=>`
                        <button data-video-id="${r.videoId}"
                            data-video-title="${r.title.replace(/"/g,"&quot;")}"
                            data-video-date="${r.publishedAt||""}"
                            class="youtube-video-btn group w-[78vw] max-w-[390px] shrink-0 snap-start text-left sm:w-[44vw] lg:w-[29vw] ${x===0?"is-active":""}">
                            <div class="video-card-frame relative aspect-video overflow-hidden rounded-2xl border-2 ${x===0?"border-glow":"border-transparent"} bg-white/5 transition group-hover:border-white/30">
                                <img src="${r.thumbnail}" alt="" draggable="false" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                                <span class="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/30">
                                    <span class="grid h-12 w-12 place-items-center rounded-full bg-white text-lg text-black shadow-lg transition group-hover:scale-110">▶</span>
                                </span>
                            </div>
                            <p class="mt-4 line-clamp-2 font-display text-lg font-bold leading-tight text-white/80 transition group-hover:text-white">${r.title}</p>
                            <p class="mt-2 text-xs font-bold uppercase tracking-wider text-white/35">${r.publishedAt?new Date(r.publishedAt).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"}):"Message"}</p>
                        </button>
                    `).join(""):'<p class="py-12 text-white/45">Les prochains messages apparaîtront bientôt ici.</p>'}
                </div>

                <a class="mt-7 inline-flex items-center gap-2 border-b border-paper/30 pb-2 text-sm font-black uppercase tracking-wider md:hidden"
                   href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" rel="noopener noreferrer">Tous les messages ↗</a>
            </div>
        </section>

        <!-- PROCHAINS ÉVÉNEMENTS -->
    <section id="events" class="bg-[#f2efe8] border-y border-black/10">
        <div class="mx-auto max-w-[1500px] px-4 py-16 md:px-8 md:py-28">
            <div class="flex items-end justify-between gap-8">
                <div>
                    <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">Agenda</p>
                    <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">${g(u["accueil.events.title"]||"Événements à venir")}</h2>
                    <p class="mt-5 font-serif text-lg italic text-black/50 md:text-2xl">${u["accueil.events.subtitle"]||"Rejoins-nous en présentiel ou en ligne."}</p>
                </div>
            </div>

            ${a?`
            <div class="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-5 py-4">
                <span class="text-xs font-black uppercase tracking-[0.16em] text-black/45">Catégorie</span>
                <span class="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">${a}</span>
                <a href="#/actu" class="ml-auto text-sm font-bold text-punch hover:underline">Tous les événements ×</a>
            </div>`:""}
            <div class="mt-12">${I}</div>

        </div>
    </section>

        <!-- ACTUALITÉS -->
        <section id="actu-section" class="overflow-hidden bg-white px-4 py-16 md:px-8 md:py-28">
          <div class="mx-auto max-w-[1500px]">
            <div class="flex items-end justify-between gap-8">
                <div class="max-w-5xl">
                    <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">Actualités</p>
                    <h2 class="font-display text-5xl font-extrabold leading-[0.85] tracking-[-0.06em] md:text-7xl lg:text-8xl">${g(u["accueil.actu.title"]||"Dernières Actualités")}</h2>
                    <p class="mt-5 font-serif text-lg italic text-black/50 md:text-2xl">${u["accueil.actu.subtitle"]||"Restez informé de la vie de l'église"}</p>
                </div>
                <a class="hidden shrink-0 items-center gap-2 border-b border-black/30 pb-2 text-sm font-black uppercase tracking-wider transition hover:border-punch hover:text-punch md:inline-flex" href="#/journal">
                    ${u["accueil.actu.cta"]||"Toutes les actualités"} →
                </a>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-12 md:grid-rows-2">
                ${b}
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full border border-black/15 px-5 py-4 font-bold hover:border-black/40" href="#/journal">
                    ${u["accueil.actu.cta"]||"Voir toutes les actus"}
                </a>
            </div>
          </div>

          <div class="mt-16 -mx-4 rotate-[-1deg] overflow-hidden bg-glow py-4 text-ink md:-mx-8 md:mt-24">
            <div class="whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                Actualités&nbsp; • &nbsp;Histoires&nbsp; • &nbsp;Vie d’église&nbsp; • &nbsp;Témoignages&nbsp; • &nbsp;Actualités&nbsp; • &nbsp;Histoires&nbsp; • &nbsp;Vie d’église&nbsp; →
            </div>
          </div>
        </section>

        <!-- MOSAÏQUE - HOME GROUPS -->
        <section class="w-full bg-paper">
            <div class="mx-auto max-w-[95%] px-4 md:px-8 py-12 md:py-16">
                <h2 class="text-center font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-[-0.05rem] lg:tracking-[-0.15rem] leading-[0.9]">
                    ${g(u["accueil.groups.title"]||"Rejoignez un Groupe de Maison")}
                </h2>
                <p class="mt-4 text-center font-serif italic text-lg md:text-xl text-black/50 max-w-2xl mx-auto">
                    ${u["accueil.groups.subtitle"]||"La vie d'église se vit aussi en semaine. Trouvez un groupe près de chez vous pour partager, prier et grandir ensemble."}
                </p>

                ${T}

                <div class="mt-10 text-center">
                    <a href="#/home-groups" class="inline-flex justify-center rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition">
                        ${u["accueil.groups.cta"]||"Voir tous les groupes"}
                    </a>
                </div>
            </div>
        </section>

        <!-- NEWSLETTER -->
        <section class="bg-ink text-paper">
            <div class="mx-auto max-w-[95%] px-4 py-12 md:py-16">
                <div class="grid gap-8 md:grid-cols-2 md:items-center">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Newsletter</p>
                        <h2 class="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-[-0.05rem] lg:tracking-[-0.15rem] leading-[0.9]">${g(u["accueil.newsletter.title"]||"Restez Informé","text-glow")}</h2>
                        <p class="mt-3 font-serif italic text-lg md:text-xl text-paper/50">${u["accueil.newsletter.subtitle"]||"Recevez nos actualités et annonces directement dans votre boîte mail."}</p>
                    </div>

                    <form class="rounded-3xl bg-paper/10 border border-paper/10 p-6">
                        <label class="text-sm font-bold">Email</label>
                        <div class="mt-2 flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="votre@email.com" class="w-full rounded-2xl px-4 py-3 bg-paper text-ink placeholder:text-black/40 outline-none" />
                            <button class="rounded-2xl px-6 py-3 font-black bg-glow text-ink hover:opacity-90" type="button">
                                ${u["accueil.newsletter.cta"]||"S'inscrire"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    `;return setTimeout(()=>{const r=document.querySelectorAll(".youtube-video-btn"),x=document.getElementById("youtube-player"),y=document.getElementById("current-video-title"),$=document.getElementById("current-video-date"),p=document.getElementById("current-video-youtube");r.forEach(A=>{A.addEventListener("click",()=>{var U,F;const S=A.dataset.videoId,R=A.dataset.videoTitle,P=A.dataset.videoDate;x&&(x.src="https://www.youtube.com/embed/"+S+"?rel=0&autoplay=1"),y&&(y.textContent=R),$&&($.textContent=P?new Date(P).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Message récent"),p&&(p.href=`https://www.youtube.com/watch?v=${S}`),r.forEach(M=>{var G,O;M.classList.remove("is-active"),(G=M.querySelector(".video-card-frame"))==null||G.classList.remove("border-glow"),(O=M.querySelector(".video-card-frame"))==null||O.classList.add("border-transparent")}),A.classList.add("is-active"),(U=A.querySelector(".video-card-frame"))==null||U.classList.remove("border-transparent"),(F=A.querySelector(".video-card-frame"))==null||F.classList.add("border-glow"),x==null||x.scrollIntoView({behavior:"smooth",block:"center"})})});const m=document.getElementById("messages-carousel"),q=document.getElementById("messages-prev-btn"),j=document.getElementById("messages-next-btn");if(m){const A=z=>{const W=m.querySelector(".youtube-video-btn"),J=W?W.getBoundingClientRect().width+20:m.clientWidth*.8;m.scrollBy({left:z*J,behavior:"smooth"})};q==null||q.addEventListener("click",()=>A(-1)),j==null||j.addEventListener("click",()=>A(1));let S=!1,R=!1,P=0,U=0,F=0,M=0,G=0,O;m.addEventListener("pointerdown",z=>{z.pointerType!=="mouse"||z.button!==0||(S=!0,R=!1,P=z.clientX,U=m.scrollLeft,F=z.clientX,M=performance.now(),G=0,m.style.scrollSnapType="none",m.style.scrollBehavior="auto")}),m.addEventListener("pointermove",z=>{if(!S)return;const W=z.clientX-P;Math.abs(W)>5&&(R=!0),m.scrollLeft=U-W;const J=performance.now(),X=J-M;X>0&&(G=(F-z.clientX)/X),F=z.clientX,M=J});const Y=()=>{S&&(S=!1,m.scrollBy({left:G*180,behavior:"smooth"}),window.setTimeout(()=>{m.style.scrollSnapType="",m.style.scrollBehavior=""},350))};m.addEventListener("pointerup",Y),m.addEventListener("pointercancel",Y),m.addEventListener("pointerleave",Y),m.addEventListener("wheel",z=>{Math.abs(z.deltaY)<=Math.abs(z.deltaX)||(z.preventDefault(),m.style.scrollSnapType="none",m.scrollBy({left:z.deltaY*1.15,behavior:"auto"}),window.clearTimeout(O),O=window.setTimeout(()=>{m.style.scrollSnapType=""},160))},{passive:!1}),m.addEventListener("click",z=>{R&&(z.preventDefault(),z.stopPropagation(),R=!1)},!0)}const h=document.getElementById("events-carousel"),k=document.getElementById("prev-events-btn"),B=document.getElementById("next-events-btn");if(h&&k&&B){const A=()=>window.innerWidth>=1024?h.clientWidth*.33:window.innerWidth>=768?h.clientWidth*.5:h.clientWidth*.85;k.onclick=()=>{h.scrollBy({left:-A(),behavior:"smooth"})},B.onclick=()=>{h.scrollBy({left:A(),behavior:"smooth"})};const S=()=>{if(window.innerWidth<768){k.style.display="none",B.style.display="none";return}k.style.display="flex",B.style.display="flex";const R=h.scrollLeft,P=h.clientWidth,U=h.scrollWidth;k.style.opacity=R<=10?"0":"1",k.style.pointerEvents=R<=10?"none":"auto",B.style.opacity=R+P>=U-10?"0":"1",B.style.pointerEvents=R+P>=U-10?"none":"auto"};h.addEventListener("scroll",S),window.addEventListener("resize",S),setTimeout(S,150)}},100),L}async function le(){const e=await _({"elrtv.kicker":"Watch & Listen","elrtv.title":"ELR TV","elrtv.subtitle":"Retrouvez nos prédications, célébrations et contenus multimédias pour grandir ensemble.","elrtv.latest":"Dernières Vidéos","elrtv.channel":"Flux de la chaîne @EgliseLaRencontre","elrtv.playlists":"Toutes nos Playlists","elrtv.media":"Médias complémentaires","elrtv.podcast.title":"Podcast hebdomadaire","elrtv.podcast.text":"Découvrez nos enseignements format audio pour vous accompagner partout.","elrtv.study.title":"Approfondissement","elrtv.study.text":"Des vidéos courtes pour approfondir certains thèmes bibliques."});let a=[],t="UUJ6ItUaNtiSYZBy2sUavMFQ",n=null;try{const o=await w.getYoutubePlaylists();o&&o.items&&(a=o.items)}catch(o){console.warn("YouTube API Fetch failed:",o.message),o.message.includes("manquante")&&(n="Clé d'API YouTube non configurée. Affichage du mode limité.")}setTimeout(()=>{const o=document.querySelectorAll(".playlist-btn"),l=document.getElementById("youtube-player-iframe"),c=document.getElementById("player-playlist-name");o.forEach(i=>{i.addEventListener("click",d=>{d.preventDefault();const v=i.dataset.id,u=i.dataset.title;l&&(l.src=`https://www.youtube.com/embed/videoseries?list=${v}`,c&&(c.textContent=u),o.forEach(g=>g.classList.remove("bg-punch","text-white")),o.forEach(g=>g.classList.add("bg-paper","text-ink")),i.classList.remove("bg-paper","text-ink"),i.classList.add("bg-punch","text-white"),window.scrollTo({top:document.getElementById("player-section").offsetTop-100,behavior:"smooth"}))})}),document.querySelectorAll(".media-card[data-type]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.type,v=i.dataset.url;re(d,v)})})},100);const s=o=>{var c,i,d;const l=o.id===t;return`
        <button data-id="${o.id}" data-title="${o.snippet.title}" class="playlist-btn text-left group/playlist shrink-0 w-64 md:w-80 rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 transition-all hover:scale-[1.02] ${l?"ring-2 ring-punch":""}">
            <div class="aspect-video relative">
                <img src="${((c=o.snippet.thumbnails.high)==null?void 0:c.url)||((i=o.snippet.thumbnails.medium)==null?void 0:i.url)}" alt="${o.snippet.title}" class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/20 group-hover/playlist:bg-transparent transition-colors"></div>
                <div class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    ${((d=o.contentDetails)==null?void 0:d.itemCount)||"?"} vidéos
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-black text-sm md:text-base line-clamp-1">${o.snippet.title}</h3>
                <p class="text-xs text-black/50 mt-1 line-clamp-2">${o.snippet.description||"Pas de description."}</p>
            </div>
        </button>
        `};return`
      <div class="elr-page">
        <!-- Header -->
        <section class="elr-page-hero">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p class="elr-kicker">${e["elrtv.kicker"]}</p>
                    <h1 class="elr-page-title">${e["elrtv.title"]}</h1>
                    <p class="elr-page-lead">${e["elrtv.subtitle"]}</p>
                </div>
                
                ${n?`
                <div class="bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-xl text-xs text-yellow-800 flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>${n}</span>
                </div>`:""}
            </div>

        </section>

        <!-- Dynamic Player Section -->
        <section id="player-section" class="mx-auto max-w-6xl px-4 pb-16">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 id="player-playlist-name" class="text-xl md:text-2xl font-black">${e["elrtv.latest"]}</h2>
                    <p class="text-sm text-black/50">${e["elrtv.channel"]}</p>
                </div>
                <a href="https://www.youtube.com/@EgliseLaRencontre" target="_blank" class="hidden md:flex items-center gap-2 rounded-full bg-punch px-4 py-2 text-white text-sm font-bold shadow-sm hover:opacity-90">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    S'abonner
                </a>
            </div>
            
            <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-heavy border border-black/5 bg-ink">
                <iframe 
                    id="youtube-player-iframe"
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/videoseries?list=${t}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
        </section>

        <!-- Playlists Selector -->
        ${a.length>0?`
        <section class="bg-black/5 py-16">
            <div class="mx-auto max-w-6xl px-4">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-black font-serif">${e["elrtv.playlists"]}</h2>
                    <span class="text-xs font-bold uppercase tracking-widest text-black/30 md:block hidden">← Glisser pour explorer →</span>
                </div>
                
                <div class="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x">
                    ${a.map(s).join("")}
                </div>
            </div>
        </section>`:""}

        <!-- Local / Audio Section -->
        <section class="mx-auto max-w-6xl px-4 py-20">
            <h2 class="text-xl md:text-2xl font-black mb-10">${e["elrtv.media"]}</h2>
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <article class="media-card group rounded-[2.5rem] overflow-hidden bg-paper shadow-soft border border-rule cursor-pointer hover:shadow-xl transition-all duration-500" data-type="audio" data-url="https://www.w3schools.com/html/horse.mp3">
                    <div class="aspect-video relative overflow-hidden bg-ink/5 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full bg-paper/90 backdrop-blur-sm shadow-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span class="text-2xl">🎧</span>
                        </div>
                    </div>
                    <div class="p-8">
                        <span class="inline-flex items-center rounded-full bg-glow/30 text-ink px-4 py-1.5 text-[10px] font-black tracking-widest uppercase">Podcast</span>
                        <h3 class="mt-4 text-xl font-black font-serif">${e["elrtv.podcast.title"]}</h3>
                        <p class="mt-2 text-black/50 text-sm leading-relaxed">${e["elrtv.podcast.text"]}</p>
                    </div>
                </article>

                <article class="media-card group rounded-[2.5rem] overflow-hidden bg-paper shadow-soft border border-rule cursor-pointer hover:shadow-xl transition-all duration-500" data-type="video" data-url="https://www.w3schools.com/html/mov_bbb.mp4">
                    <div class="aspect-video relative overflow-hidden bg-ink/5 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full bg-paper/90 backdrop-blur-sm shadow-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span class="text-2xl">▶️</span>
                        </div>
                    </div>
                    <div class="p-8">
                        <span class="inline-flex items-center rounded-full bg-punch/10 text-punch px-4 py-1.5 text-[10px] font-black tracking-widest uppercase">Étude</span>
                        <h3 class="mt-4 text-xl font-black font-serif">${e["elrtv.study.title"]}</h3>
                        <p class="mt-2 text-black/50 text-sm leading-relaxed">${e["elrtv.study.text"]}</p>
                    </div>
                </article>
            </div>
        </section>
      </div>
    `}function re(e,a){const t=document.getElementById("audio-player"),n=document.getElementById("video-player"),s=document.getElementById("player-container");s&&s.classList.remove("hidden"),e==="audio"?(n&&(n.pause(),n.classList.add("hidden")),t&&(t.classList.remove("hidden"),t.src=a,t.controls=!0,t.play())):(t&&(t.pause(),t.classList.add("hidden")),n&&(n.classList.remove("hidden"),n.src=a,n.controls=!0,n.play()))}async function ne(){const e=await _({"contact.description":"Nous sommes là pour vous. N'hésitez pas à nous rejoindre ou à nous écrire.","contact.address.street":"1 rue des Braves","contact.address.postal_city":"31300 Toulouse","contact.address.country":"France","contact.address.city":"Toulouse, France","contact.address.transit":"Tram T1 — Zénith | Métro Ligne A — Pâte d'Oie","contact.email":"larencontrefr@gmail.com","contact.service_times.title":"Horaires des cultes","contact.service_times.sunday.day":"Dimanche","contact.service_times.sunday.time":"10h00","contact.form.title":"Envoyez-nous un message","contact.form.subtitle":"Nous vous répondrons dans les plus brefs délais.","contact.kicker":"Parlons ensemble","contact.title":"Nous contacter","contact.address.label":"Adresse","contact.email.label":"Email","contact.form.name":"Votre nom","contact.form.first_name":"Prénom","contact.form.last_name":"Nom","contact.form.phone":"Téléphone","contact.form.email":"Votre email","contact.form.subject":"Sujet","contact.form.message":"Votre message","contact.form.submit":"Envoyer le message","contact.form.subject.general":"Question générale","contact.form.subject.groups":"Home Groups","contact.form.subject.baptism":"Baptême","contact.form.subject.prayer":"Demande de prière","contact.form.subject.other":"Autre","contact.form.message.placeholder":"Comment pouvons-nous vous aider ?","contact.form.success.title":"Message envoyé avec succès !","contact.form.success.text":"Nous vous répondrons bientôt.","contact.map.placeholder":"Carte interactive bientôt disponible"});setTimeout(()=>{const n=document.getElementById("contact-form"),s=document.getElementById("contact-success"),o=document.getElementById("contact-error"),l=n==null?void 0:n.querySelector('button[type="submit"]');!n||!l||n.addEventListener("submit",async c=>{c.preventDefault(),o==null||o.classList.add("hidden"),l.disabled=!0,l.textContent="Envoi en cours…";const i=new FormData(n),d={first_name:String(i.get("first_name")||"").trim(),last_name:String(i.get("last_name")||"").trim(),email:String(i.get("email")||"").trim(),phone:String(i.get("phone")||"").trim(),subject:String(i.get("subject")||"general"),message:String(i.get("message")||"").trim()};try{await w.post("/api/contact",d),n.reset(),n.classList.add("hidden"),s==null||s.classList.remove("hidden")}catch(v){o&&(o.textContent=v.message||"Le message n’a pas pu être envoyé. Veuillez réessayer.",o.classList.remove("hidden")),l.disabled=!1,l.textContent=e["contact.form.submit"]}})},100);const a=`${e["contact.address.street"]}, ${e["contact.address.postal_city"]}, ${e["contact.address.country"]}`,t=encodeURIComponent(a);return`
    <div class="elr-page font-sans">
        <!-- Header -->
        <section class="elr-page-hero">
            <p class="elr-kicker">${e["contact.kicker"]}</p>
            <h1 class="elr-page-title">${e["contact.title"]}</h1>
            <p class="elr-page-lead">
                ${e["contact.description"]}
            </p>
        </section>

        <!-- Contact Content -->
        <section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div class="grid gap-8 lg:grid-cols-2">
                <!-- Contact Info -->
                <div class="space-y-6">
                    <!-- Address Card -->
                    <div class="elr-surface p-6 shadow-soft md:p-8">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-punch/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">${e["contact.address.label"]}</h3>
                                <address class="mt-1 not-italic leading-relaxed text-black/70">
                                    ${e["contact.address.street"]}<br>
                                    ${e["contact.address.postal_city"]}<br>
                                    ${e["contact.address.country"]}
                                </address>
                                <p class="mt-3 text-sm text-black/50">${e["contact.address.transit"]}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Email Card -->
                    <div class="elr-surface p-6 shadow-soft md:p-8">
                        <div class="flex items-start gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-ink/10 flex items-center justify-center flex-shrink-0">
                                <svg class="h-6 w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black">${e["contact.email.label"]}</h3>
                                <p class="mt-1 text-black/70">${e["contact.email"]}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Service Times -->
                    <div class="rounded-3xl p-6 md:p-8 bg-ink text-paper shadow-soft">
                        <h3 class="text-lg font-black flex items-center gap-2">
                            <svg class="h-5 w-5 text-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ${e["contact.service_times.title"]}
                        </h3>
                        <ul class="mt-4 space-y-2 text-paper/80">
                            <li class="flex justify-between">
                                <span>${e["contact.service_times.sunday.day"]}</span>
                                <span class="font-bold">${e["contact.service_times.sunday.time"]}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="elr-surface p-6 shadow-soft md:p-8">
                    <h2 class="text-2xl md:text-3xl font-black mb-2">${e["contact.form.title"]}</h2>
                    <p class="text-black/60 mb-8">${e["contact.form.subtitle"]}</p>

                    <form id="contact-form" class="space-y-6">
                        <div class="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.first_name"]}</label>
                            <input
                                type="text"
                                name="first_name"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                autocomplete="given-name"
                                placeholder="Marie">
                          </div>
                          <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.last_name"]}</label>
                            <input
                                type="text"
                                name="last_name"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                autocomplete="family-name"
                                placeholder="Dupont">
                          </div>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.email"]}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="jean@exemple.fr">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.phone"]}</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                minlength="6"
                                autocomplete="tel"
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition"
                                placeholder="+33 6 12 34 56 78">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.subject"]}</label>
                            <select
                                name="subject"
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition">
                                <option value="general">${e["contact.form.subject.general"]}</option>
                                <option value="home-group">${e["contact.form.subject.groups"]}</option>
                                <option value="baptism">${e["contact.form.subject.baptism"]}</option>
                                <option value="prayer">${e["contact.form.subject.prayer"]}</option>
                                <option value="other">${e["contact.form.subject.other"]}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-black/70 mb-2">${e["contact.form.message"]}</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                class="w-full rounded-2xl px-5 py-4 bg-haze border border-black/10 focus:border-punch focus:outline-none transition resize-none"
                                placeholder="${e["contact.form.message.placeholder"]}"></textarea>
                        </div>

                        <button
                            type="submit"
                            class="w-full rounded-full px-8 py-4 font-black bg-ink text-paper hover:opacity-90 transition text-lg">
                            ${e["contact.form.submit"]}
                        </button>
                    </form>

                    <div id="contact-success" class="hidden mt-6 p-4 rounded-2xl bg-glow/20 text-center">
                        <p class="font-bold text-ink">${e["contact.form.success.title"]}</p>
                        <p class="text-black/70 text-sm mt-1">${e["contact.form.success.text"]}</p>
                    </div>
                    <div id="contact-error" role="alert" class="hidden mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"></div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="mx-auto max-w-6xl px-4 pb-16">
            <div class="relative overflow-hidden rounded-[2rem] border border-black/10 bg-haze shadow-soft md:rounded-[3rem]">
                <iframe
                    title="Localisation de l’Église La Rencontre"
                    src="https://www.google.com/maps?q=${t}&output=embed"
                    class="h-[360px] w-full border-0 md:h-[520px]"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen>
                </iframe>
                <div class="m-4 rounded-2xl border border-black/10 bg-white p-5 shadow-soft md:absolute md:bottom-4 md:left-4 md:m-0 md:max-w-sm">
                    <p class="text-[10px] font-black uppercase tracking-[0.18em] text-punch">Nous trouver</p>
                    <address class="mt-2 font-serif text-lg font-semibold not-italic leading-snug text-ink">${a}</address>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${t}"
                       target="_blank" rel="noopener noreferrer"
                       class="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-punch">
                        Obtenir l’itinéraire <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </section>

    </div>
    `}async function oe(){const e=await _({"article.journal.kicker":"Le journal de La Rencontre","article.reading_time":"Temps de lecture estimé : 5 min","article.tags.label":"Tags :","article.share":"Partager l’article","article.more":"Lire plus d’articles","article.related.kicker":"Articles liés","article.related.title":"À lire sur le même sujet","article.related.empty":"Aucun autre article ne partage encore ces tags.","article.related.all":"Découvrir tous les articles →"}),a=new URLSearchParams(window.location.hash.split("?")[1]),t=a.get("slug"),n=a.get("id");let s=null,o=!0,l=null;const c=t||n;if(c)try{s=await w.getArticle(c),Array.isArray(s)&&(s=s[0])}catch(b){console.error("Erreur chargement article:",b),l="Impossible de charger l'article."}else l="Article non spécifié.";if(o=!1,o)return`
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement de l'article...</div>
            </div>
        </div>`;if(l||!s)return`
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${l||"Article introuvable."}</p>
            <a href="#/journal" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour au journal
            </a>
        </div>`;const i=b=>(Array.isArray(b)?b:String(b||"").split(",")).map(T=>String(T).trim()).filter(Boolean),d=i(s.tags),v=d.map(b=>b.toLocaleLowerCase("fr"));let u=[];if(d.length>0)try{const b=await w.getArticles(null,null,!1,d[0]);u=(Array.isArray(b)?b:(b==null?void 0:b.articles)||[]).filter(L=>String(L.id)!==String(s.id)&&L.slug!==s.slug).map(L=>({...L,sharedTagCount:i(L.tags).filter(D=>v.includes(D.toLocaleLowerCase("fr"))).length})).filter(L=>L.sharedTagCount>0).sort((L,D)=>D.sharedTagCount-L.sharedTagCount).slice(0,3)}catch(b){console.warn("Articles liés indisponibles.",b)}const g=new Date(s.published_at||s.created_at||Date.now()).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),f=s.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80",C=(s.content_html||s.content||"<p>Contenu non disponible.</p>").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`
    <div class="elr-page font-sans">
      
      <!-- Journal Header (Sub-header for the Blog section) -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-[1500px] px-5 py-7 md:px-10">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/journal" class="text-center md:text-left group">
              <div class="text-[10px] font-black uppercase tracking-[0.28em] text-black/40">${e["article.journal.kicker"]}</div>
              <div class="mt-2 flex items-baseline justify-center gap-2 md:justify-start">
                <span class="font-display text-4xl font-extrabold leading-none tracking-[-0.05em] transition-colors group-hover:text-punch md:text-5xl">ELR</span>
                <span class="font-serif text-4xl font-semibold italic leading-none text-punch md:text-5xl">Actu</span>
              </div>
            </a>

          </div>
        </div>
      </header>

      <!-- Article layout -->
      <main class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <!-- Category + Title -->
        <section class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
            <a href="#/journal?category=${encodeURIComponent(s.category||"Article")}" class="px-2 py-1 rounded-full border border-rule hover:bg-haze hover:border-black/30 transition-colors">${s.category||"Article"}</a>
            <span>•</span>
            <span class="capitalize">${g}</span>
          </div>

          <h1 class="mt-6 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.055em] text-ink md:text-8xl">
            ${s.title}
          </h1>

          <p class="mt-7 font-serif text-xl italic leading-relaxed text-black/60 md:text-2xl">
            ${s.excerpt||""}
          </p>

          <!-- Author line -->
          <div class="mt-6 flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-cover bg-center border border-rule" style="background-image: url('https://ui-avatars.com/api/?name=${s.author||"Admin"}&background=random')"></div>
            <div>
              <div class="font-bold">Par ${s.author||"La Rédaction"}</div>
              <div class="text-sm text-black/60">${e["article.reading_time"]}</div>
            </div>
          </div>
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="overflow-hidden rounded-[2rem] border border-rule shadow-soft md:rounded-[3rem]">
            <div class="aspect-[16/9] relative bg-gray-100">
                 <img src="${f}" alt="${s.title}" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
          <p class="mt-3 text-xs text-black/55">
            ${s.title}
          </p>
        </section>

        <!-- Article grid -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Article body -->
          <article class="lg:col-span-8">
            <div id="article-content" class="article-reading-surface">
               ${C}
            </div>

            <!-- Tags + Share -->
            <div class="mt-12 border-t border-rule pt-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-black tracking-widest uppercase text-black/50">${e["article.tags.label"]}</span>
                ${(d.length?d:["Journal","Église"]).map(b=>`
                    <a href="#/journal?tag=${encodeURIComponent(String(b).trim())}" class="text-xs font-bold px-3 py-1 rounded-full border border-rule hover:border-black/30 hover:bg-haze transition-colors">
                      ${b.trim()}
                    </a>
                `).join("")}
              </div>

              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <button onclick="navigator.share({title: '${s.title}', url: window.location.href})" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  ${e["article.share"]}
                </button>
                <a href="#/journal" class="inline-flex justify-center rounded-full px-6 py-3 font-bold border border-rule hover:border-black/30 transition-colors">
                  ${e["article.more"]}
                </a>
              </div>
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <div class="rounded-[2rem] border border-rule bg-white/70 p-5 shadow-soft md:p-6">
                <div class="text-xs font-black uppercase tracking-[0.2em] text-black/45">${e["article.related.kicker"]}</div>
                <h2 class="mt-3 font-serif text-3xl font-bold leading-[1.08] tracking-[-0.025em]">${e["article.related.title"]}</h2>
                <div class="mt-6 divide-y divide-rule">
                  ${u.length?u.map(b=>`
                    <a href="#/article?${b.slug?`slug=${encodeURIComponent(b.slug)}`:`id=${encodeURIComponent(b.id)}`}" class="group grid grid-cols-[84px_1fr] gap-4 py-4 first:pt-0 last:pb-0">
                      <div class="aspect-square overflow-hidden rounded-xl bg-haze">
                        <img src="${b.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=300&q=75"}" alt="" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                      </div>
                      <div class="min-w-0 self-center">
                        <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${i(b.tags).filter(T=>v.includes(T.toLocaleLowerCase("fr"))).slice(0,2).join(" · ")}</p>
                        <h3 class="mt-1 line-clamp-3 font-display text-base font-extrabold leading-snug transition-colors group-hover:text-punch">${b.title}</h3>
                      </div>
                    </a>
                  `).join(""):`
                    <p class="py-3 font-serif text-base italic leading-relaxed text-black/55">${e["article.related.empty"]}</p>
                    <a href="#/journal" class="mt-3 inline-flex text-sm font-black text-punch hover:underline">${e["article.related.all"]}</a>
                  `}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
    `}async function ce(){const e=await _({"journal.kicker":"Le journal de La Rencontre","journal.subtitle":"Histoires, nouvelles et témoignages de la vie de l’église.","journal.latest.title":"Dernières publications","journal.latest.subtitle":"Retrouvez tous nos articles et actualités.","journal.filter.label":"Filtre actif","journal.filter.clear":"Afficher tous les articles ×","journal.empty.title":"Aucune publication trouvée","journal.empty.text":"Aucun article ne correspond à ce filtre pour le moment.","journal.empty.button":"Voir tous les articles","journal.read":"À lire","journal.discover":"À découvrir","journal.now":"En ce moment"}),a=new URLSearchParams(window.location.hash.split("?")[1]||""),t=(a.get("category")||"").trim(),n=(a.get("tag")||"").trim();let s=[];try{const r=await w.getArticles(t||null,null,!1,n||null);r&&Array.isArray(r.articles)?s=r.articles:Array.isArray(r)&&(s=r),t&&(s=s.filter(x=>String(x.category||"").localeCompare(t,"fr",{sensitivity:"base"})===0)),n&&(s=s.filter(x=>(Array.isArray(x.tags)?x.tags:String(x.tags||"").split(",")).some($=>String($).trim().localeCompare(n,"fr",{sensitivity:"base"})===0)))}catch(r){console.error("Erreur chargement articles:",r)}const o=r=>new Date(r||Date.now()).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}),l=r=>r.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80",c=!!(t||n),i=c?null:s[0],d=c?[]:s.slice(1,5),v=c?s.slice(0,3):s.slice(5,8),u=c?s.slice(3,5):s.slice(8,10),g=c?s.slice(5,8):s.slice(10,13),f=c?s.slice(8):s.slice(13,16),I=()=>i?`
        <article class="lg:col-span-8">
            <a href="#/article?slug=${i.slug||i.id}" class="group block">
                <div class="rounded-2xl overflow-hidden shadow-soft border border-rule">
                    <div class="aspect-[16/9] relative overflow-hidden">
                        <img src="${l(i)}" alt="${i.title}"
                             class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                </div>

                <div class="mt-5">
                    <div class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
                        <span class="px-2 py-1 rounded-full border border-rule">À la une</span>
                        <span>•</span>
                        <span>${i.category||"Actualité"}</span>
                    </div>

                    <h1 class="mt-3 font-black tracking-tight leading-[1.05] text-3xl md:text-5xl font-serif group-hover:text-punch transition-colors">
                        ${i.title}
                    </h1>

                    <p class="mt-3 text-black/75 text-base md:text-lg max-w-3xl line-clamp-3">
                        ${i.excerpt||""}
                    </p>

                    <div class="mt-4 flex items-center gap-3 text-sm text-black/60">
                        <span class="font-semibold text-black/70">Par ${i.author||"La Rédaction"}</span>
                        <span class="text-black/30">•</span>
                        <span>${o(i.published_at)}</span>
                    </div>
                </div>
            </a>
        </article>`:'<p class="lg:col-span-8 text-center py-10">Aucun article à la une.</p>',C=()=>d.length===0?`<div class="p-4 text-sm text-gray-500">Pas d'autres articles récents.</div>`:d.map(r=>`
            <a href="#/article?slug=${r.slug||r.id}" class="block p-4 bg-paper hover:bg-haze transition-colors group">
                <div class="text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-punch transition-colors">
                    ${r.category||"Actualité"}
                </div>
                <div class="mt-1 font-black leading-snug line-clamp-2">
                    ${r.title}
                </div>
                <div class="mt-2 text-xs text-black/55">${o(r.published_at)} • Par ${r.author||"Admin"}</div>
            </a>
        `).join(""),b=()=>v.length===0?"":v.map((r,x)=>`
            <article class="group">
                <a href="#/article?slug=${r.slug||r.id}" class="block">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                        ${r.category||"Actualité"}
                    </div>
                    <h3 class="mt-2 font-black text-xl leading-snug font-serif">
                        ${r.title}
                    </h3>
                    <p class="mt-2 text-black/70 line-clamp-2">
                        ${r.excerpt||""}
                    </p>
                    <div class="mt-3 text-xs text-black/55">${o(r.published_at)}</div>
                </a>
            </article>
            ${x<v.length-1?'<div class="my-6 h-px bg-rule"></div>':""}
        `).join(""),T=()=>u.length===0?"":u.map(r=>`
            <article class="group rounded-2xl overflow-hidden border border-rule bg-paper hover:bg-haze transition-colors">
                <a href="#/article?slug=${r.slug||r.id}" class="block">
                    <div class="aspect-[16/9] relative overflow-hidden">
                        <img src="${l(r)}" alt="${r.title}"
                             class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    </div>
                    <div class="p-5">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${r.category||"Actualité"}
                        </div>
                        <h3 class="mt-2 font-black text-2xl leading-snug font-serif">
                            ${r.title}
                        </h3>
                        <p class="mt-2 text-black/70 line-clamp-2">
                            ${r.excerpt||""}
                        </p>
                        <div class="mt-3 text-xs text-black/55">${o(r.published_at)}</div>
                    </div>
                </a>
            </article>
        `).join(""),L=()=>g.length===0?"":g.map(r=>`
            <a href="#/article?slug=${r.slug||r.id}" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors group">
                <div class="flex items-start gap-3">
                    <div class="h-14 w-14 rounded-xl overflow-hidden border border-rule flex-shrink-0">
                        <img src="${l(r)}" alt="${r.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${r.category||"Actualité"}
                        </div>
                        <div class="mt-1 font-black leading-snug font-serif line-clamp-2">
                            ${r.title}
                        </div>
                        <div class="mt-2 text-xs text-black/55">${o(r.published_at)}</div>
                    </div>
                </div>
            </a>
        `).join(""),D=()=>f.length===0?"":f.map(r=>`
            <a href="#/article?slug=${r.slug||r.id}" class="block py-5 pr-0 lg:pr-8 hover:bg-haze transition-colors group">
                <div class="flex items-start gap-5">
                    <div class="hidden sm:block h-20 w-20 rounded-xl overflow-hidden border border-rule flex-shrink-0">
                        <img src="${l(r)}" alt="${r.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                        <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">
                            ${r.category||"Actualité"}
                        </div>
                        <div class="mt-2 font-black text-2xl leading-snug font-serif">
                            ${r.title}
                        </div>
                        <p class="mt-2 text-black/70 line-clamp-2">
                            ${r.excerpt||""}
                        </p>
                        <div class="mt-3 text-xs text-black/55">Par ${r.author||"La Rédaction"} • ${o(r.published_at)}</div>
                    </div>
                </div>
            </a>
        `).join("");return`
    <div class="elr-page">
      <!-- Top utility bar -->
      <div class="border-b border-rule">
        <div class="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-xs text-black/70">
          <div class="flex items-center gap-3">
            <span class="font-semibold capitalize">${new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</span>
          </div>
          <div class="flex items-center gap-3">
            <a class="hover:text-punch transition-colors" href="#/contact">Contact</a>
          </div>
        </div>
      </div>

      <!-- Masthead -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div class="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <a href="#/journal" class="group text-center md:text-left">
              <div class="text-[10px] font-black uppercase tracking-[0.32em] text-black/40">${e["journal.kicker"]}</div>
              <div class="mt-3 flex items-baseline justify-center gap-3 md:justify-start">
                <span class="font-display text-5xl font-extrabold leading-none tracking-[-0.06em] transition-colors group-hover:text-punch md:text-8xl">ELR</span>
                <span class="font-serif text-5xl font-semibold italic leading-none text-punch md:text-8xl">Actu</span>
              </div>
              <div class="mt-4 max-w-xl font-serif text-base italic text-black/55 md:text-lg">
                ${e["journal.subtitle"]}
              </div>
            </a>

            <div class="flex items-center justify-center md:justify-end gap-2">
              <a class="rounded-full px-4 py-2 text-sm font-bold border border-rule hover:border-black/30 transition-colors" href="#latest">
                Dernières
              </a>
              <a class="rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90 transition-opacity" href="#/contact">
                Contact
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation -->
      </header>

      <!-- Body -->
      <main class="mx-auto max-w-7xl px-4 py-10">
        ${t||n?`
        <div class="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-rule bg-haze px-5 py-4">
          <span class="text-xs font-black uppercase tracking-[0.16em] text-black/45">${e["journal.filter.label"]}</span>
          <span class="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
            ${n?`#${n}`:t}
          </span>
          <a href="#/journal" class="ml-auto text-sm font-bold text-punch hover:underline">${e["journal.filter.clear"]}</a>
        </div>`:""}
        ${c?"":`
        <!-- HERO GRID -->
        <section class="grid gap-8 lg:grid-cols-12">
          ${I()}

          <!-- Sidebar: trending / picks -->
          <aside class="lg:col-span-4">
            <div class="sticky top-6">
              <div class="flex items-end justify-between">
                <h2 class="text-sm font-black tracking-widest uppercase text-black/60">${e["journal.read"]}</h2>
              </div>

              <div class="mt-4 divide-y divide-rule border border-rule rounded-2xl overflow-hidden">
                ${C()}
              </div>

              <!-- Mini ad / promo -->
              <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                <div class="text-xs font-black tracking-widest uppercase text-black/60">Notre vision</div>
                <div class="mt-2 font-black text-lg leading-snug font-serif">
                  Découvrez la vision de l'Église La Rencontre
                </div>
                <a href="#/vision" class="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                  Découvrir
                </a>
              </div>
            </div>
          </aside>
        </section>
        `}

        <!-- Three-column strip -->
        <section id="latest" class="mt-12">
          <div class="flex items-end justify-between gap-6">
            <div>
              <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">${e["journal.latest.title"]}</h2>
              <p class="mt-2 text-black/70">${e["journal.latest.subtitle"]}</p>
            </div>
          </div>

          <div class="mt-8 grid gap-8 lg:grid-cols-12">
            ${s.length===0?`
            <div class="rounded-3xl border border-rule bg-haze px-6 py-16 text-center lg:col-span-12">
              <h3 class="font-display text-3xl font-extrabold">${e["journal.empty.title"]}</h3>
              <p class="mt-3 text-black/60">${e["journal.empty.text"]}</p>
              <a href="#/journal" class="mt-6 inline-flex rounded-full bg-ink px-5 py-3 font-bold text-white">${e["journal.empty.button"]}</a>
            </div>`:""}
            <!-- Column A -->
            <div class="lg:col-span-4">
              <div class="border-t border-rule pt-6">
                ${b()}
              </div>
            </div>

            <!-- Column B (with image cards) -->
            <div class="lg:col-span-5">
              <div class="border-t border-rule pt-6">
                <div class="grid gap-6">
                  ${T()}
                </div>
              </div>
            </div>

            <!-- Column C (reviews box) -->
            <div class="lg:col-span-3">
              <div class="border-t border-rule pt-6">
                <div class="flex items-end justify-between">
                  <h3 class="text-sm font-black tracking-widest uppercase text-black/60">${e["journal.discover"]}</h3>
                </div>

                <div class="mt-4 space-y-4">
                  ${L()}
                </div>

                <!-- Subscribe -->
                <div class="mt-8 rounded-2xl border border-rule p-5 bg-ink text-paper">
                  <div class="text-xs font-black tracking-widest uppercase text-paper/70">Newsletter</div>
                  <div class="mt-2 font-black text-lg font-serif leading-snug">
                    Restez informé
                  </div>

                  <p class="mt-2 text-sm text-paper/70">
                    Recevez nos actualités directement dans votre boîte mail.
                  </p>

                  <a href="#/contact" class="mt-4 inline-flex rounded-xl px-4 py-3 font-bold bg-paper text-ink hover:opacity-90 transition-opacity">
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Simple list section -->
        ${f.length>0?`
        <section class="mt-14">
          <div class="flex items-end justify-between gap-6">
            <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">${e["journal.now"]}</h2>
          </div>

          <div class="mt-6 border-t border-rule">
            <div class="grid gap-0 lg:grid-cols-12">
              <!-- left list -->
              <div class="lg:col-span-8 border-r border-rule">
                <div class="divide-y divide-rule">
                  ${D()}
                </div>
              </div>

              <!-- right rail -->
              <div class="lg:col-span-4">
                <div class="py-6 lg:pl-8">
                  <div class="text-xs font-black tracking-widest uppercase text-black/60">Prochains événements</div>
                  <div class="mt-3 space-y-3">
                    <a href="#/contact" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors">
                      <div class="font-black">Dimanche • 10:00</div>
                      <div class="text-black/70">Culte du dimanche</div>
                    </a>
                    <a href="#/home-groups" class="block rounded-2xl border border-rule p-4 hover:bg-haze transition-colors">
                      <div class="font-black">En semaine</div>
                      <div class="text-black/70">Groupes de maison</div>
                    </a>
                  </div>

                  <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                    <div class="text-xs font-black tracking-widest uppercase text-black/60">Nous rejoindre</div>
                    <p class="mt-2 text-black/70">
                      L'Église La Rencontre vous accueille tous les dimanches pour le culte.
                    </p>
                    <a href="#/contact" class="mt-3 inline-flex text-sm font-bold text-punch hover:opacity-80 transition-opacity">
                      Voir les horaires →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        `:""}
      </main>
    </div>
    `}function de(e){const a=String(e.media||"").trim(),t=a.match(/drive\.google\.com\/file\/d\/([^/?#]+)/)||a.match(/[?&]id=([^&#]+)/),n=/\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i.test(a);return t?`/api/images/google-drive/${t[1]}`:n?a:e.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80"}async function pe(){const e=await _({"event.header.title":"ELR EVENTS","event.header.subtitle":"Les événements de l’Église La Rencontre","event.register":"S’inscrire","event.info.title":"Informations pratiques","event.info.hours":"Horaires","event.info.location":"Lieu","event.info.address":"Adresse"}),a=new URLSearchParams(window.location.hash.split("?")[1]),t=a.get("slug"),n=a.get("id");let s=null,o=!0,l=null;const c=t||n;if(c)try{s=await w.getEvent(c)}catch(I){console.error("Erreur chargement événement:",I),l="Impossible de charger l'événement."}else l="Événement non spécifié.";if(o=!1,o)return`
        <div class="min-h-screen bg-paper flex items-center justify-center">
            <div class="text-center animate-pulse">
                <div class="text-xl font-serif text-black/60">Chargement de l'événement...</div>
            </div>
        </div>`;if(l||!s)return`
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${l||"Événement introuvable."}</p>
            <a href="#/" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour à l'accueil
            </a>
        </div>`;const i=s.start_date?new Date(s.start_date):null,d=i?i.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):"",v=s.start_time||"",u=de(s),f=(s.content_html||s.description||"<p>Contenu non disponible.</p>").replace(/`/g,"\\`").replace(/\$/g,"\\$");return`
    <div class="elr-page font-sans">

      <!-- Header -->
      <header class="border-b border-rule">
        <div class="mx-auto max-w-[1500px] px-5 py-7 md:px-10">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <a href="#/actu" class="text-center md:text-left group">
              <div class="text-[10px] font-black uppercase tracking-[0.28em] text-black/40">${e["event.header.subtitle"]}</div>
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
            <a href="#/actu?category=${encodeURIComponent(s.category||"Événement")}" class="px-2 py-1 rounded-full border border-rule hover:bg-haze hover:border-black/30 transition-colors">${s.category||"Événement"}</a>
            <span>•</span>
            <span class="capitalize">${d}</span>
            ${v?`<span>•</span><span>${v}</span>`:""}
          </div>

          <h1 class="mt-6 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.055em] text-ink md:text-8xl">
            ${s.title}
          </h1>

          ${s.description?`
          <p class="mt-7 font-serif text-xl italic leading-relaxed text-black/60 md:text-2xl">
            ${s.description}
          </p>
          `:""}

          <!-- Event info -->
          <div class="mt-6 flex flex-wrap items-center gap-4">
            ${s.location?`
            <div class="flex items-center gap-2 text-black/70">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>${s.location}</span>
            </div>
            `:""}
            ${s.address?`
            <div class="flex items-center gap-2 text-black/70">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <span>${s.address}</span>
            </div>
            `:""}
          </div>

          ${s.registration_required==="true"||s.registration_required==="oui"?`
          <div class="mt-6">
            <a href="${s.registration_link||"#"}" class="inline-flex justify-center rounded-full px-6 py-3 font-bold bg-punch text-paper hover:opacity-90 transition-opacity" target="_blank">
              ${e["event.register"]}
            </a>
          </div>
          `:""}
        </section>

        <!-- Hero image -->
        <section class="mt-10">
          <div class="overflow-hidden rounded-[2rem] border border-rule shadow-soft md:rounded-[3rem]">
            <div class="aspect-[16/9] relative bg-gray-100">
                 <img src="${u}" alt="${s.title}" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
          <p class="mt-3 text-xs text-black/55">${s.title}</p>
        </section>

        <!-- Event content -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Content body -->
          <article class="lg:col-span-8">
            <div id="article-content" class="article-reading-surface">
               ${f}
            </div>
          </article>

          <!-- Right rail -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <div class="rounded-[2rem] border border-rule bg-white/70 p-5 shadow-soft md:p-6">
                <div class="text-xs font-black uppercase tracking-[0.2em] text-black/45">${e["event.info.title"]}</div>
                <h2 class="mt-3 font-serif text-3xl font-bold leading-[1.08] tracking-[-0.025em]">Préparez votre venue</h2>
                <div class="mt-6 divide-y divide-rule">
                  <div class="py-4 first:pt-0">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">Date</p>
                    <p class="mt-1 font-display text-lg font-extrabold capitalize">${d||"À venir"}</p>
                  </div>
                  ${s.start_time?`
                  <div class="py-4">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${e["event.info.hours"]}</p>
                    <p class="mt-1 font-display text-lg font-extrabold">${s.start_time}${s.end_time?` — ${s.end_time}`:""}</p>
                  </div>`:""}
                  ${s.location?`
                  <div class="py-4">
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${e["event.info.location"]}</p>
                    <p class="mt-1 font-display text-lg font-extrabold">${s.location}</p>
                  </div>`:""}
                  ${s.address?`
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
                          <p class="text-[10px] font-black uppercase tracking-[0.14em] text-punch">${e["event.info.address"]}</p>
                          <address class="mt-1 font-serif text-base font-semibold not-italic leading-snug text-ink">${s.address}</address>
                          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/45 transition hover:text-punch">
                            Ouvrir dans Maps <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>`:""}
                </div>
              </div>

              ${s.registration_required==="true"||s.registration_required==="oui"?`
              <div class="rounded-[2rem] border border-punch bg-punch/5 p-6">
                <div class="text-xs font-black tracking-widest uppercase text-punch">
                  Inscription requise
                </div>
                <p class="mt-2 text-sm text-black/70">
                  Cet événement nécessite une inscription préalable.
                </p>
                <a href="${s.registration_link||"#"}" class="mt-4 inline-flex rounded-full px-5 py-2.5 font-bold bg-punch text-paper hover:opacity-90 transition-opacity" target="_blank">
                  ${e["event.register"]}
                </a>
              </div>
              `:""}
            </div>
          </aside>
        </section>
      </main>
    </div>
    `}async function ue(){let e=[];try{const i=await w.getArticles();i&&Array.isArray(i.articles)?e=i.articles:Array.isArray(i)&&(e=i)}catch(i){console.error("Erreur chargement articles:",i)}const a=(i,d="standard")=>{var f;const v=i.image||"https://images.unsplash.com/photo-1493612276216-9c782cb70dad?auto=format&fit=crop&q=80&w=1000",u=new Date(i.published_at||i.created_at).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}),g=i.category||"Actualité";return d==="hero"?`
            <article class="lg:col-span-8">
                <a href="#/article?id=${i.id}" class="group block">
                    <div class="rounded-2xl overflow-hidden shadow-soft border border-rule">
                        <div class="aspect-[16/9] relative overflow-hidden">
                             <img src="${v}" alt="${i.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        </div>
                    </div>

                    <div class="mt-5">
                        <div class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60">
                            <span class="px-2 py-1 rounded-full border border-rule">À la une</span>
                            <span>•</span>
                            <span>${g}</span>
                        </div>

                        <h1 class="mt-3 font-black tracking-tight leading-[1.05] text-3xl md:text-5xl font-serif group-hover:text-punch transition-colors">
                            ${i.title}
                        </h1>

                        <p class="mt-3 text-black/75 text-base md:text-lg max-w-3xl line-clamp-3">
                            ${i.excerpt||((f=i.content)==null?void 0:f.substring(0,150))+"..."}
                        </p>

                        <div class="mt-4 flex items-center gap-3 text-sm text-black/60">
                            <span class="font-semibold text-black/70">Par ${i.author||"La Rédaction"}</span>
                            <span class="text-black/30">•</span>
                            <span>${u}</span>
                        </div>
                    </div>
                </a>
            </article>`:d==="sidebar"?`
            <a href="#/article?id=${i.id}" class="block p-4 bg-paper hover:bg-haze transition-colors group">
                <div class="text-xs font-bold uppercase tracking-widest text-black/60 group-hover:text-punch transition-colors">${g}</div>
                <div class="mt-1 font-black leading-snug line-clamp-2">
                    ${i.title}
                </div>
                <div class="mt-2 text-xs text-black/55">${u} • Par ${i.author||"Admin"}</div>
            </a>`:d==="grid"?`
            <article class="group">
                <a href="#/article?id=${i.id}" class="block">
                    <div class="text-xs font-bold tracking-widest uppercase text-black/60 group-hover:text-punch transition-colors">${g}</div>
                    <h3 class="mt-2 font-black text-xl leading-snug font-serif group-hover:text-accent">
                        ${i.title}
                    </h3>
                    <p class="mt-2 text-black/70 line-clamp-2">
                        ${i.excerpt||""}
                    </p>
                    <div class="mt-3 text-xs text-black/55">${u}</div>
                </a>
                <div class="my-6 h-px bg-rule"></div>
            </article>`:""},t=e[0],n=e.slice(1,4),s=e.slice(4),o=t?a(t,"hero"):"<p>Aucun article à la une.</p>",l=n.map(i=>a(i,"sidebar")).join(""),c=s.map(i=>a(i,"grid")).join("");return`
    <div class="elr-page">
        <!-- Masthead -->
        <header class="border-b border-rule">
            <div class="mx-auto max-w-7xl px-4 py-6">
                <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div class="text-center md:text-left">
                        <div class="font-black tracking-tight text-4xl md:text-6xl leading-none">
                            ELR ACTU
                        </div>
                        <div class="mt-2 text-sm text-black/70">
                            Culture • Musique • Société — une mise en page “magazine”
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Body -->
        <main class="mx-auto max-w-7xl px-4 py-10">
            <!-- HERO GRID -->
            <section class="grid gap-8 lg:grid-cols-12">
                <!-- Main feature -->
                ${o}

                <!-- Sidebar: trending / picks -->
                <aside class="lg:col-span-4">
                    <div class="sticky top-6">
                        <div class="flex items-end justify-between">
                            <h2 class="text-sm font-black tracking-widest uppercase text-black/60">À lire</h2>
                        </div>

                        <div class="mt-4 divide-y divide-rule border border-rule rounded-2xl overflow-hidden">
                            ${l||`<div class="p-4 text-sm text-gray-500">Pas d'autres articles récents.</div>`}
                        </div>

                        <!-- Mini ad / promo -->
                        <div class="mt-6 rounded-2xl border border-rule p-5 bg-haze">
                            <div class="text-xs font-black tracking-widest uppercase text-black/60">Dossier</div>
                            <div class="mt-2 font-black text-lg leading-snug font-serif">
                                “Web & Foi” : quand le design sert un message
                            </div>
                            <a href="#/vision"
                                class="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-bold bg-ink text-paper hover:opacity-90">
                                Découvrir
                            </a>
                        </div>
                    </div>
                </aside>
            </section>

            <!-- Latest Articles Grid -->
            <section id="latest" class="mt-12">
                 <div class="flex items-end justify-between gap-6 mb-8">
                    <div>
                        <h2 class="font-display text-4xl font-extrabold tracking-tight md:text-6xl">Dernières <span class="font-serif font-medium italic text-punch">publications</span></h2>
                    </div>
                </div>
                
                <div class="lg:col-span-4">
                     <div class="border-t border-rule pt-6">
                        ${c}
                     </div>
                </div>
            </section>
        </main>
    </div>
    `}async function me(){let e=[];const[a,t]=await Promise.all([w.getArticles(null,3,!1,"kidz").catch(()=>null),_({"kidz.hero.tags":"FUN • SÉCURITÉ • JÉSUS","kidz.hero.title":"Un endroit où les enfants se sentent aimés, en sécurité et grandissent avec Jésus.","kidz.hero.subtitle":"Kidz, c'est le programme des enfants de La Rencontre. Chaque dimanche, vos enfants vivent un moment spécial adapté à leur âge.","kidz.values.title":"Ce que les enfants vivent ici","kidz.values.subtitle":"Nos valeurs pour chaque enfant : vu, en sécurité, heureux, connecté et sauvé.","kidz.values.vu.title":"Vu","kidz.values.vu.description":"Un endroit où chaque enfant est vu et aimé.","kidz.values.safe.title":"En sécurité","kidz.values.safe.description":"La sécurité est notre priorité (accueil et remise sécurisés).","kidz.values.happy.title":"Heureux","kidz.values.happy.description":"On s'amuse, on apprend, on repart avec le sourire.","kidz.values.connected.title":"Connecté","kidz.values.connected.description":"Des amitiés durables se créent chaque semaine.","kidz.values.saved.title":"Sauvé","kidz.values.saved.description":"Le but : une relation personnelle avec Jésus-Christ.","kidz.groups.title":"Groupes d'âge","kidz.groups.subtitle":"Des espaces adaptés à chaque âge pour que chaque enfant vive une expérience adaptée.","kidz.groups.petits.label":"Petits","kidz.groups.petits.age":"3 — 6 ans","kidz.groups.petits.description":"Un espace joyeux et sécurisé pour découvrir Dieu à travers le jeu, les chansons et les histoires bibliques.","kidz.groups.grands.label":"Grands","kidz.groups.grands.age":"7 — 11 ans","kidz.groups.grands.description":"Des leçons engageantes, des activités interactives et des temps de louange pour rendre la Bible vivante.","kidz.steps.title":"Comment ça se passe","kidz.steps.subtitle":"Accueil de votre enfant au début du service, puis culte en famille, puis Kidz.","kidz.steps.1.title":"Accueil","kidz.steps.1.description":"Arrivez un peu avant le début du culte. L'équipe Kidz accueille votre enfant et vous donne toutes les informations utiles.","kidz.steps.2.title":"Moment Kidz","kidz.steps.2.description":"Pendant le culte, les enfants vivent un temps dédié : louange, histoire biblique, jeux et activités créatives.","kidz.steps.3.title":"Retrouvailles","kidz.steps.3.description":"À la fin du service, venez récupérer votre enfant. Il repartira avec un grand sourire et plein de choses à raconter !"}).catch(()=>({}))]);a&&a.articles&&(e=a.articles);const n=e.length>0?e.map(s=>`
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] overflow-hidden">
                    <img src="${s.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80"}" alt="${s.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">${s.category||"Kidz"}</p>
                    <h3 class="mt-2 text-lg font-black">${s.title}</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">${s.excerpt||""}</p>
                    <a href="#/article?slug=${s.slug}" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                        Lire la suite →
                    </a>
                </div>
            </article>
        `).join(""):`
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] bg-gradient-to-br from-purple-400/20 to-green-400/10"></div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">À venir</p>
                    <h3 class="mt-2 text-lg font-black">Restez connectés</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">De nouvelles actualités Kidz arrivent bientôt...</p>
                </div>
            </article>
        `.repeat(3);return`
    <div class="elr-page font-sans">

        <!-- HERO -->
        <section class="relative min-h-[82vh] overflow-hidden bg-ink text-white md:min-h-[88vh]">
            <video class="absolute inset-0 h-full w-full object-cover" autoplay muted loop playsinline preload="metadata"
                   poster="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80"
                   aria-label="Des enfants participent à un atelier créatif">
                <source src="/assets/videos/kidz-hero.mp4" type="video/mp4">
            </video>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10"></div>
            <div class="pointer-events-none absolute inset-0 bg-punch/15 mix-blend-color"></div>

            <div class="relative mx-auto flex min-h-[82vh] max-w-[1500px] flex-col justify-between px-5 py-8 md:min-h-[88vh] md:px-10 md:py-12">
                <div class="flex items-start justify-between gap-4">
                    <p class="rounded-full border border-white/40 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">${t["kidz.hero.tags"]||"Fun • Sécurité • Jésus"}</p>
                    <p class="hidden rounded-full bg-glow px-5 py-2 text-sm font-black text-ink shadow-lg sm:block">Chaque dimanche · 9h et 11h</p>
                </div>

                <div class="grid items-end gap-8 pb-3 lg:grid-cols-12">
                    <div class="lg:col-span-7">
                        <p class="font-display text-[26vw] font-extrabold uppercase leading-[0.62] tracking-[-0.09em] text-white sm:text-[10rem] lg:text-[12rem]">Kidz<span class="text-glow">.</span></p>
                        <h1 class="mt-8 max-w-4xl font-display text-3xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">${t["kidz.hero.title"]||"Un endroit où les enfants se sentent aimés, en sécurité et grandissent avec Jésus."}</h1>
                    </div>
                    <div class="rounded-[1.5rem] border border-white/20 bg-black/45 p-5 backdrop-blur-md md:p-7 lg:col-span-5">
                        <p class="font-serif text-lg leading-relaxed text-white/80 md:text-xl">${t["kidz.hero.subtitle"]||"Kidz, c'est le programme des enfants de La Rencontre."}</p>
                        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a href="#expect" class="inline-flex justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">À quoi s’attendre</a>
                            <a href="#serve" class="inline-flex justify-center rounded-full border border-white/50 px-6 py-3 font-black transition hover:bg-white hover:text-ink">Groupes d’âge</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- VALUES -->
        <section id="values" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Nos valeurs</p>
                    <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-7xl">${t["kidz.values.title"]||"Ce que les enfants vivent ici"}</h2>
                    <p class="mt-2 text-black/70">${t["kidz.values.subtitle"]||"Nos valeurs pour chaque enfant."}</p>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <!-- card -->
                <div class="rounded-3xl border-2 border-ink bg-punch p-6 text-white shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">V</div>
                    <h3 class="mt-4 font-black text-lg">${t["kidz.values.vu.title"]||"Vu"}</h3>
                    <p class="mt-2 text-sm text-white/80">${t["kidz.values.vu.description"]||"Un endroit où chaque enfant est vu et aimé."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-glow p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✔</div>
                    <h3 class="mt-4 font-black text-lg">${t["kidz.values.safe.title"]||"En sécurité"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["kidz.values.safe.description"]||"La sécurité est notre priorité."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ff7fbf] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">☺</div>
                    <h3 class="mt-4 font-black text-lg">${t["kidz.values.happy.title"]||"Heureux"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["kidz.values.happy.description"]||"On s'amuse, on apprend, on repart avec le sourire."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#73d7ff] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">⟡</div>
                    <h3 class="mt-4 font-black text-lg">${t["kidz.values.connected.title"]||"Connecté"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["kidz.values.connected.description"]||"Des amitiés durables se créent chaque semaine."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ffd84d] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">✝</div>
                    <h3 class="mt-4 font-black text-lg">${t["kidz.values.saved.title"]||"Sauvé"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["kidz.values.saved.description"]||"Le but : une relation personnelle avec Jésus-Christ."}</p>
                </div>
            </div>
        </section>

        <!-- WHO WE SERVE -->
        <section id="serve" class="border-y border-black/10 bg-punch text-white">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-white/50 uppercase">Groupes d'âge</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold md:text-8xl">${t["kidz.groups.title"]||"Groupes d'âge"}</h2>
                    <p class="mt-4 font-serif text-xl italic text-white/70">
                        ${t["kidz.groups.subtitle"]||"Des espaces adaptés à chaque âge."}
                    </p>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <article class="overflow-hidden rounded-[2rem] border-2 border-white/30 bg-paper text-ink shadow-xl">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85" alt="Groupe des petits" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${t["kidz.groups.petits.label"]||"Petits"}</p>
                            <h3 class="mt-2 text-xl font-black">${t["kidz.groups.petits.age"]||"3 — 6 ans"}</h3>
                            <p class="mt-2 text-black/70">
                                ${t["kidz.groups.petits.description"]||"Un espace joyeux et sécurisé pour découvrir Dieu."}
                            </p>
                        </div>
                    </article>

                    <article class="overflow-hidden rounded-[2rem] border-2 border-white/30 bg-paper text-ink shadow-xl">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1526634332515-d56c5fd16991?auto=format&fit=crop&w=1000&q=85" alt="Groupe des grands" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${t["kidz.groups.grands.label"]||"Grands"}</p>
                            <h3 class="mt-2 text-xl font-black">${t["kidz.groups.grands.age"]||"7 — 11 ans"}</h3>
                            <p class="mt-2 text-black/70">
                                ${t["kidz.groups.grands.description"]||"Des leçons engageantes et des activités interactives."}
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- WHAT TO EXPECT -->
        <section id="expect" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Déroulement</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold leading-tight md:text-8xl">${t["kidz.steps.title"]||"Comment ça se passe"}</h2>
                    <p class="mt-2 text-black/70">
                        ${t["kidz.steps.subtitle"]||"Accueil de votre enfant au début du service."}
                    </p>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#7c3aed]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">1</div>
                    <h3 class="mt-4 text-xl font-black">${t["kidz.steps.1.title"]||"Accueil"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["kidz.steps.1.description"]||"Arrivez un peu avant le début du culte."}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-punch"></div>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#a3ff12]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">2</div>
                    <h3 class="mt-4 text-xl font-black">${t["kidz.steps.2.title"]||"Moment Kidz"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["kidz.steps.2.description"]||"Pendant le culte, les enfants vivent un temps dédié."}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-glow"></div>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#ff7fbf]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">3</div>
                    <h3 class="mt-4 text-xl font-black">${t["kidz.steps.3.title"]||"Retrouvailles"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["kidz.steps.3.description"]||"À la fin du service, venez récupérer votre enfant."}
                    </p>
                    <div class="mt-7 h-3 rounded-full bg-[#ff7fbf]"></div>
                </article>
            </div>

            <div class="mt-8 md:hidden">
                <a class="inline-flex w-full justify-center rounded-full px-5 py-3 font-bold bg-ink text-paper hover:opacity-90"
                    href="#/contact">
                    Nous contacter
                </a>
            </div>
        </section>

        <!-- ACTUALITÉS KIDZ -->
        <section id="actu-kidz" class="bg-haze">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Actualités</p>
                        <h2 class="mt-3 font-display text-5xl font-extrabold md:text-7xl">Dernières actus <span class="font-serif font-medium italic text-punch">Kidz</span></h2>
                        <p class="mt-2 text-black/70">Restez informé de tout ce qui se passe chez Kidz</p>
                    </div>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-3">
                    ${n}
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="bg-ink text-paper">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="max-w-3xl">
                    <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Questions</p>
                    <h2 class="mt-3 font-display text-6xl font-extrabold md:text-8xl">FAQ<span class="text-glow">.</span></h2>
                    <p class="mt-2 text-paper/80">Questions fréquentes sur Kidz.</p>
                </div>

                <div class="mt-8 grid gap-4">
                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quel âge pour Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Deux groupes : les Petits (3-6 ans) et les Grands (7-11 ans). Chaque groupe a son propre espace et ses activités adaptées.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Quand a lieu Kidz ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Chaque dimanche matin pendant le culte de 10h00. Les enfants rejoignent leur groupe après la louange.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Mes enfants d’âges différents peuvent rester ensemble ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Les espaces et programmes sont pensés par tranche d’âge ; pour la sécurité, les enfants restent
                            dans leur groupe.
                        </p>
                    </details>
                </div>

                <div class="mt-10 flex flex-col sm:flex-row gap-3">
                    <a class="inline-flex justify-center rounded-full px-6 py-3 font-black bg-glow text-ink hover:opacity-90"
                        href="#/contact">
                        Nous contacter
                    </a>
                </div>
            </div>
        </section>
    </div>
    `}async function xe(){let e=[];const[a,t]=await Promise.all([w.getArticles(null,3,!1,"teenz").catch(()=>null),_({"teenz.hero.tags":"FUN • REAL • JÉSUS","teenz.hero.title":"L'endroit où ta génération se retrouve, se sent comprise et impacte le monde.","teenz.hero.subtitle":"Des rencontres authentiques, des discussions vraies et une foi qui bouge les lignes.","teenz.values.title":"Notre Culture","teenz.values.subtitle":"Connecter • Grandir • Servir • Influencer","teenz.values.connect.title":"Connecter","teenz.values.connect.description":"Des relations fortes pour ne jamais marcher seul.","teenz.values.grow.title":"Grandir","teenz.values.grow.description":"Découvrir son identité et son potentiel en Dieu.","teenz.values.serve.title":"Servir","teenz.values.serve.description":"Utiliser ses talents pour faire une différence.","teenz.values.influence.title":"Influencer","teenz.values.influence.description":"Être une lumière dans son lycée et sa ville.","teenz.groups.title":"Groupes","teenz.groups.subtitle":"Collège et Lycée — Des moments adaptés à ta réalité.","teenz.groups.college.label":"Collège","teenz.groups.college.subtitle":"La Relève (11-14 ans)","teenz.groups.college.description":"Fun, jeux, et discussions autour de la Bible pour naviguer les années collège.","teenz.groups.lycee.label":"Lycée","teenz.groups.lycee.subtitle":"Impact (15-18 ans)","teenz.groups.lycee.description":"Des soirées pour aller plus loin, aborder les vrais sujets et vivre une louange intense.","teenz.steps.title":"À quoi t'attendre","teenz.steps.1.title":"Chill","teenz.steps.1.description":"Un temps pour se poser, manger un bout et discuter avec les potes avant que ça commence.","teenz.steps.2.title":"Message","teenz.steps.2.description":"Un enseignement pertinent qui connecte la Bible à ta vie de tous les jours.","teenz.steps.3.title":"Small Groups","teenz.steps.3.description":"Le moment le plus important : on se divise en petits groupes pour parler vrai et prier."}).catch(()=>({}))]);a&&a.articles&&(e=a.articles);const n=e.length>0?e.map(s=>`
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] overflow-hidden">
                    <img src="${s.image||"https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80"}" alt="${s.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                </div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">${s.category||"Teenz"}</p>
                    <h3 class="mt-2 text-lg font-black">${s.title}</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">${s.excerpt||""}</p>
                    <a href="#/article?slug=${s.slug}" class="mt-4 inline-flex text-sm font-bold text-punch hover:underline">
                        Lire la suite →
                    </a>
                </div>
            </article>
        `).join(""):`
            <article class="rounded-3xl overflow-hidden bg-paper shadow-soft border border-black/5 hover:shadow-lg transition">
                <div class="aspect-[16/10] bg-gradient-to-br from-pink-400/20 to-purple-400/10"></div>
                <div class="p-6">
                    <p class="text-xs font-bold text-punch uppercase">À venir</p>
                    <h3 class="mt-2 text-lg font-black">Restez connectés</h3>
                    <p class="mt-2 text-black/60 text-sm line-clamp-2">De nouvelles actualités Teenz arrivent bientôt...</p>
                </div>
            </article>
        `.repeat(3);return`
    <div class="elr-page font-sans">
        <!-- HERO -->
        <section class="relative min-h-[82vh] overflow-hidden bg-ink text-white md:min-h-[88vh]">
            <video class="absolute inset-0 h-full w-full object-cover" autoplay muted loop playsinline preload="metadata"
                   poster="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
                   aria-label="Un groupe de jeunes partage un moment ensemble">
                <source src="/assets/videos/teenz-hero.mp4" type="video/mp4">
            </video>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/15"></div>
            <div class="pointer-events-none absolute inset-0 bg-punch/20 mix-blend-color"></div>

            <div class="relative mx-auto flex min-h-[82vh] max-w-[1500px] flex-col justify-between px-5 py-8 md:min-h-[88vh] md:px-10 md:py-12">
                <div class="flex items-start justify-between gap-4">
                    <p class="rounded-full border border-white/40 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">${t["teenz.hero.tags"]||"Fun • Real • Jésus"}</p>
                    <p class="hidden rounded-full bg-punch px-5 py-2 text-sm font-black text-white shadow-lg sm:block">Connecter · Grandir · Impacter</p>
                </div>

                <div class="grid items-end gap-8 pb-3 lg:grid-cols-12">
                    <div class="lg:col-span-7">
                        <p class="font-display text-[24vw] font-extrabold uppercase leading-[0.62] tracking-[-0.09em] text-white sm:text-[9rem] lg:text-[11rem]">Teenz<span class="text-punch">.</span></p>
                        <h1 class="mt-8 max-w-4xl font-display text-3xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">${t["teenz.hero.title"]||"L'endroit où ta génération se retrouve, se sent comprise et impacte le monde."}</h1>
                    </div>
                    <div class="rounded-[1.5rem] border border-white/20 bg-black/50 p-5 backdrop-blur-md md:p-7 lg:col-span-5">
                        <p class="font-serif text-lg leading-relaxed text-white/80 md:text-xl">${t["teenz.hero.subtitle"]||"Des rencontres authentiques, des discussions vraies et une foi qui bouge les lignes."}</p>
                        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a href="#expect" class="inline-flex justify-center rounded-full bg-glow px-6 py-3 font-black text-ink transition hover:scale-105">À quoi t’attendre</a>
                            <a href="#serve" class="inline-flex justify-center rounded-full border border-white/50 px-6 py-3 font-black transition hover:bg-white hover:text-ink">Nos groupes</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- VALUES -->
        <section id="values" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Nos valeurs</p>
                    <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-7xl">${t["teenz.values.title"]||"Notre Culture"}</h2>
                    <p class="mt-2 text-black/70">${t["teenz.values.subtitle"]||"Connecter • Grandir • Servir • Influencer"}</p>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-3xl border-2 border-ink bg-punch p-6 text-white shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">C</div>
                    <h3 class="mt-4 font-black text-lg">${t["teenz.values.connect.title"]||"Connecter"}</h3>
                    <p class="mt-2 text-sm text-white/80">${t["teenz.values.connect.description"]||"Des relations fortes pour ne jamais marcher seul."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-glow p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">G</div>
                    <h3 class="mt-4 font-black text-lg">${t["teenz.values.grow.title"]||"Grandir"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["teenz.values.grow.description"]||"Découvrir son identité et son potentiel en Dieu."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#73d7ff] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">S</div>
                    <h3 class="mt-4 font-black text-lg">${t["teenz.values.serve.title"]||"Servir"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["teenz.values.serve.description"]||"Utiliser ses talents pour faire une différence."}</p>
                </div>
                <div class="rounded-3xl border-2 border-ink bg-[#ff7fbf] p-6 shadow-[6px_6px_0_#0b0b0f]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">I</div>
                    <h3 class="mt-4 font-black text-lg">${t["teenz.values.influence.title"]||"Influencer"}</h3>
                    <p class="mt-2 text-sm text-black/70">${t["teenz.values.influence.description"]||"Être une lumière dans son lycée et sa ville."}</p>
                </div>
            </div>
        </section>

        <!-- WHO WE SERVE -->
        <section id="serve" class="border-y border-black/10 bg-glow">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Nos groupes</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold md:text-8xl">${t["teenz.groups.title"]||"Groupes"}</h2>
                    <p class="mt-4 font-serif text-xl italic text-black/60">
                        ${t["teenz.groups.subtitle"]||"Collège et Lycée — Des moments adaptés à ta réalité."}
                    </p>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-2">
                    <article class="overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[7px_7px_0_#0b0b0f]">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" alt="Groupe collège" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${t["teenz.groups.college.label"]||"Collège"}</p>
                            <h3 class="mt-2 text-xl font-black">${t["teenz.groups.college.subtitle"]||"La Relève (11-14 ans)"}</h3>
                            <p class="mt-2 text-black/70">
                                ${t["teenz.groups.college.description"]||"Fun, jeux, et discussions autour de la Bible."}
                            </p>
                        </div>
                    </article>

                    <article class="overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[7px_7px_0_#0b0b0f]">
                        <div class="aspect-[16/9] overflow-hidden"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85" alt="Groupe lycée" class="h-full w-full object-cover transition duration-700 hover:scale-105"></div>
                        <div class="p-6">
                            <p class="text-xs font-black tracking-widest text-black/50 uppercase">${t["teenz.groups.lycee.label"]||"Lycée"}</p>
                            <h3 class="mt-2 text-xl font-black">${t["teenz.groups.lycee.subtitle"]||"Impact (15-18 ans)"}</h3>
                            <p class="mt-2 text-black/70">
                                ${t["teenz.groups.lycee.description"]||"Des soirées pour aller plus loin, aborder les vrais sujets et vivre une louange intense."}
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- WHAT TO EXPECT -->
        <section id="expect" class="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
            <div class="flex items-end justify-between gap-6">
                <div>
                    <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Déroulement</p>
                    <h2 class="mt-3 font-display text-5xl font-extrabold leading-tight md:text-8xl">${t["teenz.steps.title"]||"À quoi t'attendre"}</h2>
                </div>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-3">
                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#7c3aed]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">1</div>
                    <h3 class="mt-4 text-xl font-black">${t["teenz.steps.1.title"]||"Chill"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["teenz.steps.1.description"]||"Un temps pour se poser, manger un bout et discuter."}
                    </p>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#a3ff12]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">2</div>
                    <h3 class="mt-4 text-xl font-black">${t["teenz.steps.2.title"]||"Message"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["teenz.steps.2.description"]||"Un enseignement pertinent qui connecte la Bible à ta vie."}
                    </p>
                </article>

                <article class="rounded-[2rem] border-2 border-ink bg-white p-7 shadow-[7px_7px_0_#ff7fbf]">
                    <div class="h-10 w-10 rounded-2xl bg-ink text-paper grid place-items-center font-black">3</div>
                    <h3 class="mt-4 text-xl font-black">${t["teenz.steps.3.title"]||"Small Groups"}</h3>
                    <p class="mt-2 text-black/70 text-sm">
                        ${t["teenz.steps.3.description"]||"On se divise en petits groupes pour parler vrai et prier."}
                    </p>
                </article>
            </div>
        </section>

        <!-- ACTUALITÉS TEENZ -->
        <section id="actu-teenz" class="bg-haze">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-xs font-extrabold tracking-widest text-black/50 uppercase">Actualités</p>
                        <h2 class="mt-3 font-display text-5xl font-extrabold md:text-7xl">Dernières actus <span class="font-serif font-medium italic text-punch">Teenz</span></h2>
                        <p class="mt-2 text-black/70">Reste au courant de tout ce qui bouge chez Teenz</p>
                    </div>
                </div>

                <div class="mt-8 grid gap-6 md:grid-cols-3">
                    ${n}
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq" class="bg-ink text-paper">
            <div class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div class="max-w-3xl">
                    <p class="text-xs font-extrabold tracking-widest text-paper/70 uppercase">Questions</p>
                    <h2 class="mt-3 font-display text-6xl font-extrabold md:text-8xl">FAQ<span class="text-glow">.</span></h2>
                </div>

                <div class="mt-8 grid gap-4">
                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">C'est quand ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Tous les vendredis soirs à 19h30 pour les lycéens, et le dimanche matin pour les collégiens.
                        </p>
                    </details>

                    <details class="group rounded-3xl border border-paper/10 bg-paper/10 p-6">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4">
                            <span class="font-black">Je peux venir avec un ami ?</span>
                            <span class="text-paper/70 group-open:rotate-45 transition">+</span>
                        </summary>
                        <p class="mt-4 text-paper/80">
                            Absolument ! Teenz est ouvert à tous, croyants ou non. Tout le monde est bienvenu.
                        </p>
                    </details>
                </div>

                <div class="mt-10 flex flex-col sm:flex-row gap-3">
                    <a class="inline-flex justify-center rounded-full px-6 py-3 font-black bg-glow text-ink hover:opacity-90"
                        href="#/contact">
                        Nous contacter
                    </a>
                </div>
            </div>
        </section>
    </div>
    `}const ve=[{title:"Jésus-Christ",content:"Nous croyons que Jésus-Christ est le Fils de Dieu, venu révéler l’amour du Père, donner sa vie pour nous et nous ouvrir un chemin de vie nouvelle."},{title:"La Bible",content:"Nous croyons que la Bible est la Parole de Dieu. Elle inspire notre foi, éclaire nos choix et nous apprend à vivre à la manière de Jésus."},{title:"L’Église",content:"Nous croyons que l’Église est une famille ouverte à tous, appelée à aimer, servir et faire connaître l’espérance de l’Évangile."},{title:"Une vie transformée",content:"Nous croyons que chacun peut rencontrer Dieu, découvrir son identité et grandir dans une foi vivante qui transforme le quotidien."}];async function be(){let e=[];const a=await _({"vision.kicker":"Qui sommes-nous ?","vision.title":"Notre Vision","vision.lead":"Une église où chacun peut rencontrer Dieu, trouver sa place et vivre transformé.","vision.description":"Nous voulons bâtir une communauté vivante, généreuse et centrée sur Jésus, qui fait une différence à Toulouse et au-delà.","vision.disciples.title":"Tout commence par des disciples.","vision.disciples.text":"Nous aidons chaque personne à connaître Jésus, grandir en communauté et partager l’Évangile autour d’elle.","vision.step.grow.title":"Grandir","vision.step.grow.text":"Développer une relation personnelle et profonde avec Jésus.","vision.step.together.title":"Ensemble","vision.step.together.text":"Créer des relations vraies et avancer dans une famille spirituelle.","vision.step.impact.title":"Impacter","vision.step.impact.text":"Servir avec nos dons et annoncer une espérance qui transforme.","vision.beliefs.kicker":"Ce que nous croyons","vision.beliefs.title":"Nos convictions","vision.invite.kicker":"Ce dimanche","vision.invite.title":"Tu es invité.","vision.invite.text":"Peu importe ton histoire ou l’étape où tu te trouves, il y a une place pour toi à La Rencontre.","vision.invite.visit":"Nous rendre visite","vision.invite.team":"Découvrir l’équipe"}),t=(s,o="text-punch")=>{const l=String(s||"").trim().split(/\s+/),c=l.pop()||"";return`${l.join(" ")}${l.length?" ":""}<span class="font-serif font-medium italic ${o}">${c}</span>`};try{const s=await w.getVision();e=Array.isArray(s)?s:(s==null?void 0:s.sections)||[],e.sort((o,l)=>(Number(o.display_order)||0)-(Number(l.display_order)||0))}catch(s){console.warn("Contenu Vision indisponible, utilisation du contenu local.",s)}e.length||(e=ve);const n=e.map((s,o)=>`
    <div class="border-t border-black/20 last:border-b">
      <button class="vision-belief-toggle flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              type="button" aria-expanded="${o===0?"true":"false"}">
        <span class="font-display text-2xl font-bold md:text-4xl">${s.title||"Notre foi"}</span>
        <span class="vision-belief-icon grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/30 text-2xl transition-transform ${o===0?"rotate-45":""}">+</span>
      </button>
      <div class="vision-belief-answer overflow-hidden transition-all duration-300 ${o===0?"":"hidden"}">
        <div class="max-w-3xl pb-7 font-serif text-lg leading-relaxed text-black/65 md:pb-9 md:text-xl">
          ${s.content||""}
          ${s.subtitle?`<p class="mt-4 italic text-black/50">${s.subtitle}</p>`:""}
        </div>
      </div>
    </div>
  `).join("");return setTimeout(()=>{document.querySelectorAll(".vision-belief-toggle").forEach(s=>{s.addEventListener("click",()=>{const o=s.nextElementSibling,l=s.querySelector(".vision-belief-icon"),c=o.classList.contains("hidden");o.classList.toggle("hidden"),l==null||l.classList.toggle("rotate-45",c),s.setAttribute("aria-expanded",String(c))})})},0),`
    <div class="overflow-hidden bg-[#f2efe8] text-ink">
      <section class="mx-auto max-w-[1600px] px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p class="mb-6 text-xs font-black uppercase tracking-[0.28em] text-black/50">${a["vision.kicker"]}</p>
        <h1 class="max-w-6xl font-display text-[18vw] font-extrabold leading-[0.72] tracking-[-0.08em] md:text-[11rem]">
          ${a["vision.title"]}
        </h1>

        <div class="mt-14 grid items-end gap-8 md:mt-24 md:grid-cols-12">
          <div class="md:col-span-5 md:pb-12">
            <p class="font-serif text-3xl font-medium leading-tight md:text-5xl">
              ${a["vision.lead"]}
            </p>
            <p class="mt-7 max-w-lg text-base leading-relaxed text-black/60 md:text-lg">
              ${a["vision.description"]}
            </p>
          </div>
          <div class="relative min-h-[460px] md:col-span-7 md:min-h-[620px]">
            <img src="/assets/images/une-place-pour-toi.jpg" alt="Une place pour toi à La Rencontre"
                 class="absolute right-0 top-0 h-[78%] w-[82%] rounded-[2rem] object-cover shadow-soft md:rounded-[3rem]">
            <div class="absolute bottom-0 left-0 w-[48%] rotate-[-4deg] rounded-2xl bg-glow p-4 shadow-soft md:p-7">
              <img src="/assets/images/ELR_Icon_Black.png" alt="" class="mx-auto aspect-square w-full object-contain">
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-32">
        <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
          <h2 class="font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-8xl">
            ${a["vision.disciples.title"]}
          </h2>
          <p class="max-w-xl font-serif text-xl leading-relaxed text-black/60 md:text-2xl lg:justify-self-end">
            ${a["vision.disciples.text"]}
          </p>
        </div>

        <div class="mt-16 grid gap-5 md:grid-cols-3">
          <article class="flex min-h-[430px] flex-col justify-between rounded-[2rem] bg-punch p-7 text-white md:p-9">
            <span class="text-sm font-black tracking-[0.2em]">01</span>
            <div><h3 class="font-serif text-5xl font-semibold italic">${a["vision.step.grow.title"]}</h3><p class="mt-4 text-white/75">${a["vision.step.grow.text"]}</p></div>
          </article>
          <article class="flex min-h-[430px] flex-col justify-between rounded-[2rem] bg-glow p-7 md:p-9">
            <span class="text-sm font-black tracking-[0.2em]">02</span>
            <div><h3 class="font-serif text-5xl font-semibold italic">${a["vision.step.together.title"]}</h3><p class="mt-4 text-black/65">${a["vision.step.together.text"]}</p></div>
          </article>
          <article class="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2rem] bg-black p-7 text-white md:p-9">
            <img src="/assets/images/elr-impact.png" alt="Impact" class="absolute inset-0 h-full w-full object-cover opacity-35">
            <span class="relative text-sm font-black tracking-[0.2em]">03</span>
            <div class="relative"><h3 class="font-serif text-5xl font-semibold italic">${a["vision.step.impact.title"]}</h3><p class="mt-4 text-white/75">${a["vision.step.impact.text"]}</p></div>
          </article>
        </div>
      </section>

      <section class="bg-white px-5 py-20 md:px-10 md:py-32" id="convictions">
        <div class="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/50">${a["vision.beliefs.kicker"]}</p>
            <h2 class="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.055em] md:text-8xl">${t(a["vision.beliefs.title"])}</h2>
          </div>
          <div class="lg:col-span-7 lg:col-start-6">${n}</div>
        </div>
      </section>

      <section class="bg-punch px-5 py-20 text-white md:px-10 md:py-28">
        <div class="mx-auto grid max-w-[1500px] items-center gap-10 lg:grid-cols-2">
          <div>
            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/60">${a["vision.invite.kicker"]}</p>
            <h2 class="font-display text-6xl font-extrabold leading-[0.88] md:text-8xl">${a["vision.invite.title"]}</h2>
            <p class="mt-7 max-w-xl font-serif text-xl text-white/75 md:text-2xl">${a["vision.invite.text"]}</p>
            <div class="mt-9 flex flex-wrap gap-4">
              <a href="#/contact" class="rounded-full bg-white px-7 py-4 font-black text-ink transition hover:scale-105">${a["vision.invite.visit"]}</a>
              <a href="#/pastoral-team" class="rounded-full border border-white/40 px-7 py-4 font-black transition hover:bg-white hover:text-ink">${a["vision.invite.team"]}</a>
            </div>
          </div>
          <img src="/assets/images/une-place-pour-toi.jpg" alt="Bienvenue à La Rencontre" class="h-[420px] w-full rounded-[2rem] object-cover shadow-soft md:h-[540px]">
        </div>
      </section>
    </div>
  `}async function ge(){let e=[];const a=await _({"equipe.title":"Notre Équipe","equipe.subtitle":"Des hommes et des femmes passionnés pour servir Dieu et son Église.","equipe.kicker":"Les personnes derrière la vision","equipe.empty":"L’équipe sera bientôt présentée ici.","equipe.cta.kicker":"Servir ensemble","equipe.cta.title":"Il y a une place pour toi.","equipe.cta.button":"Nous contacter"}),t=a["equipe.title"].trim().split(/\s+/),n=t.pop()||"";try{const l=await w.getTeamMembers();e=Array.isArray(l)?l:(l==null?void 0:l.team)||[],e=e.filter(c=>!c.status||c.status==="published").sort((c,i)=>(Number(c.display_order)||99)-(Number(i.display_order)||99))}catch(l){console.error("Erreur chargement équipe :",l)}const s=l=>{const c=[l.instagram&&`<a href="${l.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>`,l.facebook&&`<a href="${l.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>`,l.linkedin&&`<a href="${l.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`,l.email&&`<a href="mailto:${l.email}">Email</a>`].filter(Boolean);return c.length?`
            <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-widest text-black/40">
                ${c.join("")}
            </div>
        `:""},o=e.map((l,c)=>{const i=`${l.first_name||""} ${l.last_name||""}`.trim(),d=l.photo||`https://ui-avatars.com/api/?name=${encodeURIComponent(i)}&background=111111&color=ffffff&size=900`;return`
            <article class="group ${c%3===1?"md:translate-y-16":""}">
                <div class="relative aspect-[4/5] overflow-hidden bg-black/5">
                    <img src="${d}" alt="${i}"
                         class="h-full w-full object-cover grayscale-[15%] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:grayscale-0">
                    ${l.bio?`
                        <div class="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-5 text-sm leading-relaxed text-white/80 backdrop-blur transition duration-500 group-hover:translate-y-0">
                            ${l.bio}
                        </div>
                    `:""}
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-black/20 py-5">
                    <div>
                        <h2 class="font-display text-2xl font-bold leading-none md:text-3xl">${i}</h2>
                        <p class="mt-2 text-sm text-black/55">${l.role||l.title||"Équipe pastorale"}</p>
                        ${s(l)}
                    </div>
                    <span class="font-serif text-xl italic text-punch">${String(c+1).padStart(2,"0")}</span>
                </div>
            </article>
        `}).join("");return`
        <div class="min-h-screen overflow-hidden bg-[#f2efe8] text-ink">
            <header class="mx-auto max-w-[1500px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
                <p class="mb-6 text-xs font-black uppercase tracking-[0.28em] text-black/45">${a["equipe.kicker"]}</p>
                <div class="grid items-end gap-8 lg:grid-cols-12">
                    <h1 class="font-display text-[19vw] font-extrabold leading-[0.72] tracking-[-0.08em] sm:text-[8rem] lg:col-span-8 lg:text-[10rem]">
                        ${t.join(" ")} <span class="font-serif font-medium italic text-punch">${n}</span>
                    </h1>
                    <p class="max-w-lg font-serif text-xl leading-relaxed text-black/60 md:text-2xl lg:col-span-4 lg:pb-2">
                        ${a["equipe.subtitle"]}
                    </p>
                </div>
            </header>

            <main class="mx-auto max-w-[1500px] px-5 pb-28 md:px-10 md:pb-40">
                ${e.length?`
                    <div class="grid gap-x-6 gap-y-16 sm:grid-cols-2 md:gap-x-8 md:gap-y-28 lg:grid-cols-3">
                        ${o}
                    </div>
                `:`
                    <div class="border-y border-black/20 py-20 text-center">
                        <p class="font-serif text-2xl italic text-black/50">${a["equipe.empty"]}</p>
                    </div>
                `}
            </main>

            <section class="bg-ink px-5 py-20 text-white md:px-10 md:py-28">
                <div class="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/45">${a["equipe.cta.kicker"]}</p>
                        <h2 class="max-w-4xl font-display text-5xl font-extrabold leading-[0.9] md:text-8xl">
                            ${a["equipe.cta.title"]}
                        </h2>
                    </div>
                    <a href="#/contact" class="shrink-0 rounded-full bg-glow px-8 py-4 font-black text-ink transition hover:scale-105">${a["equipe.cta.button"]}</a>
                </div>
            </section>
        </div>
    `}async function fe(){let e=[],a=null;const[t,n]=await Promise.all([w.getHomeGroups().catch(()=>null),_({"home_groups.title":"Les Home Groups","home_groups.subtitle":"Connectez-vous, partagez et grandissez au cœur de petits groupes conviviaux.","home_groups.cta.title":"Envie de nous rejoindre ?","home_groups.cta.description":"Il y a forcément un groupe près de chez vous. Pour toute question ou pour trouver le groupe qui vous correspond, nous sommes à votre écoute.","home_groups.cta.button":"Trouver mon groupe"}).catch(()=>({}))]);try{const l=t;if(console.log("Home Groups Response:",l),l)if(Array.isArray(l.home_groups))e=l.home_groups;else if(Array.isArray(l.groups))e=l.groups;else if(Array.isArray(l))e=l;else{const c=Object.keys(l).find(i=>Array.isArray(l[i]));c&&(e=l[c])}console.log("Processed Groups List:",e),e.sort((c,i)=>(parseInt(c.display_order)||99)-(parseInt(i.display_order)||99))}catch(l){console.error("Erreur chargement groups:",l),a="Impossible de charger les groupes de maison."}if(a)return`
        <div class="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
            <h1 class="text-3xl font-black text-punch mb-4">Oups !</h1>
            <p class="text-lg text-black/70 mb-8">${a}</p>
            <a href="#/" class="rounded-full px-6 py-3 font-bold bg-ink text-paper hover:opacity-90 transition-opacity">
                Retour à l'accueil
            </a>
        </div>`;const s=l=>{const c=l.image||"https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=1000",i=l.home||l.name||"Groupe de Maison";return`
        <div class="snap-center shrink-0 w-full md:w-[45vw] lg:w-[30vw] group/card relative overflow-hidden rounded-3xl border border-rule shadow-soft bg-paper transition-all hover:scale-[1.01]">
            <div class="flex flex-col h-full">
                <!-- Image -->
                <div class="aspect-square relative overflow-hidden">
                    <img src="${c}" alt="${i}" class="absolute inset-0 w-full h-full object-cover object-[center_10%] transition duration-700 group-hover/card:scale-110">
                    <div class="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors"></div>
                    
                    ${l.frequency?`
                    <div class="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-black/5 shadow-sm">
                        ${l.frequency}
                    </div>`:""}
                </div>
                
                <!-- Content -->
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                         <h2 class="text-2xl md:text-3xl font-black font-serif text-ink leading-tight">
                            ${i}
                        </h2>
                    </div>

                    <p class="text-black/70 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                        ${l.description||"Un groupe de partage et de fraternité pour grandir ensemble dans la foi."}
                    </p>

                    <div class="flex flex-wrap gap-4 text-sm text-black/60 font-medium mt-auto border-t border-rule pt-4">
                        <div class="flex items-center gap-2 w-full">
                             <svg class="h-4 w-4 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>${l.location||"Lieu à confirmer"}</span>
                        </div>
                        
                        ${l.leaders?`
                        <div class="flex items-center gap-2 w-full">
                             <svg class="h-4 w-4 text-punch" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Responsable(s) : ${l.leaders}</span>
                        </div>`:""}
                    </div>
                </div>
            </div>
        </div>
        `},o=e.length>0?e.map(s).join(""):'<p class="text-center text-gray-400 italic w-full py-10">Aucun groupe de maison disponible pour le moment.</p>';return setTimeout(()=>{const l=document.getElementById("groups-carousel"),c=document.getElementById("prev-groups-btn"),i=document.getElementById("next-groups-btn");if(l&&c&&i){const d=()=>window.innerWidth>=1024?l.clientWidth*.33:window.innerWidth>=768?l.clientWidth*.5:l.clientWidth*.85;c.onclick=()=>{l.scrollBy({left:-d(),behavior:"smooth"})},i.onclick=()=>{l.scrollBy({left:d(),behavior:"smooth"})};const v=()=>{if(window.innerWidth<768){c.style.display="none",i.style.display="none";return}c.style.display="flex",i.style.display="flex";const u=l.scrollLeft,g=l.clientWidth,f=l.scrollWidth;c.style.opacity=u<=10?"0":"1",c.style.pointerEvents=u<=10?"none":"auto",i.style.opacity=u+g>=f-10?"0":"1",i.style.pointerEvents=u+g>=f-10?"none":"auto"};l.addEventListener("scroll",v),window.addEventListener("resize",v),setTimeout(v,100)}},100),`
    <div class="elr-page font-sans">
        <!-- Header -->
        <section class="elr-page-hero">
            <p class="elr-kicker">La vie ensemble</p>
            <h1 class="elr-page-title">Les Home <span class="font-serif font-medium italic text-punch">Groups</span></h1>
            <p class="elr-page-lead">
                ${n["home_groups.subtitle"]||"Connectez-vous, partagez et grandissez."}
            </p>
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
                    ${o}
                </div>
            </div>
            
            ${e.length>3?`
            <div class="text-center text-black/30 text-xs font-bold uppercase tracking-widest animate-pulse mb-10 md:block hidden">
                ← Glissez pour découvrir nos groupes →
            </div>`:""}

            <!-- CTA Section -->
            <div class="mx-auto max-w-5xl px-6 mt-16">
                <div class="rounded-[2.5rem] bg-ink text-paper p-10 md:p-16 text-center shadow-soft overflow-hidden relative">
                    <!-- Subtle background decoration -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-punch/10 rounded-full -mr-32 -mt-32"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-glow/5 rounded-full -ml-24 -mb-24"></div>

                    <h3 class="text-3xl md:text-4xl font-black font-serif mb-6 relative z-10">${n["home_groups.cta.title"]||"Envie de nous rejoindre ?"}</h3>
                    <p class="text-paper/70 max-w-xl mx-auto mb-10 text-lg relative z-10">
                        ${n["home_groups.cta.description"]||"Il y a forcément un groupe près de chez vous."}
                    </p>
                    <a href="#/contact" class="inline-flex rounded-full bg-paper text-ink px-10 py-4 font-black text-lg hover:scale-105 transition-transform duration-300 relative z-10">
                        ${n["home_groups.cta.button"]||"Trouver mon groupe"}
                    </a>
                </div>
            </div>
        </main>
    </div>
    `}async function he(){const e=await _({"connect.hero.kicker":"Église La Rencontre","connect.what.title":"Quoi","connect.what.text":"Découvrir la vision, les valeurs et comment trouver ta place dans l’église.","connect.when.title":"Quand","connect.when.text":"Chaque 2e dimanche du mois, pendant 3 semaines, à 9h00.","connect.how.title":"Comment","connect.how.text":"Inscris-toi à la table d’accueil pour le prochain parcours.","connect.journey.kicker":"Le parcours","connect.journey.title":"Trois semaines pour te connecter.","connect.step.discover.title":"Découvrir","connect.step.discover.text":"La vision et le cœur de La Rencontre.","connect.step.grow.title":"Grandir","connect.step.grow.text":"Nos valeurs et la manière dont nous vivons la foi ensemble.","connect.step.place.title":"Trouver ta place","connect.step.place.text":"Les prochaines étapes pour servir et t’engager.","connect.cta.kicker":"Prochain parcours","connect.cta.title":"Prêt à te connecter ?","connect.cta.text":"Rends-toi à la table d’accueil le dimanche ou écris-nous pour recevoir les prochaines dates.","connect.cta.button":"Nous contacter"});return`
        <div class="min-h-screen overflow-hidden bg-[#abc4ce] text-white">
            <!-- Hero LR Connect -->
            <section class="relative px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
                <div class="pointer-events-none absolute inset-0 opacity-25"
                     style="background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,.55) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 65%, rgba(255,255,255,.35) 0 1px, transparent 1.5px); background-size: 38px 38px, 57px 57px;"></div>

                <div class="relative mx-auto max-w-[1500px]">
                    <p class="text-xs font-black uppercase tracking-[0.3em] text-white/65">${e["connect.hero.kicker"]}</p>
                    <h1 class="mt-5 font-display text-[19vw] font-extrabold leading-[0.72] tracking-[-0.085em] text-white sm:text-[8rem] lg:text-[10rem]">
                        LR <span class="font-serif font-medium italic">Connect</span>
                    </h1>

                    <div class="mt-14 grid items-center gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
                        <div class="lg:col-span-7">
                            <div class="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] border-[7px] border-white shadow-2xl md:rounded-[2.5rem]">
                                <img src="/assets/images/une-place-pour-toi.jpg" alt="Une communauté qui avance ensemble"
                                     class="h-full w-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"></div>
                                <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
                                    <p class="font-serif text-xl font-medium tracking-wide md:text-3xl">église <span class="font-sans font-black uppercase">La Rencontre</span></p>
                                    <p class="font-display text-5xl font-extrabold leading-none tracking-[-0.06em] md:text-8xl">connect<span class="text-glow">.</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-11 lg:col-span-5 lg:space-y-14">
                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${e["connect.what.title"]}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${e["connect.what.text"]}
                                </p>
                            </article>

                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${e["connect.when.title"]}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${e["connect.when.text"]}
                                </p>
                            </article>

                            <article>
                                <h2 class="inline-flex rounded-full border-[3px] border-white px-5 py-2 font-display text-2xl font-extrabold uppercase shadow-sm md:text-3xl">${e["connect.how.title"]}</h2>
                                <p class="mt-5 max-w-xl font-display text-xl font-medium uppercase leading-snug tracking-wide text-white/95 md:text-2xl">
                                    ${e["connect.how.text"]}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Déroulé du parcours -->
            <section class="bg-[#f2efe8] px-5 py-20 text-ink md:px-10 md:py-28">
                <div class="mx-auto max-w-[1500px]">
                    <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
                        <div class="lg:col-span-7">
                            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40">${e["connect.journey.kicker"]}</p>
                            <h2 class="font-display text-5xl font-extrabold leading-[0.86] tracking-[-0.06em] md:text-8xl">
                                ${e["connect.journey.title"]}
                            </h2>
                        </div>
                        <p class="max-w-xl font-serif text-xl italic leading-relaxed text-black/55 md:text-2xl lg:col-span-4 lg:col-start-9">
                            Un espace simple et convivial pour comprendre qui nous sommes et avancer avec nous.
                        </p>
                    </div>

                    <div class="mt-14 grid gap-5 md:grid-cols-3">
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-punch p-7 text-white md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">01</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${e["connect.step.discover.title"]}</h3><p class="mt-4 text-white/75">${e["connect.step.discover.text"]}</p></div>
                        </article>
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-glow p-7 md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">02</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${e["connect.step.grow.title"]}</h3><p class="mt-4 text-black/60">${e["connect.step.grow.text"]}</p></div>
                        </article>
                        <article class="flex min-h-[320px] flex-col justify-between rounded-[2rem] bg-ink p-7 text-white md:p-9">
                            <span class="text-sm font-black tracking-[0.2em]">03</span>
                            <div><h3 class="font-serif text-4xl font-semibold italic">${e["connect.step.place.title"]}</h3><p class="mt-4 text-white/65">${e["connect.step.place.text"]}</p></div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- Inscription -->
            <section class="bg-punch px-5 py-20 md:px-10 md:py-24">
                <div class="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/55">${e["connect.cta.kicker"]}</p>
                        <h2 class="max-w-4xl font-display text-5xl font-extrabold leading-[0.88] md:text-8xl">${e["connect.cta.title"]}</h2>
                        <p class="mt-6 max-w-2xl font-serif text-xl text-white/75">${e["connect.cta.text"]}</p>
                    </div>
                    <a href="#/contact" class="shrink-0 rounded-full bg-white px-8 py-4 font-black text-ink transition hover:scale-105">${e["connect.cta.button"]}</a>
                </div>
            </section>
        </div>
    `}window.currentReservationProduct=null;window.openReservationModal=(e,a,t,n,s)=>{window.currentReservationProduct={id:e,name:a,category:t},document.getElementById("modal-product-name").textContent=a;const o=document.getElementById("modal-product-details");let l=`<p class="text-sm text-gray-600 mb-2">${n||""}</p>`;s&&(l+=`<p class="text-xs text-gray-500 italic">Dimensions: ${s}</p>`),o.innerHTML=l;const c=["apparel","clothing","merchandise","vêtement","vetement"].includes(t==null?void 0:t.toLowerCase()),i=document.getElementById("modal-apparel-fields");c?(i.classList.remove("hidden"),document.getElementById("res-size").setAttribute("required","")):(i.classList.add("hidden"),document.getElementById("res-size").removeAttribute("required"));const d=document.getElementById("reservation-modal");d.classList.remove("hidden"),setTimeout(()=>{d.classList.remove("opacity-0"),d.querySelector('div[class*="transform"]').classList.remove("scale-95","opacity-0"),d.querySelector('div[class*="transform"]').classList.add("scale-100","opacity-100")},10)};window.closeReservationModal=()=>{const e=document.getElementById("reservation-modal");e.classList.add("opacity-0"),e.querySelector('div[class*="transform"]').classList.add("scale-95","opacity-0"),e.querySelector('div[class*="transform"]').classList.remove("scale-100","opacity-100"),setTimeout(()=>{var a;e.classList.add("hidden"),window.currentReservationProduct=null,document.getElementById("reservation-form").reset(),document.getElementById("reservation-success").classList.add("hidden"),(a=document.getElementById("reservation-error"))==null||a.classList.add("hidden"),document.getElementById("reservation-form").classList.remove("hidden")},300)};window.submitReservation=async e=>{e.preventDefault();const a=document.getElementById("reservation-form"),t=a.querySelector('button[type="submit"]'),n=document.getElementById("reservation-error");n==null||n.classList.add("hidden"),t.disabled=!0,t.textContent="Enregistrement…";const s={product:window.currentReservationProduct,name:document.getElementById("res-name").value,firstname:document.getElementById("res-firstname").value,phone:document.getElementById("res-phone").value,quantity:Number(document.getElementById("res-qty").value),size:document.getElementById("res-size").value,color:document.getElementById("res-color").value};try{await w.post("/api/boutique/reservations",s),a.classList.add("hidden"),document.getElementById("reservation-success").classList.remove("hidden")}catch(o){n&&(n.textContent=o.message||"La réservation n’a pas pu être enregistrée. Veuillez réessayer.",n.classList.remove("hidden")),t.disabled=!1,t.textContent="Confirmer la réservation"}};async function we(){const e=await _({"boutique.hero.kicker":"Église La Rencontre","boutique.hero.title":"La Boutique","boutique.hero.subtitle":"Des vêtements et des ressources pensés pour porter le message et nourrir ta foi.","boutique.hero.booking":"Réservation sur place","boutique.nav.clothes":"Vêtements","boutique.nav.resources":"Ressources","boutique.nav.contact":"Contact","boutique.clothes.kicker":"Collection","boutique.clothes.title":"Nos vêtements","boutique.clothes.subtitle":"Portez le message.","boutique.clothes.empty":"Aucun vêtement disponible pour le moment.","boutique.resources.kicker":"Pour aller plus loin","boutique.resources.title":"Nos ressources","boutique.resources.subtitle":"Livres, musique et enseignements pour grandir.","boutique.resources.empty":"Aucune ressource disponible pour le moment.","boutique.contact.kicker":"Besoin d’aide ?","boutique.contact.title":"Une question sur un article ?","boutique.contact.text":"Notre équipe est là pour vous aider à choisir la bonne taille ou vous conseiller sur nos ressources.","boutique.contact.button":"Contacter la boutique","boutique.stock.available":"En stock","boutique.stock.unavailable":"Rupture","boutique.reserve":"Réserver cet article","boutique.reserve.unavailable":"Rupture de stock"});let a=[];try{const i=await w.getProducts();i&&Array.isArray(i.products)?a=i.products:Array.isArray(i)?a=i:(console.warn("Format de réponse API boutique inattendu:",i),a=[])}catch(i){console.error("Erreur lors du chargement des produits:",i)}const t=i=>{var v;return i?(v=i.split(",")[0])==null?void 0:v.trim():null},n=a.filter(i=>{var d;return["apparel","clothing","merchandise","vêtement","vetement"].includes((d=i.category)==null?void 0:d.toLowerCase())}),s=a.filter(i=>{var d;return["books","music","livre","cd","album","ressource"].includes((d=i.category)==null?void 0:d.toLowerCase())}),o=i=>{var H;const d=((H=i.category)==null?void 0:H.toLowerCase())||"",v=["books","livre"].includes(d),u=["music","album"].includes(d),g=t(i.images);let f="";i.sale_price&&parseFloat(i.sale_price)<parseFloat(i.price)?f=`
                <div class="absolute top-4 right-4 bg-punch text-paper px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10 flex flex-col items-center leading-tight">
                    <span>${i.sale_price} ${i.currency||"€"}</span>
                    <span class="line-through opacity-75 text-[10px]">${i.price}</span>
                </div>`:i.price&&(f=`
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                    ${i.price} ${i.currency||"€"}
                </div>`),i.dimensions&&`${i.dimensions}`;let I;i.is_in_stock==="FALSE"?I=`<span class="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">${e["boutique.stock.unavailable"]}</span>`:I=`<span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">${e["boutique.stock.available"]}</span>`;let C;g&&!g.startsWith("/images/")?C=`<img src="${g}" alt="${i.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`:g&&g.startsWith("/images/")?v?C=`
                    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.02),rgba(0,0,0,.08))]"></div>
                    <div class="absolute inset-12 bg-white shadow-xl rounded-r-lg border-l-4 border-black/10 flex items-center justify-center text-center p-4 group-hover:scale-105 transition-transform duration-500">
                        <div>
                            <div class="font-serif font-bold text-xl text-ink leading-tight">${i.name.replace(/ /g,"<br>")}</div>
                            <div class="mt-2 w-8 h-1 bg-punch mx-auto"></div>
                        </div>
                    </div>`:u?C=`
                   <div class="absolute inset-0 bg-ink"></div>
                   <div class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <div class="w-24 h-24 rounded-full border-4 border-paper/30 flex items-center justify-center"><div class="w-3 h-3 bg-paper rounded-full"></div></div>
                   </div>
                   <div class="absolute bottom-4 left-0 right-0 text-center text-paper/50 text-xs font-bold tracking-widest">ALBUM</div>`:C=`
                    <div class="absolute inset-0 bg-haze"></div>
                    <div class="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl rotate-12 group-hover:scale-110 transition-transform duration-500">ELR</div>`:C=`
                <div class="absolute inset-0 bg-haze"></div>
                <div class="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl rotate-12 group-hover:scale-110 transition-transform duration-500">ELR</div>`;const b=i.name.replace(/'/g,"\\'"),T=(i.description||"").replace(/'/g,"\\'").replace(/"/g,"&quot;").replace(/\n/g,"<br>"),L=(i.dimensions||"").replace(/'/g,"\\'"),D=`
            <button onclick="window.openReservationModal('${i.id}', '${b}', '${i.category}', '${T}', '${L}')" 
                class="block w-full rounded-full bg-ink py-3.5 text-center font-black text-paper transition hover:bg-punch disabled:cursor-not-allowed disabled:opacity-40"
                ${i.is_in_stock==="FALSE"?"disabled":""}>
                ${i.is_in_stock==="FALSE"?e["boutique.reserve.unavailable"]:e["boutique.reserve"]}
            </button>
        `;return`
        <article class="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/15 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
            <div class="${v?"aspect-[3/4]":"aspect-square"} relative flex-shrink-0 overflow-hidden bg-haze">
                ${C}
                ${f}
            </div>
            <div class="flex flex-1 flex-col p-6 md:p-7">
                <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div class="text-xs font-bold text-punch uppercase tracking-widest">${i.category}</div>
                    ${I}
                </div>
                
                <h3 class="mb-1 font-display text-2xl font-extrabold leading-tight tracking-tight">${i.name}</h3>
                
                <!-- Dimensions si dispo -->
                ${i.dimensions?`<p class="text-xs text-black/50 mb-2 font-medium">${i.dimensions}</p>`:""}
                
                <!-- Short Description -->
                <p class="text-black/60 text-sm mb-6 line-clamp-2 flex-1" title="${i.description}">
                    ${i.short_description||i.description}
                </p>
                
                <div class="mt-auto">
                    ${D}
                </div>
            </div>
        </article>
        `},l=n.map(o).join(""),c=s.map(o).join("");return`
    <div class="elr-page font-sans relative">
        <!-- Hero boutique -->
        <section class="relative overflow-hidden bg-ink px-5 py-20 text-white md:px-10 md:py-28">
            <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-punch/35 blur-3xl"></div>
            <div class="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-glow/20 blur-3xl"></div>
            <div class="relative mx-auto grid max-w-[1500px] items-end gap-10 lg:grid-cols-12">
                <div class="lg:col-span-9">
                    <p class="mb-6 text-xs font-black uppercase tracking-[0.3em] text-white/45">${e["boutique.hero.kicker"]}</p>
                    <h1 class="font-display text-[20vw] font-extrabold leading-[0.68] tracking-[-0.09em] sm:text-[9rem] lg:text-[11rem]">
                        ${e["boutique.hero.title"]}
                    </h1>
                </div>
                <div class="lg:col-span-3">
                    <p class="font-serif text-xl italic leading-relaxed text-white/65">${e["boutique.hero.subtitle"]}</p>
                    <div class="mt-7 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/40">
                        <span>${a.length} article${a.length>1?"s":""}</span><span>•</span><span>${e["boutique.hero.booking"]}</span>
                    </div>
                </div>
            </div>
        </section>

        <header class="sticky top-16 z-30 border-b border-black/10 bg-[#f2efe8]/90 py-4 backdrop-blur-xl">
            <div class="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-10">
                <div class="font-display text-xl font-extrabold tracking-tight">ELR SHOP<span class="text-punch">.</span></div>
                <nav>
                    <ul class="flex gap-2 text-xs font-black uppercase tracking-wider">
                        <li><a href="#vetements" class="inline-flex rounded-full px-4 py-2 transition hover:bg-ink hover:text-white">${e["boutique.nav.clothes"]}</a></li>
                        <li><a href="#ressources" class="inline-flex rounded-full px-4 py-2 transition hover:bg-ink hover:text-white">${e["boutique.nav.resources"]}</a></li>
                        <li><a href="#contact-shop" class="inline-flex rounded-full bg-punch px-4 py-2 text-white transition hover:bg-ink">${e["boutique.nav.contact"]}</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="mx-auto max-w-[1500px] space-y-28 px-5 py-20 md:px-10 md:py-28">
            <section id="vetements" class="scroll-mt-32">
                <div class="mb-12 flex items-end justify-between">
                    <div>
                        <p class="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/40">${e["boutique.clothes.kicker"]}</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.88] tracking-tight md:text-8xl">${e["boutique.clothes.title"]}</h2>
                        <p class="mt-5 font-serif text-xl italic text-black/50">${e["boutique.clothes.subtitle"]}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    ${l||`<p class="text-black/50 italic">${e["boutique.clothes.empty"]}</p>`}
                </div>
            </section>

            <section id="ressources" class="scroll-mt-32 border-t border-black/10 pt-20">
                 <div class="mb-12 flex items-end justify-between">
                    <div>
                        <p class="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/40">${e["boutique.resources.kicker"]}</p>
                        <h2 class="font-display text-5xl font-extrabold leading-[0.88] tracking-tight md:text-8xl">${e["boutique.resources.title"]}</h2>
                        <p class="mt-5 font-serif text-xl italic text-black/50">${e["boutique.resources.subtitle"]}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    ${c||`<p class="text-black/50 italic">${e["boutique.resources.empty"]}</p>`}
                </div>
            </section>

            <section id="contact-shop" class="relative mt-20 overflow-hidden scroll-mt-32 rounded-[2.5rem] bg-punch p-8 text-white md:p-16">
                <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-glow/30 blur-2xl"></div>
                <p class="relative mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/55">${e["boutique.contact.kicker"]}</p>
                <h2 class="relative max-w-4xl font-display text-5xl font-extrabold leading-[0.9] md:text-8xl">${e["boutique.contact.title"]}</h2>
                <p class="relative mt-7 max-w-2xl font-serif text-xl text-white/70">
                    ${e["boutique.contact.text"]}
                </p>
                <a href="#/contact" class="relative mt-9 inline-flex rounded-full bg-white px-8 py-4 font-black text-ink transition hover:scale-105">
                    ${e["boutique.contact.button"]}
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
    `}const Q=document.getElementById("content");async function E(e){console.log(`Chargement de la page: ${e}`);const t={accueil:ie,actu:ue,journal:ce,elrtv:le,kidz:me,teenz:xe,vision:be,equipe:ge,homeGroups:fe,services:he,boutique:we,contact:ne,article:oe,event:pe}[e];if(t)try{Q.innerHTML='<div class="flex h-[50vh] items-center justify-center"><div class="h-10 w-10 animate-spin rounded-full border-4 border-ink border-t-transparent"></div></div>';const n=await t();Q.innerHTML=n}catch(n){console.error("Erreur lors du chargement de la page:",n),Q.innerHTML=`
                <div class="mx-auto max-w-4xl px-4 py-20 text-center">
                    <h1 class="text-3xl font-bold text-punch">Oups ! Une erreur est survenue.</h1>
                    <p class="mt-4 text-black/60">Impossible de charger le contenu. Veuillez réessayer plus tard.</p>
                </div>
            `}else Q.innerHTML="<h1>Page non trouvée</h1>"}const V={"/":()=>E("accueil"),"/actu":async()=>{await E("accueil"),setTimeout(()=>{const e=new URLSearchParams(window.location.hash.split("?")[1]||""),a=document.getElementById(e.has("category")?"events":"actu-section");a&&a.scrollIntoView({behavior:"smooth"})},50)},"/journal":()=>E("journal"),"/elrtv":()=>E("elrtv"),"/kidz":()=>E("kidz"),"/teenz":()=>E("teenz"),"/vision":()=>E("vision"),"/pastoral-team":()=>E("equipe"),"/home-groups":()=>E("homeGroups"),"/services":()=>E("services"),"/boutique":()=>E("boutique"),"/contact":()=>E("contact"),"/article":()=>E("article"),"/event":()=>E("event")};window.addEventListener("DOMContentLoaded",()=>{var t;console.log("Chargement initial au démarrage");const a=(window.location.hash.slice(1)||"/").split("?")[0];(t=V[a])==null||t.call(V),_({"nav.home":"Accueil","nav.news":"Actu","nav.church":"Église","nav.vision":"Notre vision","nav.team":"Équipe pastorale","nav.groups":"Les Home Groups","nav.connect":"LR Connect","nav.tv":"ELR TV","nav.nextgen":"Next Gen","nav.kidz":"Kidz","nav.teenz":"Teenz","nav.shop":"Boutique","nav.contact":"Contact","nav.donate":"Faire un don","footer.description":"Une église où chacun peut rencontrer Dieu, trouver sa place et vivre transformé.","footer.copyright":"© 2026 — Église La Rencontre. Tous droits réservés."}).then(n=>{document.querySelectorAll("[data-site-key]").forEach(s=>{const o=n[s.dataset.siteKey];o&&(s.textContent=o)})})});window.addEventListener("hashchange",()=>{var t;console.log("hashchange");const a=(window.location.hash.slice(1)||"/").split("?")[0];(t=V[a])==null||t.call(V)});
