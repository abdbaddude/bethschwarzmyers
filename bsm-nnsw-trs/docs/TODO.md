# TODO — Nigeria NSW TRS Intelligence & Trade Assurance Platform

**Derived from:** `docs/STRATEGIC_CONTEXT.md`  
**Version:** 1.1 · October 2026  
**Rule:** Items map to strategic context sections. Status: ⬜ not started · 🟡 in progress · ✅ done

---

## P0 — Critical path

- [x] **D1. Recommendation & benefits tracker** *(Workstream D gap)*
  Build a tab/module where each recommended intervention (joint inspection scheduling, scanning expansion, AEO scale-up, etc.) has: owner, deadline, expected dwell-time reduction, measured before/after delta, and assurance status. This closes the "measurement without consequence" risk called out in §7.
  **Done in prototype (v0.8.0):** Benefits tab driven by `data/recommendations.json` + module licence gate in `data/app-config.json`. Illustrative before/after hours; wire to live TRS medians when A1 lands.

- [ ] **B1. Full delay attribution split** *(Workstream B gap)*
  Extend bottleneck attribution beyond stage/agency to the four-way split: NSW platform time vs agency decision time vs terminal/port operations vs trader documentation time. Requires event-level timestamp enrichment from NICIS/NNSW feeds.

- [ ] **A1. Real data integration**
  Replace synthetic JSON (`tincan.json`, `lekki.json`, `onne.json`, `shipments.json`) with authenticated feeds from NNSW, NICIS/Customs, terminal operators, shipping lines, and payment gateways. Define data-sharing MoUs with OGAs.

## P1 — High value

- [ ] **C1. Live / near-real-time monitoring mode**
  Add a "live" toggle that polls for fresh timestamps (daily/weekly cadence) between formal TRS cycles, with early-warning alerts when a stage's median breaches 1.5× its six-quarter trend.

- [ ] **C2. Peer-port benchmark refresh**
  Automate quarterly pulls of Lomé, Tema, Dakar TRS-equivalent medians for the port comparison module.

- [ ] **A2. Timestamp completeness remediation**
  The TRS flagged incomplete timestamps on early journey stages (vessel arrival → examination start) as a key data-quality gap. Work with terminal operators to mandate gate-in/gate-out and berth timestamps in the event model.

- [ ] **D2. Independent assurance cadence**
  Define quarterly external validation (WCO-aligned or third-party) reporting to the NSW Steering Committee and PEBEC. Produce the first assurance statement template.

- [ ] **LIC1. Cryptographic licence key validation**
  Replace the current binary module list in `app-config.json` (`license.modules[]` + 30-day expiry) with a signed key (e.g. JWT or HMAC payload listing modules + expiry). Server- or offline-verifiable. Update licence whenever a new module is added to the product catalogue.

## P2 — Enhancement

- [ ] **B2. Anomaly → corrective-action auto-link**
  When the Network tab flags an anomalous stage, one-click create a corrective-action item pre-populated with the stage, port, quarter, and suggested owner. Target: seed a new row in the Benefits tracker.

- [ ] **A3. Multi-trade-lane expansion**
  Extend beyond imports to exports and free-zone permits (NNSW Phase 2 scope, Nov 2026).

- [ ] **C3. Predictive dwell-time alerts**
  ML model on shipment-level features (cargo type, agency mix, port, quarter) to flag consignments likely to exceed the 95th-percentile threshold before gate-out.

- [ ] **UX1. Mobile-optimised Observatory**
  The Observatory tab is portrait-first; ensure the full SPA (all tabs) renders cleanly on tablets for port/agency field teams.

- [x] **UX2. System / light / dark theme**
  Theme control (system follows OS, light, dark) with persistence. Shipped in prototype v0.8.0.

## Documentation

- [x] **DOC1. Strategic context document** — `docs/STRATEGIC_CONTEXT.md` (this branch)
- [x] **DOC2. About tab** in SPA highlighting strategic rationale
- [ ] **DOC3. One-pager for NNSW/NRS/Customs stakeholders** summarising the 90-day pilot proposal
- [ ] **DOC4. Data dictionary** for the nine-stage event model and JSON schemas

---

*Update this file as items complete. Link each ✅ item to the commit or PR that closed it.*
