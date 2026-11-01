function contactById(id) {
  return (CONTACTS && CONTACTS.contacts || []).find(function(c) { return c.id === id; });
}

function resolveRecipients(intervention, eventRule) {
  if (!intervention || !eventRule || !CONTACTS) return [];
  const byId = {};
  (intervention.contactIds || []).forEach(function(id) {
    const c = contactById(id);
    if (c && c.active) byId[c.id] = c;
  });
  const port = intervention.port;
  const stage = intervention.stage;
  (CONTACTS.contacts || []).forEach(function(c) {
    if (!c.active) return;
    const roles = c.roles || [];
    const roleMatch = (eventRule.recipients || []).some(function(r) { return roles.indexOf(r) >= 0; });
    if (!roleMatch) return;
    const portOk = !c.ports || c.ports.indexOf(port) >= 0 || port === 'all' || (c.ports || []).length === 0;
    const stageOk = !c.stages || !stage || c.stages.indexOf(stage) >= 0;
    if (portOk && stageOk) byId[c.id] = c;
  });
  const includeAeo = eventRule.includeAeo;
  Object.keys(byId).forEach(function(id) {
    const c = byId[id];
    if (c.type === 'aeo' || (c.roles || []).indexOf('aeo_representative') >= 0) {
      const allowed = includeAeo === true || (includeAeo === 'if_aeo_relevant' && intervention.aeoRelevant);
      if (!allowed) delete byId[id];
    }
  });
  if (NOTIF_RULES && NOTIF_RULES.demoMode && NOTIF_RULES.demoMode.forceVendorCc) {
    const v = contactById('c-vendor-ba');
    if (v && v.active) byId[v.id] = v;
  }
  return Object.keys(byId).map(function(k) { return byId[k]; });
}

function channelsForContact(c, eventRule) {
  const out = [];
  (eventRule.channels || []).forEach(function(ch) {
    if (ch === 'email' && c.notifyEmail) out.push('email');
    if (ch === 'push' && c.notifyPush) out.push('push');
    if (ch === 'sms' && c.notifySms) out.push('sms');
  });
  return out;
}

function initNotificationControls() {
  const recSel = document.getElementById('notifRecSelect');
  const evSel = document.getElementById('notifEventSelect');
  if (!recSel || !evSel || !RECOMMENDATIONS || !NOTIF_RULES) return;
  recSel.innerHTML = (RECOMMENDATIONS.items || []).map(function(it) {
    return '<option value="' + it.id + '">' + it.title + '</option>';
  }).join('');
  evSel.innerHTML = (NOTIF_RULES.events || []).map(function(ev) {
    return '<option value="' + ev.id + '">' + ev.label + ' (' + ev.severity + ')</option>';
  }).join('');
}
