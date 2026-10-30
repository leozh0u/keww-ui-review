// KEWW's generic watch concept. This is authored geometry, not a model of supplied hardware.
// Adapted from watch-scene-source.js for the current task beat. Bundled lazily;  Three.js and RoomEnvironment are MIT licensed (see VENDOR-LICENSES.md).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

(() => {
  const beat = document.querySelector('[data-watch-beat]');
  const stage = beat?.querySelector('[data-watch-beat-stage]');
  if (!beat || !stage || typeof IntersectionObserver === 'undefined' || typeof ResizeObserver === 'undefined') return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const locale = document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('es') ? 'es' : 'en';
  const copy = {
    en: { time: '5:46', title: 'Cocktail hour', ready: 'Your shift', next: 'Service starts at 6:00', task: 'Set up the', task2: 'cocktail area', task3: 'Before guests arrive', assigned: 'TASK ASSIGNED', completed: 'COMPLETED', view: 'View task', complete: 'Complete', done: 'Task complete', done2: 'Ready for service', updated: 'Manager updated', states: ['Event plan', 'Crew assignment', 'Task in progress', 'Task completed'] },
    es: { time: '5:46', title: 'Cóctel', ready: 'Tu turno', next: 'El servicio empieza a las 6:00', task: 'Preparar la zona', task2: 'de cócteles', task3: 'Antes de que lleguen', assigned: 'TAREA ASIGNADA', completed: 'COMPLETADA', view: 'Ver tarea', complete: 'Completar', done: 'Tarea completada', done2: 'Todo preparado', updated: 'Responsable informado', states: ['Plan del evento', 'Asignación', 'Tarea en curso', 'Tarea completada'] },
    zh: { time: '5:46', title: '酒会服务', ready: '你的班次', next: '服务于 6:00 开始', task: '布置', task2: '鸡尾酒区', task3: '宾客到达前完成', assigned: '已分配任务', completed: '已完成', view: '查看任务', complete: '完成', done: '任务已完成', done2: '准备开始服务', updated: '负责人已收到更新', states: ['活动计划', '人员安排', '任务进行中', '任务已完成'] }
  }[locale];
  let renderer, scene, camera, watch, texture, environment, resizeObserver;
  let active = false, visible = false, failed = false, disposed = false, frame = 0;
  let current = -1, progress = 0, target = 0, currentPose = 0, lastPaint = 0;
  const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value));
  const resources = new Set();

  function roundedShape(width, height, radius) {
    const x = -width / 2, y = -height / 2, s = new THREE.Shape();
    s.moveTo(x + radius, y); s.lineTo(x + width - radius, y);
    s.quadraticCurveTo(x + width, y, x + width, y + radius); s.lineTo(x + width, y + height - radius);
    s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); s.lineTo(x + radius, y + height);
    s.quadraticCurveTo(x, y + height, x, y + height - radius); s.lineTo(x, y + radius);
    s.quadraticCurveTo(x, y, x + radius, y); return s;
  }
  function slab(width, height, radius, depth, material, z = 0) {
    const geometry = new THREE.ExtrudeGeometry(roundedShape(width, height, radius), { depth, bevelEnabled: true, bevelThickness: .035, bevelSize: .035, bevelSegments: 3, curveSegments: 12, steps: 1 });
    geometry.translate(0, 0, -depth / 2);
    const mesh = new THREE.Mesh(geometry, material); mesh.position.z = z;
    resources.add(geometry); resources.add(material); return mesh;
  }
  function pill(ctx, x, y, width, height, radius, fill) {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fill();
  }
  const face = document.createElement('canvas'); face.width = 512; face.height = 640;
  const ctx = face.getContext('2d');
  if (!ctx) return;
  function text(value, x, y, size, color = '#ffffff', weight = 400, align = 'left') {
    ctx.font = `${weight} ${size}px "Plus Jakarta Sans", "PingFang SC", "Microsoft YaHei", sans-serif`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(value, x, y);
  }
  function drawScreen(step) {
    ctx.clearRect(0, 0, 512, 640); pill(ctx, 0, 0, 512, 640, 72, '#101014');
    text(copy.time, 42, 64, 35, '#ffffff', 700);
    // Familiar watch indicators, never presented as live device status.
    ctx.strokeStyle = '#c8c5d0'; ctx.lineWidth = 3; ctx.strokeRect(405, 40, 44, 20); ctx.fillStyle = '#c8c5d0'; ctx.fillRect(450, 46, 4, 8); ctx.fillRect(409, 44, 32, 12);
    if (step === 0) {
      text(copy.ready, 40, 155, 31, '#c5b9df', 700);
      text(copy.title, 40, 230, 43, '#ffffff', 700);
      text('6:00–10:00', 40, 296, 48, '#ffffff', 700);
      pill(ctx, 36, 343, 440, 105, 20, '#232129');
      text(copy.next, 56, 387, locale === 'es' ? 23 : 27, '#eeeaf4');
      text('KEWW', 56, 425, 25, '#bfb2da', 700);
      pill(ctx, 36, 490, 440, 83, 40, '#65558F'); text(copy.view, 256, 544, 32, '#ffffff', 700, 'center');
    } else if (step === 3) {
      ctx.strokeStyle = '#83d58b'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(256, 228, 67, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(221, 229); ctx.lineTo(246, 252); ctx.lineTo(291, 203); ctx.stroke();
      text(copy.completed, 256, 356, 26, '#a5e5ac', 700, 'center');
      text(copy.done, 256, 416, locale === 'es' ? 35 : 39, '#ffffff', 700, 'center');
      text(copy.done2, 256, 462, 29, '#d2cddc', 400, 'center');
      pill(ctx, 36, 510, 440, 65, 32, '#29252f'); text(copy.updated, 256, 552, locale === 'es' ? 26 : 28, '#ddd4ed', 400, 'center');
    } else {
      text(copy.assigned, 40, 153, 24, '#c5b9df', 700);
      text(copy.title, 40, 205, 30, '#d5cde3');
      text(copy.task, 40, 293, locale === 'es' ? 37 : 43, '#ffffff', 700);
      text(copy.task2, 40, 351, 43, '#ffffff', 700);
      text(copy.task3, 40, 416, 27, '#c4bdcd');
      pill(ctx, 36, 492, 440, 83, 40, '#65558F');
      text(step === 1 ? copy.view : copy.complete, 256, 546, 32, '#ffffff', 700, 'center');
    }
    if (texture) texture.needsUpdate = true;
  }
  function setStep(step) {
    if (step === current) return;
    current = step; beat.dataset.watchState = String(step);
    drawScreen(step);

  }
  function measure() {
    if (motion.matches) { release(); return; }
    if (beat.dataset.active !== 'true') { cancelAnimationFrame(frame); frame = 0; return; }
    progress = clamp(Number(beat.dataset.progress) || 0);
    setStep(beat.dataset.complete === 'true' ? 3 : progress > .28 ? 2 : 1);
    target = progress;
    start();
    if (active && visible && !document.hidden) schedule();
  }
  function updateSize() {
    if (!renderer || !camera) return;
    const width = Math.max(1, stage.clientWidth), height = Math.max(1, stage.clientHeight);
    // Fit the complete posed watch, including band and crown, once per resize.
    // Keep one stable camera through the beat so the bounded zoom remains visible.
    const aspect = width / height;
    const bounds = new THREE.Box3();
    let maxWidth = 0, maxHeight = 0;
    for (let sample = 0; sample <= 16; sample++) {
      pose(sample / 16);
      watch.updateMatrixWorld(true);
      bounds.setFromObject(watch);
      maxWidth = Math.max(maxWidth, Math.abs(bounds.min.x) * 2, Math.abs(bounds.max.x) * 2);
      maxHeight = Math.max(maxHeight, Math.abs(bounds.min.y) * 2, Math.abs(bounds.max.y) * 2);
    }
    pose(currentPose);
    const range = Math.max(maxHeight, maxWidth / aspect) * 1.12;
    camera.left = -range * aspect / 2; camera.right = range * aspect / 2;
    camera.top = range / 2; camera.bottom = -range / 2; camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); renderer.setSize(width, height, false);
    schedule();
  }
  function pose(p = currentPose) {
    // A single controlled product move: profile first, face forward for the task.
    watch.rotation.set(-.14 + Math.sin(p * Math.PI) * .1, -.7 + p * .95, -.22 + p * .14);
    watch.position.set(Math.sin(p * Math.PI) * .10, .04, Math.sin(p * Math.PI) * .12);
    watch.scale.setScalar(.91 + Math.sin(p * Math.PI) * .22);
  }
  function render(now = 0) {
    frame = 0;
    if (!active || !visible || document.hidden || motion.matches || !renderer || beat.dataset.active !== 'true') return;
    if (now - lastPaint < 1000 / 30) { schedule(); return; }
    lastPaint = now;
    currentPose += (target - currentPose) * .3;
    if (Math.abs(target - currentPose) < .0003) currentPose = target;
    pose();
    try {
      renderer.render(scene, camera);
      beat.classList.add('is-ready');
      if (currentPose !== target) schedule();
    } catch { fail(); }
  }
  function schedule() { if (!frame && active && visible && !document.hidden && beat.dataset.active === 'true') frame = requestAnimationFrame(render); }
  function onContextLost(event) {
    event.preventDefault();
    // A delayed event from an intentionally retired canvas cannot fail a newer scene.
    if (event.currentTarget !== renderer?.domElement) return;
    fail();
  }
  function release() {
    active = false; cancelAnimationFrame(frame); frame = 0; beat.classList.remove('is-ready');
    const previous = renderer; renderer = null;
    beat.dataset.rendering = 'fallback';
    previous?.domElement.removeEventListener('webglcontextlost', onContextLost);
    resizeObserver?.disconnect(); resizeObserver = null;
    for (const item of resources) item.dispose(); resources.clear();
    environment?.dispose(); environment = null;
    if (previous) {
      // dispose() releases Three.js resources, but the browser's context needs its own teardown.
      if (!previous.getContext().isContextLost()) previous.forceContextLoss();
      previous.dispose(); previous.domElement.remove();
    }
    scene = camera = watch = texture = null;
  }
  function fail() { failed = true; beat.dataset.rendering = 'fallback'; release(); }
  function start() {
    if (active || failed || disposed || motion.matches || !visible || beat.dataset.active !== 'true') return;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power', stencil: false });
      renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.25;
      renderer.setClearColor(0x000000, 0); renderer.domElement.className = 'watch-beat-canvas'; renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.addEventListener('webglcontextlost', onContextLost);
      stage.append(renderer.domElement);
      scene = new THREE.Scene(); camera = new THREE.OrthographicCamera(-4, 4, 4, -4, .1, 30); camera.position.set(0, 0, 12);
      const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
      environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; room.dispose(); pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xffffff, 0x777483, 2.0));
      const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-4, 7, 8); scene.add(key);
      const edge = new THREE.DirectionalLight(0xebe4f7, 2.5); edge.position.set(4, 1, -1); scene.add(edge);
      const metal = new THREE.MeshStandardMaterial({ color: 0xbebfc2, metalness: .88, roughness: .28 });
      const darkMetal = new THREE.MeshStandardMaterial({ color: 0x3e3d45, metalness: .65, roughness: .36 });
      const strapMaterial = new THREE.MeshStandardMaterial({ color: 0x08080b, metalness: 0, roughness: .9, envMapIntensity: .18 });
      const black = new THREE.MeshStandardMaterial({ color: 0x09090c, metalness: .12, roughness: .26 });
      watch = new THREE.Group(); scene.add(watch);
      const strap = slab(1.52, 7.3, .36, .18, strapMaterial, -.19); watch.add(strap);
      // Deliberately simple band details, not unverified sensors or branded hardware.
      for (let i = 0; i < 5; i++) {
        const mark = slab(.14, .33, .06, .018, black, -.083); mark.position.y = -1.9 - i * .32; watch.add(mark);
      }
      const buckle = slab(1.57, .46, .12, .22, darkMetal, -.12); buckle.position.y = 2.68; watch.add(buckle);
      const buckleInset = slab(1.15, .24, .07, .025, strapMaterial, .005); buckleInset.position.y = 2.68; watch.add(buckleInset);
      watch.add(slab(2.38, 2.92, .49, .46, metal));
      watch.add(slab(2.23, 2.77, .45, .10, darkMetal, .24));
      watch.add(slab(2.13, 2.66, .42, .065, black, .315));
      drawScreen(Math.max(0, current)); texture = new THREE.CanvasTexture(face); texture.colorSpace = THREE.SRGBColorSpace; resources.add(texture);
      const screenGeometry = new THREE.PlaneGeometry(1.96, 2.45); resources.add(screenGeometry);
      const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }); resources.add(screenMaterial);
      const screen = new THREE.Mesh(screenGeometry, screenMaterial); screen.position.z = .398; watch.add(screen);
      const crownGeometry = new THREE.CylinderGeometry(.205, .205, .20, 32); crownGeometry.rotateZ(Math.PI / 2); resources.add(crownGeometry);
      const crown = new THREE.Mesh(crownGeometry, metal); crown.position.set(1.29, .48, -.02); watch.add(crown);
      const button = slab(.13, .54, .06, .12, metal, -.03); button.position.set(1.24, -.43, -.03); watch.add(button);
      active = true; beat.dataset.rendering = '3d'; currentPose = target;
      resizeObserver = new ResizeObserver(updateSize); resizeObserver.observe(stage); updateSize(); measure(); schedule();
    } catch { fail(); }
  }
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible) { start(); measure(); schedule(); }
    else { cancelAnimationFrame(frame); frame = 0; }
  }, { threshold: .01 });
  observer.observe(stage);
  const onMotion = () => { if (motion.matches) release(); else { start(); measure(); } };
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { measure(); schedule(); } };
  beat.addEventListener('watch-beat:update', measure); addEventListener('resize', measure, { passive: true });
  motion.addEventListener('change', onMotion); document.addEventListener('visibilitychange', onVisibility);
  addEventListener('pagehide', event => {
    if (event.persisted) { cancelAnimationFrame(frame); frame = 0; return; }
    disposed = true; observer.disconnect(); beat.removeEventListener('watch-beat:update', measure); removeEventListener('resize', measure); motion.removeEventListener('change', onMotion); document.removeEventListener('visibilitychange', onVisibility); release();
  });
  addEventListener('pageshow', () => { measure(); start(); schedule(); });
  document.fonts?.ready.then(() => { if (!disposed) { drawScreen(Math.max(0, current)); schedule(); } });
  measure();
})();
