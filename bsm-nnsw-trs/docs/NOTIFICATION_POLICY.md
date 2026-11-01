# Notification Policy (Illustrative)

## Scope
Email-first assurance alerts for Benefits interventions. Demo mode only; no live SMTP.

## Principles
1. **AEO-scoped**: parties only receive events that affect their facilitation rights.
2. **Least privilege**: contact directory roles drive recipient lists.
3. **Auditability**: every preview logs intended recipients (demo).
4. **No licence gating**: all modules active in v0.10.0.

## Events
- assigned / status_change
- deadline_approaching / overdue
- verified / benefit_measured

## Channels
Primary: email. Future: push / SMS (backlog).

See `data/notification-rules.json` and `docs/OPA_NOTIFICATION_ROUTING.md`.
