# TuneOut Hero Section -- UX Brief
**Author:** Pierre Gargouille, UX Designer, DiffLab.AI
**Date:** 2026-03-07

---

## Diagnosis

The current hero operates on a shame-confrontation model:

- Label: "// You Lost Control"
- Headline: "Your Brain Is Not A Firewall"
- Subtext: "You wouldn't let a stranger set your agenda..."
- Visual: Angry emojis and attack vectors flying at a brain
- CTAs: "Take It Back" / "See What You're Losing"
- Color: Red gradient accent on dark cybersecurity backdrop

Every element says: *you are a victim and you don't even know it.*

The people most likely to encounter TuneOut are already deeply engaged with AI tools. They talk to Claude. They build with GPT. They curate their own Twitter lists. They are sophisticated. Telling them they "lost control" triggers identity defense, not curiosity. The page talks past its audience.

The extension landing page (ada-dispatch version) already found a better posture: "Replace Feeds, Not Habits." Clean, neutral, functional. But it swings too far toward utility -- it reads like documentation, not a moment of recognition.

The hero needs to land between these two extremes. Not an accusation. Not a spec sheet. A moment where someone thinks: *huh, that's actually a good idea.*

---

## 1. Copy

### Section Label
**Current:** `// You Lost Control`
**New:** `For the AI-curious`

Why: Identifies the audience without judging them. Creates belonging. Removes the adversarial code-comment framing.

### Headline
**Current:** `Your Brain Is Not A Firewall`
**New:** `Your feed knows you. But it doesn't work for you.`

Why: Acknowledges what the audience already feels -- that algorithmic feeds are impressively personalized. Then names the real tension without shame: knowing you well is not the same as serving you well. This is the "friend who noticed something" tone.

### Subheadline
**Current:** "You wouldn't let a stranger set your agenda every morning. You already let an algorithm do it 50 times a day. It optimizes for engagement, not for you."

**New:** "AI is getting incredibly good at holding your attention. TuneOut puts that same moment -- opening Twitter, Reddit, YouTube -- to work for you instead. Your feeds, your sources, summarized by an LLM. Same habit, better outcome."

