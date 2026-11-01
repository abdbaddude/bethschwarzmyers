function showNetworkStageTrend(stageId, stepNum) {
  if (!META || !PORT_DATA) return;
  const stages = META.stages;
  const stage = stages.find(s => s.id === stageId) || stages[0];
  if (!stage) return;
  const step = stepNum != null ? stepNum : (stages.findIndex(s => s.id === stage.id) + 1);
  const quarters = META.quarters || [];
  const series = quarters.map(qid => {
    const q = getQ(currentPort, qid);
    if (!q || !q.stageHours) return null;
    const v = q.stageHours[stage.id];
    return v != null ? v : null;
  });

  const titleEl = document.getElementById('networkStageTrendTitle');
  if (titleEl) titleEl.textContent = 'Step ' + step + ' · ' + stage.short + ' — median trend';

  const ctx = document.getElementById('networkStageTrendChart');
  if (!ctx || typeof Chart === 'undefined') return;
  if (networkStageTrendChart) networkStageTrendChart.destroy();
  networkStageTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: quarters,
      datasets: [{
        label: stage.short + ' median (h)',
        data: series,
        borderColor: stage.color || '#0ea5e9',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 3,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function(c) { return (c.parsed.y != null ? c.parsed.y + 'h median' : '—'); } } }
      },
      scales: {
        y: { beginAtZero: true, ticks: { font: { size: 9 } }, title: { display: true, text: 'hrs', font: { size: 9 } } },
        x: { ticks: { font: { size: 9 } } }
      }
    }
  });

  const evEl = document.getElementById('networkStageEvents');
  if (evEl) {
    const events = NETWORK_REMARKABLE_EVENTS.slice(0, 3);
    evEl.innerHTML = events.map(e =>
      '<li class="flex gap-2">' +
        '<span class="shrink-0 font-mono text-[10px] text-slate-500 w-[4.5rem]">' + e.date + '</span>' +
        '<span><strong class="text-slate-800">' + e.title + '</strong> — <span class="text-slate-600">' + e.detail + '</span></span>' +
      '</li>'
    ).join('');
  }
}
