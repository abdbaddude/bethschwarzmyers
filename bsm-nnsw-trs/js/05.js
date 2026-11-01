function renderNetwork() {
  const q = getQ(currentPort, currentQuarter);
  if (!q) return;
  const stages = META.stages;
  const hours = stages.map(s => q.stageHours[s.id]);
  const total = q.totalHours || 1;
  const agencies = q.agencies || [];
  const portName = PORT_DATA[currentPort].portName || currentPort;
  const bottlenecks = (q.bottlenecks || []).map(b => (typeof b === 'string' ? b : (b.id || b.stage || b.name || ''))).map(String);
  const meanH = hours.reduce((a,b)=>a+b,0) / (hours.length || 1);
  const isAnomalyStage = (sid, h) => {
    if (bottlenecks.some(b => b.toLowerCase().includes(sid))) return true;
    if (h >= meanH * 1.35 && h === Math.max(...hours)) return true;
    return false;
  };

  const nodes = [];
  const edges = [];
  networkEdgesCache = [];

  const fa = (code, color, size) => ({ face: "'Font Awesome 6 Free'", code: code, weight: '900', color: color, size: size || 30 });

  nodes.push({ id: 'trader', label: 'Traders', group: 'trader', title: 'Import consignments / declarants', shape: 'icon', icon: fa('\uf508', '#059669', 36), font: { size: 11, face: 'Inter', vadjust: 4 } });
  nodes.push({ id: 'port', label: portName, group: 'port', title: 'Port of entry', shape: 'icon', icon: fa('\uf21a', '#0284c7', 34), font: { size: 11, face: 'Inter', vadjust: 4 } });

  stages.forEach((s, i) => {
    const h = hours[i];
    const anomaly = isAnomalyStage(s.id, h);
    nodes.push({
      id: s.id,
      label: s.short + '\n' + h + 'h',
      group: anomaly ? 'anomaly' : 'stage',
      title: s.name + ' · ' + h + ' hrs (' + (total ? Math.round(h/total*100) : 0) + '%)',
      shape: 'icon',
      icon: fa('\uf0ae', anomaly ? '#e11d48' : s.color, 28),
      font: { size: 10, face: 'Inter', vadjust: 4 }
    });
    edges.push({ from: i === 0 ? 'port' : stages[i-1].id, to: s.id, label: h + 'h', arrows: 'to', color: { color: anomaly ? '#fb7185' : '#94a3b8' }, width: Math.max(1, Math.min(6, h / 10)) });
    networkEdgesCache.push({ from: i === 0 ? 'port' : stages[i-1].id, to: s.id, hours: h });
  });

  agencies.forEach((a, idx) => {
    const id = 'ag-' + (a.id || idx);
    nodes.push({ id: id, label: a.name || a.id || ('Agency ' + idx), group: 'agency', title: (a.name || '') + ' · contribution',
      shape: 'icon', icon: fa('\uf0c0', '#7c3aed', 26), font: { size: 10, face: 'Inter', vadjust: 4 } });
    const stageId = a.stage || stages[Math.min(idx, stages.length-1)].id;
    edges.push({ from: id, to: stageId, dashes: true, color: { color: '#c4b5fd' }, width: 1 });
  });

  const container = document.getElementById('networkGraph');
  if (!container) return;
  if (networkInstance) networkInstance.destroy();
  const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
  const options = {
    nodes: { borderWidth: 0 },
    edges: { smooth: { type: 'cubicBezier' }, font: { size: 9, color: '#64748b' } },
    physics: { enabled: true, barnesHut: { gravitationalConstant: -8000, springLength: 120 } },
    interaction: { hover: true, tooltipDelay: 80 }
  };
  networkInstance = new vis.Network(container, data, options);
}
