/* Fictional task example only. No network, timers, storage or employee records. */
(() => {
  const scene = document.querySelector('[data-service-scene]');
  if (!scene) return;
  const copy = {
    en: { action: 'Complete table setup', reset: 'Reset example', progress: ['2 in progress', '1 in progress'], state: ['In progress', 'Complete'], announce: ['Example reset. 12 of 15 tasks complete.', 'Table setup complete. 13 of 15 tasks complete.'] },
    es: { action: 'Terminar montaje de mesas', reset: 'Reiniciar ejemplo', progress: ['2 en curso', '1 en curso'], state: ['En curso', 'Terminada'], announce: ['Ejemplo reiniciado. 12 de 15 tareas terminadas.', 'Montaje de mesas terminado. 13 de 15 tareas terminadas.'] },
    zh: { action: '完成餐桌布置', reset: '重置示例', progress: ['2项进行中', '1项进行中'], state: ['进行中', '已完成'], announce: ['示例已重置，15项任务已完成12项。', '餐桌布置已完成，15项任务已完成13项。'] },
  }[scene.dataset.locale];
  if (!copy) return;
  const find = name => scene.querySelector(`[data-service-${name}]`);
  const button = find('toggle');
  const row = find('table');
  let complete = false;
  button.addEventListener('click', () => {
    complete = !complete;
    const state = Number(complete);
    scene.dataset.tableComplete = String(complete);
    find('total').textContent = complete ? '13' : '12';
    find('percent').textContent = complete ? '87%' : '80%';
    const progress = find('progress');
    progress.value = complete ? 13 : 12;
    progress.textContent = complete ? '13 / 15' : '12 / 15';
    find('ongoing').textContent = copy.progress[state];
    find('table-count').textContent = complete ? '5 / 5' : '4 / 5';
    find('table-state').textContent = copy.state[state];
    row.classList.toggle('is-done', complete);
    row.classList.toggle('in-progress', !complete);
    button.textContent = complete ? copy.reset : copy.action;
    find('announcement').textContent = copy.announce[state];
  });
  find('controls').hidden = false;
})();
