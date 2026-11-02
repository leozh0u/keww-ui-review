/* Real Kasheww captures, isolated from the homepage motion. */
(() => {
  const gallery = document.querySelector('.pp-kasheww .ks-real-art');
  if (!gallery) return;
  const tabs = [...gallery.querySelectorAll('[data-ks]')];
  const panels = [...gallery.querySelectorAll('.ks-panel-view')];
  if (tabs.length !== panels.length || !tabs.length) return;
  function select(index) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next >= 0) { event.preventDefault(); select(next); tabs[next].focus(); }
    });
  });
  select(0);
  gallery.querySelector('.ks-tabs').hidden = false;
})();
