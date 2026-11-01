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
