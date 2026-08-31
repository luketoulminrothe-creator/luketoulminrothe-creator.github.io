---
name: seo-optimization
description: Perform a comprehensive SEO and AI Search Readiness audit on a website URL or local HTML/web project files. Produces two independent scores — Google SEO (0-100) and AI Search Readiness (0-100). Use this skill whenever a user wants to check, audit, analyze, or improve their SEO, search engine rankings, or website discoverability. Trigger on any of these: "audit my site's SEO", "why isn't my site ranking", "check my meta tags", "optimize for Google", "improve my search visibility", "review my Open Graph tags", "check my Core Web Vitals setup", "is my site SEO-friendly", "SEO report", "I'm not showing up in Google", "help me rank better", "check my structured data", "my website isn't getting traffic", or any request to analyze HTML/web files for search optimization. Use this skill even if the user just pastes a URL and mentions SEO, rankings, Google, or traffic in the same message. Also triggers on: "AI search readiness", "AI SEO", "AEO", "GEO", "ChatGPT visibility", "Perplexity ranking", "visible in AI search", "llms.txt", "AI crawlers", "GPTBot", "LLM optimization", "AI citation", "AI discoverability", "optimize for AI", "am I visible in ChatGPT", "Perplexity SEO".
---

# SEO & AI Search Optimization Skill

Perform a thorough, actionable SEO and AI Search Readiness audit, then immediately implement every fix by editing the project files directly. Produces two independent scores: Google SEO (0-100) and AI Search Readiness (0-100).

---

## Step 0: Get the Domain

Before doing anything else, ask the user one question:

> "What domain will this site be deployed to? (e.g. `https://loopiai.com`) — I need this for canonical tags, Open Graph URLs, and the sitemap."

Wait for the answer. Store it as `DOMAIN` (no trailing slash). Use it everywhere a URL is required in Steps 5–7. Do not proceed until you have it.

---

## Step 1: Understand the Input

Determine what's being audited before doing anything else.

**Live URL** — The user provides a URL (starts with `http://` or `https://`):
- Fetch the page with WebFetch
- Also fetch `<base-url>/robots.txt` and `<base-url>/sitemap.xml` (accept 404s gracefully — their absence is itself a finding)
- Also fetch `<base-url>/llms.txt` (accept 404 gracefully — its absence is an AI audit finding for check G2)
- Note any redirect chains if WebFetch follows redirects

**Local project** — The user points to a directory or mentions local files:
- Use Glob to find all `.html` and `.htm` files in the directory
- Also look for `robots.txt`, `sitemap.xml`, `manifest.json`, and `llms.txt` at the project root
- Read them with Read
- For projects with more than 5 HTML files, audit the homepage (index.html or similar) and up to 4 key pages (prioritize pages linked from the nav). Note in the report that a full crawl wasn't performed.

**Ambiguous** — Can't tell if it's a URL or local path:
- Ask the user before proceeding. Don't guess.

---

## Step 2: Load the Checklist

Read `references/checks.md` now. It contains the complete list of checks organized by category (A through K — categories A-F for Google SEO, categories G-K for AI Search Readiness). Work through every applicable check as you analyze the content.

---

## Step 3: Analyze

Work through each category systematically. For each check, record:
- **Result**: pass / fail / warning / N/A
- **Evidence**: the specific value found (or its absence) — e.g., "title tag reads 'Home | Acme' (9 chars, too short)" not just "title tag is short"

Be honest about what you can and can't see from static HTML. You can't measure actual page load time or Core Web Vitals from static analysis — note this when relevant rather than making things up.

**Categories to analyze:**

**A — Technical SEO**: title tag, meta description, H1 tag, heading hierarchy, canonical tag, robots meta tag, HTTPS, image alt text, broken internal links

**B — On-Page SEO**: keyword presence, content length, internal links, external link quality, URL structure, duplicate content signals

**C — Structured Data**: JSON-LD presence, schema type appropriateness, required fields, JSON syntax validity

**D — Social / Open Graph**: og:title/description/image/url/type, og:image quality, Twitter Card tags, favicon

**E — Performance Signals** (static analysis only): render-blocking resources, image CLS signals (missing width/height), lazy loading, resource hints

