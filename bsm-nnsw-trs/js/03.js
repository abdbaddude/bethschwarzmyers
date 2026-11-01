function renderAll() {
  if (typeof renderRecommendations === 'function') renderRecommendations();
  const q = getQ(currentPort, currentQuarter);
  const baseline = resolveBaseline(q);
  const stages = META.stages;
  const hours = stages.map(s => q.stageHours[s.id]);
  const total = q.totalHours;
  const priorTotal = baseline ? baseline.totalHours : q.priorTotalHours;

  // Header chips
  document.getElementById('chipQuarter').textContent = currentQuarter + ' (Illustrative)';
  document.getElementById('chipPort').textContent = PORT_DATA[currentPort].portName + ' – Imports';
  document.getElementById('chipSample').textContent = q.sampleSize.toLocaleString() + ' shipments';

  // KPIs
  document.getElementById('kpiTotal').innerHTML = total + ' <span class="text-sm font-normal text-slate-500">hrs</span>';
  document.getElementById('kpiDelta').innerHTML = deltaHtml(total, priorTotal, ' hrs');
  document.getElementById('kpiSample').textContent = q.sampleSize.toLocaleString();
  const topBn = (q.bottlenecks || [])[0];
  document.getElementById('kpiBottleneck').textContent = topBn ? topBn.title : '—';
  document.getElementById('kpiBottleneckDetail').textContent = topBn
    ? topBn.delayHours + ' hrs · ' + topBn.pct + '% of total'
    : '—';
  document.getElementById('kpiAnomaly').textContent = q.anomalyCount;

  // Timeline total + compare
  const days = (total / 24).toFixed(1);
  document.getElementById('timelineTotal').textContent = total + ' hours (' + days + ' days)';
  document.getElementById('timelineCompare').innerHTML = priorTotal != null
    ? deltaHtml(total, priorTotal, ' hrs')
    : '';

  // Stage icons + names
  document.getElementById('timelineIcons').innerHTML = stages.map((s, i) => `
    <div class="text-center px-0.5">
      <div class="w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center text-[11px] shadow-sm" style="background:${s.color}">
        <i class="fa-solid ${STAGE_ICONS[i]}"></i>
      </div>
      <p class="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">${i + 1}. ${s.name.split('&')[0].trim()}</p>
      <p class="text-[8px] text-slate-400 leading-tight mt-0.5 hidden sm:block">${s.name.includes('&') ? s.name.split('&')[1].trim() : ''}</p>
    </div>`).join('');

  // Segmented bar
  document.getElementById('timelineBar').innerHTML = stages.map((s, i) =>
    `<div style="width:${(hours[i] / total * 100).toFixed(2)}%;background:${s.color}" title="${s.short}: ${hours[i]}h"></div>`
  ).join('');

  // Hour pills – same horizontal line under stages
  document.getElementById('timelineHours').innerHTML = stages.map((s, i) =>
    `<div class="text-center"><span class="stage-pill" style="background:${s.color}">${hours[i]} hrs</span></div>`
  ).join('');

  // Bottleneck cards – delay hours AND share on the SAME line
  const bnColors = { permits: '#10b981', customs: '#8b5cf6', gateout: '#334155', arrival: '#2563eb', inspection: '#f59e0b' };
  // Map bottleneck stage -> column index (0..4) and render arrows under the timeline
  const stageIdx = { arrival:0, permits:1, customs:2, inspection:3, gateout:4 };
  const bnByCol = {0:null,1:null,2:null,3:null,4:null};
  (q.bottlenecks || []).forEach((b, idx) => {
    const col = stageIdx[b.stage] != null ? stageIdx[b.stage] : Math.min(idx + 1, 4);
    bnByCol[col] = { ...b, idx: idx + 1 };
  });
  document.getElementById('bottleneckCards').innerHTML = [0,1,2,3,4].map(col => {
    const b = bnByCol[col];
    if (!b) return '<div class="hidden sm:block"></div>';
    return `<div class="bn-card relative pt-3">
      <div class="absolute left-1/2 -top-1 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-rose-400"></div>
        <div class="w-0.5 h-2 bg-rose-300"></div>
      </div>
      <p class="font-semibold text-rose-800 flex items-start gap-1">
        <i class="fa-solid fa-triangle-exclamation mt-0.5 shrink-0"></i>
        <span>Bottleneck ${b.idx}: ${b.title}</span>
      </p>
      <p class="text-rose-700 mt-1 leading-snug">${b.desc}</p>
      <p class="mt-1.5 font-semibold text-rose-600 flex flex-wrap items-center justify-between gap-1">
        <span>Avg. delay: ${b.delayHours} hrs</span>
        <span class="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded whitespace-nowrap">${b.pct}% of total</span>
      </p>
    </div>`;
  }).join('');

  // Horizontal bar chart — actual median + target markers + % to meet / surplus
  if (stageBarChart) stageBarChart.destroy();
  const barLabels = stages.map(s => STAGE_SHORT_LABELS[s.id] || s.short);
  const stageTargets = stages.map(s => {
    if (META.stageTargets && META.stageTargets[s.id] != null) return META.stageTargets[s.id];
    // fallback: proportional share of north-star total
    const ns = META.northStarHours || 24;
    const share = total > 0 ? (q.stageHours[s.id] / total) : (1 / stages.length);
    return Math.round(ns * share * 10) / 10;
  });
  const barData = hours.map((h, i) => ({
    value: h,
    target: stageTargets[i],
    pct: total > 0 ? Math.round((h / total) * 1000) / 10 : 0
  }));

  stageBarChart = new Chart(document.getElementById('stageBarChart'), {
    type: 'bar',
    data: {
      labels: barLabels,
      datasets: [{
        label: 'Median hours',
        data: hours,
        backgroundColor: stages.map(s => s.color),
        borderRadius: 4,
        barPercentage: 0.7
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: (ctx) => {
              const t = stageTargets[ctx.dataIndex];
              const h = hours[ctx.dataIndex];
              const delta = h - t;
              return t != null ? `Target: ${t}h (${delta > 0 ? '+' : ''}${delta.toFixed(1)}h)` : '';
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: { display: true, text: 'Hours' },
          grid: { color: 'rgba(148,163,184,0.15)' }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });

  // Agency contribution table
  if (typeof renderAgencies === 'function') renderAgencies(q);
  if (typeof renderAnomalies === 'function') renderAnomalies(q);
  if (typeof renderBenefits === 'function') renderBenefits(q);
  if (typeof renderAlertsPreview === 'function') renderAlertsPreview();
  if (typeof renderShipments === 'function') renderShipments();
  if (typeof renderNetwork === 'function') renderNetwork();
  if (typeof renderTrends === 'function') renderTrends();
}

function deltaHtml(curr, prior, unit) {
  if (prior == null || prior === 0) return '';
  const d = curr - prior;
  const pct = ((d / prior) * 100).toFixed(1);
  const cls = d <= 0 ? 'text-emerald-600' : 'text-rose-600';
  const icon = d <= 0 ? 'fa-arrow-down' : 'fa-arrow-up';
  return `<span class="${cls}"><i class="fa-solid ${icon} text-xs"></i> ${Math.abs(d).toFixed(1)}${unit} (${pct}%)</span>`;
}

function resolveBaseline(q) {
  // Prefer explicit prior-quarter comparison when available
  if (q.priorQuarter && PORT_DATA[currentPort] && PORT_DATA[currentPort].quarters) {
    const pq = PORT_DATA[currentPort].quarters.find(x => x.id === q.priorQuarter);
    if (pq) return pq;
  }
  return null;
}
