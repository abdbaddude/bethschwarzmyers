# Notification Policy — Benefit Assurance (Workstream D)

**Document type:** Operational policy (illustrative)  
**Version:** 1.0 · October 2026  
**Applies to:** Recommendation & Benefits Tracker (D1) and future assurance modules  
**Related:** `docs/MOU_DATA_SHARING_TEMPLATE.md`, `data/contacts.json`, `data/notification-rules.json`, NDPA

---

## 1. Purpose

Notifications exist so benefit-assurance work has **consequence**: owners, impacted agencies, and in-scope AEO parties learn of material status, deadline, and performance events in time to act. They are not a general broadcast channel.

Purpose limitation: **TRS benefit assurance and corrective action only.**

## 2. Channels (order of rollout)

| Channel | Role | When |
|---------|------|------|
| **Email** | Primary; auditable | All material events (ship first) |
| **Push** | In-app / PWA field awareness | Same events when client supports push |
| **SMS** | High severity only | T−1 deadline, overdue, benefit shortfall |

Default for watchers: **daily digest**. Owners: **immediate** on events that assign or escalate their items.

## 3. Trigger events

Configured in `data/notification-rules.json`:

- Intervention assigned / owner changed  
- Deadline approaching (T−7, T−1)  
- Assurance status changed  
- Measured benefit below expected (or regression after *Implemented*)  
- Overdue with no status change  
- Benefit *Verified* (email; low noise)

No notifications for passive UI actions (filter, search, theme change).

## 4. Recipients and contact directory

Recipients are resolved from **`data/contacts.json`**, not free-text on cards.

| Role | Typical parties |
|------|------------------|
| `intervention_owner` | Named lead for the intervention |
| `agency_focal` | Impacted OGA / NCS / terminal focal points (port + stage scoped) |
| `aeo_representative` | Enrolled AEO trader contacts — **scoped only** |
| `nnsw_assurance` | NNSW assurance desk |
| `programme_escalation` | Escalation on overdue / systemic shortfall |

Each contact record must hold **email** and **phone**, plus channel preferences (`notifyEmail`, `notifySms`, `notifyPush`).

## 5. AEO players’ rights

AEO representatives are notified only when:

1. The intervention’s **port** and **stage** intersect their enrolled scope; and  
2. The event is one of: status change, benefit shortfall, or verified; and  
3. Their channel preferences allow it.

They must be able to understand **how** an assurance outcome affects facilitation treatment that applies to them. They must **not** receive the full cross-agency intervention backlog.

Lawful basis: contractual / legitimate interest in facilitation terms + transparency of measured outcomes; support with clear notice at AEO enrolment.

## 6. Data protection (NDPA)

- Contacts are personal (or official) data — collect the minimum needed for routing.  
- Use only for benefit-assurance notifications and related audit.  
- Honour opt-out / preference flags without blocking statutory agency escalation paths where law requires notice.  
- Retain notification logs for assurance audit (D2); purge or anonymise contacts when roles end.  
- Agency MoUs and AEO terms should reference this purpose (align with data-sharing MoU schedules).

## 7. Licence and product packaging

Notifications are a **licensed capability** (`licenseKey: notifications`) alongside the Benefits module. Demo mode logs intended recipients only until SMTP / push / SMS providers are connected (see backlog **N1**).

## 8. Audit

Every intended or sent notification should record: event id, intervention id, recipient id, channels, timestamp, and delivery result. This log supports independent assurance (D2) and dispute handling.

---

*Illustrative policy for the NNSW TRS Intelligence prototype. Not official government procedure.*
