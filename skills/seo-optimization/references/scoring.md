# SEO Scoring Rubric

This document defines how to compute a numeric score from audit findings and how to classify each failing check into a priority tier.

---

## Category Weights

| Category | Max Points | Rationale |
|---|---|---|
| A. Technical SEO | 20 | Foundation — errors here block indexing entirely |
| B. On-Page SEO | 20 | Core content relevance signals for ranking |
| C. Structured Data | 15 | Enables rich results; indirect trust/relevance signal |
| D. Social / Open Graph | 15 | Click-through and shareability |
| E. Performance Signals | 15 | Core Web Vitals are a confirmed Google ranking factor |
| F. Crawlability | 15 | Googlebot must find and read the page |
| **Total** | **100** | |

---

## How to Compute Category Scores

For each category:
1. Count the total number of checks in that category
2. Remove checks marked N/A from the count
3. Compute: `(passing checks / applicable checks) × max points`
4. Round to the nearest integer

**Partial credit rules:**
- A check with multiple sub-components earns proportional credit. Examples:
  - Title tag (A1): present but wrong length → 50% credit
  - Open Graph (D1): 3 of 5 tags present → 60% credit
  - JSON-LD required fields (C3): present but missing 2 of 5 required fields → 60% credit
- A check that is fully absent earns 0% credit
- A check that passes fully earns 100% credit

**N/A handling:** If all checks in a category are N/A (e.g., a page with no images means alt text N/A), award full points for that category with a note.

---

## Score Adjustments

Apply these after computing the raw total:

