document.getElementById('year').textContent = String(new Date().getFullYear());

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
document.addEventListener?.('keydown', event => {
  if (event.key === 'Escape' && languageMenu?.open) {
    languageMenu.open = false;
    languageMenu.querySelector('summary').focus();
  }
});
document.addEventListener?.('click', event => {
  const target = event.target.closest?.('.language-menu a');
  if (target) {
    const request = new URLSearchParams(location.search).get('request');
    if (request === 'demo' || request === 'free-trial') target.search = new URLSearchParams({ request }).toString();
    target.hash = location.hash;
  }
  if (languageMenu?.open && !languageMenu.contains(event.target)) languageMenu.open = false;
});
