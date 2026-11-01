function renderTrends() {
  if (!META || !PORT_DATA) return;
  const stages = META.stages;
  const quarters = META.quarters || [];
  const portRadio = document.querySelector('input[name="trendsPort"]:checked');
  const portScope = portRadio ? portRadio.value : 'all';

  // Build stage checkboxes once
  const box = document.getElementById('trendsStageChecks');
  if (box && !box.dataset.ready) {
    box.innerHTML = stages.map((s,i) =>
      '<label class="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-slate-200 bg-white cursor-pointer">' +
      '<input type="checkbox" class="accent-sky-600 trends-stage" value="' + s.id + '" ' + (i < 3 ? 'checked' : '') + ' onchange="renderTrends()">' +
      '<span class="w-2 h-2 rounded-full" style="background:' + s.color + '"></span>' + s.short + '</label>'
    ).join('') +
    '<label class="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-slate-200 bg-white cursor-pointer">' +
    '<input type="checkbox" class="accent-sky-600 trends-stage" value="__total__" checked onchange="renderTrends()">' +
    '<span class="w-2 h-2 rounded-full bg-slate-800"></span>Total release</label>';
    box.dataset.ready = '1';
  }

  const selected = Array.from(document.querySelectorAll('.trends-stage:checked')).map(el => el.value);
  const portIds = portScope === 'all' ? Object.keys(PORT_DATA) : [portScope];

  function stageSeries(stageId) {
    return quarters.map(qid => {
      const vals = portIds.map(pid => {
        const q = getQ(pid, qid);
        if (!q) return null;
        if (stageId === '__total__') return q.totalHours;
        return (q.stageHours && q.stageHours[stageId] != null) ? q.stageHours[stageId] : null;
      }).filter(v => v != null);
      if (!vals.length) return null;
      return Math.round((vals.reduce((a,b)=>a+b,0) / vals.length) * 10) / 10;
    });
  }

  const colors = {};
  stages.forEach(s => colors[s.id] = s.color);
  colors['__total__'] = '#0f172a';

  const datasets = selected.map(sid => {
    const label = sid === '__total__' ? 'Total median release' : ((stages.find(s => s.id === sid) || {}).short || sid);
    return {
      label: label,
      data: stageSeries(sid),
      borderColor: colors[sid] || '#64748b',
      backgroundColor: 'transparent',
      tension: 0.25,
      pointRadius: 3,
      borderWidth: sid === '__total__' ? 2.5 : 2
    };
  });

  const ctx = document.getElementById('trendsChart');
  if (trendsChartInstance) trendsChartInstance.destroy();
  trendsChartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels: quarters, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Hours' } },
        x: { title: { display: true, text: 'Quarter' } }
      }
    }
  });
}
