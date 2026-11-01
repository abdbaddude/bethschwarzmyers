# TODO / Backlog (v0.10.0)

## Done in this branch
- Full modular SPA (Observatory, Executive, Network, Trends, Shipments, Agencies, Anomalies, Benefits, Alerts, About)
- Themes, contacts directory, notification rules & preview
- Docs: A1 architecture, MoU template, policy, OPA design, email templates, strategic context
- No licence gating; all modules active
- No r*/p* packaging payloads

## Open
- [ ] Licence / subscription enforcement (explicitly deferred)
- [ ] Live SMTP / push / SMS providers (N1)
- [ ] OPA runtime evaluation of notification rules
- [ ] Live NRS / NNSW data feeds under MoU
- [ ] Full Netlify production cut-over once index + all js modules confirmed
- [ ] Automated visual regression / smoke tests

## Notes
Keep function-boundary splits in js/00–12.js so files stay under API size limits.