**F — Crawlability**: robots.txt, sitemap.xml, canonical conflicts, noindex risk

### AI Search Readiness Categories

Analyze these alongside the Google categories above. For each AI check, record the same result/evidence format.

**G — AI Crawler Access**: AI bot permissions in robots.txt (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bytespider, CCBot), llms.txt presence, AI-specific meta tags (noai, noimageai, TDM reservation), content accessibility for AI crawlers, sitemap accessibility for AI

**H — AI Content Readiness**: direct answer format in first 200 words, FAQ structure, entity clarity in first 100 words, data & statistics presence, content freshness signals (dates, `<time>` elements, dateModified), topical depth (word count thresholds)

**I — AI Structured Data**: FAQPage schema, HowTo schema, speakable schema, Organization/Person schema depth (sameAs, knowsAbout), breadcrumb & navigation schema

**J — AI Authority & Trust**: author markup with linked identity, about page & credentials, citation & source links (2+ outbound), contact & legitimacy signals, social proof markup

**K — AI Technical**: clean text extraction (article/main wrappers), semantic HTML landmarks, language declaration, content segmentation (headings every 200-400 words)

---

## Step 4: Score

Read `references/scoring.md` now. Apply the scoring rubric to compute two independent scores:

**Google SEO Score:**
- Category scores (A through F, out of their respective max points)
- Weighted overall score (0–100)
- Priority tier for each failing check: Critical / High / Medium / Low

**AI Search Readiness Score:**
- Category scores (G through K, out of their respective max points)
- Weighted overall score (0–100)
- Priority tier for each failing check: Critical / High / Medium / Low

The two scores are independent. A site can score well on one and poorly on the other.

---

## Step 5: Write the Report

Use exactly this structure:

---

