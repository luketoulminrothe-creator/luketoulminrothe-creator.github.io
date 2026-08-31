---
name: design-advisor
description: Industry-specific design recommendations before building. Searches CSV data files to provide color palettes, font pairings, layout patterns, and anti-pattern warnings for any industry. Use this skill before frontend-design when building a website for a specific industry or business type. Triggers on /design, "design for", "design advisor", or when the project CLAUDE.md says to invoke it.
---

# Design Advisor

Provides data-driven, industry-specific design recommendations before building begins. Searches CSV data files to give actionable specs — not vibes.

The user provides an industry, business type, or client description. You return a structured design brief that feeds into the `frontend-design` skill.

## Workflow

1. **Identify the industry** from the user's request. If unclear, ask.
2. **Search the CSV data files** in `skills/design-advisor/data/` for matching rows. Use fuzzy matching — "car wash" matches "Automotive Services", "dentist" matches "Healthcare / Dental".
3. **Cross-reference multiple files** to build a complete picture (colors + typography + layout + anti-patterns).
4. **Search 21st.dev for real components** using the `magic` MCP server (tool name: `mcp__magic__21st_magic_component_builder` or similar). Search for components matching the recommended style direction (e.g., "glassmorphic hero section", "dark mode pricing cards", "testimonial carousel"). If the MCP is not available or errors, skip this step and note it in the output.
5. **Present the design brief** in the structured format below.

## Data Files

Search these CSV files in `skills/design-advisor/data/`:

| File | Purpose |
|---|---|
| `colors.csv` | Industry color palettes — primary, secondary, CTA, background, text, border |
| `typography.csv` | Font pairings — heading + body with mood, use cases, Google Fonts links |
| `ui-reasoning.csv` | Industry design patterns, recommended styles, anti-patterns with severity |
| `landing.csv` | Landing page layout patterns, section order, CTA placement strategies |
| `ux-guidelines.csv` | UX do/don't rules with code examples and severity levels |

## Output Format

Return a structured design brief:

### 1. Style Direction
The recommended visual style and why it fits this industry. Be specific — not "modern and clean" but "dark glassmorphism with high-contrast amber accents to signal trust and sophistication."

### 2. Color Palette
A table with 6 hex codes and their roles:
| Role | Hex | Usage |
|---|---|---|
| Primary | #hex | Headers, key UI elements |
| Secondary | #hex | Hover states, secondary buttons |
| CTA | #hex | Buttons, links that need attention |
| Background | #hex | Page background |
| Text | #hex | Body text |
| Border | #hex | Card borders, dividers |

Include a note on why these colors work for this industry.

### 3. Typography
- **Heading font**: Name + why
- **Body font**: Name + why
- **Google Fonts link**: Ready to paste
- **Tailwind config**: Font family values

### 4. Page Structure
Recommended section order for the landing page, with CTA placement strategy.

### 5. Key Effects
Animations and interactions that fit this industry. Be specific about implementation (e.g., "glassmorphic cards with backdrop-blur-xl and hover:translate-y-[-2px]").

### 6. Anti-Patterns
What to avoid, with severity levels:
- **HIGH** — will actively hurt conversions or trust
- **MEDIUM** — looks unprofessional
- **LOW** — missed opportunity

### 7. 21st.dev Components (if MCP available)
Real component examples from 21st.dev that match the recommended style.

### 8. Next Step
Tell the user the design brief is ready and they can proceed with building. The `frontend-design` skill will use these specs as constraints.

## Important

- Always search the CSV files. Never make up data that isn't in them.
- If the industry isn't in the data, find the closest match and note the gap.
- The anti-patterns are the most valuable part. Lead with what NOT to do.
- This skill produces specs. The `frontend-design` skill produces code. Don't overlap.
