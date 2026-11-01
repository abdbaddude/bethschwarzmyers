function isModuleActive(mod) {
  return true;
}

function buildTabsFromConfig() {
  const nav = document.getElementById('tabNav');
  const modules = (APP_CONFIG && APP_CONFIG.modules ? APP_CONFIG.modules : []).slice().sort((a, b) => a.order - b.order);
  nav.innerHTML = '';
  modules.forEach((mod, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'tab-' + mod.id;
    btn.className = 'tab-btn px-3 py-2.5 whitespace-nowrap text-slate-600';
    btn.innerHTML = '<i class="fa-solid ' + mod.icon + ' mr-1"></i>' + mod.label;
    btn.onclick = function() { showTab(mod.id); };
    nav.appendChild(btn);
  });
  if (modules.length) showTab(modules[0].id);
}

function initTheme() {
  const saved = localStorage.getItem('trs-theme') || (APP_CONFIG && APP_CONFIG.themeDefault) || 'system';
  setTheme(saved);
}

function resolveTheme(mode) {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(mode) {
  currentTheme = mode;
  localStorage.setItem('trs-theme', mode);
  const resolved = resolveTheme(mode);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  ['system', 'light', 'dark'].forEach(function(m) {
    const el = document.getElementById('theme-' + m);
    if (!el) return;
    if (m === mode) {
      el.classList.add('bg-emerald-100', 'text-emerald-800');
      el.classList.remove('text-slate-500');
    } else {
      el.classList.remove('bg-emerald-100', 'text-emerald-800');
      el.classList.add('text-slate-500');
    }
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
  if (currentTheme === 'system') setTheme('system');
});
