# Access request — Zeppstr web platform

**To:** UINITISH (owner, Sanity organisation)
**From:** Vikas Yadav — vikas@zeppstr.com
**Re:** Sanity project `03uhyc94` (zeppstr.com) and related infrastructure
**Date:** 5 August 2026

---

## Accounts to grant

Each platform identifies users differently. Please grant to the exact
identifier listed — not to a name or an inferred account.

| Platform | Grant to | Identifier type |
| --- | --- | --- |
| GitHub | `vikasyadav2504-blip` | username |
| Sanity | `vikas@zeppstr.com` | email (Google sign-in) |
| Vercel | `vikas@zeppstr.com` | email |
| Domain / DNS registrar | `vikas@zeppstr.com` | email |

Sanity and Vercel cannot grant access to a GitHub username; both are
email-based. `vikas@zeppstr.com` is the account already signed in to Sanity and
the one that submitted the pending access request for project `03uhyc94`.

---

## Summary

Zeppstr cannot publish content to zeppstr.com. Seven case studies, four
articles and a set of corrected metrics are written, reviewed and committed to
the repository, and none can go live.

The block is not technical. Every code change deploys fine. The website's text
lives in a Sanity CMS project owned outside Zeppstr, and the Zeppstr account has
no access to it.

Attempting to reach `sanity.io/manage/project/03uhyc94/api` while signed in as
`vikas@zeppstr.com` returns:

> **Request access** — Your account doesn't have access to this project.
> Send a request to the project admin(s).

An access request has been submitted through that screen and is awaiting
approval.

---

## 1. Required — blocking

### 1.1 Sanity project `03uhyc94`

| | |
| --- | --- |
| Project ID | `03uhyc94` |
| Dataset | `production` |
| Organisation | UINITISH |
| Account to grant | `vikas@zeppstr.com` |
| Role required | **Administrator** |

Administrator (not Editor) is required so Zeppstr can manage members and issue
API tokens without a further request each time.

### 1.2 Write API token

If the membership grant will take more than 24 hours, an interim token unblocks
publishing immediately:

- Sanity → project `03uhyc94` → **API** → **Tokens** → **Add API token**
- Label: `zeppstr-seed`
- Permission: **Editor** (write)
- Send via a password manager or an encrypted channel — not plain email or chat

This is a temporary measure. It does not replace the membership grant in 1.1.

### 1.3 Project transfer

Once membership is in place, transfer project `03uhyc94` to a Sanity
organisation controlled by Zeppstr.

Rationale: the CMS holds the company's published marketing content. Ownership
sitting outside the company means Zeppstr's ability to publish, correct or
remove statements about its own clients depends on a third party's availability.
That is a continuity and liability exposure, not a preference.

---

## 2. Also required — please confirm status

These were found unconfigured in `.env.local` during a technical audit. If they
are set in the production environment, please confirm. If they are not, several
site functions are silently failing.

### 2.1 Vercel (hosting)

- Access for `vikas@zeppstr.com` to the Vercel project serving zeppstr.com
- Role: **Member** or above
- Needed to inspect production environment variables and deployment logs

### 2.2 Production environment variables

`.env.local` in the repository is byte-identical to `.env.example` — the
template was never filled in. The following are empty locally. Please confirm
whether they are populated in Vercel:

| Variable | Consequence if unset in production |
| --- | --- |
| `RESEND_API_KEY` | Contact and diagnostic-application forms send nothing. Silent failure — enquiries are lost with no error shown to the user. |
| `BEEHIIV_API_KEY` / `BEEHIIV_PUBLICATION_ID` | Newsletter sign-ups are not recorded |
| `CRM_API_KEY` / `CRM_API_URL` | Leads do not reach the CRM |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No spam protection on any form |
| `SANITY_REVALIDATE_SECRET` | Published CMS changes may not refresh the live site |

**Priority:** `RESEND_API_KEY`. If it is unset in production, every enquiry
submitted through "Apply for a Diagnostic" since launch has been discarded. This
should be verified today, independently of everything else in this document.

### 2.3 Repository

- GitHub access to the `zeppstr-web` repository for **`vikasyadav2504-blip`**
- Role: **Admin** on the repository
- Preferred: transfer the repository to a Zeppstr-owned GitHub organisation,
  with `vikasyadav2504-blip` as an owner

Admin (not Write) is required so Zeppstr can manage collaborators, branch
protection and deploy keys without a further request.

### 2.4 Domain and DNS

- Confirmation of which account holds the `zeppstr.com` registration
- Access, or documented transfer path, for `vikas@zeppstr.com`

---

## 3. What is waiting to publish

Complete, reviewed, and committed to the repository. All of it goes live in a
single command once 1.1 or 1.2 is granted.

**Case studies (7)** — Wise Market · Tru Aquapolis · Homatico · VehicleMall ·
Sky Phonez · Invest in Sharjah · Mini Leaves

**Articles (4)** — across Performance & Paid, Growth Strategy,
Conversion & Experience, and SEO & Search

**Corrections** — Tru Aquapolis headline metric updated from an activity
description ("31-campaign account architecture") to the client outcome
(₹34 Cr+ qualified pipeline on ₹39.7L media)

**Also queued** — 26 further articles held in Google Drive, ready to import

---

## 4. Requested timeline

| Item | Requested by |
| --- | --- |
| 2.2 — confirm `RESEND_API_KEY` in production | Today |
| 1.2 — interim Editor API token | Within 24 hours |
| 1.1 — Administrator membership | Within 3 working days |
| 1.3, 2.1, 2.3, 2.4 — transfers and access | Within 2 weeks |

---

## 5. Contact

Vikas Yadav — vikas@zeppstr.com — +91 72909 27926

Happy to do this over a call if that is faster than working through the list.
