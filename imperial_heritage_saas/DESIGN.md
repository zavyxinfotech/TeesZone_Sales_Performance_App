---
name: Imperial Heritage SaaS
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#544244'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#867274'
  outline-variant: '#d9c1c2'
  surface-tint: '#954552'
  primary: '#3e0211'
  on-primary: '#ffffff'
  primary-container: '#5a1725'
  on-primary-container: '#da7c89'
  inverse-primary: '#ffb2bb'
  secondary: '#645e53'
  on-secondary: '#ffffff'
  secondary-container: '#ebe1d3'
  on-secondary-container: '#6a6459'
  tertiary: '#1b1b1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#303030'
  on-tertiary-container: '#999797'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2bb'
  on-primary-fixed: '#3e0212'
  on-primary-fixed-variant: '#782e3b'
  secondary-fixed: '#ebe1d3'
  secondary-fixed-dim: '#cec5b8'
  on-secondary-fixed: '#1f1b13'
  on-secondary-fixed-variant: '#4c463c'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  page-title:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  section-heading:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  card-heading:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  body-main:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  kpi-value:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: -0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
  page-title-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 32px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system for TEESZONE Clothing Private Limited balances the heritage of apparel manufacturing with the precision of modern data analytics. The brand personality is **authoritative, sophisticated, and industrious**, evoking the feeling of a high-end atelier merged with a high-performance executive suite.

The design style is **Corporate Modern with a Minimalist Editorial influence**. It prioritizes high information density and legibility for internal sales performance and target tracking. By utilizing a "Warm Minimalist" approach, we replace cold grays with a cream-based palette, making long-term data interaction more comfortable for the eyes while maintaining a premium, professional atmosphere.

**Key visual principles:**
- **Clarity over Ornamentation:** Every element exists to serve data interpretation.
- **Controlled Contrast:** Deep burgundy acts as a focused highlight against a calm, neutral foundation.
- **Architectural Alignment:** A rigid grid structure reflects the organized nature of logistics and supply chains.

## Colors

The palette is anchored by **Deep Burgundy**, used strategically to signify action, selection, and primary branding. The base of the application utilizes **Warm Cream** tones instead of pure whites to create a premium "paper-like" feel, suitable for detailed reporting.

- **Primary (Deep Burgundy):** Reserved for primary CTA buttons, active navigation states, and critical positive data trends.
- **Secondary (Warm Cream):** Used for card backgrounds and secondary interface layers to provide soft contrast.
- **Tertiary (Black):** Used for high-level navigation backgrounds and primary headings to ground the interface.
- **Status Colors:** Use muted variations of standard semantic colors (e.g., a desaturated sage for success, a muted brick for errors) to ensure they do not clash with the Burgundy brand color.

## Typography

This design system uses **Inter** exclusively to maintain a systematic, utilitarian aesthetic that remains highly legible at small sizes. 

**Hierarchy Rules:**
- **KPI Values:** Should be the most visually prominent elements on dashboard views. Use the `kpi-value` token in Deep Burgundy or Black.
- **Labels:** Use `label-caps` for table headers and small metadata to differentiate them from actionable body text.
- **Contrast:** Ensure all secondary text uses **Muted Gray (#6B6B6B)** to maintain a clear visual path toward primary data.

## Layout & Spacing

The system employs a **12-column fluid grid** for the main content area, with a **fixed 260px left-hand sidebar** for global navigation.

- **Grid:** Use a 24px gutter between cards to provide enough breathing room for dense data tables.
- **Density:** For internal tracking, use a "Compact" vertical rhythm (8px/16px increments) to maximize the amount of information visible above the fold.
- **Margins:** Page margins are set to 32px to provide a generous frame that emphasizes the premium nature of the system.
- **Mobile Adaption:** On screens below 768px, the sidebar collapses into a hamburger menu, and grid columns stack vertically (12 columns).

## Elevation & Depth

To maintain a "Modern Corporate" feel, this design system avoids heavy drop shadows. Depth is communicated through **Tonal Layering** and **Subtle Outlines**.

- **Level 0 (Background):** Light Cream (#FBF7F0).
- **Level 1 (Cards/Surface):** White (#FFFFFF) or Warm Cream (#F5EBDD). Surfaces use a 1px solid border (#E5DED4) instead of a shadow.
- **Level 2 (Dropdowns/Modals):** White (#FFFFFF) with a very soft, diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`.
- **Interactive States:** Elements should not "lift" on hover; instead, they should change background color (e.g., a light cream card shifts to a subtle 2% darker tint) or the border color should darken slightly.

## Shapes

The shape language is **Professional and Structured**. 

- **Components:** Use a standard 4px (`rounded-sm`) radius for buttons, input fields, and small UI elements. 
- **Containers:** Dashboard cards and main content containers use an 8px (`rounded-lg`) radius to create a distinct but subtle separation from the background.
- **Icons:** Use linear, 2px stroke icons with "sharp" or slightly rounded joins to match the professional tone. Avoid "blobby" or overly filled icon styles.

## Components

### Buttons
- **Primary:** Deep Burgundy background, White text, 4px radius. High emphasis.
- **Secondary:** Transparent background, 1px Border (Deep Burgundy), Deep Burgundy text.
- **Tertiary:** No border, Muted Gray text, turns Black on hover.

### Cards
- White background, 1px border (#E5DED4), 8px radius.
- Padding should be consistent at 24px for standard cards, 16px for small KPI tiles.

### Data Tables
- **Header:** Background #F5EBDD, Text `label-caps`.
- **Rows:** 1px bottom border only (#E5DED4). Use alternating row stripes (zebra) only for tables exceeding 20 rows.
- **Active State:** A 4px vertical Deep Burgundy stripe on the far left of a selected row.

### Form Fields
- Inputs should have a White background and a 1px #E5DED4 border. 
- On focus, the border color changes to Deep Burgundy. 
- Labels should always be visible above the input field in `label-caps` style.

### Status Badges
- Instead of high-contrast pills, use a subtle 1px border and a desaturated text color.
- Example: "On Track" is a thin Sage border with Sage text; no background fill is required.