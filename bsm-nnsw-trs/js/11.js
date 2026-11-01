function renderSampleEmail(intervention, eventRule, recipients) {
  const el = document.getElementById('notifEmailPreview');
  if (!el || !intervention) { if (el) el.textContent = ''; return; }
  const statusLabel = (intervention.status || 'in_progress').replace(/_/g, ' ');
  const measured = (intervention.beforeHours || 0) - (intervention.afterHours || 0);
  const expected = intervention.expectedReductionHours || measured;
  const toEmail = (recipients && recipients[0] && recipients[0].email) || 'assurance@example.gov.ng';
  const toName = (recipients && recipients[0] && recipients[0].name) || 'Colleague';
  const link = (typeof location !== 'undefined' ? location.origin + location.pathname : '') + '#benefits';
  const id = (eventRule && eventRule.id) || 'status_change';
  let subject, body;
  if (id === 'overdue' || id === 'deadline_approaching') {
    subject = (id === 'overdue' ? 'Overdue' : 'Deadline approaching') + ' — ' + intervention.title;
    body = [
      'Hello ' + toName + ',',
      '',
      'Assurance action is ' + (id === 'overdue' ? 'overdue' : 'approaching its deadline') + '.',
      '',
      'Intervention: ' + intervention.title,
      'Owner: ' + intervention.owner,
      'Deadline: ' + intervention.deadline,
      'Status: ' + statusLabel,
      'Before → after: ' + intervention.beforeHours.toFixed(1) + ' h → ' + intervention.afterHours.toFixed(1) + ' h',
      'Measured: -' + measured.toFixed(1) + ' h (expected -' + expected.toFixed(1) + ' h)',
      '',
      'Please review with the owner whether scope, capacity, or measurement window needs adjustment.',
      '',
      'Open Benefits tracker:',
      link,
      '',
      '— NNSW TRS Intelligence (illustrative demo)'
    ].join('\n');
  } else if (id === 'verified') {
    subject = 'Verified — ' + intervention.title;
    body = [
      'Hello ' + toName + ',',
      '',
      'Benefit has been verified.',
      '',
      'Intervention: ' + intervention.title,
      'Status: Verified',
      'Before → after: ' + intervention.beforeHours.toFixed(1) + ' h → ' + intervention.afterHours.toFixed(1) + ' h',
      'Measured: -' + measured.toFixed(1) + ' h (expected -' + expected.toFixed(1) + ' h)',
      '',
      'No action required unless you are closing the assurance note for this cycle.',
      '',
      'Open Benefits tracker:',
      link,
      '',
      '— NNSW TRS Intelligence (illustrative demo)'
    ].join('\n');
  } else {
    subject = 'Status update — ' + intervention.title;
    body = [
      'Hello ' + toName + ',',
      '',
      'Assurance status has changed.',
      '',
      'Intervention: ' + intervention.title,
      'Status: ' + statusLabel,
      'Owner: ' + intervention.owner,
      'Before → after: ' + intervention.beforeHours.toFixed(1) + ' h → ' + intervention.afterHours.toFixed(1) + ' h',
      '',
      'Open Benefits tracker:',
      link,
      '',
      '— NNSW TRS Intelligence (illustrative demo)'
    ].join('\n');
  }
  const ccNote = (typeof NOTIF_RULES !== 'undefined' && NOTIF_RULES.demoMode && NOTIF_RULES.demoMode.forceVendorCc)
    ? ('Cc: ' + toEmail + ' (vendor BA demo)\n') : '';
  const toList = (recipients || []).map(function(r) { return r.email; }).filter(Boolean);
  if (toList.indexOf(toEmail) < 0) toList.push(toEmail);
  el.textContent = 'To: ' + toList.join(', ') + '\n' + ccNote + 'Subject: ' + subject + '\n\n' + body;
}
