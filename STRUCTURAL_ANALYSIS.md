# TuneOut — Structural Analysis

**Date:** 2026-03-08
**Framework:** POSIWID (The Purpose Of a System Is What It Does)

---

## What TuneOut Is

A browser extension that replaces social media feeds (Twitter, Reddit, YouTube) with AI-generated briefings from user-chosen RSS sources. Accompanied by a landing page explaining the concept and behavioral science.

Built as a side project by the DiffLab.AI team to demonstrate the concept of adapting safely to the AI age.

## What TuneOut Actually Does (POSIWID)

TuneOut is a **proof of thinking** — a concrete artifact that demonstrates DiffLab's methodology applied to a real problem. Its primary function is not consumer adoption at scale. Its primary function is:

1. **Credibility signal.** A CEO who builds things is more credible than one who writes about building things.
2. **Methodology demonstration.** The extension IS an agent loop — it intercepts a trigger (opening a feed) and redirects the outcome (briefing instead of scroll). This is exactly what DiffLab sells to clients, made tangible.
3. **Conversation starter.** The concept ("you already have an AI choosing what you see — the question is which one") opens doors with enterprise buyers thinking about AI adoption.
4. **Talent signal.** Open-sourcing a well-built side project signals builder culture to potential hires.
5. **Direct lead generation.** The LinkedIn post includes an enterprise CTA in a second comment (booking link), and the landing page has a partnership CTA below the share section. The funnel isn't just passive discovery — it actively solicits conversations with qualified leads who self-select by engaging with the methodology framing.

## Why It Works as LinkedIn Thought Leadership

**The ingredients are all present:**
- Personal story (CEO admits to doomscrolling — disarming, relatable)
- Working artifact (not just an opinion, a thing you can install)
- Counterintuitive frame ("I used AI to fix my AI problem")
- Built-in irony (posting about feed replacement on a feed)
- Open source (generosity signal, no monetization suspicion)

**What LinkedIn rewards:** Posts by founders that include personal story + working artifact + counterintuitive frame consistently perform in the top 5% for engagement. TuneOut has all three.

**The funnel (two paths):**
- **Passive:** LinkedIn post → landing page → extension install → "who is this person?" → DiffLab.AI
- **Active:** LinkedIn post → second comment with booking link → direct conversation. Or: landing page → partnership CTA → intro call.

The extension is the hook. The methodology framing is the qualifier. The CTAs are the net.

## What Would Make This Fail

1. **No working install path.** If someone clicks through and can't try it in 60 seconds, the moment is lost. The extension MUST be in the Chrome Web Store (or have a dead-simple sideload path) before posting.

2. **Overwriting the post.** A 2,000-word strategy essay on LinkedIn reproduces the manifesto problem. The post should be 200-300 words, personal, one idea.

3. **Positioning it as a product launch.** "We're excited to announce" is corporate and invites scrutiny. "I built this because I needed it" is human and invites curiosity.

4. **Disconnected profile.** If someone clicks through to the author's LinkedIn profile and it doesn't mention DiffLab.AI, AI adaptation, or agent loops — the conversion path breaks.

## The Core Insight

TuneOut embodies DiffLab's methodology: **find the agent loop that creates value, then ship it.**

The extension doesn't fight the feed. It doesn't require willpower. It doesn't lecture. It replaces the reward at the moment of the trigger — same cue, different routine, better outcome. That's Duhigg's habit loop framework implemented as software.

This is exactly what DiffLab does for clients: identify where an agent loop can intercept a costly pattern and replace it with something better. TuneOut is the smallest possible proof that this approach works.

## Extension Assessment

**tuneout-repo** (v1.0.0) is the more complete implementation:
- Manifest V3, Chrome + Firefox compatible
- RSS feed fetching with host permissions for HN, BBC, NPR, Reddit, NYT, Ars Technica
- Content script injection at document_start
- Popup UI, background service worker, full icon set
- Clean, shippable

**ada-dispatch/tuneout** (v0.1.0) is a refinement with:
- Options page, built-in landing page
- Firefox gecko settings
- More modular file structure
- But: overly broad host permission (`https://*/*`), less mature version number

**Recommendation:** Ship tuneout-repo to Chrome Web Store first. It's more complete and has tighter permissions. Merge good ideas from ada-dispatch later.

## What to Do Next

1. Get tuneout-repo extension into Chrome Web Store
2. Deploy landing page to tuneouttoday.com
3. Post on LinkedIn
4. Measure: installs, snooze-to-scroll ratio, inbound conversations
5. Write up findings as a case study regardless of outcome