**Boosts** (apply the highest single boost that qualifies — do not stack):
- All Critical-tier checks pass: **+5 points**
- All Critical checks pass AND structured data is complete with multiple schema types: **+5 points** (same as above — don't double-add)
- No boost if any Critical check fails

**Penalties** (apply all that apply, these do stack):
- Any `noindex` on a page that should rank: **−10 points**
- `robots.txt` blocking Googlebot from key content: **−10 points**
- Invalid JSON-LD (syntax error makes it useless): **−5 points**
- HTTP (not HTTPS) for a live site: **−5 points**

**Cap**: Final score cannot go above 100 or below 0.

---

## Grade Labels

| Score | Grade | Label |
|---|---|---|
| 90–100 | A | Excellent — production-ready SEO |
| 80–89 | B | Good — minor improvements available |
| 70–79 | C | Needs Work — several important gaps |
| 60–69 | D | Poor — significant issues harming visibility |
| 50–59 | E | Very Poor — major technical or content problems |
| 0–49 | F | Critical — likely not indexing or ranking correctly |

Use the label in the report header: **Overall Score: 73/100 — C (Needs Work)**

---

## Priority Tier Definitions

Assign every failing check one of these tiers:

### Critical
The issue either prevents the page from being indexed or causes an active ranking penalty. Fix immediately — before doing anything else.

Automatic Critical assignments:
- `noindex` meta tag on a page that should rank
- `robots.txt` `Disallow: /` or blocking Googlebot
- Missing title tag (A1)
- Missing H1 (A3)
- Invalid JSON-LD syntax (C4)
- HTTP (not HTTPS) for a live site (A7)
- Canonical pointing to the wrong page (A5, severe variant)

### High
The issue has a meaningful negative impact on ranking or click-through rate. Fix this week.

- Meta description missing or duplicate (A2)
- `og:title`, `og:description`, or `og:image` missing (D1)
- Multiple or keyword-free H1 (A3, moderate variants)
- Images missing alt text (more than 2–3 meaningful images) (A8)
- Missing sitemap.xml (F2)
- Render-blocking scripts in `<head>` (E1)
- Images missing `width`/`height` attributes affecting multiple images (E2)
- Missing structured data on content/product/local pages (C1)
- Duplicate page titles across the site (A1, B6)
- Canonical missing on pages that could be duplicated (A5)
- Primary keyword absent from title, H1, or body (B1)

### Medium
The issue has moderate impact or affects a specific use case. Fix this sprint.

- Heading hierarchy violations (A4)
- Thin content — under 300 words on a page competing for search (B2)
- Zero contextual internal links in body content (B3)
- Missing lazy loading (E3)
- Missing resource hints for Google Fonts or third-party assets (E4)
- Twitter Card tags missing (D3)
- Minor URL structure issues (underscores, deep nesting) (B5)
- Canonical missing on low-risk pages (A5, minor variant)
- Structured data present but wrong schema type (C2)
- robots.txt missing (not blocking, just absent) (F1)

### Low
Minor improvements with small ranking or trust impact. Fix when convenient.

- Missing favicon (D4)
- External links missing `rel="noopener"` on one or two instances (B4)
- Sitemap missing `<lastmod>` or `<priority>` values (F2)
- Schema type valid but a more specific type exists (C2, minor variant)
- `og:type` missing (defaults to `website` — acceptable) (D1)
- 1–2 images missing alt text on an otherwise well-optimized page (A8, minor variant)
- Placeholder or dead internal links (A9)

---

## Quick Win Identification

A **Quick Win** is any High-priority issue that can be fixed in under 30 minutes by a single developer. Apply this label when all three conditions are true:

1. The fix is a single tag addition or attribute change
2. The fix does not require content creation, design work, or architectural changes
3. The fix code example is complete and copy-paste ready

**Examples of Quick Wins:**
- Adding a missing `<meta name="description">` tag
- Adding `alt=""` or a real alt description to images
- Adding `width` and `height` attributes to `<img>` tags
- Adding `defer` to a render-blocking script
- Adding `<link rel="canonical">` with the correct URL
- Adding missing `og:image` or `og:description` tags

**Examples that are NOT Quick Wins (require more work):**
- Writing new body content to fix thin content (B2)
- Redesigning URL structure (B5)
- Creating a sitemap.xml from scratch when no tooling exists
- Rewriting the heading structure across many pages

---

## Score Calculation Example

**Scenario**: Blog post page audit

| Category | Total Checks | N/A | Applicable | Passing | Raw % | Points |
|---|---|---|---|---|---|---|
| A. Technical | 9 | 0 | 9 | 7 | 78% | 16 |
| B. On-Page | 6 | 0 | 6 | 5 | 83% | 17 |
| C. Structured Data | 4 | 0 | 4 | 3 | 75% | 11 |
| D. Social/OG | 4 | 0 | 4 | 2 | 50% | 8 |
| E. Performance | 4 | 0 | 4 | 3 | 75% | 11 |
| F. Crawlability | 4 | 1 | 3 | 3 | 100% | 15 |
| **Subtotal** | | | | | | **78** |

All Critical checks pass → +5 boost. No penalties.
**Final score: 83/100 — B (Good)**

---

## What Not to Score

Do not penalize for:
- Subjective content quality (writing style, word choice, tone)
- Absence of things you can't see from static HTML (CDN usage, actual server response times, real Core Web Vitals measurements)
- Schema types that are technically valid even if a different type might theoretically be marginally better
- Pages intentionally set to `noindex` (login pages, admin panels, staging environments) — mark these as N/A, not fails
- Missing analytics or Search Console setup (you can mention it as a recommendation, but it's not a scoreable SEO check)

---

# AI Search Readiness Scoring

This section defines how to compute the AI Search Readiness score from audit findings in categories G through K.

---

## AI Category Weights

| Category | Max Points | Rationale |
|---|---|---|
| G. AI Crawler Access | 20 | Gatekeeper — if AI bots are blocked, nothing else matters |
| H. AI Content Readiness | 25 | #1 factor in LLM citation — content quality and extractability |
| I. AI Structured Data | 20 | Machine-readable knowledge that LLMs directly consume |
| J. AI Authority & Trust | 20 | Trust signals determine citation preference among competing sources |
| K. AI Technical | 15 | Extraction quality optimization — helpful but not a blocker |
| **Total** | **100** | |

---

## How to Compute AI Category Scores

Same method as the Google side:
1. Count the total number of checks in that category
2. Remove checks marked N/A from the count
3. Compute: `(passing checks / applicable checks) × max points`
4. Round to the nearest integer

**Partial credit rules:**
- G1 (AI Bot Permissions) has 7 sub-components (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bytespider, CCBot). Score proportionally: 5 of 7 bots allowed = 71% credit.
- I4 (Organization/Person Schema Depth) has multiple sub-properties (`sameAs`, `knowsAbout`, `description`, `url`, `logo`). Score proportionally for each present.
- All other partial credit rules match the Google side.

**N/A handling:** Same as Google. If all checks in a category are N/A, award full points with a note.

---

## AI Score Adjustments

Apply these after computing the raw AI total:

**Boosts** (apply the highest single boost that qualifies — do not stack):
- All AI bots allowed in robots.txt + FAQPage schema present + author markup complete: **+5 points**
- No boost if any Critical AI check fails

**Penalties** (apply all that apply, these do stack):
- All AI bots explicitly blocked in robots.txt: **−10 points**
- Core content behind JS rendering only (G4 fail): **−10 points**
- No structured data of any kind (no JSON-LD at all): **−5 points**

**Cap**: Final AI score cannot go above 100 or below 0.

---

## AI Grade Labels

| Score | Grade | Label |
|---|---|---|
| 90–100 | A | Excellent — highly citable by AI engines |
| 80–89 | B | Good — minor improvements available |
| 70–79 | C | Needs Work — several gaps in AI visibility |
| 60–69 | D | Poor — AI engines are likely skipping this site |
| 50–59 | E | Very Poor — major barriers to AI citation |
| 0–49 | F | Critical — effectively invisible to AI search |

Use the label in the report header: **AI Search Readiness Score: 44/100 — F (Critical)**

---

## AI Priority Tier Definitions

Assign every failing AI check one of these tiers:

### Critical
The issue prevents AI engines from finding or using the content. Fix immediately.

Automatic Critical assignments:
- All AI bots blocked in robots.txt (G1)
- Core content behind JS rendering only (G4)

### High
The issue has a meaningful negative impact on AI citation likelihood. Fix this week.

- Some AI bots explicitly blocked (G1, partial)
- No direct answer format in opening content (H1)
- No entity clarity in first 100 words (H3)
- No content freshness signals — no dates anywhere (H5)
- FAQ content exists but no FAQPage schema (I1)
- Organization/Person schema minimal — no `sameAs` links (I4)
- No author markup or anonymous content (J1)
- No about page or no credentials on about page (J2)
- AI-specific blocking meta tags present unintentionally (G3)

### Medium
Moderate impact on AI visibility. Fix this sprint.

- llms.txt missing (G2)
- No FAQ structure on pages that would benefit (H2)
- No data or statistics in content (H4)
- Thin content below AI depth thresholds (H6)
- Instructional content without HowTo schema (I2)
- No breadcrumb schema on subpages (I5)
- Zero outbound citation links on informational content (J3)
- No contact or legitimacy signals (J4)
- No semantic content wrapper — no `<article>` or `<main>` tags (K1)
- No semantic HTML landmarks (K2)
- Poor content segmentation — 1000+ words without subheadings (K4)
- Sitemap not accessible to AI bots (G5)

### Low
Minor improvements with small impact. Fix when convenient.

- llms.txt exists but malformed (G2, minor variant)
- Missing speakable schema on article pages (I3)
- No social proof markup (J5)
- Missing `<html lang>` attribute (K3)

---

## AI Quick Win Identification

A **Quick Win** is any High-priority AI issue fixable in under 30 minutes. Same three conditions as Google:

1. The fix is a single tag addition, attribute change, or small file edit
2. The fix does not require content creation, design work, or architectural changes
3. The fix code example is complete and copy-paste ready

**Examples of AI Quick Wins:**
- Adding AI bot `Allow` rules to robots.txt
- Adding `<html lang="en">` attribute
- Adding `<article>` or `<main>` wrapper around existing content
- Adding `dateModified` to existing JSON-LD schema
- Adding `sameAs` array to existing Organization schema
- Removing unintentional `noai` or `noimageai` meta tag

**Examples that are NOT AI Quick Wins (require more work):**
- Writing an entire llms.txt from scratch (requires content decisions)
- Adding FAQ content to pages that don't have it (content creation)
- Rewriting opening paragraphs for entity clarity (content rewriting)
- Building an about page with credentials (new page creation)
- Adding author bio pages (content creation + design)

---

## AI Score Calculation Example

**Scenario**: Marketing agency homepage audit

| Category | Total Checks | N/A | Applicable | Passing | Raw % | Points |
|---|---|---|---|---|---|---|
| G. AI Crawler Access | 5 | 0 | 5 | 3 | 60% | 12 |
| H. AI Content Readiness | 6 | 0 | 6 | 2 | 33% | 8 |
| I. AI Structured Data | 5 | 2 | 3 | 1 | 33% | 7 |
| J. AI Authority & Trust | 5 | 0 | 5 | 3 | 60% | 12 |
| K. AI Technical | 4 | 0 | 4 | 2 | 50% | 8 |
| **Subtotal** | | | | | | **47** |

Some AI bots blocked → no boost eligible. No Critical AI check fails → no penalties apply.
**Final AI score: 47/100 — F (Critical)**

---

## What Not to Score (AI)

Do not penalize for:
- Content quality or writing style (only structure and extractability are scoreable)
- Absence of things you can't verify from static HTML (actual AI crawler behavior, whether the site appears in ChatGPT/Perplexity results, crawl frequency)
- llms.txt not being a fully fleshed-out document (it's an emerging standard — existence with basic content is sufficient for a pass)
- Pages intentionally blocking AI crawlers (e.g., premium/paywalled content) — mark these as N/A, not fails
- Missing Speakable schema on non-article, non-news pages — mark as N/A
- Not having all 7 AI bots explicitly allowed in robots.txt — only penalize explicit blocks, not absence of explicit allows (absence = allowed by default per the robots exclusion protocol)
