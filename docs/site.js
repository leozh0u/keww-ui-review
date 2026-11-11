const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const mosaic = document.querySelector('.photo-mosaic');
let observer;
let animations = [];
let played = false;

function stopMotion() {
  observer?.disconnect();
  animations.forEach(animation => animation.cancel());
  animations = [];
}

function startMotion() {
  stopMotion();
  if (motionPreference.matches || played || !mosaic ||
      !('IntersectionObserver' in window) || typeof mosaic.animate !== 'function') return;

  observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    played = true;
    observer.disconnect();
    // The contact sheet assembles once; text and actions never wait for it.
    animations = [...mosaic.querySelectorAll('.photo')].map((photo, index) => photo.animate([
      { clipPath: 'inset(0 0 10% 0)', transform: 'translateY(18px)', opacity: 0.72 },
      { clipPath: 'inset(0)', transform: 'none', opacity: 1 }
    ], {
      duration: 560,
      delay: index * 60,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'backwards'
    }));
  }, { threshold: 0.15 });
  observer.observe(mosaic);
}

startMotion();
motionPreference.addEventListener('change', startMotion);
addEventListener('pagehide', stopMotion);

const languageMenu = document.querySelector('.language-menu');
const headerMenus = [languageMenu, document.querySelector('.mobile-menu')].filter(Boolean);
for (const menu of headerMenus) menu.addEventListener?.('toggle', () => {
  if (menu.open) for (const other of headerMenus) if (other !== menu) other.open = false;
});
document.addEventListener?.('keydown', event => {
  if (event.key === 'Escape') {
    const open = headerMenus.find(menu => menu.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  }
});
document.addEventListener?.('click', event => {
  const target = event.target.closest?.('.language-menu a');
  if (target) {
    const request = new URLSearchParams(location.search).get('request');
    if (request === 'demo' || request === 'free-trial') target.search = new URLSearchParams({ request }).toString();
    target.hash = location.hash;
  }
  for (const menu of headerMenus) if (menu.open && !menu.contains(event.target)) menu.open = false;
});

// Product-specific scroll details. A single event-driven frame samples visible
// sections; the page remains complete without JS, observers or motion support.
(() => {
  const home = document.querySelector('.tina-home');
  if (!home || typeof IntersectionObserver !== 'function') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const specs = [
    ...[...home.querySelectorAll('.kh-features a, .way')].map((element, index) => ({element, property:'--detail-progress', value:p => String(Math.max(0, Math.min(1, p * 2.8 - (index % 4) * .12)))})),
    ...[...home.querySelectorAll('.ks-product-mark')].map(element => ({element, property:'--cashew-turn', value:p => `${Math.sin(p * Math.PI * 2) * 13 * Math.sin(p * Math.PI)}deg`})),
    ...[...home.querySelectorAll('.staff-images img')].map(element => ({element, property:'--crew-drift', value:p => `${(p - .5) * 16}px`}))
  ];
  if (!specs.length) return;
  const visible = new Set();
  let frame = 0, stopped = false;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target);
    schedule();
  });
  function draw() {
    frame = 0;
    if (stopped || document.hidden || reduced.matches) return;
    const samples = specs.filter(({element}) => visible.has(element)).map(spec => {
      const rect = spec.element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      return {...spec, progress};
    });
    for (const {element,property,value,progress} of samples) element.style.setProperty(property, value(progress));
  }
  function schedule() {
    if (!frame && !stopped && !document.hidden && !reduced.matches && visible.size) frame = requestAnimationFrame(draw);
  }
  function preference() {
    cancelAnimationFrame(frame); frame = 0;
    for (const {element,property} of specs) element.style.removeProperty(property);
    schedule();
  }
  specs.forEach(({element}) => observer.observe(element));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  globalThis.visualViewport?.addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',preference);
  document.addEventListener('visibilitychange',() => { cancelAnimationFrame(frame); frame = 0; schedule(); });
  addEventListener('pagehide',() => { stopped = true; observer.disconnect(); cancelAnimationFrame(frame); frame = 0; });
  addEventListener('pageshow',event => { if (event.persisted) { stopped = false; specs.forEach(({element}) => observer.observe(element)); schedule(); } });
})();
