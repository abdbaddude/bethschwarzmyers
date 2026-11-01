function resolveBaseline(q) {
  const mode = document.getElementById('compareSelect').value;
  if (mode === 'none') return null;
  if (mode === 'prior') {
    const pq = getPriorQuarter(currentQuarter);
    return pq ? getQ(currentPort, pq) : null;
  }
  return PORT_DATA[currentPort].quarters[mode] || null;
}

function deltaHtml(current, baseline, unit) {
  if (baseline == null || baseline === current) return '<span class="text-slate-400">—</span>';
  const d = current - baseline;
  const pct = baseline ? Math.round((1 - current / baseline) * 100) : 0;
  if (d < 0) {
    return `<span class="text-emerald-600 font-medium">↓ ${Math.abs(d)}${unit} (${pct}% vs baseline)</span>`;
  }
  if (d > 0) {
    return `<span class="text-rose-600 font-medium">↑ ${d}${unit} vs baseline</span>`;
  }
  return '<span class="text-slate-400">unchanged</span>';
}
