/* Local fictional examples only; no network, employee records or ongoing animation. */
(() => {
  const report = document.querySelector('[data-task-report]');
  if (!report) return;
  const buttons = [...report.querySelectorAll('[data-task-select]')];
  const panels = [...report.querySelectorAll('[data-task-panel]')];
  const choices = report.querySelector('[data-task-choices]');
  if (!buttons.length || !choices || buttons.some(button => !panels.some(panel => panel.dataset.taskPanel === button.dataset.taskSelect))) return;
  function select(button, announce = true) {
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach(panel => { panel.hidden = panel.dataset.taskPanel !== button.dataset.taskSelect; });
    if (announce) report.querySelector('[data-task-announcement]').textContent = `${button.textContent}. ${report.dataset.taskAnnounced}`;
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button)));
  select(buttons[0], false);
  choices.hidden = false;
})();
