# Email Marketing Authentication: SPF, DKIM and DMARC Explained

Authentication is the part of email marketing that nobody wants to own. It sits with IT, or with the agency, or with nobody — and it stays broken until deliverability collapses and someone goes looking for why.

It is worth owning, because it is the cheapest deliverability work available and the only kind that is now mandatory.

### Key takeaways

- SPF, DKIM and DMARC together verify that an email genuinely came from you and was not altered in transit.
- Since February 2024, Google and Yahoo require authentication from bulk senders. This is no longer optional.
- Misconfiguration is common and silent — you find out through falling inbox placement, not an error message.
- Authentication protects the domain itself, not just the campaign.

## What email authentication actually does

Authentication is a set of DNS-published records that let a receiving mail server answer two questions: did this message come from a server authorised by the domain owner, and has the content been modified since it was sent?

If the answers are unsatisfactory, the receiver decides what to do — deliver, filter to spam, or reject. Without authentication you have no say in that decision.

### The three protocols

**SPF (Sender Policy Framework)** publishes which servers may send on behalf of your domain. The receiver checks the sending IP against that list.

**DKIM (DomainKeys Identified Mail)** attaches a cryptographic signature to each message, generated with a private key you hold. The receiver verifies it against a public key published in your DNS. A valid signature proves the message was not altered in transit.

**DMARC (Domain-based Message Authentication, Reporting and Conformance)** ties the two together. It tells receivers what to do when SPF and DKIM fail, and — importantly — sends you reports on who is sending mail claiming to be you.

## Why this is now mandatory

In February 2024, Google and Yahoo introduced requirements for bulk senders: SPF and DKIM on all mail, a DMARC record on the sending domain, one-click unsubscribe, and spam complaint rates kept below a set threshold.

This changed authentication from good hygiene to a condition of delivery to two of the largest inbox providers. Any guidance that treats it as an optional improvement predates that change.

## SPF: authorising your senders

SPF is a TXT record in your domain's DNS listing the IPs and services permitted to send as you.

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

The `~all` at the end is a soft fail — mail from unlisted sources is marked suspicious rather than rejected outright. `-all` is a hard fail and is stricter; move to it only once you are certain every legitimate sender is listed.

**Practical notes:**

- List every service that sends as you — your ESP, your CRM, your invoicing tool, your helpdesk. The one you forget is the one that starts landing in spam.
- SPF has a hard limit of ten DNS lookups. Exceeding it causes a permanent failure. Stacking `include:` statements is the usual way organisations breach it without noticing.
- Review the record whenever you change email infrastructure, and test it with an SPF validator afterwards.

## DKIM: proving the content is intact

DKIM signs outgoing mail with a private key. The receiver retrieves the matching public key from your DNS and verifies the signature.

Setting it up:

1. Generate a key pair — most ESPs do this for you and give you the record to publish.
2. Publish the public key as a DKIM record in your DNS, under the selector your provider specifies.
3. Enable signing on the sending platform.
4. Check the reports. DKIM failures are usually a key rotation or a selector mismatch.

Use 2048-bit keys where your DNS provider supports them, and rotate keys periodically.

## DMARC: policy and visibility

DMARC does two things. It sets a policy, and it gives you reporting — which is the part most people underuse.

The three policies:

- **`p=none`** — monitor only. Receivers take no action but send you reports. This is where every deployment should start.
- **`p=quarantine`** — failing mail goes to spam.
- **`p=reject`** — failing mail is refused outright.

The correct sequence is `none` for long enough to read the reports and find every legitimate sender you had forgotten about, then `quarantine`, then `reject`. Going straight to `reject` will block your own mail — typically the transactional mail from a system nobody remembered was sending as your domain.

The reports are the value. They show you exactly who is sending mail as your domain, including anyone spoofing it. Most organisations discover two or three of their own forgotten senders in the first fortnight.

## Best practices

1. **Deploy all three.** They are complementary, not alternatives. SPF alone does not survive forwarding; DKIM alone gives you no policy control.
2. **Start DMARC at `p=none` and read the reports** before tightening.
3. **Audit your sending inventory.** List every system that sends mail as your domain before you touch a policy.
4. **Monitor continuously.** Authentication breaks silently when infrastructure changes.
5. **Watch the SPF lookup limit.** It is the most common cause of a record that validates today and fails next quarter.

Consider BIMI once DMARC is at enforcement — it lets a verified logo display beside your messages in supporting clients, and it requires `p=quarantine` or `p=reject` to qualify. It is the visible payoff for work that is otherwise invisible.

## Broader email security

Authentication protects your domain's outbound reputation. It does not protect the accounts themselves.

- **Strong, unique passwords** on every marketing platform.
- **Two-factor authentication** on the ESP, the domain registrar and the DNS provider. Registrar and DNS access is the highest-value target you have — anyone with it can rewrite your authentication records.
- **Team training** on phishing recognition and handling of subscriber data.
- **Scheduled review** of access, integrations and API keys. Old integrations with live credentials are a standing risk.

## Why it affects results

Authenticated mail is more likely to reach the inbox, and inbox placement is the precondition for every other email metric. A campaign that does not arrive cannot be opened, clicked or converted.

There is a second effect that is easy to miss: authentication protects the domain from being used against you. A spoofed phishing campaign sent in your name damages your sender reputation and your relationship with the recipients — and you will not know it happened until the complaints arrive. DMARC reporting is how you find out early.

## Conclusion

SPF, DKIM and DMARC take an afternoon to deploy and a recurring hour to maintain. Since February 2024 they have been a requirement rather than an improvement. If nobody in your organisation can say with confidence what your DMARC policy is set to, that is the first thing to check.

## FAQ

### What is email authentication?

A set of DNS-published protocols that verify an email came from an authorised sender and was not modified in transit.

### Why does it matter?

It determines inbox placement, protects your domain from being spoofed, and is now required by Google and Yahoo for bulk senders.

### How does SPF work?

It publishes which servers may send on behalf of your domain. Receivers check the sending IP against that list.

### How does DKIM work?

It attaches a cryptographic signature to each message. The receiver verifies it against a public key in your DNS, confirming the content is unaltered.

### How does DMARC work?

It builds on SPF and DKIM, telling receivers how to handle failures and sending you reports on all mail claiming to be from your domain.

### Where should I start?

Publish SPF and DKIM, then add a DMARC record at `p=none`. Read the reports for a few weeks, fix what they surface, then move to `quarantine` and eventually `reject`.

### What is BIMI?

A standard that displays a verified brand logo beside your messages in supporting clients. It requires DMARC at enforcement, so it comes after the work above, not instead of it.
