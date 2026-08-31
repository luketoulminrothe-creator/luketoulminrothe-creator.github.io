# SEO Checks Reference

Complete checklist used during Step 3 of the SEO audit. Each check includes the pass criteria, fail signals, diagnostic question to answer from the HTML, and default priority if it fails.

---

## Table of Contents
1. [Category A — Technical SEO](#a--technical-seo)
2. [Category B — On-Page SEO](#b--on-page-seo)
3. [Category C — Structured Data](#c--structured-data)
4. [Category D — Social / Open Graph](#d--social--open-graph)
5. [Category E — Performance Signals](#e--performance-signals)
6. [Category F — Crawlability](#f--crawlability)
7. [Category G — AI Crawler Access](#g--ai-crawler-access)
8. [Category H — AI Content Readiness](#h--ai-content-readiness)
9. [Category I — AI Structured Data](#i--ai-structured-data)
10. [Category J — AI Authority & Trust](#j--ai-authority--trust)
11. [Category K — AI Technical](#k--ai-technical)

---

## A — Technical SEO

### A1. Title Tag
- **Check**: Does a `<title>` tag exist in `<head>`?
- **Pass**: Present, 50–70 characters, unique to this page, primary keyword within first 60 chars
- **Fail signals**: Missing entirely | Over 70 chars (truncated in SERPs) | Under 30 chars (too vague) | Duplicate across pages | Keyword buried after brand name
- **Priority if failing**: Critical (missing) / High (length or keyword issues)
- **Fix pattern**:
```html
<title>Primary Keyword — Secondary Benefit | Brand Name</title>
```

### A2. Meta Description
- **Check**: `<meta name="description" content="...">`
- **Pass**: Present, 140–160 characters, unique, includes primary keyword naturally, has a value proposition or call to action
- **Fail signals**: Missing | Over 160 chars (truncated) | Under 100 chars (low effort) | Duplicate across pages | No keyword | Keyword-stuffed
- **Priority if failing**: High (missing) / Medium (quality issues)
- **Note**: Google rewrites descriptions ~70% of the time but a good one is your fallback and influences click-through when Google does use it.
- **Fix pattern**:
```html
<meta name="description" content="Discover handcrafted custom cakes in NYC. Order online for weddings, birthdays, and celebrations. Free tasting consultations available." />
```

### A3. H1 Tag
- **Check**: Count `<h1>` elements in the document
- **Pass**: Exactly one H1, contains primary keyword, not identical to the title tag (complementary is fine)
- **Fail signals**: No H1 | Multiple H1s | H1 present but keyword absent | H1 is decorative text with no semantic meaning
- **Priority if failing**: Critical (missing) / High (multiple H1s or no keyword)

### A4. Heading Hierarchy
- **Check**: Map the heading structure H1 → H2 → H3 through the page
- **Pass**: Each level used in sequence; no H3 appears without a preceding H2 on the same page; headings reflect actual content structure (not used purely for visual styling)
- **Fail signals**: Jumps from H1 to H3 | H2s used for visual styling not structure | Headings in the wrong semantic order
- **Priority if failing**: Medium

### A5. Canonical Tag
- **Check**: `<link rel="canonical" href="...">`
- **Pass**: Present, uses absolute URL, matches the page's own URL (for the canonical version), uses HTTPS if the site does
- **Fail signals**: Missing (especially on paginated or parameter-heavy URLs) | Points to HTTP while page is HTTPS | Points to a different page without explanation | Uses a relative URL instead of absolute
- **Priority if failing**: High (missing on pages that could be duplicated) / Critical (pointing to wrong page)
- **Fix pattern**:
```html
<link rel="canonical" href="https://www.example.com/this-page/" />
```

### A6. Robots Meta Tag
- **Check**: `<meta name="robots" content="...">`
- **Pass**: Either absent (defaults to index,follow — that's fine) or explicitly `content="index, follow"`
- **Fail signals**: `noindex` present (page will be excluded from search) | `nofollow` present (link equity not passed) | Both present
- **Priority if failing**: Critical if noindex is unintentional; flag as a warning and ask the user to confirm intent

### A7. HTTPS
- **Check**: Does the page URL use `https://`? (For live URLs only. For local files, check for any `http://` in src/href attributes that would become mixed content after deployment.)
- **Pass**: HTTPS throughout; no `http://` in `<img src>`, `<script src>`, `<link href>` attributes
- **Fail signals**: HTTP URL | Mixed content (http:// assets on an https:// page)
- **Priority if failing**: Critical (HTTP) / High (mixed content)

### A8. Image Alt Text
- **Check**: Every `<img>` that is not purely decorative
- **Pass**: `alt` attribute present and descriptive (not empty string unless decorative, not "image", not the filename)
- **Fail signals**: Missing `alt` attribute | `alt=""` on a meaningful image | `alt="image"` or `alt="photo"` | Alt contains the raw filename (e.g., `alt="IMG_4523.jpg"`)
- **Decorative images** (spacer gifs, background textures, icons with adjacent text labels): `alt=""` is correct — don't penalize these
- **Priority if failing**: High (accessibility + image search indexing)
- **Fix pattern**:
```html
<!-- Before -->
<img src="wedding-cake.jpg">

<!-- After -->
<img src="wedding-cake.jpg" alt="Three-tier fondant wedding cake with sugar flowers, custom made in NYC" width="800" height="600">
```

### A9. Broken Internal Links
- **Check**: All `href` values on `<a>` tags that point to internal paths
- **Pass**: Internal hrefs resolve to pages that exist (or plausibly exist for dynamic routes)
- **Fail signals**: `href="#"` used as placeholder | `href=""` on a link | Obvious dead paths like `/old-page`, `/TODO`, `/coming-soon` with no destination
- **Priority if failing**: Medium (harms crawl efficiency and user experience)

---

## B — On-Page SEO

### B1. Keyword Presence
- **Check**: Can you identify a primary keyword for this page? Does it appear in the title, H1, first paragraph, and at least 2 other natural body locations?
- **Pass**: Natural presence in 4+ locations without stuffing (the text reads naturally, not like a keyword list)
- **Fail signals**: Keyword only in title but not body | Keyword appears 15+ times in 300 words (stuffing) | No clear primary keyword (page lacks topical focus) | Keyword in body but not in title or H1
- **Note**: Infer the target keyword from the page content. State your inference clearly in the report before evaluating this check.
- **Priority if failing**: High

### B2. Content Length
- **Check**: Approximate word count of meaningful body text (strip nav, footer, boilerplate)
- **Pass thresholds**:
  - Informational / blog pages competing for search: 800+ words
  - Product pages: 300+ words (including description, specs, reviews)
  - Landing pages: 400+ words
  - Utility pages (contact, terms): 100+ words is fine
- **Fail signals**: Under 300 words for any page trying to rank for competitive keywords (Google calls this "thin content")
- **Priority if failing**: High (competitive pages) / Medium (low-competition or utility pages)

### B3. Internal Links
- **Check**: Count `<a href="...">` links pointing to same-domain pages within body content (not counting nav/footer)
- **Pass**: At least 2–3 contextual internal links in the body content
- **Fail signals**: Zero internal links in body content (orphan page risk) | Only nav and footer links, no contextual links
- **Priority if failing**: Medium

### B4. External Link Quality
- **Check**: Outbound links in body content
- **Pass**: External links in body content include `rel="noopener noreferrer"` for security; `rel="nofollow"` used only on sponsored or user-generated content links
- **Fail signals**: External links with no `rel` attribute (minor security risk, not a ranking factor) | All external links are `nofollow` unnecessarily | Links to obviously low-quality domains
- **Priority if failing**: Low (unless sponsored links lack nofollow, then Medium)
- **Fix pattern**:
```html
<a href="https://external-source.com" rel="noopener noreferrer">Source</a>
```

### B5. URL Structure
- **Check**: The page URL itself
- **Pass**: Lowercase letters, hyphens as separators (not underscores), descriptive keywords in the path, no query string parameters for permanent pages, max 3–4 levels deep
- **Fail signals**: Underscores instead of hyphens | All-caps or CamelCase path | ID-based URLs like `/page?id=4532` | Deep nesting like `/a/b/c/d/e/page.html`
- **Priority if failing**: Medium (changing URLs has migration costs — flag it but note that canonical tags can mitigate the impact)

### B6. Duplicate Content Signals
- **Check**: When auditing multiple pages, compare titles and meta descriptions for uniqueness
- **Pass**: Each page has a unique title and meta description
- **Fail signals**: Same title on 2+ content pages | Same meta description sitewide (generic or blank) | Nearly identical page content without a canonical tag
- **Priority if failing**: High

---

## C — Structured Data

### C1. JSON-LD Presence
- **Check**: `<script type="application/ld+json">` anywhere in the document
- **Pass**: At least one JSON-LD block present
- **Fail signals**: No structured data at all | Only Microdata or RDFa present (these work, but JSON-LD is Google's preferred format — note it, don't penalize heavily)
- **Priority if failing**: High (for content, product, and local business pages) / Medium (for utility or thin pages)

### C2. Schema Type Appropriateness
- **Check**: Does the `@type` match what the page actually is?
- **Common correct mappings**:
  - Homepage: `Organization` + `WebSite` (with `SearchAction` for sitelinks search box)
  - Blog post / article: `Article` or `BlogPosting`
  - Product page: `Product`
  - FAQ section: `FAQPage` (enables rich results)
  - Local business: `LocalBusiness`
  - Contact page: `ContactPage`
  - About page: `AboutPage`
  - Any page with breadcrumbs: `BreadcrumbList`
- **Priority if failing**: Medium (wrong type) / Low (valid but suboptimal type)

### C3. Required Fields
- **Check**: Does the JSON-LD include the minimum required fields for its type?
- **Universal minimum**: `@context`, `@type`, `name`
- **Extended requirements by type**:
  - `Article` / `BlogPosting`: `headline`, `author` (with `@type: Person` and `name`), `datePublished`, `image`
  - `Product`: `name`, `description`, `offers` (with `price` and `priceCurrency`)
  - `FAQPage`: `mainEntity` array, each item with `@type: Question`, `name`, and `acceptedAnswer`
  - `Organization`: `url`, `logo` (with `@type: ImageObject` and `url`), `contactPoint`
  - `LocalBusiness`: `address`, `telephone`, `openingHours`
- **Priority if failing**: High (missing required fields may prevent rich results entirely)

### C4. JSON Syntax Validity
- **Check**: Is the JSON-LD syntactically valid? Look for: unclosed brackets/braces, trailing commas after the last item, unquoted keys, single quotes instead of double quotes, missing colons
- **Priority if failing**: Critical (invalid JSON is completely ignored by Google — it's a silent failure with real consequences)
- **Fix pattern**: Always use double quotes, no trailing commas, properly nested braces:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 React Performance Tips",
  "author": {
    "@type": "Person",
    "name": "Jane Smith"
  },
  "datePublished": "2024-03-01"
}
</script>
```

---

## D — Social / Open Graph

### D1. Open Graph Core Tags
- **Check**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- **Pass**: All five present
- **Fail signals**: Any of the five missing | `og:image` uses a relative URL | `og:url` doesn't match the canonical URL
- **Priority if failing**: High (shared links on social media will display poorly or use fallback content)
- **Fix pattern**:
```html
<meta property="og:title" content="Custom Wedding Cakes NYC | Acme Bakery" />
<meta property="og:description" content="Handcrafted wedding cakes made in NYC. Book a free tasting." />
<meta property="og:image" content="https://www.example.com/images/og-wedding-cake.jpg" />
<meta property="og:url" content="https://www.example.com/wedding-cakes/" />
<meta property="og:type" content="website" />
```

### D2. Open Graph Image Quality
- **Check**: The `og:image` value
- **Pass**: Absolute HTTPS URL, image dimensions at least 1200×630px (recommended for link previews), not a tiny logo on a blank background for article/product pages
- **Fail signals**: Relative URL | HTTP URL | Likely very small (e.g., favicon path) | Same generic image sitewide for every page
- **Priority if failing**: High (poor link preview hurts click-through from social shares)

### D3. Twitter Card Tags
- **Check**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **Pass**: All four present; `twitter:card` is `summary_large_image` for content pages (shows a large image preview)
- **Fail signals**: Missing entirely (Twitter will fall back to OG tags, which is acceptable but not optimal) | `twitter:card` set to `summary` when a large image would be more engaging
- **Priority if failing**: Medium

### D4. Favicon
- **Check**: `<link rel="icon">` and optionally `<link rel="apple-touch-icon">` in `<head>`
- **Pass**: At least one icon link present
- **Fail signals**: No favicon link (browser requests `/favicon.ico` which may 404, showing a blank tab icon — minor but visible to users)
- **Priority if failing**: Low
- **Fix pattern**:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## E — Performance Signals

These are static analysis signals only. Actual Core Web Vitals numbers require runtime testing with Lighthouse or PageSpeed Insights. Always caveat performance findings with this limitation.

### E1. Render-Blocking Resources
- **Check**: `<link rel="stylesheet">` in `<head>`, `<script>` tags without `defer` or `async`
- **Pass**: Stylesheets have a `media` attribute for non-critical CSS, or are minimal; scripts have `defer` or `async` unless they must be synchronous (e.g., inline scripts that need to run before DOM)
- **Fail signals**: Multiple large `<link rel="stylesheet">` with no `media` attribute in `<head>` | `<script src="...">` in `<head>` without `defer` or `async`
- **Priority if failing**: High (directly impacts LCP — time for the main content to appear)
- **Fix patterns**:
```html
<!-- Scripts: add defer -->
<script src="app.js" defer></script>

<!-- Non-critical CSS: load asynchronously -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### E2. Image CLS Signals
- **Check**: All `<img>` elements in the document
- **Pass**: Every meaningful `<img>` has explicit `width` and `height` attributes set to the image's actual dimensions
- **Fail signals**: Images without `width` and `height` attributes (browser can't reserve space during load, causing layout shift as the image loads in)
- **Priority if failing**: High (CLS is a Core Web Vital; layout shift is a confirmed ranking signal)
- **Fix pattern**:
```html
<!-- Before: browser doesn't know how much space to reserve -->
<img src="hero.jpg" alt="Hero image">

<!-- After: browser reserves exact space before image loads -->
<img src="hero.jpg" alt="Hero image" width="1200" height="600">
```

### E3. Lazy Loading
- **Check**: `loading` attribute on `<img>` elements
- **Pass**: Below-fold images have `loading="lazy"`; the first/hero image (LCP candidate) does NOT have `loading="lazy"` (that delays the most important image)
- **Fail signals**: No lazy loading anywhere on a page with many images | `loading="lazy"` applied to the hero/first-viewport image
- **Priority if failing**: Medium
- **Fix pattern**:
```html
<!-- Hero image: do NOT lazy load -->
<img src="hero.jpg" alt="Hero" width="1200" height="600">

<!-- Below-fold images: lazy load these -->
<img src="gallery-1.jpg" alt="Gallery item" loading="lazy" width="600" height="400">
```

### E4. Resource Hints
- **Check**: `<link rel="preload">`, `<link rel="preconnect">`, `<link rel="dns-prefetch">`
- **Pass**: Critical fonts preloaded; third-party origins (Google Fonts, analytics, CDNs) have `preconnect`
- **Fail signals**: Google Fonts loaded without `preconnect` to `https://fonts.gstatic.com` | Critical above-fold font files not preloaded | No resource hints at all on a page with many third-party resources
- **Priority if failing**: Medium
- **Fix pattern for Google Fonts**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

---

## F — Crawlability

### F1. robots.txt
- **Check**: Fetch or read `robots.txt` at the domain/project root
- **Pass**: File exists, valid syntax, does not block Googlebot from key content, includes a `Sitemap:` directive pointing to the sitemap URL
- **Fail signals**: 404 / file missing | `Disallow: /` (blocks everything) | `User-agent: Googlebot` + `Disallow: /` | Blocks CSS or JS files needed for rendering (Googlebot renders pages; blocking scripts can make pages appear empty) | No `Sitemap:` directive
- **Priority if failing**: Critical (`Disallow: /` or blocking Googlebot) / Medium (missing file or missing Sitemap directive)
- **Example of a good robots.txt**:
```
User-agent: *
Disallow: /admin/
Disallow: /checkout/
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

### F2. sitemap.xml
- **Check**: Fetch or read `sitemap.xml` at the domain/project root (also check robots.txt for alternate sitemap URL)
- **Pass**: File exists, valid XML, contains key URLs, uses `<lastmod>` dates, under 50MB / 50,000 URLs per file
- **Fail signals**: 404 / file missing | References URLs that return 404 | Contains URLs marked `noindex` | Very stale `<lastmod>` dates (months old for frequently updated content) | Not included in robots.txt
- **Priority if failing**: High (missing) / Medium (present but with quality issues)
- **Pre-deployment note**: If auditing a local project, flag that sitemap.xml must be created and submitted to Google Search Console before going live.

### F3. Canonical Conflicts
- **Check**: Cross-reference `<link rel="canonical">` with the actual page URL
- **Pass**: Canonical matches the page's own URL (for pages that are the canonical version); any self-referential canonical uses HTTPS and the exact same URL format
- **Fail signals**: Canonical points to a different domain unintentionally | HTTP canonical on an HTTPS page | Canonical chain (A canonicals to B which canonicals to C — Google may not follow chains) | Canonical present but also has `noindex` (contradictory signals)
- **Priority if failing**: High

### F4. Noindex Risk Assessment
- **Check**: `<meta name="robots" content="noindex">` in the HTML; for live URLs also check for `X-Robots-Tag: noindex` in response headers if visible
- **Pass**: No noindex signals on pages that should rank; noindex is acceptable on login, thank-you, admin, and staging pages
- **Fail signals**: Core content pages have noindex | noindex in HTML combined with `Disallow` in robots.txt (Google can't even read the noindex to know to exclude it — the page is in a limbo state)
- **Priority if failing**: Critical

---

## G — AI Crawler Access

### G1. AI Bot Permissions
- **Check**: robots.txt for explicit rules targeting AI bots: GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bytespider, CCBot
- **Pass**: No AI bots explicitly blocked. Bots not mentioned in robots.txt are considered allowed by default (per robots exclusion protocol).
- **Fail signals**: Any AI bot explicitly blocked via `User-agent: [bot] / Disallow: /` | Blanket `User-agent: * / Disallow: /` blocking everything
- **Priority if failing**: Critical (all blocked) / High (some blocked)
- **Fix pattern**:
```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```

### G2. llms.txt
- **Check**: Fetch or look for `/llms.txt` at the site/project root
- **Pass**: File exists with a plain-text site summary, key page list, and usage guidance
- **Fail signals**: File missing (emerging standard — not penalized heavily) | Exists but empty or malformed
- **Priority if failing**: Medium (missing) / Low (malformed)
- **Note**: llms.txt is an emerging standard that gives LLMs a plain-text summary of what the site is, what pages matter, and how to use the content. Think of it as robots.txt but helpful instead of restrictive.
- **Fix pattern**:
```
# Example Company

> Example Company builds tools for developers.

## Key Pages

- [Homepage](https://example.com): Overview of our products
- [Pricing](https://example.com/pricing): Plans and pricing details
- [Documentation](https://example.com/docs): Technical documentation
- [About](https://example.com/about): Company background, team, mission
- [Blog](https://example.com/blog): Latest articles and updates

## What We Do

Example Company provides [specific description of products/services]. Founded in [year], based in [location].

## Contact

- Email: hello@example.com
- Support: support@example.com
```

### G3. AI-Specific Meta Tags
- **Check**: `<meta name="robots">` for AI-specific directives: `noai`, `noimageai`; also check for TDM reservation: `<meta name="tdm-reservation" content="1">`
- **Pass**: No unintentional AI-blocking directives present on pages that should be AI-discoverable
- **Fail signals**: `noai` or `noimageai` in robots meta content | `<meta name="tdm-reservation" content="1">` present on content pages
- **Priority if failing**: High (if unintentional — flag and ask user to confirm intent)

### G4. Content Accessibility for AI
- **Check**: Is meaningful content in the static HTML or locked behind client-side JS rendering?
- **Pass**: Body text content (excluding scripts and style blocks) contains substantial text — LLM crawlers can extract the page's meaning from raw HTML
- **Fail signals**: Body text under 100 characters while page contains substantial JavaScript (suggests client-side rendering) | Empty `<div id="root">` or `<div id="app">` patterns | Content in iframes
- **Priority if failing**: High
- **Note**: LLM crawlers (GPTBot, PerplexityBot, ClaudeBot) are less sophisticated than Googlebot at rendering JavaScript. Content that requires JS execution to appear is effectively invisible to most AI search engines.

### G5. Sitemap Accessibility for AI
- **Check**: Is sitemap.xml accessible to AI user-agents? Is the `Sitemap:` directive in robots.txt available to all user-agents?
- **Pass**: sitemap.xml exists and is not blocked for AI user-agents; `Sitemap:` directive present in robots.txt
- **Fail signals**: Sitemap blocked for specific AI bots | No sitemap directive in robots.txt while AI bots are allowed (they have no discovery mechanism beyond link-following)
- **Priority if failing**: Medium
- **Note**: AI crawlers may not do full site crawls the way Googlebot does. Without a sitemap, they rely solely on following links, which means deep or orphaned pages are unlikely to be discovered.

---

## H — AI Content Readiness

### H1. Direct Answer Format
- **Check**: Do the first 200 words of body content contain clear, extractable factual statements?
- **Pass**: First 200 words contain at least one sentence matching patterns like "[Subject] is [definition]", "[Subject] provides/offers [concrete thing]", or a clear summary statement with extractable factual claims
- **Fail signals**: First 200 words contain only subjective marketing language with no extractable factual claim (e.g., "We're passionate about delivering world-class solutions") | No definitional or summary sentences anywhere on the page
- **Priority if failing**: High
- **Note**: LLMs extract and cite content that directly answers questions. A page that opens with "Acme Corp is a B2B SaaS platform for supply chain logistics" is citable. A page that opens with "Welcome to a new era of possibilities" is not.

### H2. FAQ Structure
- **Check**: Is Q&A formatted content present on the page?
- **Pass**: FAQ sections with question headings, `<details>/<summary>` elements, or clearly structured question-answer pairs exist
- **Fail signals**: No question-answer patterns anywhere on a page that would benefit from them (service pages, product pages, informational pages)
- **Priority if failing**: Medium
- **Note**: Q&A structured content is the easiest format for LLMs to extract and cite. Even service pages benefit from a "Common Questions" section.

### H3. Entity Clarity
- **Check**: Does the page clearly identify what/who it's about within the first 100 words?
- **Pass**: The page's topic and subject entity are identifiable from the opening content with specific, extractable claims
- **Fail signals**: Opening content is vague ("We're passionate about delivering solutions") | The page topic can't be determined without reading deep into the body
- **Priority if failing**: High
- **Note**: LLMs need to map content to entities. "Loopi AI is a done-for-you AI automation agency based in Denmark" is immediately extractable. Vague marketing copy isn't. This check relies on LLM judgment and may vary slightly between audits.

### H4. Data & Statistics Presence
- **Check**: Does the page contain specific numbers, percentages, named case studies, or data points?
- **Pass**: Body content contains specific numeric values in factual context (e.g., "saved clients 40% on operational costs", "serving 200+ businesses since 2021", "reduced response time from 4 hours to 15 minutes")
- **Fail signals**: Body content contains zero specific data points, statistics, or named examples | Entirely generic prose with no concrete claims
- **Priority if failing**: Medium
- **Note**: LLMs preferentially cite sources with unique factual claims and specific data. Generic content that could be about any company is less likely to be cited.

### H5. Content Freshness Signals
- **Check**: Are publish dates and/or update dates visible on the page?
- **Pass**: Visible publish date and/or last-updated date | `<time>` elements with `datetime` attribute | `dateModified` in JSON-LD schema
- **Fail signals**: No date signals anywhere | Content could be from any year | Stale dates (2+ years old) on time-sensitive topics
- **Priority if failing**: High
- **Note**: LLMs — especially Perplexity — weigh content recency heavily. A page with no date signals may be treated as potentially stale.
- **Fix pattern**:
```html
<time datetime="2026-03-25">March 25, 2026</time>
<!-- Or in JSON-LD: -->
"dateModified": "2026-03-25"
```

### H6. Topical Depth
- **Check**: Approximate word count of meaningful body text
- **Pass thresholds** (higher bar than Google B2):
  - Informational / blog pages: 1200+ words
  - Service / product pages: 500+ words
  - Landing pages: 600+ words
  - Utility pages (contact, terms): exempt
- **Fail signals**: Under threshold word count for the page type | Thin content that skims the surface
- **Priority if failing**: Medium
- **Note**: LLMs prefer citing authoritative, comprehensive sources. A 200-word page competing against a 2000-word guide on the same topic will rarely be cited.

---

## I — AI Structured Data

### I1. FAQPage Schema
- **Check**: `<script type="application/ld+json">` with `@type: FAQPage` on pages that contain FAQ content
- **Pass**: JSON-LD FAQPage schema present with properly structured `Question`/`acceptedAnswer` pairs matching the visible FAQ content
- **Fail signals**: FAQ content exists on the page but has no FAQPage schema | Schema present but malformed | Questions/answers in schema don't match visible content
- **Priority if failing**: High
- **Fix pattern**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a 30-day money-back guarantee on all plans."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most customers are up and running within 24 hours."
      }
    }
  ]
}
</script>
```

### I2. HowTo Schema
- **Check**: JSON-LD `HowTo` schema on pages with step-by-step instructional content
- **Pass**: `HowTo` schema present with named `step` items matching the visible instructional content
- **Fail signals**: Step-by-step content exists on the page but no HowTo schema | Schema present but steps don't match visible content
- **Priority if failing**: Medium

### I3. Speakable Schema
- **Check**: `speakable` property on `Article` or `WebPage` schema
- **Pass**: `speakable` property present, pointing to key content sections via CSS selectors or XPath
- **Fail signals**: Missing on article/blog pages
- **Priority if failing**: Low
- **Note**: Originally designed for voice assistants, `speakable` now signals "this is the key excerpt" to AI engines. Mark N/A on non-article, non-news pages. On article pages, treat as a low-priority suggestion rather than a hard fail — adoption is still rare.

### I4. Organization/Person Schema Depth
- **Check**: Depth and completeness of `Organization` or `Person` JSON-LD schema
- **Pass**: Schema includes `sameAs` (array of social profiles, Wikipedia, Wikidata URLs), `knowsAbout`, `description`, `url`, `logo`
- **Fail signals**: Basic schema with only `name` and `@type` | No `sameAs` links | No cross-references to authoritative profiles
- **Priority if failing**: High
- **Note**: LLMs use `sameAs` to cross-reference entities across the web and build confidence in entity identity. An Organization schema linked to LinkedIn, Twitter, and Wikipedia is much more authoritative than one with just a name.
- **Fix pattern**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://www.acme.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.acme.com/logo.png"
  },
  "description": "Acme Corp builds developer tools for supply chain logistics.",
  "sameAs": [
    "https://www.linkedin.com/company/acme-corp",
    "https://twitter.com/acmecorp",
    "https://www.facebook.com/acmecorp",
    "https://en.wikipedia.org/wiki/Acme_Corp"
  ],
  "knowsAbout": ["supply chain", "logistics", "developer tools"]
}
</script>
```

### I5. Breadcrumb & SiteNavigation Schema
- **Check**: `BreadcrumbList` JSON-LD schema on subpages
- **Pass**: BreadcrumbList schema present with correct hierarchy reflecting the page's position in the site
- **Fail signals**: No breadcrumb schema on subpages | LLMs can't infer site hierarchy or which page is authoritative for which topic
- **Priority if failing**: Medium

---

## J — AI Authority & Trust

### J1. Author Markup
- **Check**: `author` property in Article/BlogPosting JSON-LD schema
- **Pass**: `author` present with `@type: Person`, `name`, `url` (linking to an about/bio page), and `sameAs` (LinkedIn, Twitter/X, personal site)
- **Fail signals**: No author attribution | Author is just a plain text name with no linked identity | Anonymous content
- **Priority if failing**: High
- **Note**: LLMs cross-reference authors. An article by "Jane Smith" with a linked LinkedIn profile and personal site is more trustworthy than anonymous content.
- **Fix pattern**:
```html
"author": {
  "@type": "Person",
  "name": "Jane Smith",
  "url": "https://www.acme.com/team/jane-smith",
  "sameAs": [
    "https://www.linkedin.com/in/janesmith",
    "https://twitter.com/janesmith"
  ],
  "jobTitle": "CTO",
  "worksFor": {
    "@type": "Organization",
    "name": "Acme Corp"
  }
}
```

### J2. About Page & Credentials
- **Check**: Does the site have an `/about` page (or equivalent) linked from main navigation or footer?
- **Pass**: About page exists, is linked from main navigation or footer, and contains at least one of: named individuals, job titles, years of experience, specific qualifications, or company registration details. Author schema `url` points to it.
- **Fail signals**: No about page | About page exists but contains no specific credentials or named individuals | Author page links return 404
- **Priority if failing**: High

### J3. Citation & Source Links
- **Check**: Outbound links to external domains in body content
- **Pass**: Body content contains at least 2 outbound links to external domains on informational pages
- **Fail signals**: Zero outbound citations on informational content | All links are internal or affiliate | Factual claims made without any external sources
- **Priority if failing**: Medium
- **Note**: Pages that cite their sources signal trustworthiness to LLMs. LLMs that see you citing others are more likely to cite you back.

### J4. Contact & Legitimacy Signals
- **Check**: Contact page, physical address, business registration info
- **Pass**: Contact page exists with real contact methods; physical address or registered business info present; privacy policy and/or terms of service linked
- **Fail signals**: No contact information | No physical presence signals | Feels like an anonymous content farm
- **Priority if failing**: Medium

### J5. Social Proof Markup
- **Check**: `AggregateRating`, `Review` schema, or testimonial content with structured data
- **Pass**: Review/rating schema present with verifiable social proof (named individuals, companies); or visible testimonials with attribution
- **Fail signals**: Claims of quality with no supporting evidence | Testimonials with no names/companies | No review schema
- **Priority if failing**: Low

---

## K — AI Technical

### K1. Clean Text Extraction
- **Check**: Is the main content wrapped in semantic container tags?
- **Pass**: Main content wrapped in `<article>` or `<main>` tags; low boilerplate-to-content ratio; content not buried in 10+ levels of nested divs
- **Fail signals**: No semantic wrapper | Content mixed with navigation/ads/widgets with no separation | High noise-to-signal ratio
- **Priority if failing**: Medium
- **Note**: LLMs parse raw HTML to extract content. Semantic wrappers like `<article>` and `<main>` make it trivial to identify the actual content vs. navigation, sidebars, and footer boilerplate.

### K2. Semantic HTML
- **Check**: Use of HTML5 semantic landmark elements
- **Pass**: Proper use of `<article>`, `<section>`, `<aside>`, `<nav>`, `<header>`, `<footer>` to structure the page
- **Fail signals**: All content in generic `<div>` tags | No semantic landmarks | LLMs can't distinguish content from chrome
- **Priority if failing**: Medium

### K3. Language Declaration
- **Check**: `<html lang="...">` attribute
- **Pass**: `lang` attribute present and correct (e.g., `lang="en"`, `lang="da"`); `lang` attributes on mixed-language content blocks
- **Fail signals**: Missing `lang` attribute entirely | Wrong language code | No indication of content language for multilingual sites
- **Priority if failing**: Low
- **Fix pattern**:
```html
<html lang="en">
<!-- For mixed-language content: -->
<p lang="da">Dansk tekst her</p>
```

### K4. Content Segmentation
- **Check**: Are long pages broken into clearly headed sections?
- **Pass**: H2/H3 headings every 200-400 words; content organized into scannable, independently citable sections
- **Fail signals**: 1000+ word blocks with no subheadings | LLMs can't chunk content for precise citation
- **Priority if failing**: Medium
- **Note**: LLMs chunk content by headings for retrieval. A 5000-word wall of text with no subheadings is hard to cite precisely — the LLM can't extract just the relevant part.
