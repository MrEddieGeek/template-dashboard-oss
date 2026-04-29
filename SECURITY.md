# Security policy

## Supported versions

This project is a single deployable application; only the latest commit on `main` is supported. Security fixes ship as new commits, not back-ported releases.

## Reporting a vulnerability

Please **do not** open a public GitHub issue or pull request for security-sensitive findings.

Instead, email **botforex@protonmail.com** with:

- A description of the issue and its impact.
- Reproduction steps or a proof of concept.
- Affected URL(s) / commit SHA.
- Your contact details for follow-up.

You should receive an acknowledgement within 72 hours. We aim to triage and provide a remediation plan within 7 days for confirmed issues.

## Scope

In scope:

- The deployed application at <https://nova.siama.mx>.
- Source code in this repository.
- Auth flow (Supabase email/password integration, session middleware, redirect handling).

Out of scope:

- Third-party services (Supabase, Vercel) — report those upstream.
- Findings that require a compromised user device or non-standard browser configuration.
- Rate-limiting or denial-of-service findings on preview deployments.

## Disclosure

We follow coordinated disclosure. Please give us a reasonable window to remediate before any public write-up. Credit will be given in the changelog if you'd like.
