function renderNotificationPreview() {
  const box = document.getElementById('notifPreview');
  const dir = document.getElementById('contactDirectory');
  if (!box) return;
  if (!RECOMMENDATIONS || !NOTIF_RULES || !CONTACTS) {
    box.innerHTML = '<p class="text-slate-500">Contacts / rules not loaded.</p>';
    return;
  }
  initNotificationControls();
  const recId = (document.getElementById('notifRecSelect') || {}).value;
  const evId = (document.getElementById('notifEventSelect') || {}).value;
  const intervention = (RECOMMENDATIONS.items || []).find(function(it) { return it.id === recId; }) || RECOMMENDATIONS.items[0];
  const eventRule = (NOTIF_RULES.events || []).find(function(ev) { return ev.id === evId; }) || NOTIF_RULES.events[0];
  if (document.getElementById('notifRecSelect') && intervention) document.getElementById('notifRecSelect').value = intervention.id;
  if (document.getElementById('notifEventSelect') && eventRule) document.getElementById('notifEventSelect').value = eventRule.id;

  const recipients = resolveRecipients(intervention, eventRule);
  if (!recipients.length) {
    box.innerHTML = '<p class="text-slate-500">No recipients for this intervention / event under current rules (check AEO scope and preferences).</p>';
  } else {
    box.innerHTML = recipients.map(function(c) {
      const ch = channelsForContact(c, eventRule);
      const chLabel = ch.length ? ch.join(', ') : 'none (preferences off)';
      return '<div class="flex flex-wrap items-start justify-between gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-600">' +
        '<div><p class="font-semibold text-slate-800 dark:text-slate-100">' + c.name + '</p>' +
        '<p class="text-slate-500">' + c.organisation + ' · ' + (c.type || '') + '</p>' +
        '<p class="text-slate-600 mt-0.5"><i class="fa-regular fa-envelope mr-1"></i>' + c.email + ' · <i class="fa-solid fa-phone mr-1"></i>' + c.phone + '</p></div>' +
        '<div class="text-right"><span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">' + chLabel + '</span>' +
        '<p class="text-[9px] text-slate-400 mt-1">severity: ' + eventRule.severity + '</p></div></div>';
    }).join('');
  }

  if (dir) {
    const rows = (CONTACTS.contacts || []).map(function(c) {
      return '<tr class="border-t border-slate-100 dark:border-slate-700"><td class="px-2 py-1.5 font-medium text-slate-800 dark:text-slate-200">' + c.name + '</td>' +
        '<td class="px-2 py-1.5">' + c.type + '</td>' +
        '<td class="px-2 py-1.5">' + (c.ports || []).join(', ') + '</td>' +
        '<td class="px-2 py-1.5">' + c.email + '</td>' +
        '<td class="px-2 py-1.5">' + c.phone + '</td>' +
        '<td class="px-2 py-1.5">' + [c.notifyEmail && 'E', c.notifyPush && 'P', c.notifySms && 'S'].filter(Boolean).join(' ') + '</td></tr>';
    }).join('');
    dir.innerHTML = '<table class="w-full text-left"><thead class="bg-slate-50 dark:bg-slate-900 text-slate-500"><tr>' +
      '<th class="px-2 py-1">Contact</th><th class="px-2 py-1">Type</th><th class="px-2 py-1">Ports</th><th class="px-2 py-1">Email</th><th class="px-2 py-1">Phone</th><th class="px-2 py-1">Pref</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  renderSampleEmail(intervention, eventRule, recipients);
}

function benefitsTrackerLink() {
  const rules = NOTIF_RULES || {};
  return (rules.demoMode && rules.demoMode.benefitsLink) || 'https://bsm-nnsw-trs.netlify.app/#recommendations';
}
