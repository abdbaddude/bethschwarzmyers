# OPA-style Notification Routing (Design)

## Intent
Express notification eligibility as policy rather than hard-coded ifs.

## Example rules (illustrative)
- allow email if recipient.role in ["owner", "vendor_ba", "nrs_liaison"]
- allow AEO event only if intervention.aeoScoped == true AND recipient.aeoMember == true
- deny if demoMode.forceVendorCc and recipient is external without consent flag

## Status
Design only in v0.10.0. Runtime uses `notification-rules.json` + contact directory.
