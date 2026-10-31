# Memorandum of Understanding
## Data Sharing for Nigeria NSW Time Release Study (TRS) Intelligence & Trade Assurance

**Document type:** Template (to be completed per counterparty)  
**Version:** 1.0 · October 2026  
**Related:** `docs/A1_DATA_ARCHITECTURE.md` · `docs/STRATEGIC_CONTEXT.md` · TODO A1  
**Status:** Draft for negotiation — not a signed instrument until executed by authorised representatives

---

## How to use this template

| Element | Guidance |
|---------|----------|
| **Body clauses** | Keep stable across counterparties (purpose, principles, security, liability, term). |
| **Schedule A–F** | Complete **per agency / operator**. This is where current and future requirements differ without rewriting the MoU. |
| **“Participating Agency”** | Any public body, terminal, shipping line, payment provider, or OGA that supplies or receives TRS-relevant data. |
| **“Platform Operator”** | Entity operating the TRS Intelligence & Trade Assurance platform (e.g. NNSW Secretariat or designated technical partner). |
| **New agencies** | Execute a short accession letter + new Schedules A–F; body MoU stays the same. |
| **Legacy / existing feeds** | Document current practice in Schedule A (as-is) and the target feed in Schedule B (to-be); gap closes under the Integration Plan. |

Replace text in `[square brackets]`. Delete inapplicable options. Annex schedules may be updated by written agreement of the technical contacts without re-signing the whole MoU, unless Schedule F says otherwise.

---

## MEMORANDUM OF UNDERSTANDING

**This Memorandum of Understanding (MoU)** is made on **[Date]** between:

1. **[Full legal name of Platform Operator]** of **[address]** (the **“Platform Operator”**); and  
2. **[Full legal name of Participating Agency / Operator]** of **[address]** (the **“Participating Agency”**),

each a **“Party”** and together the **“Parties”**.

### 1. Purpose

1.1 The Parties enter this MoU to enable **lawful, proportionate, and auditable sharing of operational data** needed to measure, attribute, and improve the time taken to release cargo in Nigeria, consistent with:

- WCO Time Release Study methodology (including Version 4, 2025);
- WTO Trade Facilitation Agreement Article 7.6;
- Nigeria National Single Window (NNSW) and related digital trade architecture; and
- the programme objectives in the TRS Intelligence & Trade Assurance strategic context (continuous measurement, bottleneck attribution, and independent evidence of improvement).

1.2 This MoU is **not** a commercial contract for paid services, **not** a transfer of ownership of source systems, and **not** authority to publish personal data beyond the agreed Purpose. It sets out mutual understanding for cooperation; legally binding obligations are limited to those the Parties expressly state as binding in clause 12 and in any separate data-processing or access agreement they execute.

1.3 The **Purpose** is limited to:

- computing stage-level and end-to-end release-time metrics (including medians and tail measures);
- attributing delays to processes, agencies, terminals, or documentation steps;
- supporting agency scorecards, anomaly detection, and corrective-action tracking;
- producing assurance evidence that claimed facilitation improvements are grounded in shipment-level events; and
- fulfilling any additional purposes listed in **Schedule A** (must remain consistent with 1.1–1.3).

### 2. Definitions

| Term | Meaning |
|------|---------|
| **Data** | Event records, timestamps, status codes, and identifiers described in Schedule B, whether personal or non-personal. |
| **Personal Data** | Data relating to an identified or identifiable natural person under applicable Nigerian data-protection law. |
| **TRS Stages** | The agreed process stages used by the Platform (default: Arrival, Permits, Customs, Inspection, Gate-out), as updated in Schedule B. |
| **Feed** | The technical channel (API, file, message, or other) by which Data is provided. |
| **Curated Store** | The Platform Operator’s controlled repository of mapped events and derived metrics. |
| **Authorised Users** | Individuals or systems named or role-listed in Schedule D. |

### 3. Scope of cooperation

3.1 The Participating Agency will provide Data reasonably required for the Purpose, as specified in **Schedule B** (datasets, fields, frequency, format, historic backfill).

