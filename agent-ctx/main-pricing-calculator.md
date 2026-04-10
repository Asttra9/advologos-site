# Task: Pricing Calculator Component

## Work Log
- Read worklog.md for project context and design patterns
- Studied existing components: animated-number.tsx, scroll-reveal.tsx, comparison-table.tsx, guarantee-section.tsx, method-section.tsx, voice-section.tsx
- Identified section numbering scheme (01-12, with 04 available)
- Identified card pattern: outer `bg-[rgba(255,255,255,0.025)] border border-[rgba(184,196,204,0.1)] p-[5px] rounded-[1.25rem]` + inner `bg-[var(--ardosia)] rounded-[calc(1.25rem-5px)]`
- Created `/src/components/advologos/pricing-calculator.tsx` with all requested features
- Added import and component placement in `page.tsx` between ComparisonTable and MethodSection
- Verified: lint clean (0 errors), dev server returns 200 OK

## Files Created
- `/src/components/advologos/pricing-calculator.tsx`

## Files Modified
- `/src/app/page.tsx` — Added import + component placement

## Component Features
1. **Plan selection**: 4 stylish buttons (Signum/Nomen/Autoritas/Imperium) with crimson active state
2. **Payment toggle**: One-time vs monthly (only shown for Autoritas/Imperium)
3. **Cost comparison**: One-time cost vs 3/6/12 month monthly totals with savings badges and mini progress bars
4. **ROI calculation**: Animated investment → projected return with multiplier (5x/8x/12x/20x)
5. **Feature progress bars**: Per-plan coverage percentage with tier comparison bars
6. **Section label**: "04 — Calculadora de Investimento"
7. **Styling**: Matches dark theme with exact card pattern, crimson accents, CSS variables
8. **Animations**: ScrollReveal entrance, AnimatedNumber for investment/ROI values
9. **Compact**: Single card layout, responsive grid (1 col mobile, 2 col desktop)
