# A1 Data Architecture

## Purpose
Define the data contracts and storage layout for NNSW TRS Intelligence (illustrative).

## Core entities
- **Port / quarter metrics** (`data/tincan.json`, `lekki.json`, `onne.json`): stageHours, totalHours, sampleSize, bottlenecks, anomalyCount, priorQuarter.
- **Meta** (`data/meta.json`): stages (id, name, short, color), quarters, northStarHours, stageTargets.
- **Shipments** (`data/shipments.json`): sample shipment timelines for Observatory / Shipments tabs.
- **Recommendations** (`data/recommendations.json`): intervention catalogue for Benefits tracker.
- **Contacts** (`data/contacts.json`): directory for notification routing (email, phone, role, AEO scope).
- **Notification rules** (`data/notification-rules.json`): event → recipient mapping, AEO scoping, demo mode flags.
- **App config** (`data/app-config.json`): active modules, version, feature flags (no licence gating in v0.10.0).

## Stage model (WCO TRS)
1. Arrival / berthing
2. Permits & documentation
3. Customs examination
4. Inspection / scanning
5. Gate-out / release

## Contracts
All JSON is static and versioned with the SPA. No live backend. Demo data is illustrative only.

## Future
- Live NRS / NNSW feeds under MoU (see MOU_DATA_SHARING_TEMPLATE.md).
- OPA-style policy evaluation for notification routing (OPA_NOTIFICATION_ROUTING.md).