3.2 The Platform Operator will:

- ingest, map, and quality-check Data into the Curated Store;
- derive TRS metrics without altering source systems of record;
- restrict use to the Purpose;
- provide agreed feedback (e.g. completeness scores, anomaly samples) as in Schedule C; and
- maintain audit lineage (`source_system`, `event_id`, receipt time) for assurance.

3.3 **No obligation to share Data that would** (a) breach law or a superior court order; (b) compromise active enforcement investigations where disclosure is restricted; or (c) expose security credentials. The Participating Agency will notify the Platform Operator of any lawful restriction that affects a Feed.

3.4 **Future agencies and evolving requirements.** The Parties intend this framework to remain usable as new OGAs, terminals, carriers, or payment providers join the ecosystem. New counterparties may accede via the form in **Schedule E**. Changes to fields or frequency for this Participating Agency are handled under Schedule B amendment (clause 10).

### 4. Roles and responsibilities

| Party | Responsibilities |
|-------|------------------|
| **Participating Agency** | Nominate technical and governance contacts (Schedule D); supply Data to agreed quality; control access on its side; inform of schema or process changes that affect timestamps or identifiers; handle data-subject requests that relate to its source systems. |
| **Platform Operator** | Secure the Curated Store and Feeds under its control; enforce least-privilege access; publish integration and DQ documentation; not re-identify individuals beyond the Purpose; support assurance reviews agreed in Schedule C. |
| **Joint** | Review metrics that implicate the Participating Agency before external publication, where Schedule C requires a review window; cooperate on incident response (clause 8). |

### 5. Lawful basis, confidentiality, and personal data

5.1 Each Party is responsible for ensuring it has a **lawful basis** to disclose or process Data under applicable law (including the Nigeria Data Protection Act and sector rules).

5.2 Where Data includes Personal Data, the Parties will:

- minimise fields to those necessary for the Purpose;
- document roles (controller / processor / joint) in **Schedule F** or a separate processing agreement;
- apply appropriate technical and organisational measures; and
- not use Personal Data for marketing, employee surveillance, or purposes outside this MoU.

5.3 Non-public Data is **Confidential Information**. A Party may disclose Confidential Information only: (a) to Authorised Users bound by confidentiality; (b) where required by law (with notice if legally permitted); or (c) with prior written consent.

5.4 Aggregated or anonymised statistics that cannot reasonably re-identify a person or commercially sensitive single-trader position may be published in TRS reports and dashboards, subject to Schedule C publication rules.

### 6. Security and access

6.1 Feeds will use authentication and transport controls described in **Schedule B** (e.g. mTLS, OAuth2, API keys, IP allowlists, signed URLs, SFTP with key auth).

6.2 The Platform Operator will implement access control, encryption in transit (and at rest for the Curated Store), logging, and periodic access review for Authorised Users.

6.3 Credentials are Party-specific, non-transferable, and must be rotated on compromise or on the schedule in Schedule B.

6.4 Neither Party will probe, overload, or bypass the other’s security controls except as part of an agreed security test.

### 7. Data quality, retention, and return

7.1 The Participating Agency will use reasonable efforts to supply accurate, timely timestamps and stable identifiers (e.g. BL, container, declaration ID) as listed in Schedule B.

7.2 The Platform Operator will measure completeness and timeliness and share DQ summaries under Schedule C. Poor DQ may limit inclusion in published medians without penalising the Agency in external scorecards until remediated—unless Schedule C states otherwise.

7.3 **Retention.** Default retention for raw Feed copies and curated events is **[e.g. 36 months]** unless Schedule B specifies a shorter or longer period required by law or audit. Derived public aggregates may be retained longer.

7.4 On termination or request, the Platform Operator will delete or return Feed data as set out in Schedule B, except copies required to be kept by law or for ongoing dispute resolution (then held securely and minimised).

### 8. Incidents and breach notification

