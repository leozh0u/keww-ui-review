/* Local illustrative interactions; no service calls or customer records. */
(() => {
  const root = document.querySelector('.tina-home');
  if (!root) return;
  const $ = id => root.querySelector(`#${id}`);
  const locale = root.lang || 'en';
  const copy = {
    en: {created:'● Created',scheduled:'● Scheduled',filled:['4 of 6 filled','5 of 6 filled'],open:['2 open roles','1 open role'],roster:['4 members ↗','5 members ↗'],confirmed:'Confirmed',pending:'Pending',owner:['Unassigned · Due 6:00 PM','Jamie Chen · Due 6:00 PM'],state:['To assign','Assigned'],tasks:['3 tasks · 1 assigned','3 tasks · 2 assigned'],titles:['Event created','Team scheduled','Task assigned','Watch notified'],details:['Evening reception','5 of 6 roles filled','Set all tables with plateware.','Sample task on the watch'],pause:'Pause',resume:'Resume'},
    es: {created:'● Creado',scheduled:'● Programado',filled:['4 de 6 cubiertos','5 de 6 cubiertos'],open:['2 puestos disponibles','1 puesto disponible'],roster:['4 personas ↗','5 personas ↗'],confirmed:'Confirmado',pending:'Pendiente',owner:['Sin asignar · Para las 18:00','Jamie Chen · Para las 18:00'],state:['Por asignar','Asignada'],tasks:['3 tareas · 1 asignada','3 tareas · 2 asignadas'],titles:['Evento creado','Equipo programado','Tarea asignada','Reloj notificado'],details:['Recepción de la tarde','5 de 6 puestos cubiertos','Colocar la vajilla en todas las mesas.','Tarea de ejemplo en el reloj'],pause:'Pausar',resume:'Continuar'},
    zh: {created:'● 已创建',scheduled:'● 已安排',filled:['已安排4个，共6个','已安排5个，共6个'],open:['2个待补职位','1个待补职位'],roster:['4名成员 ↗','5名成员 ↗'],confirmed:'已确认',pending:'待确认',owner:['未分配 · 18:00截止','Jamie Chen · 18:00截止'],state:['待分配','已分配'],tasks:['3项任务 · 1项已分配','3项任务 · 2项已分配'],titles:['活动已创建','团队已安排','任务已分配','手表已收到提醒'],details:['晚间招待会','6个职位已安排5个','为所有餐桌摆放餐具。','手表任务示例'],pause:'暂停',resume:'继续'}
  }[locale] || null;
  if (!copy) return;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const mobileStory = matchMedia('(max-width:760px)');
  const scene = $('preview');
  const steps = [...root.querySelectorAll('.kh-flowstep')];
  const stages = [...root.querySelectorAll('.scroll-stage')];
  const jumps = [...root.querySelectorAll('.wf-tab')];
  const watchSection = $('watches');
  const pause = root.querySelector('.tina-pause');
  const tabs = [...root.querySelectorAll('[data-ks]')];
  const panels = [...root.querySelectorAll('.ks-panel-view')];
  let phase = 0, timer = 0, frame = 0, heroVisible = false, storyVisible = false;
  let paused = false, played = false, destroyed = false;
  const motions = [];
  const setText = (id, value) => { const node = $(id); if (node) node.textContent = value; };
  const on = (target, name, handler, options) => target?.addEventListener(name, handler, options);
  function showPhase(next) {
    phase = next;
    scene.dataset.phase = String(next);
    steps.forEach((step, i) => {
      step.classList.toggle('current', i === next);
      step.classList.toggle('complete', i < next);
      step.setAttribute('aria-pressed', String(i === next));
    });
    const staffed = Number(next > 0), assigned = Number(next > 1);
    const staff = $('kh-staffpanel'), tasks = $('kh-taskpanel');
    staff.classList.toggle('active', !assigned);
    tasks.classList.toggle('active', Boolean(assigned));
    staff.setAttribute('aria-hidden', String(Boolean(assigned)));
    tasks.setAttribute('aria-hidden', String(!assigned));
    $('kh-stafftab').classList.toggle('is-active', !assigned);
    $('kh-tasktab').classList.toggle('is-active', Boolean(assigned));
    setText('kh-eventchip', staffed ? copy.scheduled : copy.created);
    setText('kh-ringnumber', staffed ? '5 / 6' : '4 / 6');
    setText('kh-staffcount', copy.filled[staffed]);
    setText('kh-openlabel', copy.open[staffed]);
    setText('kh-rosterlabel', copy.roster[staffed]);
    setText('kh-rosterstate', staffed ? copy.confirmed : copy.pending);
    $('kh-rosterstate').classList.toggle('wait', !staffed);
    setText('kh-taskowner', copy.owner[assigned]);
    setText('kh-taskstate', copy.state[assigned]);
    $('kh-taskstate').classList.toggle('sent', Boolean(assigned));
    setText('kh-taskcount', copy.tasks[assigned]);
    $('kh-phoneshift').classList.toggle('visible', next === 1);
    $('kh-phonealert').classList.toggle('visible', next >= 2);
    $('kh-phoneshift').setAttribute('aria-hidden', String(next !== 1));
    $('kh-phonealert').setAttribute('aria-hidden', String(next < 2));
    $('kh-watchlogin').classList.toggle('hidden', next >= 2);
    $('kh-watchsync').classList.toggle('hidden', next !== 2);
    $('kh-watch').classList.toggle('ping', next === 3 && !media.matches && heroVisible && !paused);
    const float = $('kh-float');
    float.classList.add('visible');
    float.dataset.phase = String(next);
    setText('kh-floattitle', copy.titles[next]);
    setText('kh-floatdetail', copy.details[next]);
    // Keep each visible row and the number of filled roles in agreement.
    const extra = root.querySelector('.tina-roster-added');
    if (extra) extra.hidden = !staffed;
    const role = $('kh-roleone')?.closest('.kh-openrole');
    if (role) role.hidden = Boolean(staffed);
  }
  function stopTimer() { clearTimeout(timer); timer = 0; }
  function active() { return !destroyed && !document.hidden && heroVisible && !media.matches && !paused; }
  function advance() {
    stopTimer();
    if (!active() || phase >= 3) return;
    timer = setTimeout(() => { showPhase(phase + 1); advance(); }, 2300);
  }
  function updateMotionState() {
    scene.dataset.paused = String(paused);
    root.dataset.motionActive = String(!destroyed && !document.hidden && (heroVisible || storyVisible) && !media.matches);
    if (!active()) stopTimer();
    else if (!played) { played = true; advance(); }
    else advance();
  }
  on($('kh-replay'), 'click', () => {
    paused = false; played = true; pause.setAttribute('aria-pressed', 'false'); pause.textContent = copy.pause;
    showPhase(0); updateMotionState();
  });
  on(pause, 'click', () => {
    paused = !paused; pause.setAttribute('aria-pressed', String(paused)); pause.textContent = paused ? copy.resume : copy.pause;
    updateMotionState();
  });
  steps.forEach((step, i) => on(step, 'click', () => {
    stopTimer(); paused = true; played = true; pause.setAttribute('aria-pressed', 'true'); pause.textContent = copy.resume; showPhase(i); updateMotionState();
  }));
  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, i) => {
    on(tab, 'click', () => selectTab(i));
    on(tab, 'keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
    });
  });
  // The source orbit is sampled into paused Web Animations. Scroll adjusts time;
  // no frame loop runs while the page is still, hidden, or outside the section.
  function orbitPose(position, index, isWatch) {
    let delta = index - position;
    while (delta > 2) delta -= 4;
    while (delta < -2) delta += 4;
    const angle = delta * Math.PI / 2;
    const depth = (Math.cos(angle) + 1) / 2;
    const x = Math.sin(angle) * 105;
    const y = isWatch ? Math.sin(angle) * 35 + 28 : Math.sin(angle) * 35 - 30 * (1-depth);
    const scale = isWatch ? .4 + depth ** 3 * .8 : .32 + depth ** 3 * .68;
    return {
      transform: `translate3d(${x}px,${y}px,${-180*(1-depth)}px) rotateY(${-Math.sin(angle)*(isWatch ? 25 : 18) - (isWatch ? 10 : 0)}deg) rotateZ(${-Math.sin(angle)*(isWatch ? 8 : 7) + (isWatch ? 6 : 0)}deg) scale(${scale})`,
      opacity: depth ** 4 * (delta < -.1 ? .3 : 1),
      filter: `blur(${(1-depth)*3}px)`,
      zIndex: String(Math.round(depth * 10) + (isWatch ? 1 : 0))
    };
  }
  function prepareOrbit() {
    const items = [...root.querySelectorAll('[data-orbit]'),root.querySelector('.tina-workflow .watch')];
    items.forEach(element => {
      if (!element?.animate) return;
      const isWatch = element.classList.contains('watch');
      const index = isWatch ? 2 : Number(element.dataset.orbit);
      const keyframes = Array.from({length:97}, (_, i) => ({...orbitPose(i / 32,index,isWatch),offset:i / 96}));
      const animation = element.animate(keyframes, {duration:3000,fill:'both',easing:'linear'});
      animation.pause(); animation.currentTime = 0; motions.push(animation);
    });
  }
  let selectedStage = -1, manualComplete = null;
  const pendingFace = root.querySelector('.tina-pending-face');
  const completeFace = root.querySelector('.tina-complete-face');
  const storyWatch = root.querySelector('.tina-workflow .watch');
  function setWatchComplete(done) {
    pendingFace.hidden = done; completeFace.hidden = !done;
  }
  on(root.querySelector('[data-complete-sample]'), 'click', () => {
    manualComplete = true; setWatchComplete(true); root.querySelector('[data-reset-sample]').focus();
  });
  on(root.querySelector('[data-reset-sample]'), 'click', () => {
    manualComplete = false; setWatchComplete(false); root.querySelector('[data-complete-sample]').focus();
  });
  function updateStory() {
    frame = 0;
    if (destroyed || document.hidden || !storyVisible) return;
    const point = innerHeight * .42;
    let index = 0;
    stages.forEach((stage, i) => { if (stage.getBoundingClientRect().top <= point) index = i; });
    if (index !== selectedStage) {
      selectedStage = index;
      if (!mobileStory.matches) manualComplete = null;
      watchSection.dataset.topic = String(index);
      jumps.forEach((jump, i) => i === index ? jump.setAttribute('aria-current','step') : jump.removeAttribute('aria-current'));
    }
    storyWatch.inert = !mobileStory.matches && index !== 2;
    storyWatch.setAttribute('aria-hidden',String(!mobileStory.matches && index !== 2));
    root.querySelectorAll('[data-orbit]').forEach(panel => panel.setAttribute('aria-hidden',String(!mobileStory.matches && Number(panel.dataset.orbit) !== index)));
    const rect = stages[index].getBoundingClientRect();
    const progress = media.matches ? 0 : Math.max(0,Math.min(1,(point-rect.top)/Math.max(rect.height,1)));
    setWatchComplete(manualComplete ?? (!mobileStory.matches && (index === 2 && progress > .76 || index > 2)));
    const position = Math.min(3,index + progress);
    motions.forEach(animation => { animation.currentTime = position * 1000; });
    const highlights = [...root.querySelectorAll('.concept-highlight')];
    let closest = highlights[0], distance = Infinity;
    for (const highlight of highlights) {
      const box = highlight.getBoundingClientRect();
      const next = Math.abs(box.top + box.height / 2 - innerHeight * .55);
      if (next < distance) { closest = highlight; distance = next; }
    }
    highlights.forEach(highlight => highlight.classList.toggle('is-active',highlight === closest));
  }
  function scheduleStory() { if (!frame && storyVisible && !document.hidden && !destroyed) frame = requestAnimationFrame(updateStory); }
  jumps.forEach((jump, i) => { jump.href = `#stage-${i}`; });
  const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === scene) heroVisible = entry.isIntersecting;
      if (entry.target === watchSection) storyVisible = entry.isIntersecting;
    }
    updateMotionState(); scheduleStory();
  }, {rootMargin:'40px 0px',threshold:0}) : null;
  function lifecycle() {
    if (document.hidden) { stopTimer(); cancelAnimationFrame(frame); frame = 0; }
    else scheduleStory();
    updateMotionState();
  }
  function preference() {
    stopTimer(); cancelAnimationFrame(frame); frame = 0;
    if (media.matches) showPhase(3);
    updateMotionState(); scheduleStory();
  }
  on(document,'visibilitychange',lifecycle);
  on(media,'change',preference);
  on(window,'scroll',scheduleStory,{passive:true});
  on(window,'resize',scheduleStory,{passive:true});
  on(window,'pagehide',() => {
    destroyed = true; stopTimer(); cancelAnimationFrame(frame); frame = 0;
    motions.forEach(animation => animation.cancel()); observer?.disconnect(); root.dataset.motionActive = 'false';
  });
  on(window,'pageshow',event => {
    if (!event.persisted) return;
    destroyed = false; motions.length = 0; prepareOrbit(); observer?.observe(scene); observer?.observe(watchSection); lifecycle();
  });
  storyWatch.inert = !mobileStory.matches;
  steps.forEach(step => { step.disabled = false; });
  root.dataset.enhanced = 'true';
  selectTab(0);
  prepareOrbit();
  showPhase(media.matches ? 3 : 0);
  observer?.observe(scene); observer?.observe(watchSection);
  if (!observer) updateMotionState();
})();
