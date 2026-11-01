# Using Open Policy Agent (OPA) for benefit-assurance notifications

**Yes — OPA is a good fit** for this activity when you want *who is notified* and *on which event* decided by policy-as-code, not hard-coded `if` trees.

## Fit

| Concern | OPA role |
|---------|----------|
| May we email this contact for this event? | `allow` decision |
| Which channels? | Policy output set |
| Is this intervention AEO-relevant for this trader? | Input attributes + Rego |
| Vendor BA CC on assurance digests? | Explicit rule |

Human policy stays in `NOTIFICATION_POLICY.md`. OPA enforces the machine-checkable subset.

## Demo input (example)

```json
{
  "event": "benefit_shortfall",
  "severity": "high",
  "intervention": {
    "id": "rec-002",
    "port": "lekki",
    "stage": "inspection",
    "aeoRelevant": false,
    "status": "in_progress"
  },
  "contact": {
    "id": "c-vendor-ba",
    "email": "abd_adebiyi@icloud.com",
    "type": "vendor",
    "roles": ["nnsw_assurance"],
    "notifyEmail": true,
    "ports": ["tincan", "lekki", "onne"]
  }
}
```

## Sample Rego (illustrative)

```rego
package trs.notify

import future.keywords.if
import future.keywords.in

default allow := false

# Agency / NNSW / vendor assurance roles on configured events
allow if {
  input.contact.notifyEmail
  some role in input.contact.roles
  role in {"intervention_owner", "agency_focal", "nnsw_assurance", "programme_escalation"}
  input.event in {"assigned", "deadline_t7", "deadline_t1", "status_change", "benefit_shortfall", "overdue", "verified"}
}

# AEO only when intervention is marked AEO-relevant and event is allowed
allow if {
  input.contact.notifyEmail
  "aeo_representative" in input.contact.roles
  input.intervention.aeoRelevant
  input.event in {"status_change", "benefit_shortfall", "verified"}
}

channels[c] if {
  allow
  c := "email"
  input.contact.notifyEmail
}

channels[c] if {
  allow
  c := "sms"
  input.severity == "high"
  input.contact.notifySms
}
```

## Prototype today

The SPA uses JSON rules (`notification-rules.json`) for the same decisions. Migrating those rules into OPA/Rego is backlog **N2** when a policy service is available. Until then, behaviour matches the policy document; emails are demo-formatted only (no live SMTP).

## Demo recipient

Vendor BA (supporting): **abd_adebiyi@icloud.com** — routed via assurance/escalation roles and optional `forceVendorCc`.
