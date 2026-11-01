function showShipmentTimeline(s) {
  const stages = META.stages;
  document.getElementById('timelinePanel').classList.remove('hidden');
  document.getElementById('tlTitle').textContent = s.bl + ' · ' + s.container + ' · ' + s.total + ' hrs';
  document.getElementById('tlBody').innerHTML = (s.stageHours || []).map((h, i) => {
    const isLong = h > (getQ(currentPort, currentQuarter).stageHours[stages[i].id] * 1.25);
    return `<div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div style="width:12px;height:12px;border-radius:50%;background:${isLong ? '#f43f5e' : stages[i].color}"></div>
        ${i < s.stageHours.length - 1 ? '<div style="width:2px;flex:1;background:#e2e8f0;margin:2px 0"></div>' : ''}
      </div>
      <div class="pb-3 flex-1">
        <div class="flex justify-between">
          <p class="font-medium text-xs">${stages[i].name}</p>
          <p class="text-xs font-semibold ${isLong ? 'text-rose-600' : ''}">${h} hrs</p>
        </div>
        ${isLong ? '<p class="text-[10px] text-rose-600 mt-0.5"><i class="fa-solid fa-flag"></i> Above stage median</p>' : ''}
      </div>
    </div>`;
  }).join('');
  document.getElementById('timelinePanel').scrollIntoView({ behavior: 'smooth' });
}

function closeTimeline() {
  document.getElementById('timelinePanel').classList.add('hidden');
}

function renderAgencies() {
  const q = getQ(currentPort, currentQuarter);
  document.getElementById('agencyCards').innerHTML = (q.agencies || []).map(a => {
    const tone = a.status === 'Good' ? 'text-emerald-600 bg-emerald-50' :
      a.status === 'Critical' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50';
    return `<div class="card p-3">
      <div class="flex justify-between items-start gap-2">
        <h3 class="text-sm font-semibold">${a.name}</h3>
        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${tone}">${a.status}</span>
      </div>
      <p class="text-[11px] text-slate-500 mt-1.5">Avg touch: <strong>${a.avgHours} hrs</strong> · Share of delay: <strong>${a.share}%</strong></p>
    </div>`;
  }).join('') || '<p class="text-xs text-slate-500">No agency data for this selection.</p>';
}

function renderAnomalies() {
  const list = SHIPMENTS.filter(s => s.port === currentPort && s.anomaly).sort((a, b) => b.total - a.total);
  document.getElementById('anomalyTableBody').innerHTML = list.map(s => {
    let primary = 'Elevated total dwell', severity = 'Medium';
    if (s.total > 160) { primary = 'Extreme dwell'; severity = 'High'; }
    else if (s.stageHours && s.stageHours[4] > 45) { primary = 'Gate-out bottleneck'; severity = 'High'; }
    else if (s.stageHours && s.stageHours[1] > 40) { primary = 'Agency permits delay'; severity = 'Medium'; }
    const sev = severity === 'High'
      ? '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800">High</span>'
      : '<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Medium</span>';
    return `<tr class="border-t border-slate-100 hover:bg-slate-50">
      <td class="px-3 py-2 font-medium">${s.bl}</td>
      <td class="px-3 py-2 font-semibold text-rose-600">${s.total}</td>
      <td class="px-3 py-2">${primary}</td>
      <td class="px-3 py-2">${sev}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="4" class="px-3 py-4 text-center text-slate-400">No anomalies in sample for this port.</td></tr>';
}

let trendsChartInstance = null;
let trendsTotalChartInstance = null;
