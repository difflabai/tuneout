# TuneOut Ship Checklist

Everything that needs to happen before the LinkedIn post goes live.

---

## Pre-Launch (Must Do)

- [ ] **Extension in Chrome Web Store** — Submit tuneout-repo extension. Review takes 1-3 business days. Do this first.
  - Requires: developer account ($5 one-time), screenshots, privacy policy, store listing copy
  - Use the "Same Habit. Better Feed." tagline and description from manifest.json
  - Privacy policy: "TuneOut collects no data. No accounts, no tracking, no analytics."
- [ ] **Landing page deployed** — Deploy index.html to tuneouttoday.com (or alternative domain)
  - Domain: tuneouttoday.com (~$8.88/yr per DEPLOY.md)
  - Hosting: Cloudflare Pages (free, simple) — just push the HTML file
  - Verify: page loads, all sections render, feed-swap animation works, mobile responsive
- [x] **Landing page messaging updated** — All sections aligned to "Same Habit. Better Feed." framing.
  - [x] "The Cost" → "The Trade-Off" with softer copy and blue palette
  - [x] "Seven Moves. Full Control." → "Get Started in 30 Seconds" with single install CTA
  - [x] "No Algorithm Will Share This" → "Share It If It's Useful"
  - [x] Footer: "Same habit. Better feed. Free and open source."
  - [x] Attack-card CSS changed from red/danger to blue/safe palette
  - [x] Partnership CTA added below share section
  - [x] manifest.json: added LLM API host_permissions (api.anthropic.com, api.openai.com)
- [ ] **GitHub repo public and clean** — tuneout-repo should have:
  - [ ] Clear README with install instructions
  - [ ] LICENSE file (MIT or Apache 2.0)
  - [ ] No stale issues or WIP branches visible
- [ ] **LinkedIn profile check** — Author's profile should mention DiffLab.AI, AI adaptation, builder background

## Extension Assessment

### tuneout-repo (v1.0.0) — RECOMMENDED for launch
- Manifest V3 (Chrome + Firefox)
- Targets: Twitter/X, Reddit, YouTube
- RSS sources: HN, BBC, NPR, Reddit, NYT, Ars Technica
- Has: popup UI, background worker, content scripts, icon set
- Permissions: scoped and appropriate
- Status: **Ready to submit to Chrome Web Store**

### ada-dispatch/tuneout (v0.1.0) — Future iteration
- Has options page, built-in landing page, Firefox gecko settings
- More modular structure
- Overly broad host permission (https://*/*) needs tightening
- Lower version, less mature
- Status: **Good ideas to merge later, not launch-ready**

## Post-Launch

- [ ] Monitor Chrome Web Store for review approval
- [ ] Post LinkedIn content (see LINKEDIN_POST.md)
- [ ] Put landing page link in first comment, not post body
- [ ] Reply to early comments within first 2 hours (algorithm boost)
- [ ] Track: extension installs, landing page visits, LinkedIn impressions
- [ ] Note any inbound conversations from potential clients/talent

## Success Criteria

This is a thought leadership play, not a product launch. Success means:
- 50+ extension installs in first week
- 3+ inbound conversations that mention TuneOut
- Post gets 5,000+ impressions on LinkedIn
- At least one person reports their snooze-to-scroll ratio

Anything beyond that is bonus.