8.1 A Party discovering unauthorised access, loss, or disclosure of Confidential Information or Personal Data under this MoU will notify the other’s security contact in Schedule D without undue delay and no later than **[e.g. 72 hours]** after becoming aware, and will cooperate on containment and lawful notification to authorities or individuals where required.

### 9. Intellectual property

9.1 Each Party retains IP in its pre-existing systems, schemas, and brands.

9.2 Derived TRS methodologies, dashboard software, and anonymised benchmark products created by the Platform Operator remain the Platform Operator’s (or its licensors’), without restricting the Participating Agency’s use of its own Data in its own systems.

### 10. Change management

10.1 **Operational changes** (new fields, frequency, endpoints) may be agreed in writing by technical contacts and attached as a revised Schedule B.

10.2 **Material changes** to Purpose, publication of agency-identifiable performance externally, or liability allocation require written amendment of this MoU signed by authorised representatives.

10.3 The Platform Operator will give reasonable notice of schema changes to the published TRS stage model that affect mapping of the Participating Agency’s events.

### 11. Term, suspension, and termination

11.1 This MoU starts on the date of last signature and continues for **[e.g. 24 months]**, renewing automatically for successive **[12-month]** periods unless either Party gives **[60]** days’ written notice before renewal.

11.2 Either Party may suspend a Feed immediately if continued sharing would breach law or pose a serious security risk, with prompt written reasons and cooperation to restore sharing when safe.

11.3 Either Party may terminate: (a) for convenience on **[90]** days’ notice; (b) for material breach not remedied within **[30]** days of notice; or (c) if a regulator lawfully directs cessation.

11.4 Clauses on confidentiality, personal data, IP, liability, and residual retention survive termination.

### 12. Status of this MoU and liability

12.1 Except for clauses **5** (confidentiality and personal data), **6** (security), **8** (incidents), **9** (IP), and **12** (this clause), this MoU is a statement of mutual intent and is **not** intended to create enforceable obligations. The Parties may supersede this with a binding data-sharing or processing agreement.

12.2 **Optional binding mode:** If the Parties initial here `[  ]`, the entire MoU is binding under the laws of the Federal Republic of Nigeria, and disputes will first be escalated under Schedule D, then to **[mediation / arbitration / courts]** in **[venue]**.

12.3 Neither Party excludes liability for fraud, death or personal injury caused by negligence, or other liability that cannot be limited by law. Subject to that, neither Party is liable to the other for indirect or consequential loss arising from this MoU, and aggregate liability in any **[12-month]** period is limited to **[amount / Naira or “fees paid under related agreements” / “nil if non-binding mode”]**.

### 13. General

13.1 Nothing in this MoU creates a partnership, joint venture, or employment relationship.

13.2 Notices must be in writing to the contacts in Schedule D (email acceptable for operational notices; formal notices as specified there).

13.3 If any provision is invalid, the remainder continues in effect.

13.4 This MoU may be signed in counterparts (including electronic signature where permitted).

---

## Signature block

**For the Platform Operator**

| | |
|--|--|
| Name |  |
| Title |  |
| Signature |  |
| Date |  |

**For the Participating Agency**

| | |
|--|--|
| Name |  |
| Title |  |
| Signature |  |
| Date |  |

---

## Schedule A — Counterparty profile & Purpose addenda

| Item | Entry |
|------|--------|
| Legal name |  |
| Type | ☐ NNSW entity ☐ Customs / NCS ☐ OGA ☐ Terminal operator ☐ Shipping line / agent ☐ Payment provider ☐ Other: ___ |
| Ports / domains covered | e.g. Tin Can, Lekki, Onne, national |
| Primary TRS stages contributed | ☐ Arrival ☐ Permits ☐ Customs ☐ Inspection ☐ Gate-out |
| Existing (legacy) data channel | e.g. manual extract / none / legacy API |
| Target channel under this MoU | e.g. REST API / SFTP / message bus |
| Additional permitted purposes (must fit clause 1) |  |
| Explicitly excluded uses |  |

---

## Schedule B — Data specification (the flexible core)

### B.1 Datasets

