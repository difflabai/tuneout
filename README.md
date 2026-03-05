# 🛡️ TuneOut

## Your Brain Is Not A Firewall

Algorithmic feeds are sophisticated prompt injection attacks on your brain. They exploit the same vulnerabilities that make you a good person — empathy, curiosity, outrage at injustice — and use them to hijack your attention for profit.

You wouldn't browse the internet without a firewall. You shouldn't browse content without one either.

**This is not an app.** It's an open-source guide to cognitive security — understanding how algorithmic manipulation works, why empathetic people are the most vulnerable, and what to do about it. It comes with a live website, practical tools, and an AI skill you can use to audit your own digital habits.

### Why this works

Most "digital wellness" advice says "just use your phone less." That's like telling someone to "just stop breathing" in a room full of smoke. The problem isn't you — it's the room. This guide gives you an air filter: LLM-based content curation that replaces algorithmic feeds with information you actually asked for.

The difference between an algorithm and an LLM filter: the algorithm decides what you see based on what keeps you scrolling. The LLM filter shows you what you asked for based on what you said you care about. One serves the platform. The other serves you.

---

## What You're Signing Up For

- [ ] **Understand the threat model.** Learn how algorithms exploit attention, rage, and empathy
- [ ] **Install at least one content blocker.** Remove the attack surface
- [ ] **Replace one algorithmic feed with an LLM filter.** Swap passive consumption for active curation
- [ ] **Share this with someone who needs it.** The people most affected are the least likely to realize it

That's it. You can do all of this in under an hour.

---

## What This System Does

**The Problem:** Algorithms use variable reward loops — the same mechanism as slot machines — to keep you scrolling. They amplify rage because outrage gets clicks. They exploit empathy because emotional content gets shares. The more empathetic you are, the more vulnerable you are.

**The Science:** Studies show algorithmic feeds increase anxiety and depression (Allcott et al.), that rage-bait content gets 67% more engagement (Brady et al.), and that dopamine-driven scroll patterns mirror addictive behavior (Milli et al.).

**The Solution:** Replace algorithmic feeds with LLM filters. Instead of letting a platform decide what you see, tell an AI what you actually want to know about. Raw feed in, clean information out.

---

## Live Site

This guide is hosted at **[difflabai.github.io/tuneout](https://difflabai.github.io/tuneout)** — a single-page interactive site with the full guide, research citations, tool recommendations, and an actionable checklist.

---

## Installation

### Use the Website

Visit [difflabai.github.io/tuneout](https://difflabai.github.io/tuneout) and follow the guide. No sign-up, no tracking, no cookies.

### Use the Claude Skill

1. Go to [claude.ai/customize/skills](https://claude.ai/customize/skills)
2. Upload the skill file from this repo:
   - [`tuneout.skill`](tuneout.skill) — audits your digital habits and builds a personalized attention hygiene plan
3. Start a conversation and say **"Audit my digital attention"** — Claude will walk you through your current feeds, identify the worst offenders, and help you set up filters

### Self-Host

The entire site is a single `index.html` file (63KB, zero dependencies). Drop it on any static host:

```bash
# GitHub Pages (this repo already has it enabled)
# Netlify: drag and drop index.html
# Cloudflare Pages: connect this repo
# Any server: just serve index.html
```

---

## What's Inside

### The Guide Covers

1. **The Threat Model** — How attention extraction, rage amplification, and empathy exploitation actually work
2. **The Science** — Research-backed statistics on algorithmic harm with citations
3. **The Dopamine Loop** — How variable reward mechanisms keep you hooked (same as slot machines)
4. **The Solution** — LLM filters as a replacement for algorithmic feeds, with real prompt examples
5. **The Tools** — OS-specific blocking tools with step-by-step setup instructions
6. **The Checklist** — 7 actionable steps with persistent progress tracking

### Tools Covered

| Platform | Tools |
|----------|-------|
| All Platforms | LeechBlock NG, uBlock Origin, Unhook |
| Linux | `/etc/hosts`, Pi-hole |
| Windows | Cold Turkey Blocker |
| Mac | Screen Time, One Sec |

---

## Common Questions

**"Isn't this just anti-technology?"**
No. This is pro-technology. LLMs are technology. The guide specifically recommends replacing bad technology (algorithmic feeds) with better technology (AI filters). The problem isn't the internet — it's the business model that profits from hijacking your attention.

**"I don't feel manipulated by social media."**
That's exactly how good manipulation works. The research is clear: algorithmic feeds measurably increase anxiety and decrease well-being, even in people who report feeling fine. You don't feel a slow poison either.

**"What if I need social media for work?"**
The guide doesn't say delete everything. It says block the algorithmic feed and replace it with intentional access. You can still use the platforms — just without the slot machine attached.

**"Can I use this with any LLM, not just Claude?"**
Yes. The prompt examples in the guide work with any major LLM. The `.skill` file is Claude-specific, but the concepts are universal.

---

## Files in This Package

| File | What It Is |
|------|-----------|
| `README.md` | This guide (you're reading it) |
| [`index.html`](index.html) | The full interactive site — served by GitHub Pages |
| [`tuneout.skill`](tuneout.skill) | Claude skill for personal digital attention auditing |

---

## Credits

Built by [Mikkel Garcia](https://difflab.ai) at [DiffLab.AI](https://difflab.ai).

If you find this useful, share it with someone who spends more than 2 hours a day on algorithmic feeds. They probably don't realize what it's costing them.
