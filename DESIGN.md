---
name: Cyber-Bento System
colors:
  surface: '#101319'
  surface-dim: '#101319'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a30'
  surface-container-highest: '#32353b'
  on-surface: '#e1e2ea'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e1e2ea'
  inverse-on-surface: '#2d3036'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#101319'
  on-background: '#e1e2ea'
  surface-variant: '#32353b'
  surface-card: '#0E131F'
  stroke-glass: rgba(255, 255, 255, 0.06)
  glow-emerald: rgba(16, 185, 129, 0.15)
  glow-violet: rgba(139, 92, 246, 0.15)
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  grid-unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  bento-gap: 24px
---

## Brand & Style

The design system is built on a philosophy of **Neo-skeuomorphic Cyber-minimalism**. It targets high-performance users who value information density presented through a sophisticated, organic lens. The aesthetic balances the mathematical precision of a grid-based "Bento" layout with the soft, ethereal quality of ambient light and organic glows.

The visual narrative is defined by a "Deep Matte Canvas" that serves as a void, where data modules (Bento cards) emerge not just as flat boxes, but as physical objects with subtle depth, tactile surfaces, and internal illumination. The emotional response is one of focused calm, professional mastery, and futuristic reliability.

## Colors

The palette is anchored in a dark-mode-first hierarchy. The primary background uses a "Deep Matte" black to eliminate visual noise. 

- **Canvas:** The foundation is `#080B10`.
- **Surfaces:** Bento cards use `#0E131F`, providing a slight lift from the canvas.
- **Accents:** Emerald is used for success states and growth metrics; Royal Violet and Deep Indigo are reserved for distinct functional modules and creative workflows.
- **Illumination:** Rather than traditional flat fills, accents are often applied as radial gradients or inner glows to simulate light emitting from within the hardware-like modules.

## Typography

This design system utilizes a dual-font strategy to balance approachability with technical precision. 

**Plus Jakarta Sans** handles all primary communication, providing a soft, modern humanist touch that offsets the dark, technical color palette. 

**JetBrains Mono** is used strictly for metadata, labels, and system status indicators. This monospaced choice reinforces the "Cyber-minimalist" theme, making data feel like raw output from a sophisticated engine. All monospaced labels should be set with slightly increased letter spacing to ensure legibility against dark backgrounds.

## Layout & Spacing

The layout follows a strict **Bento-box** philosophy. Content is organized into modular containers that occupy defined cells within a 12-column grid.

- **Grid:** A 12-column fluid grid for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** An 8px base unit governs all padding and margins.
- **The Bento Rule:** Modules should have consistent gaps (`24px`). On desktop, modules may span multiple rows and columns to create visual hierarchy, but must always align to the outer grid boundaries.
- **Containment:** Content within Bento cards should have a minimum internal padding of `32px` to accommodate the large corner radii.

## Elevation & Depth

Depth in this system is achieved through "Ambient Occlusion" and "Inner Illumination" rather than traditional drop shadows.

1.  **Bento Surfaces:** Every card features a `1px` stroke using `rgba(255,255,255,0.06)`. This creates a crisp "glass-edge" that separates the card from the matte background.
2.  **Ambient Occlusion:** Use deep, wide-spread shadows with low opacity (`rgba(0,0,0,0.4)`) to simulate the card sitting millimeters above the canvas.
3.  **Radial Glows:** Interactive or high-priority modules should feature a background radial gradient (e.g., a subtle Emerald glow in the top-right corner) to suggest an internal light source.
4.  **Active State:** When a component is interacted with, the stroke opacity increases, and the internal radial glow intensifies.

## Shapes

The shape language is defined by extreme roundedness, creating an organic, friendly feel within a structured digital space. 

- **Bento Cards:** Use a primary radius of `24px` to `32px`. 
- **Buttons & Inputs:** Follow a pill-shaped convention or a minimum of `16px` radius to maintain harmony with the large container corners.
- **Consistency:** Never mix sharp corners with the Bento system; even small chips and tags must maintain a minimum `8px` radius.

## Components

### Buttons
Buttons are treated as physical "keys." Primary buttons use a solid accent fill (Emerald or Violet) with a subtle top-down linear gradient. Secondary buttons use a ghost style with the `1px` white stroke and a blur background effect.

### Bento Cards
The core component. Every card must have:
- Background: `#0E131F`.
- Border: `1px solid rgba(255,255,255,0.06)`.
- Radius: `24px`.
- Content should be grouped logically with JetBrains Mono labels at the top-left.

### Inputs & Fields
Inputs are recessed. Use a slightly darker fill than the card background (`#05070A`) with an inset shadow to create a "carved" look. The focus state illuminates the entire border with the primary accent color.

### Chips & Tags
Small, high-contrast pills using JetBrains Mono. They should never have a border; instead, use a semi-transparent background of the accent color (e.g., `rgba(16, 185, 129, 0.1)`) to ensure the background matte shows through.

### Progress & Data Viz
Data visualizations should utilize the "Organic Glow" philosophy. Lines in charts should have a soft neon bloom effect, and bar charts should use rounded caps.
