/* Local sample state and lazy loading only. No API, telemetry or employee records. */
(() => {
  const beat = document.querySelector('[data-watch-beat]');
  const root = beat?.closest('.tina-home, .pp-watches');
  if (!beat || !root) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const phone = matchMedia('(max-width:760px)');
  const copy = {
    en: { assigned:'Assigned', completed:'Completed', done:'Cocktail-area setup completed. The manager record is updated.', reset:'Cocktail-area setup reset to assigned.' },
    es: { assigned:'Asignada', completed:'Terminada', done:'Zona de cócteles preparada. Registro del responsable actualizado.', reset:'La tarea de la zona de cócteles vuelve a estar asignada.' },
    zh: { assigned:'已分配', completed:'已完成', done:'鸡尾酒区布置已完成，主管记录已更新。', reset:'鸡尾酒区布置任务已重置为已分配。' }
  }[beat.dataset.locale];
  const completeButton = beat.querySelector('[data-watch-beat-complete]');
  const resetButton = beat.querySelector('[data-watch-beat-reset]');
  let manual = null, active = false, progress = 0, loaded = false, destroyed = false, done = false, near = false;
  function load() {
    const source = document.querySelector('meta[name="watch-beat-script"]')?.content;
    if (loaded || !near || motion.matches || navigator.connection?.saveData || !source || destroyed) return;
    loaded = true;
    const script = document.createElement('script'); script.src = source; script.defer = true;
    script.onerror = () => { beat.dataset.rendering = 'fallback'; };
    document.body.append(script);
  }
  function sync(announce = false) {
    done = manual ?? (!motion.matches && progress >= .64);
    beat.dataset.complete = String(done); beat.dataset.active = String(active); beat.dataset.progress = String(progress);
    const record = beat.querySelector('[data-watch-beat-record]');
    const label = done ? copy.completed : copy.assigned;
    if (record.textContent !== label) record.textContent = label;
    if (completeButton.hidden !== done) completeButton.hidden = done;
    if (resetButton.hidden === done) resetButton.hidden = !done;
    if (announce) beat.querySelector('[data-watch-beat-status]').textContent = done ? copy.done : copy.reset;
    beat.dispatchEvent(new CustomEvent('watch-beat:update', {detail:{active,progress,done}}));
    load();
  }
  root.addEventListener('keww-watch-progress', event => {
    if (destroyed) return;
    const nextActive = Boolean(event.detail?.active);
    if (nextActive !== active && !phone.matches) manual = null;
    if (nextActive) progress = Math.max(0, Math.min(1, Number(event.detail?.progress) || 0));
    active = nextActive;
    sync();
  });
  const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => { near = entries.some(entry => entry.isIntersecting); load(); }, {rootMargin:'200px 0px'}) : null;
  observer?.observe(beat);
  // The dedicated page uses natural scroll, without a pinned scene or spacer.
  const standalone = root.classList.contains('pp-watches');
  let scrollFrame = 0, scrollTime = 0, visible = false;
  const hero = standalone ? root.querySelector('.pp-hero') : null;
  function updateScroll(now) {
    scrollFrame = 0;
    if (!standalone || destroyed || document.hidden || !visible) return;
    const rect = hero.getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    const target = motion.matches ? 0 : Math.max(0, Math.min(1, (header - rect.top) / Math.max(240, rect.height * .65)));
    const blend = !scrollTime || motion.matches ? 1 : 1 - Math.exp(-Math.min(64, now - scrollTime) / 65);
    scrollTime = now;
    progress += (target - progress) * blend;
    if (Math.abs(target - progress) < .0005) progress = target;
    active = true;
    sync();
    if (progress !== target) scheduleScroll();
  }
  function scheduleScroll() {
    if (standalone && visible && !destroyed && !document.hidden && !scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  const visibility = standalone && typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    active = visible && !document.hidden;
    if (!visible) { cancelAnimationFrame(scrollFrame); scrollFrame = 0; scrollTime = 0; }
    sync(); scheduleScroll();
  }) : null;
  visibility?.observe(beat);
  if (standalone) {
    addEventListener('scroll', scheduleScroll, {passive:true});
    addEventListener('resize', scheduleScroll, {passive:true});
    globalThis.visualViewport?.addEventListener('resize', scheduleScroll, {passive:true});
    document.addEventListener('visibilitychange', () => {
      active = visible && !document.hidden;
      if (document.hidden) { cancelAnimationFrame(scrollFrame); scrollFrame = 0; scrollTime = 0; }
      sync(); scheduleScroll();
    });
  }
  completeButton.addEventListener('click', () => { manual = true; sync(true); resetButton.focus(); });
  resetButton.addEventListener('click', () => { manual = false; sync(true); completeButton.focus(); });
  motion.addEventListener('change', () => { sync(); scheduleScroll(); });
  addEventListener('pagehide', () => { destroyed = true; observer?.disconnect(); visibility?.disconnect(); cancelAnimationFrame(scrollFrame); scrollFrame = 0; });
  addEventListener('pageshow', event => { if (event.persisted) { destroyed = false; observer?.observe(beat); visibility?.observe(beat); sync(); scheduleScroll(); } });
  beat.querySelector('[data-watch-beat-controls]').hidden = false;
  sync();
  root.dispatchEvent(new CustomEvent('keww-watch-ready'));
})();