# SEO Audit Report
**Target:** [URL or file path]
**Date:** [today's date]
**Overall Score:** [N/100] — [grade label]

---

## Summary
[2–3 sentences: what was audited, the headline finding, and the single most important thing to fix]

---

## Score Breakdown
| Category | Score | Status |
|---|---|---|
| A. Technical SEO | N/20 | [Excellent / Good / Needs Work / Critical] |
| B. On-Page SEO | N/20 | ... |
| C. Structured Data | N/15 | ... |
| D. Social / Open Graph | N/15 | ... |
| E. Performance Signals | N/15 | ... |
| F. Crawlability | N/15 | ... |
| **Total** | **N/100** | |

---

## Critical Issues
[Issues that block indexing or severely harm ranking. If none, write "None found."]

For each issue:
**[Check name]** — [One-sentence diagnosis based on specific evidence]
- Why it matters: [1 sentence]
- Fix:
```html
[corrected, copy-paste-ready code]
```

---

## Quick Wins
[High-priority issues fixable in under 30 minutes — typically a single tag addition or attribute change. If none, write "None found."]

Same format as Critical Issues.

---

## Recommendations
[Medium and Low priority items, grouped by category. Same format.]

---

## Implementation Roadmap

**Now** (fix today — unblocks indexing or prevents ranking penalties):
- [bullet list]

**Next** (fix this week — meaningful ranking improvements):
- [bullet list]

**Later** (ongoing / nice to have):
- [bullet list]

---

## What's Working Well
[Briefly note checks that passed — helps the user know what not to break]

---

*Note: This is a static analysis. Actual Core Web Vitals measurements (LCP, INP, CLS) require Lighthouse or PageSpeed Insights testing on a live URL.*

---

# AI Search Readiness Audit
**Target:** [URL or file path]
**Date:** [today's date]
**AI Search Readiness Score:** [N/100] — [grade label]

---

## AI Summary
[2–3 sentences: what was audited from an AI search perspective, the headline AI finding, and the single most important thing to fix for AI visibility]

---

## AI Score Breakdown
| Category | Score | Status |
|---|---|---|
| G. AI Crawler Access | N/20 | [Excellent / Good / Needs Work / Critical] |
| H. AI Content Readiness | N/25 | ... |
| I. AI Structured Data | N/20 | ... |
| J. AI Authority & Trust | N/20 | ... |
| K. AI Technical | N/15 | ... |
| **Total** | **N/100** | |

---

## AI Critical Issues
[Issues that prevent AI engines from finding or citing this content. If none, write "None found."]

For each issue:
**[Check name]** — [One-sentence diagnosis based on specific evidence]
- Why it matters: [1 sentence about AI citation impact]
- Fix:
```html
[corrected, copy-paste-ready code]
```

---

## AI Quick Wins
[High-priority AI issues fixable in under 30 minutes. If none, write "None found."]

Same format as AI Critical Issues.

---

## AI Recommendations
[Medium and Low priority AI items, grouped by category. Same format.]

---

## AI Implementation Roadmap

**Now** (fix today — unblocks AI crawling or prevents AI invisibility):
- [bullet list]

**Next** (fix this week — meaningful AI citation improvements):
- [bullet list]

**Later** (ongoing / nice to have):
- [bullet list]

---

## What's Working Well (AI)
[Briefly note AI checks that passed — helps the user know what not to break]

---

*Note: This audit evaluates static signals that influence AI search engine citation. Actual appearance in ChatGPT, Perplexity, Claude, Gemini, or Grok results depends on additional factors including crawl timing, index freshness, and query relevance.*

---

## Tone and Style

Write findings as a knowledgeable colleague, not an automated tool. Use "your title tag" not "the title tag element". Be direct about severity — if something will actively hurt their ranking, say so plainly. If something is minor, say that too.

Every code fix should be complete and copy-paste ready. When showing a fix, show the corrected version. For JSON-LD, show the full block, not a fragment. For multi-line fixes, show enough surrounding context that the user knows exactly where to put it.

If a check genuinely doesn't apply (e.g., no images on the page), note it as N/A with a word of explanation rather than penalizing or inventing issues.

Infer the page's primary target keyword from the content itself. State your inference at the top of the analysis ("I'm treating 'custom wedding cakes NYC' as your target keyword based on the page content — let me know if that's off") before evaluating keyword-related checks.

---

## Step 6: Write the AI Action Plan

After the audit report, output a second document titled **"## AI Action Plan"**. This is a numbered, ordered list of every fix an AI coding agent can execute directly — no ambiguity, no decisions left open. Another AI will read this plan and implement it without asking questions.

### Rules for the Action Plan

**Completeness** — Every failing or warning check from the audit must map to at least one action. Nothing from the report should be omitted here.

**Ordering** — Sort actions by: Critical → High → Medium → Low. Within each tier, sort by: new file creations first, then `<head>` edits, then body edits.

**One action = one atomic change.** Don't bundle unrelated edits into a single step. "Add canonical tag to homepage" and "Add canonical tag to pricing page" are two separate actions.

**Exact file paths** — Every action must name the exact file to edit (relative to the project root, or the full URL if live). No "all pages" shortcuts — list each file individually.

**Exact insertion point** — For `<head>` insertions, always say: "Insert immediately before `</head>`". For body changes, specify the line number or the surrounding HTML context to find the right location.

**Complete code** — Every action includes the full, ready-to-paste code block. No placeholders like `[YOUR URL]` — fill in the actual values from the audit. If a value is genuinely unknown (e.g., the live domain isn't confirmed), use a clearly marked placeholder like `https://YOURDOMAIN.com` and note it once at the top of the plan.

**New files** — For `robots.txt`, `sitemap.xml`, or any new file, include the complete file contents.

**No explanations** — The action plan contains only what to do, not why. The audit report already covers the why. Keep each action to: file path + insertion context + code block.

---

### Action Plan Format

```
## AI Action Plan

> The following actions implement every fix identified in the audit above.
> Complete them in order. Each action is atomic and self-contained.
> [If domain is unknown: Replace `https://YOURDOMAIN.com` with the actual live domain before executing.]

---

### Action 1 — [Short label, e.g. "Add canonical tag to homepage"]
**File:** `path/to/file.html`
**Where:** Insert immediately before `</head>`

\`\`\`html
[complete code to insert]
\`\`\`

---

### Action 2 — [Short label]
**File:** `path/to/other-file.html`
**Where:** [exact context]

\`\`\`html
[complete code]
\`\`\`

---

### Action N — Create robots.txt
**File:** `robots.txt` (create at project root)
**Where:** New file — full contents below

\`\`\`
[complete file contents]
\`\`\`
```

---

### What counts as an actionable fix

Include in the action plan:
- Any tag addition or modification to an HTML file (`<head>` or `<body>`)
- New file creation (`robots.txt`, `sitemap.xml`, etc.)
- Attribute changes to existing elements (e.g. adding `defer`, `width`, `height`, `loading="lazy"`, `rel="noopener noreferrer"`)
- Text content changes (e.g. fixing an H1, expanding a meta description)
- Structural HTML fixes (e.g. merging two `<h1>` tags into one)

Do NOT include in the action plan:
- Image file creation or design work (note it as "requires manual asset creation" and skip)
- Anything requiring a CMS, build tool, or server configuration — note these as out of scope for a static HTML fix
- Core Web Vitals measurements or Search Console tasks — these require a live URL and human action; mention them in a single "Post-launch manual steps" note at the end of the plan

---

## AI Search Readiness Action Plan

> The following actions implement every AI search readiness fix identified in the AI audit above.
> Complete them in order after the Google SEO fixes. Each action is atomic and self-contained.

The AI Action Plan follows the same format and rules as the Google Action Plan above: completeness, ordering (Critical → High → Medium → Low), one atomic action per change, exact file paths, exact insertion points, complete code blocks.

### Additional actionable fixes for AI

Include in the AI action plan:
- New file creation (`llms.txt`)
- robots.txt modifications for AI bot access (adding `User-agent` + `Allow` rules)
- Schema additions/modifications for AI (FAQPage, HowTo, speakable, Organization depth with sameAs/knowsAbout, author with sameAs)
- Semantic HTML additions (`<article>`, `<main>`, `<section>` wrappers)
- Meta tag additions/removals (`noai`, `noimageai`, TDM reservation)
- `<html lang="...">` attribute addition
- `<time>` element additions for freshness signals
- `dateModified` additions to existing JSON-LD schema

Do NOT include in the AI action plan:
- Content rewriting for better extractability (note as "requires manual content review")
- Building new pages from scratch (about pages, author bio pages) — note as manual task
- Writing FAQ content for pages that don't have any — note as manual content creation
- Generating original data or statistics — note as manual task

---

## Step 7: Execute the Action Plan

After writing both Action Plans (Google SEO + AI Search Readiness), immediately execute every action from both plans — in order — using your Edit and Write tools. Execute Google fixes first, then AI fixes. Do not ask for permission; the user has already approved the full run by invoking this skill.

### Execution rules

**New files** — Use Write to create `robots.txt`, `sitemap.xml`, or any other new file at the exact path specified.

**HTML edits** — Use Edit to make each change. Match the `old_string` to a unique snippet of surrounding context so the edit lands in exactly the right place. Never use a generic string like `</head>` as the sole match — always include 1–2 lines of context above it to ensure uniqueness.

**One Edit call per action** — Do not batch multiple actions into a single Edit call. Work through the list one action at a time.

**Verify as you go** — After each Edit, confirm the change was accepted before moving to the next action. If an edit fails (e.g. the old_string wasn't found), re-read the relevant section of the file and retry with the correct surrounding context.

**Image assets** — If an action requires an image file that doesn't exist (e.g. `og-image.jpg`, `favicon.png`), skip that action and log it in the post-execution summary as "requires manual asset creation."

**When all actions are complete**, output a short summary:

```
## Execution Summary

**Google SEO:**
✅ Completed: [N] actions
⚠️  Skipped (manual): [list any skipped actions and why]

**AI Search Readiness:**
✅ Completed: [N] actions
⚠️  Skipped (manual): [list any skipped actions and why]

Post-launch manual steps:
- Submit sitemap.xml to Google Search Console: https://search.google.com/search-console
- Verify canonical tags after DNS propagation
- Test Core Web Vitals with PageSpeed Insights once the site is live
- Create and upload og-image.jpg (1200×630px) for social share previews
- Verify AI bot access by checking robots.txt with a robots.txt tester
- Submit llms.txt and verify AI crawlers can reach it
- Check site appearance in ChatGPT, Perplexity, and Gemini after indexing
- Monitor AI search citations over the following weeks
```
