# EduNex — Design Specification

Derived from the visual analysis and reconstruction targets in `EduNex_Website_Build_Prompts.md`.

## 1. Canvas & Proportions
- **Reference Resolution:** 714 × 2048 px.
- **Desktop Comparison Viewport:** 1428 CSS px (2× factor). Target full page height ~4096 px.
- **Content Container:** `max-w-[1312px]` with horizontal padding `px-6 md:px-12 lg:px-16`.

| Section | Approximate Height @ 1428px | Background |
|---|---:|---|
| Header | 98 px | White (`#FFFFFF`) |
| Technology Rail | 86 px | Pale Blue (`#F0F4FE`) |
| Hero | 676 px | Multi-gradient wash + Photo layer |
| Solutions | 814 px | White (`#FFFFFF`) |
| Training | 632 px | Midnight Navy (`#0F2748`) |
| Dashboard / About | 546 px | Off-white / light blue wash |
| Testimonials | 568 px | Very Pale Blue (`#F6F9FE`) |
| School Logos | 260 px | White (`#FFFFFF`) |
| Campus CTA Banner | 316 px | Dark Aerial Overlay (`rgb(2 13 23 / 74%)`) |
| Footer | 100 px | White (`#FFFFFF`) |

## 2. Color Palette & Tokens
```css
:root {
  /* Core brand & text */
  --color-ink: #081f44;
  --color-body: #50627e;
  --color-page: #ffffff;
  --color-border: #e3eaf4;

  /* Surfaces */
  --color-rail: #f0f4fe;
  --color-card-blue: #eaf4fe;
  --color-card-mint: #e9fbf4;
  --color-card-violet: #f2edfd;
  --color-training: #0f2748;
  --color-testimonials: #f6f9fe;

  /* Accents */
  --color-check-blue: #0787ff;
  --color-check-green: #00b990;
  --color-check-violet: #8745ff;
  --color-star: #ffaf00;

  /* Gradients */
  --gradient-primary: linear-gradient(105deg, #0098ff 0%, #0664ff 48%, #123bff 100%);
  --gradient-headline: linear-gradient(95deg, #009cff 0%, #3475ff 38%, #8054ff 70%, #ba35f5 100%);
}
```

## 3. Typography Hierarchy
- **Font Families:** 
  - Sans: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Handwriting: `Caveat, cursive`
- **Scale:**
  - Hero Headline: 64 px (desktop), weight 750–800, line-height 1.06
  - Section Titles: 36–40 px, weight 700
  - Card Titles: 22–24 px, weight 650
  - Body Text: 16–18 px, line-height 1.6
  - Eyebrows: 12–13 px, uppercase, letter-spacing 0.16em, font-semibold
  - Decorative Handwriting: 20–26 px

## 4. Radii & Shadows
- Buttons: Full pill (`rounded-full` / `9999px`)
- Solution Cards: 20–24 px (`rounded-2xl` to `rounded-3xl`)
- Floating Glass Cards: 16–20 px (`rounded-2xl`), backdrop-blur 12px
- Subtle Shadows: `0 8px 24px -6px rgba(8, 31, 68, 0.08)`
- Primary Button Glow: `0 8px 22px rgba(18, 78, 255, 0.17)`
