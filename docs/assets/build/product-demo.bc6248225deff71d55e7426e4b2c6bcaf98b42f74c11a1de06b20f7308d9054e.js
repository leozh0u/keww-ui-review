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
        hero.style.setProperty('--product-hero-y', `${progress * -20}px`);
        hero.style.setProperty('--product-hero-angle', `${(small ? -3 : -6) + progress * 8}deg`);
        hero.style.setProperty('--product-hero-roll', `${(small ? -1 : -2) + progress * 3}deg`);
        hero.style.setProperty('--product-phone-x', `${-9-progress*(small?4:20)}px`);
        hero.style.setProperty('--product-phone-y', `${progress*-36}px`);
        hero.style.setProperty('--product-phone-angle', `${-7+progress*10}deg`);
        hero.style.setProperty('--product-watch-x', `${8+progress*(small?4:18)}px`);
        hero.style.setProperty('--product-watch-y', `${progress*20}px`);
        hero.style.setProperty('--product-watch-angle', `${7-progress*16}deg`);
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
    schedule();
  });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
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
