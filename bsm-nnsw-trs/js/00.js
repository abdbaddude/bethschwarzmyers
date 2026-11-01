Chart.register(ChartDataLabels);

let META = null;
let PORT_DATA = {};
let SHIPMENTS = [];
let APP_CONFIG = null;
let RECOMMENDATIONS = null;
let CONTACTS = null;
let NOTIF_RULES = null;
let currentPort = 'tincan';
let currentQuarter = '2026-Q2';
let stageBarChart = null;
let delayDonut = null;
let obsStageChart = null;
let networkInstance = null;
let networkEdgesCache = [];
let recStatusFilter = 'all';
let currentTheme = 'system';
const STATUS_LABELS = { proposed: 'Proposed', in_progress: 'In progress', implemented: 'Implemented', verified: 'Verified' };

const STAGE_ICONS = ['fa-ship', 'fa-file-lines', 'fa-user-check', 'fa-magnifying-glass', 'fa-warehouse'];
const STAGE_SHORT_LABELS = {
  arrival: 'Port Arrival & Initial Processing',
  permits: 'Agency Permits & Documentation',
  customs: 'Customs Assessment & Payment',
  inspection: 'Inspection & Release Coordination',
  gateout: 'Port Operations & Gate-Out'
};

async function loadData() {
  const [meta, tincan, lekki, onne, ships, appConfig, recs, contacts, notifRules] = await Promise.all([
    fetch('data/meta.json').then(r => r.json()),
    fetch('data/tincan.json').then(r => r.json()),
    fetch('data/lekki.json').then(r => r.json()),
    fetch('data/onne.json').then(r => r.json()),
    fetch('data/shipments.json').then(r => r.json()),
    fetch('data/app-config.json').then(r => r.json()),
    fetch('data/recommendations.json').then(r => r.json()),
    fetch('data/contacts.json').then(r => r.json()),
    fetch('data/notification-rules.json').then(r => r.json())
  ]);
  META = meta;
  PORT_DATA = { tincan, lekki, onne };
  SHIPMENTS = ships.shipments || ships;
  APP_CONFIG = appConfig;
  RECOMMENDATIONS = recs;
  CONTACTS = contacts;
  NOTIF_RULES = notifRules;

  const portSel = document.getElementById('portSelect');
  const qSel = document.getElementById('quarterSelect');
  META.ports.forEach(p => {
    const o = document.createElement('option');
    o.value = p.id;
    o.textContent = p.name;
    portSel.appendChild(o);
  });
  META.quarters.forEach(q => {
    const o = document.createElement('option');
    o.value = q;
    o.textContent = q;
    qSel.appendChild(o);
  });
  portSel.value = currentPort;
  qSel.value = currentQuarter;

  document.getElementById('hdrTitle').textContent = META.title;
  document.getElementById('hdrSub').textContent = META.subtitle;
  document.getElementById('footerDisclaimer').textContent = META.disclaimer;

  initTheme();
  buildTabsFromConfig();
  renderAll();
}

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

function setRecStatusFilter(status) {
  recStatusFilter = status;
  document.querySelectorAll('.rec-status-btn').forEach(function(b) {
    const active = b.getAttribute('data-status') === status;
    b.classList.toggle('bg-slate-100', active);
    b.classList.toggle('font-medium', active);
    b.classList.toggle('text-slate-700', active);
    b.classList.toggle('text-slate-600', !active);
  });
  renderRecommendations();
}