| Dataset name | Description | Grain | Historic backfill |
|--------------|-------------|-------|-------------------|
| e.g. Declaration events | Status transitions | Declaration ID + timestamp | e.g. 8 quarters |
| e.g. Gate movements | Gate-in / gate-out | Container + timestamp |  |

### B.2 Fields (minimise Personal Data)

| Field | Required? | Personal Data? | Notes |
|-------|-----------|----------------|-------|
| Bill of lading / waybill | Y | N (usually) | Join key |
| Container number | Y/N | N |  |
| Declaration / SAD ID | Y/N | N |  |
| Event type / status code | Y | N | Map to TRS stage |
| Event timestamp (UTC or stated TZ) | Y | N |  |
| Location / terminal code | Y/N | N |  |
| Agency / unit code | Y/N | N | Attribution |
| Trader identifiers | N default | **Often Y** | Prefer hashed or omit unless Schedule F allows |

### B.3 Feed mechanics

| Item | Entry |
|------|--------|
| Protocol | ☐ HTTPS API ☐ SFTP ☐ Secure email batch ☐ Message queue ☐ Other |
| Frequency | ☐ Real-time ☐ Hourly ☐ Daily ☐ Weekly ☐ Ad hoc |
| Auth method |  |
| Endpoint / path |  |
| Schema / sample | Link or attach |
| Volume estimate |  |
| Change-notification lead time | e.g. 10 business days |

### B.4 Retention & deletion overrides

| Item | Entry |
|------|--------|
| Retention (if not default clause 7.3) |  |
| Deletion / return process |  |

---

## Schedule C — Service levels, DQ, and publication

| Item | Entry |
|------|--------|
| Availability target for Feed (Agency side) | e.g. 99% of scheduled windows |
| DQ metrics shared with Agency | Completeness %, late events %, null timestamps |
| Review window before publishing Agency-named metrics | e.g. 5 business days / none for aggregates only |
| Public dashboard may name this Agency? | ☐ Yes ☐ No ☐ Aggregates only |
| Assurance / audit support | e.g. annual sample of event lineage |

---

## Schedule D — Contacts and Authorised Users

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Governance (Agency) |  |  |  |
| Technical (Agency) |  |  |  |
| Security / incident (Agency) |  |  |  |
| Governance (Platform) |  |  |  |
| Technical (Platform) |  |  |  |
| Security / incident (Platform) |  |  |  |

**Authorised User roles (Platform side):** e.g. platform admin, DQ analyst, assurance reviewer — list or attach IAM policy reference.

---

## Schedule E — Accession of additional agencies (future-proofing)

New Participating Agencies may join the same programme framework by signing an **Accession Letter** substantially as follows, attaching their own Schedules A–D and F:

> We, **[Legal name]**, agree to the terms of the MoU titled *Data Sharing for Nigeria NSW TRS Intelligence & Trade Assurance* version **[X]**, between the Platform Operator and existing participants, as if we were named as a Participating Agency, with the specific details in the attached Schedules. Effective date: **[date]**.

The Platform Operator countersigns and keeps a register of participants. **No need to re-open bilateral MoUs with every existing agency** unless a Party’s policy requires it.

---

## Schedule F — Personal data & regulatory addendum (optional / as required)

Complete when Personal Data is in scope or when the Agency requires a binding processing schedule.

| Item | Entry |
|------|--------|
| NDPA / sector roles | Controller / Processor / Joint (describe) |
| Categories of data subjects | e.g. declarants, drivers (prefer exclusion) |
| Categories of Personal Data |  |
| Processing activities | Mapping, metric derivation, access logs |
| Sub-processors (Platform) | List or link |
| Cross-border transfers | ☐ None ☐ Safeguards: ___ |
| Data-subject request routing | Agency owns source; Platform assists within **[N]** days |
| Agency-specific clauses | Attach if statutory form required |

---

## Document control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | Oct 2026 | Initial template for A1 multi-agency feeds |

*This template is for programme use and legal review. Adapt to institutional counsel requirements before signature.*
