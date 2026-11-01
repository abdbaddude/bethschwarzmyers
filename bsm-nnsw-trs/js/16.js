      'Deadline: ' + intervention.deadline,
      'Status: ' + statusLabel,
      '',
      'Open Benefits tracker:',
      link,
      '',
      '— NNSW TRS Intelligence (illustrative demo)'
    ].join('\n');
  }
  const ccNote = (NOTIF_RULES.demoMode && NOTIF_RULES.demoMode.forceVendorCc)
    ? ('Cc: ' + toEmail + ' (vendor BA demo)\n') : '';
  const toList = (recipients || []).map(function(r) { return r.email; }).filter(Boolean);
  if (toList.indexOf(toEmail) < 0) toList.push(toEmail);
  el.textContent = 'To: ' + toList.join(', ') + '\n' + ccNote + 'Subject: ' + subject + '\n\n' + body;
}

function showTab(name) {
  const panel = document.getElementById('panel-' + name);
  if (!panel) return;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  panel.classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('tab-active');
    b.classList.add('text-slate-600');
  });
  const btn = document.getElementById('tab-' + name);
  if (btn) {
    btn.classList.add('tab-active');
    btn.classList.remove('text-slate-600');
  }
  if (name === 'network' && networkInstance) { setTimeout(function(){ networkInstance.fit({ animation: true }); }, 80); }
  if (name === 'trends') { renderTrends(); }
  if (name === 'network') { renderNetwork(); }
  if (name === 'recommendations') { renderRecommendations(); }
  if (name === 'notifications') { renderNotificationPreview(); }
}

loadData().catch(err => {
  document.querySelector('main').innerHTML = '<div class="card p-6 text-center text-rose-600"><p class="font-semibold">Failed to load data files</p><p class="text-xs mt-2">' + err.message + '</p><p class="text-xs mt-2 text-slate-500">Serve over HTTP (Netlify). file:// will not work with fetch.</p></div>';
});