Why: Three sentences, three jobs. Sentence one validates their world (AI is impressive, you're right to be engaged). Sentence two names the product mechanic. Sentence three lands the value. No accusation anywhere. The word "instead" does all the reframing work -- it implies redirection, not deprivation.

### CTAs
**Current:** "Take It Back" / "See What You're Losing"
**New:**

- Primary: `Try TuneOut -- It's Free`
- Secondary: `See How It Works`

Why: "Take It Back" frames the user as someone who lost something. "Try TuneOut" frames them as someone gaining something. "It's Free" removes friction hesitation. The secondary CTA points downward to the mechanism, not to a fear section.

---

## 2. Visual Direction

### Kill the attack animation.

The current visual: angry emojis flying at a brain emoji, with a shield that fades in. This is a threat diagram. It tells the user their brain is under siege. It is the visual equivalent of showing someone a photo of their house on fire.

### Replace with: The Feed Swap

A single, calm animation that shows the product's core mechanic:

**Frame 1 (0-2s):** A simplified browser mockup showing a familiar feed layout -- recognizable as a social timeline. Muted, slightly desaturated. Scrolling content blurs gently past.

**Frame 2 (2-4s):** A soft transition (not a harsh cut -- think a gentle page turn or dissolve) replaces the feed with a clean briefing layout. Three to four content cards with visible source labels (e.g., "Ars Technica", "Hacker News", "Nature"). Clear typography. A small "Summarized by Claude" label at the top.

**Frame 3 (4s+):** The briefing sits still. No infinite scroll. No motion. The stillness IS the message. A subtle checkmark or "Done -- 3 min read" indicator appears at the bottom.

This visual does three things at once:
1. Shows what TuneOut actually does (product clarity)
2. Demonstrates the calm it creates (emotional promise)
3. Contrasts the old and new without naming either as "bad" (no shame)

### Implementation note
This can be built with CSS transitions on two layered divs -- no canvas, no JS animation library, no heavy assets. The browser mockup is a rounded rectangle with a simple address bar. The feed items are gray placeholder blocks that transition to styled content cards.

---

## 3. Color and Mood

### Current palette problem
The page uses `--accent-red: #ff4455` as the dominant emotional color. Red gradients, red labels, red card borders. The entire visual system says "danger." Combined with the dark `#0a0a1a` background, it reads as a cybersecurity threat dashboard.

### New direction

**Keep the dark background.** The audience lives in dark mode. Don't fight it. But shift the emotional register from "threat" to "clarity."

| Element | Current | Proposed |
|---------|---------|----------|
| Background | `#0a0a1a` (keep) | `#0c0c1e` (very slightly warmer) |
| Primary accent | `#ff4455` (red/danger) | `#6b8afd` (soft periwinkle blue) |
| Secondary accent | `#4488ff` (electric blue) | `#44dd88` (keep -- this green is good) |
| Hero gradient | Red-to-orange on text | Blue-to-green on text (use existing `--gradient-safe`) |
| Section labels | Red "danger" pills | Blue "info" pills for hero, remove "danger" class |
| Card borders | Red-tinted | Blue or neutral tinted |
| Overall mood | Alarm | Calm confidence |

The green accent (`#44dd88`) should become more prominent. Green = growth, agency, "go." The red should be eliminated from the hero entirely and reserved only for the optional "why this matters" section deeper in the page, if kept at all.

**Typography stays.** Inter + JetBrains Mono is a solid pairing. The weight hierarchy works. No changes needed.

---

## 4. Emotional Arc -- First 5 Seconds

This is the most important section. A landing page hero has roughly 5 seconds to establish whether someone stays or bounces. Here is the arc, beat by beat:

**Second 0-1: Recognition.**
The user sees "For the AI-curious" label and the headline "Your feed knows you." They think: *yes, it does.* This is not an accusation -- it's a shared observation. Their guard stays down.

**Second 1-2: The pivot.**
"...But it doesn't work for you." A small reframe. Not "you're a victim." Just: there's a gap between how well the feed knows you and whether that knowledge serves your interests. This lands as insight, not indictment.

**Second 2-3: The visual registers.**
They see the feed-swap animation. A familiar social timeline dissolving into a clean briefing. The product mechanic is immediately visible without reading the subheadline. Show, don't tell.

**Second 3-4: The subheadline confirms.**
"Same habit, better outcome." Now they have the mental model. They understand what this is. It took four seconds.

**Second 4-5: The CTA is obvious.**
"Try TuneOut -- It's Free" is low-commitment, high-clarity. They either click or scroll down for more. Both are wins.

**What this arc avoids:**
- No fear response (the current hero triggers fight-or-flight with "You Lost Control")
- No identity threat (nobody has to admit they have a problem)
- No cognitive load (the animation shows the product; the copy names the benefit)
- No decision paralysis (one primary CTA, one secondary)

---

## 5. Mobile Considerations

### Current mobile issues
The existing hero stacks into a single column at 768px. The firewall animation goes above the text (`order: -1`). On small screens, the user sees angry emojis flying around before they read a single word. The first impression is confusion, then alarm.

### New mobile approach

**Stack order:** Text first, visual second. On mobile, the headline IS the hook. The animation supports but should not lead.

**Visual sizing:** The browser mockup animation should be 280px wide max on mobile, with generous top and bottom padding. It should feel like a card, not a full-bleed element.

**CTA treatment:** Both buttons stack vertically at 480px breakpoint. Primary button goes full-width. Secondary becomes a text link ("See how it works"), not a button. Reduce visual weight of the secondary action on small screens.

**Touch targets:** Both CTAs must be minimum 48px tall. Current buttons at 14px padding + 1rem font are close but should be verified.

**Headline sizing:** The `clamp(2.2rem, 6vw, 4rem)` range is fine but the new headline is longer. Test at 320px width. If it wraps to more than 3 lines, tighten to `clamp(1.8rem, 5vw, 3.2rem)`.

**Kill particles on mobile.** The floating particle animation adds nothing on small screens and costs battery. Disable below 768px with a media query.

**Viewport height:** Remove `min-height: 100vh` on mobile. Let the hero be as tall as its content. Forcing 100vh on phones with dynamic browser chrome creates scroll jank and wastes space.

---

## 6. What to Measure

Ship this and track three things:

1. **Scroll depth past hero.** Current shame-based hero likely creates two clusters: people who bounce immediately (identity defense) and people who rage-scroll deep (already converted). The new hero should create a smoother, more even scroll distribution.

2. **CTA click rate.** "Try TuneOut -- It's Free" vs. current "Take It Back." Hypothesis: the new CTA converts higher because it promises gain instead of recovery from loss.

3. **Time on page.** Not as a vanity metric -- as a signal. If average time drops but install rate rises, that is a win. It means people understood the product faster and acted. If both drop, the new hero is too soft and needs more tension.

---

## 7. What This Brief Does Not Cover

- The rest of the page below the hero (problem section, science section, solution section). Those need their own pass, but the hero sets the tone. Get the hero right first.
- The extension landing page (ada-dispatch version). That page has the opposite problem -- too clinical, no emotional hook. A future brief should bring these two pages into alignment.
- The actual extension onboarding flow. The landing page is the promise. The extension experience is the proof. Both matter.

---

## Summary

The current hero says: *You have a problem you don't know about.*
The new hero says: *Here's something better than what you're doing now.*

Same product. Same audience. Fundamentally different relationship with the person reading it.

One makes them defensive. The other makes them curious.

Curiosity converts. Shame does not.

-- Pierre
