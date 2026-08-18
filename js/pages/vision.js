import { api } from '../services/api.service.js';
import { tAll } from '../services/site-content.service.js';

const fallbackSections = [
  {
    title: 'Jésus-Christ',
    content: 'Nous croyons que Jésus-Christ est le Fils de Dieu, venu révéler l’amour du Père, donner sa vie pour nous et nous ouvrir un chemin de vie nouvelle.',
  },
  {
    title: 'La Bible',
    content: 'Nous croyons que la Bible est la Parole de Dieu. Elle inspire notre foi, éclaire nos choix et nous apprend à vivre à la manière de Jésus.',
  },
  {
    title: 'L’Église',
    content: 'Nous croyons que l’Église est une famille ouverte à tous, appelée à aimer, servir et faire connaître l’espérance de l’Évangile.',
  },
  {
    title: 'Une vie transformée',
    content: 'Nous croyons que chacun peut rencontrer Dieu, découvrir son identité et grandir dans une foi vivante qui transforme le quotidien.',
  },
];

export async function vision() {
  let sections = [];
  const c = await tAll({
    'vision.kicker': 'Qui sommes-nous ?',
    'vision.title': 'Notre Vision',
    'vision.lead': 'Une église où chacun peut rencontrer Dieu, trouver sa place et vivre transformé.',
    'vision.description': 'Nous voulons bâtir une communauté vivante, généreuse et centrée sur Jésus, qui fait une différence à Toulouse et au-delà.',
    'vision.disciples.title': 'Tout commence par des disciples.',
    'vision.disciples.text': 'Nous aidons chaque personne à connaître Jésus, grandir en communauté et partager l’Évangile autour d’elle.',
    'vision.step.grow.title': 'Grandir',
    'vision.step.grow.text': 'Développer une relation personnelle et profonde avec Jésus.',
    'vision.step.together.title': 'Ensemble',
    'vision.step.together.text': 'Créer des relations vraies et avancer dans une famille spirituelle.',
    'vision.step.impact.title': 'Impacter',
    'vision.step.impact.text': 'Servir avec nos dons et annoncer une espérance qui transforme.',
    'vision.beliefs.kicker': 'Ce que nous croyons',
    'vision.beliefs.title': 'Nos convictions',
    'vision.invite.kicker': 'Ce dimanche',
    'vision.invite.title': 'Tu es invité.',
    'vision.invite.text': 'Peu importe ton histoire ou l’étape où tu te trouves, il y a une place pour toi à La Rencontre.',
    'vision.invite.visit': 'Nous rendre visite',
    'vision.invite.team': 'Découvrir l’équipe',
  });
  const styledHeading = (value, accentClass = 'text-punch') => {
    const words = String(value || '').trim().split(/\s+/);
    const accent = words.pop() || '';
    return `${words.join(' ')}${words.length ? ' ' : ''}<span class="font-serif font-medium italic ${accentClass}">${accent}</span>`;
  };

  try {
    const response = await api.getVision();
    sections = Array.isArray(response) ? response : (response?.sections || []);
    sections.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  } catch (error) {
    console.warn('Contenu Vision indisponible, utilisation du contenu local.', error);
  }

  if (!sections.length) sections = fallbackSections;

  const beliefsHtml = sections.map((section, index) => `
    <div class="border-t border-black/20 last:border-b">
      <button class="vision-belief-toggle flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span class="font-display text-2xl font-bold md:text-4xl">${section.title || 'Notre foi'}</span>
        <span class="vision-belief-icon grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/30 text-2xl transition-transform ${index === 0 ? 'rotate-45' : ''}">+</span>
      </button>
      <div class="vision-belief-answer overflow-hidden transition-all duration-300 ${index === 0 ? '' : 'hidden'}">
        <div class="max-w-3xl pb-7 font-serif text-lg leading-relaxed text-black/65 md:pb-9 md:text-xl">
          ${section.content || ''}
          ${section.subtitle ? `<p class="mt-4 italic text-black/50">${section.subtitle}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('.vision-belief-toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const answer = toggle.nextElementSibling;
        const icon = toggle.querySelector('.vision-belief-icon');
        const opening = answer.classList.contains('hidden');
        answer.classList.toggle('hidden');
        icon?.classList.toggle('rotate-45', opening);
        toggle.setAttribute('aria-expanded', String(opening));
      });
    });
  }, 0);

  return `
    <div class="overflow-hidden bg-[#f2efe8] text-ink">
      <section class="mx-auto max-w-[1600px] px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p class="mb-6 text-xs font-black uppercase tracking-[0.28em] text-black/50">${c['vision.kicker']}</p>
        <h1 class="max-w-6xl font-display text-[18vw] font-extrabold leading-[0.72] tracking-[-0.08em] md:text-[11rem]">
          ${c['vision.title']}
        </h1>

        <div class="mt-14 grid items-end gap-8 md:mt-24 md:grid-cols-12">
          <div class="md:col-span-5 md:pb-12">
            <p class="font-serif text-3xl font-medium leading-tight md:text-5xl">
              ${c['vision.lead']}
            </p>
            <p class="mt-7 max-w-lg text-base leading-relaxed text-black/60 md:text-lg">
              ${c['vision.description']}
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
            ${c['vision.disciples.title']}
          </h2>
          <p class="max-w-xl font-serif text-xl leading-relaxed text-black/60 md:text-2xl lg:justify-self-end">
            ${c['vision.disciples.text']}
          </p>
        </div>

        <div class="mt-16 grid gap-5 md:grid-cols-3">
          <article class="flex min-h-[430px] flex-col justify-between rounded-[2rem] bg-punch p-7 text-white md:p-9">
            <span class="text-sm font-black tracking-[0.2em]">01</span>
            <div><h3 class="font-serif text-5xl font-semibold italic">${c['vision.step.grow.title']}</h3><p class="mt-4 text-white/75">${c['vision.step.grow.text']}</p></div>
          </article>
          <article class="flex min-h-[430px] flex-col justify-between rounded-[2rem] bg-glow p-7 md:p-9">
            <span class="text-sm font-black tracking-[0.2em]">02</span>
            <div><h3 class="font-serif text-5xl font-semibold italic">${c['vision.step.together.title']}</h3><p class="mt-4 text-black/65">${c['vision.step.together.text']}</p></div>
          </article>
          <article class="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2rem] bg-black p-7 text-white md:p-9">
            <img src="/assets/images/elr-impact.png" alt="Impact" class="absolute inset-0 h-full w-full object-cover opacity-35">
            <span class="relative text-sm font-black tracking-[0.2em]">03</span>
            <div class="relative"><h3 class="font-serif text-5xl font-semibold italic">${c['vision.step.impact.title']}</h3><p class="mt-4 text-white/75">${c['vision.step.impact.text']}</p></div>
          </article>
        </div>
      </section>

      <section class="bg-white px-5 py-20 md:px-10 md:py-32" id="convictions">
        <div class="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-black/50">${c['vision.beliefs.kicker']}</p>
            <h2 class="font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.055em] md:text-8xl">${styledHeading(c['vision.beliefs.title'])}</h2>
          </div>
          <div class="lg:col-span-7 lg:col-start-6">${beliefsHtml}</div>
        </div>
      </section>

      <section class="bg-punch px-5 py-20 text-white md:px-10 md:py-28">
        <div class="mx-auto grid max-w-[1500px] items-center gap-10 lg:grid-cols-2">
          <div>
            <p class="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/60">${c['vision.invite.kicker']}</p>
            <h2 class="font-display text-6xl font-extrabold leading-[0.88] md:text-8xl">${c['vision.invite.title']}</h2>
            <p class="mt-7 max-w-xl font-serif text-xl text-white/75 md:text-2xl">${c['vision.invite.text']}</p>
            <div class="mt-9 flex flex-wrap gap-4">
              <a href="#/contact" class="rounded-full bg-white px-7 py-4 font-black text-ink transition hover:scale-105">${c['vision.invite.visit']}</a>
              <a href="#/pastoral-team" class="rounded-full border border-white/40 px-7 py-4 font-black transition hover:bg-white hover:text-ink">${c['vision.invite.team']}</a>
            </div>
          </div>
          <img src="/assets/images/une-place-pour-toi.jpg" alt="Bienvenue à La Rencontre" class="h-[420px] w-full rounded-[2rem] object-cover shadow-soft md:h-[540px]">
        </div>
      </section>
    </div>
  `;
}
