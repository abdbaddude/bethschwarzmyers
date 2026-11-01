function renderObservatory() {
  const q = getQ(currentPort, currentQuarter);
  const baseline = resolveBaseline(q);
  const priorTotal = baseline ? baseline.totalHours : q.priorTotalHours;
  const obs = (META && META.observatory) || {};
  document.getElementById('obsTitle').textContent = obs.title || 'Nigeria Trade Release Executive';
  document.getElementById('obsSubtitle').textContent = obs.subtitle || 'TRS Study Workspace · Executive Overview';
  document.getElementById('obsStudy').textContent = (PORT_DATA[currentPort].portName || currentPort) + ' — Imports';
  document.getElementById('obsPeriod').textContent = currentQuarter;
  document.getElementById('obsMedian').textContent = q.totalHours + ' hrs';
  document.getElementById('obsMedianDelta').innerHTML = deltaHtml(q.totalHours, priorTotal, ' hrs');
  document.getElementById('obsP95').textContent = (q.p95Hours != null ? q.p95Hours : Math.round(q.totalHours * 2)) + ' hrs';
  document.getElementById('obsSample').textContent = (q.validatedSample != null ? q.validatedSample : q.sampleSize).toLocaleString();
  document.getElementById('obsCompleteness').textContent = (q.timestampCompleteness != null ? q.timestampCompleteness : 92) + '%';
  if (q.methodologyNote) document.getElementById('obsMethodNote').textContent = q.methodologyNote;

  const stages = META.stages;
  const medians = q.stageMedians || q.stageHours;
  const vals = stages.map(s => medians[s.id] || 0);
  const labels = stages.map(s => s.short);
  if (obsStageChart) obsStageChart.destroy();
  obsStageChart = new Chart(document.getElementById('obsStageChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: vals,
        backgroundColor: stages.map(s => s.color),
        borderRadius: 6,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: 'end',
          align: 'top',
          font: { size: 10, weight: '600' },
          formatter: v => v + ' hrs',
          color: '#334155'
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}
