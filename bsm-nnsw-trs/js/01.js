function renderRecommendations() {
  if (!RECOMMENDATIONS) return;
  const list = document.getElementById('recList');
  if (!list) return;
  const portF = (document.getElementById('recPortFilter') || {}).value || 'all';
  const q = ((document.getElementById('recSearch') || {}).value || '').toLowerCase().trim();
  let items = RECOMMENDATIONS.items || [];
  if (portF !== 'all') items = items.filter(function(it) { return it.port === portF || it.port === 'all'; });
  if (recStatusFilter !== 'all') items = items.filter(function(it) { return it.status === recStatusFilter; });
  if (q) items = items.filter(function(it) {
    return (it.title + ' ' + it.owner + ' ' + (it.description || '')).toLowerCase().indexOf(q) >= 0;
  });

  if (!items.length) {
    list.innerHTML = '<div class="card p-6 text-center text-slate-500 text-sm">No interventions match these filters.</div>';
    return;
  }

  list.innerHTML = items.map(function(it) {
    const measured = Math.max(0, (it.beforeHours - it.afterHours));
    const expected = it.expectedReductionHours || 0;
    const pct = expected > 0 ? Math.min(100, Math.round((measured / expected) * 100)) : 0;
    const statusClass = 'status-' + it.status;
    const badgeClass = 'badge-' + it.status;
    const statusLabel = STATUS_LABELS[it.status] || it.status;
    return (
      '<div class="rec-card flex">' +
        '<div class="rec-bar ' + statusClass + '"></div>' +
        '<div class="flex-1 p-3 min-w-0">' +
          '<div class="flex flex-wrap items-start justify-between gap-2">' +
            '<h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">' + it.title + '</h3>' +
            '<span class="text-[10px] px-2 py-0.5 rounded-full font-medium ' + badgeClass + '">' + statusLabel + '</span>' +
          '</div>' +
          '<div class="mt-2 flex flex-wrap gap-1.5 text-[10px]">' +
            '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"><i class="fa-solid fa-user-tie"></i> ' + it.owner + '</span>' +
            '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"><i class="fa-regular fa-calendar"></i> ' + it.deadline + '</span>' +
            '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"><i class="fa-solid fa-bullseye"></i> Expected −' + expected.toFixed(1) + ' h ' + (it.metricLabel || '') + '</span>' +
          '</div>' +
          '<div class="mt-3 grid grid-cols-3 gap-2 items-end">' +
            '<div><p class="text-[9px] uppercase tracking-wide text-slate-400">Before</p><p class="text-lg font-bold text-slate-800 dark:text-slate-100">' + it.beforeHours.toFixed(1) + ' <span class="text-xs font-normal text-slate-500">h</span></p><p class="text-[9px] text-slate-400">' + (it.metricLabel || '') + '</p></div>' +
            '<div class="text-center text-slate-400 text-sm"><i class="fa-solid fa-arrow-right"></i></div>' +
            '<div class="text-right"><p class="text-[9px] uppercase tracking-wide text-slate-400">After</p><p class="text-lg font-bold text-slate-800 dark:text-slate-100">' + it.afterHours.toFixed(1) + ' <span class="text-xs font-normal text-slate-500">h</span></p><p class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">−' + measured.toFixed(1) + ' h measured</p></div>' +
          '</div>' +
          '<div class="mt-2">' +
            '<div class="flex justify-between text-[9px] text-slate-500 mb-0.5"><span>Expected vs measured</span><span>' + pct + '% of expected · −' + measured.toFixed(1) + ' / −' + expected.toFixed(1) + ' h</span></div>' +
            '<div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden"><div class="h-full rounded-full ' + statusClass + '" style="width:' + pct + '%"></div></div>' +
          '</div>' +
          (it.description ? '<p class="mt-2 text-[10px] text-slate-500 leading-relaxed">' + it.description + '</p>' : '') +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function getQ(port, quarter) {
  return PORT_DATA[port].quarters[quarter];
}

function getPriorQuarter(q) {
  const idx = META.quarters.indexOf(q);
  if (idx <= 0) return null;
  return META.quarters[idx - 1];
}

function onFilterChange() {
  currentPort = document.getElementById('portSelect').value;
  currentQuarter = document.getElementById('quarterSelect').value;
  renderAll();
}
