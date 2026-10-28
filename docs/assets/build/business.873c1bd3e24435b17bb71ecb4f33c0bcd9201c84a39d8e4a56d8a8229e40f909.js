// Keep the workflow readable and navigable independently of the 3D enhancement.
(() => {
  const workflow = document.querySelector('#workflow');
  if (!workflow) return;
  const stage = workflow.querySelector('[data-watch-stage]');
  const visual = workflow.querySelector('.workflow-visual');
  const state = workflow.querySelector('[data-manager-state]');
  const steps = [...workflow.querySelectorAll('[data-watch-step]')];
  const states = state?.dataset.states?.split('|') || [];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let loaded = false;
  let near = false;
  let frame = 0;
  function update(step) {
    visual.dataset.step = String(step);
    if (state && states[step]) state.textContent = states[step];
  }
  function sample() {
    frame = 0;
    if (stage.classList.contains('is-ready')) return;
    const marker = innerHeight * .52;
    const distances = steps.map(step => { const r = step.getBoundingClientRect(); return Math.abs(r.top + Math.min(r.height, innerHeight) * .45 - marker); });
    update(distances.indexOf(Math.min(...distances)));

  }
  function schedule() { if (!frame) frame = requestAnimationFrame(sample); }
  stage.addEventListener('watch:step', event => update(event.detail.step));
  const source = document.querySelector('meta[name="watch-script"]')?.content;
  function enhance() {
    if (loaded || !near || preference.matches || navigator.connection?.saveData || !source) return;
    loaded = true;
    const script = document.createElement('script');
    script.src = source;
    script.defer = true;
    script.onerror = () => { stage.dataset.render = 'fallback'; };
    document.body.append(script);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      near = entries.some(entry => entry.isIntersecting);
      if (near) { sample(); enhance(); }
    }, { rootMargin: '450px' });
    observer.observe(workflow);
    addEventListener('pagehide', () => observer.disconnect(), { once: true });
    addEventListener('pageshow', () => observer.observe(workflow));
  } else near = true;
  preference.addEventListener('change', enhance);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', () => { sample(); enhance(); });
  addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
  sample();
  enhance();
})();

// One scroll clock drives the paper handoff, the product framing and the photo reveal.
(() => {
  const root = document.querySelector('.business-home');
  if (!root) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = root.querySelector('.business-hero');
  const heroImage = root.querySelector('.hero-watch img');
  const workflow = root.querySelector('#workflow');
  const sheet = root.querySelector('.handoff-document');
  const ticket = root.querySelector('.handoff-ticket');
  const fan = root.querySelector('.document-fan');
  const papers = [...root.querySelectorAll('.document-sheet')];
  const photo = root.querySelector('.service-photograph');
  const image = photo.querySelector('img');
  const visual = root.querySelector('.workflow-visual');
  let frame = 0;
  let current = 0;
  let target = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    [heroImage,sheet,ticket,...papers,photo,image,visual].forEach(el => el.removeAttribute('style'));
  }
  function render() {
    frame = 0;
    if (preference.matches || document.hidden) return;
    const h = hero.getBoundingClientRect();
    const hp = clamp(-h.top / Math.max(1,h.height));
    heroImage.style.transform = `translateY(${hp*48}px) rotate(${-9+hp*15}deg) scale(${.97+hp*.08})`;
    const w = workflow.getBoundingClientRect();
    target = clamp((innerHeight*.4-w.top)/Math.max(1,w.height-innerHeight*.65));
    current += (target-current)*.18;
    const p=current;
    // The plan recedes; an assignment crosses toward the watch, then resolves in the manager strip.
    const plan = clamp(1-p*5.5);
    sheet.style.opacity = String(plan*.98);
    sheet.style.transform = `translate(${p*170}px,${-p*65}px) rotate(${-8+p*45}deg) scale(${1-p*.4})`;
    sheet.style.filter = `blur(${(1-plan)*4}px)`;
    const arrival=clamp((p-.12)/.15),departure=clamp((p-.42)/.16);
    ticket.style.opacity=String(arrival*(1-departure));
    ticket.style.transform=`translate(${(1-arrival)*80-departure*110}px,${(1-arrival)*-35+departure*85}px) rotate(${(1-arrival)*9-departure*6}deg) scale(${1-departure*.3})`;
    ticket.style.filter=`blur(${(1-arrival+departure)*3}px)`;
    const tone=Math.round(246+(243-246)*Math.sin(p*Math.PI));
    visual.style.backgroundColor=`rgb(${tone} ${Math.round(246-7*Math.sin(p*Math.PI))} ${Math.round(248+4*Math.sin(p*Math.PI))})`;
    const f=fan.getBoundingClientRect();
    const fp=clamp((innerHeight*.95-f.top)/(innerHeight*.85));
    papers.forEach((paper,i)=>{
      const direction=i-1, small=innerWidth<=680;
      const spread=small?18-8*fp:50-26*fp;
      const angle=small?12-5*fp:20-11*fp;
      paper.style.transform=`translate(${direction*spread}px,${i===1?-18:24*(1-fp)}px) rotate(${direction*angle}deg) rotateY(${direction*(1-fp)*8}deg)`;
    });
    const b=photo.getBoundingClientRect();
    const reveal=clamp((innerHeight-b.top)/(innerHeight*.75));
    photo.style.clipPath=`inset(${(1-reveal)*12}% ${(1-reveal)*4}% round 8px)`;
    image.style.transform=`scale(${1.08-reveal*.08}) translateY(${(1-reveal)*18}px)`;
    if(Math.abs(target-current)>.0005)frame=requestAnimationFrame(render);
  }
  function schedule(){if(!frame&&!preference.matches)frame=requestAnimationFrame(render);}
  preference.addEventListener('change',()=>{reset();schedule();});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});
  addEventListener('pageshow',schedule);
  schedule();
})();
