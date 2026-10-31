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

## Demo recipient

Vendor BA (supporting): **abd_adebiyi@icloud.com** — routed via assurance/escalation roles and optional `forceVendorCc`.

## Prototype today

The SPA uses JSON rules (`notification-rules.json`) for the same decisions. Migrating those rules into OPA/Rego is backlog when a policy service is available. Until then, behaviour matches the policy document; emails are demo-formatted only (no live SMTP).
