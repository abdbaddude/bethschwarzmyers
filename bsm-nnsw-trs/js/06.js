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

function filterShipments() { renderShipments(); }

function renderShipments() {
  const q = (document.getElementById('shipSearch').value || '').toLowerCase();
  const st = document.getElementById('shipStatus').value;
  const an = document.getElementById('shipAnomaly').value;
  let list = SHIPMENTS.filter(s => s.port === currentPort);
  if (q) list = list.filter(s => (s.bl || '').toLowerCase().includes(q) || (s.container || '').toLowerCase().includes(q));
  if (st) list = list.filter(s => s.status === st);
  if (an === '1') list = list.filter(s => s.anomaly);
  document.getElementById('shipTableBody').innerHTML = list.slice(0, 50).map(s => `
    <tr class="border-t border-slate-100 hover:bg-slate-50 ${s.anomaly ? 'anomaly-row' : ''}">
      <td class="px-3 py-2 font-medium">${s.bl}</td>
      <td class="px-3 py-2 text-slate-500">${s.container}</td>
      <td class="px-3 py-2">${s.cargo || ''}</td>
      <td class="px-3 py-2 font-semibold ${s.anomaly ? 'text-rose-600' : ''}">${s.total}</td>
      <td class="px-3 py-2">${s.status}</td>
      <td class="px-3 py-2"><button class="text-sky-600 hover:underline text-[10px]" onclick='showShipmentTimeline(${JSON.stringify(s).replace(/'/g, "&#39;")})'>Timeline</button></td>
    </tr>`).join('') || '<tr><td colspan="6" class="px-3 py-4 text-center text-slate-400">No shipments match.</td></tr>';
}
