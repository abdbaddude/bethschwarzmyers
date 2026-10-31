# TODO — Nigeria NSW TRS Intelligence & Trade Assurance Platform

**Derived from:** `docs/STRATEGIC_CONTEXT.md`  
**Version:** 1.0 · October 2026  
**Rule:** Items map to strategic context sections. Status: ⬜ not started · 🟡 in progress · ✅ done

---

## P0 — Critical path

- [ ] **D1. Recommendation & benefits tracker** *(Workstream D gap)*
  Build a tab/module where each recommended intervention (joint inspection scheduling, scanning expansion, AEO scale-up, etc.) has: owner, deadline, expected dwell-time reduction, measured before/after delta, and assurance status. This closes the "measurement without consequence" risk called out in §7.

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

## P2 — Enhancement

- [ ] **B2. Anomaly → corrective-action auto-link**
  When the Network tab flags an anomalous stage, one-click create a corrective-action item pre-populated with the stage, port, quarter, and suggested owner.

- [ ] **A3. Multi-trade-lane expansion**
  Extend beyond imports to exports and free-zone permits (NNSW Phase 2 scope, Nov 2026).

- [ ] **C3. Predictive dwell-time alerts**
  ML model on shipment-level features (cargo type, agency mix, port, quarter) to flag consignments likely to exceed the 95th-percentile threshold before gate-out.

- [ ] **UX1. Mobile-optimised Observatory**
  The Observatory tab is portrait-first; ensure the full SPA (all tabs) renders cleanly on tablets for port/agency field teams.

## Documentation

- [x] **DOC1. Strategic context document** — `docs/STRATEGIC_CONTEXT.md` (this branch)
- [x] **DOC2. About tab** in SPA highlighting strategic rationale
- [ ] **DOC3. One-pager for NNSW/NRS/Customs stakeholders** summarising the 90-day pilot proposal
- [ ] **DOC4. Data dictionary** for the nine-stage event model and JSON schemas

---

*Update this file as items complete. Link each ✅ item to the commit or PR that closed it.*
