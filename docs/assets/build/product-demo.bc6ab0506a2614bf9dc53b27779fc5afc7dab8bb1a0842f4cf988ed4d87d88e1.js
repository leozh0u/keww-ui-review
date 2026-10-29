// All interactions stay within illustrative records. No requests or live mutations.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();
  function animatePanel(panel) {
    for (const animation of activeAnimations) animation.cancel();
    activeAnimations.clear();
    if (preference.matches || !panel.animate) return;
    const animation = panel.animate([{ opacity: .72, transform: 'translateY(6px)', filter: 'blur(1px)' }, { opacity: 1, transform: 'none', filter: 'none' }], { duration: 230, easing: 'cubic-bezier(.16,1,.3,1)' });
    activeAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
  }
  const workspaces = [...document.querySelectorAll('[data-product-workspace]')];
  for (const workspace of workspaces) {
    const nav = workspace.querySelector('[data-product-tabs]');
    const tabs = [...workspace.querySelectorAll('[data-product-tab]')];
    const panels = [...workspace.querySelectorAll('[data-product-view]')];
    if (!nav || !tabs.length || panels.length !== tabs.length) continue;
    nav.setAttribute('role', 'tablist');
    tabs.forEach(tab => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `product-view-${tab.dataset.productTab}`);
    });
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `product-tab-${panel.dataset.productView}`);
      panel.tabIndex = 0;
    });
    function select(tab, focus = false, animate = true) {
      for (const item of tabs) {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      }
      for (const panel of panels) {
        panel.hidden = panel.dataset.productView !== tab.dataset.productTab;
        if (!panel.hidden && animate) animatePanel(panel);
      }
      if (focus) tab.focus();
    }
    nav.addEventListener('click', event => {
      const tab = event.target.closest('[data-product-tab]');
      if (tab && tabs.includes(tab)) select(tab);
    });
    nav.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next], true);
    });
    const sample = workspace.querySelector('[data-product-task-record="1"]');
    const complete = sample?.querySelector('[data-product-complete]');
    const reset = sample?.querySelector('[data-product-reset]');
    if (sample && complete && reset) {
      const status = sample.querySelector('[data-product-task-state]');
      const dot = sample.querySelector('[data-product-task-dot]');
      const history = sample.querySelector('[data-product-task-history]');
      const count = workspace.querySelector('[data-product-task-count]');
      const announcement = workspace.querySelector('[data-product-action-status]');
      const check = workspace.querySelector('[data-product-task-record="0"] [data-product-task-dot] svg');
      function setCompleted(done) {
        sample.dataset.completed = String(done);
        status.textContent = done ? status.dataset.completed : status.dataset.pending;
        status.classList.toggle('product-status-open', !done);
        dot.classList.toggle('is-complete', done);
        dot.replaceChildren(...(done && check ? [check.cloneNode(true)] : []));
        history.textContent = done ? history.dataset.completed : history.dataset.pending;
        count.textContent = done ? count.dataset.completed : count.dataset.default;
        complete.hidden = done;
        reset.hidden = !done;
        announcement.textContent = done ? announcement.dataset.completed : announcement.dataset.reset;
        (done ? reset : complete).focus({ preventScroll: true });
      }
      complete.hidden = false;
      sample.querySelector('.product-sample-actions').hidden = false;
      complete.addEventListener('click', () => setCompleted(true));
      reset.addEventListener('click', () => setCompleted(false));
    }
    select(tabs[0], false, false);
    workspace.dataset.enhanced = '';
    nav.hidden = false;
  }

  const hero = document.querySelector('[data-product-hero]');
  const demo = document.querySelector('[data-product-demo]');
  const field = document.querySelector('[data-product-field]');
  if (!hero && !demo) return;
  // Unwarp the photographed keyboard onto the rigid deck once per resize.
  // Top-surface corners: (270,671), (1266,671), (1388,954), (148,954).
  // Exclude the photographed front wall; the solid geometry supplies that edge.
  const mac = hero?.querySelector('[data-product-plane]');
  const chassis = mac?.querySelector('[data-laptop-chassis]');
  const fallback = mac?.querySelector('[data-laptop-fallback]');
  const texture = mac?.querySelector('[data-laptop-texture]');
  function fitChassis() {
    if (!mac || !chassis || !fallback || !texture) return;
    const width = mac.clientWidth;
    if (!width) return;
    mac.style.setProperty('--product-perspective', `${width*10}px`);
    mac.style.setProperty('--product-deck-depth', `${width*.6}px`);
    mac.style.setProperty('--product-base-depth', `${width*.025}px`);
    mac.style.setProperty('--product-lid-depth', `${width*.009}px`);
    const [a,b,c,d,e,f,g,h] = [0.0023953819068255667, 0.0010326381365113747, -1.3396533044420353, -1.2785587281443674e-19, 0.0062973997833152716, -4.225555254604546, -1.1573528479382767e-18, 0.002065276273022751];
    texture.style.transform = `matrix3d(${a*width},${d*width},0,${g},${b*width},${e*width},0,${h},0,0,1,0,${c*width},${f*width},0,1)`;
    const screen = fallback.querySelector('.product-mac-screen');
    if (screen) chassis.querySelector('.product-lid-front').append(screen);
    fallback.hidden = true;
    chassis.hidden = false;
    mac.dataset.chassisReady = '';
  }
  const deviceGrid = hero?.querySelector('.product-device-grid');
  function fitHero() {
    if (!hero || !deviceGrid) return;
    hero.style.removeProperty('--product-cluster-scale');
    hero.style.removeProperty('--product-scene-height');
    if (innerWidth <= 1000) { delete hero.dataset.heroFit; return; }
    hero.dataset.heroFit = '';
    const available = Math.max(420, innerHeight - (hero.getBoundingClientRect().top + scrollY) - 84);
    const scale = Math.min(1, (available - 60) / deviceGrid.offsetHeight);
    hero.style.setProperty('--product-cluster-scale', String(scale));
    hero.style.setProperty('--product-scene-height', `${deviceGrid.offsetHeight*scale + 60}px`);
  }
  fitChassis();
  fitHero();
  let frame = 0;
  let suspended = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  function render() {
    frame = 0;
    if (preference.matches || document.hidden || suspended) return;
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = clamp(-rect.top / Math.max(1, rect.height));
        const small = innerWidth <= 680;
        const opening = clamp(scrollY / 320);
        const fold = opening * opening * (3 - 2 * opening);
        hero.style.setProperty('--product-hero-y', `${opening * -8}px`);
        hero.style.setProperty('--product-laptop-scale', `${.985+opening*.015}`);
        hero.style.setProperty('--product-lid-angle', `${110*(1-fold)}deg`);
        hero.style.setProperty('--product-hero-angle', `${-3+opening*5}deg`);
        hero.style.setProperty('--product-hero-roll', `${1-opening*1.5}deg`);
        hero.style.setProperty('--product-phone-x', `${(small?0:-9)-progress*(small?4:20)}px`);
        hero.style.setProperty('--product-phone-y', `${progress*-36}px`);
        hero.style.setProperty('--product-phone-angle', `${-4+progress*6}deg`);
        hero.style.setProperty('--product-phone-yaw', `${-18+progress*8}deg`);
        hero.style.setProperty('--product-watch-x', `${opening*(small?3:8)}px`);
        hero.style.setProperty('--product-watch-y', `${opening*-18}px`);
        hero.style.setProperty('--product-watch-angle', `${-3+opening*6}deg`);
        hero.style.setProperty('--product-receipt-x', `${progress*-16}px`);
      }
    }
    if (field) {
      const rect = field.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = clamp((innerHeight-rect.top)/(innerHeight+rect.height));
        field.style.setProperty('--product-field-travel', `${(progress-.5)*48}px`);
      }
    }
    if (demo) {
      const rect = demo.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = clamp((innerHeight * .9 - rect.top) / (innerHeight * .8));
        demo.style.setProperty('--product-workspace-y', `${(1 - progress) * 35}px`);
        demo.style.setProperty('--product-workspace-angle', `${(1 - progress) * 5}deg`);
        demo.style.setProperty('--product-bars-scale', `${.8 + progress * .2}`);
      }
    }
  }
  function schedule() {
    if (!frame && !preference.matches && !document.hidden && !suspended) frame = requestAnimationFrame(render);
  }
  function cancel() { cancelAnimationFrame(frame); frame = 0; }
  preference.addEventListener('change', () => {
    cancel();
    for (const animation of activeAnimations) animation.cancel();
    activeAnimations.clear();
    for (const element of [hero, demo, field]) {
      if (!element) continue;
      for (const property of [...element.style]) if (property.startsWith('--product-')) element.style.removeProperty(property);
    }
    fitHero();
    schedule();
  });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { fitChassis(); fitHero(); schedule(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancel();
      for (const animation of activeAnimations) animation.cancel();
      activeAnimations.clear();
    } else schedule();
  });
  addEventListener('pagehide', () => { suspended = true; cancel(); for (const animation of activeAnimations) animation.cancel(); activeAnimations.clear(); });
  addEventListener('pageshow', () => { suspended = false; schedule(); });
  schedule();
})();
