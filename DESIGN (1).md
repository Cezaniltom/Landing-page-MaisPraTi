---
name: Portal Jump
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#191c22'
  surface-container: '#1d2026'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2eb'
  on-surface-variant: '#baccb0'
  inverse-surface: '#e1e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#85967c'
  outline-variant: '#3c4b35'
  surface-tint: '#2ae500'
  primary: '#efffe3'
  on-primary: '#053900'
  primary-container: '#39ff14'
  on-primary-container: '#107100'
  inverse-primary: '#106e00'
  secondary: '#a6e6ff'
  on-secondary: '#003543'
  secondary-container: '#14d1ff'
  on-secondary-container: '#00566b'
  tertiary: '#fff8fb'
  on-tertiary: '#520072'
  tertiary-container: '#f5d1ff'
  on-tertiary-container: '#9c00d5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#79ff5b'
  primary-fixed-dim: '#2ae500'
  on-primary-fixed: '#022100'
  on-primary-fixed-variant: '#095300'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ebb2ff'
  on-tertiary-fixed: '#320047'
  on-tertiary-fixed-variant: '#74009f'
  background: '#10131a'
  on-background: '#e1e2eb'
  surface-variant: '#32353c'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  mono-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is built for a high-end, multiversal travel experience, blending the chaotic energy of a sci-fi adventure with the precision of a luxury concierge. The aesthetic is a refined interpretation of "Interdimensional High-Tech," drawing heavily from **Glassmorphism** and **Cyberpunk-Minimalism**.

The visual narrative centers on the contrast between the infinite void of space and the electric vitality of interdimensional portals. Interfaces should feel like they are projected onto advanced crystalline displays—ethereal yet tactile. The target audience is the sophisticated cosmic traveler who demands both cutting-edge performance and high-fashion aesthetics. The emotional response is one of awe, technical confidence, and infinite possibility.

## Colors
The palette is anchored by **Deep Dark Space (#0B0E14)**, providing a high-contrast foundation for luminous elements. The **Neon Green Primary (#39FF14)** is used exclusively for interactive triggers, status indicators, and "portal" focal points. 

Secondary and tertiary accents (Cyan and Electric Purple) are reserved for data visualization or distinguishing between different dimensions/travel tiers. Surfaces utilize a semi-transparent white with high background blur to create a "glass" substrate that feels distinct from the background void.

## Typography
The typography system uses **Space Grotesk** for headlines to provide a technical, geometric edge that feels futuristic without being illegible. For body copy, **Inter** ensures maximum readability across dense travel itineraries. 

**Geist** is introduced for labels and UI metadata, utilizing its monospaced-influenced proportions to evoke a "developer/terminal" feel suitable for multiversal navigation systems. Large headlines should use tighter letter spacing to maintain a high-end, editorial impact.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous margins to simulate the emptiness of space. A 12-column grid is standard for desktop, but elements frequently break the grid or use "off-center" alignment to create a dynamic, non-linear feel.

Spacing is strictly based on an 8px scale. High-priority content sections are separated by large vertical gaps (128px+) to allow the background "portal light leaks" and starfield textures to breathe. Component padding should be generous to maintain the airy, glassmorphic aesthetic.

## Elevation & Depth
Depth is created through **Glassmorphism** rather than traditional drop shadows.
- **Level 1 (Base):** Deep Space background with occasional "portal leaks" (blurred radial gradients of #39FF14 at 10% opacity).
- **Level 2 (Panels):** `backdrop-filter: blur(20px)` with a `1px` stroke. The stroke should be a linear gradient: `top-left: rgba(255,255,255,0.2)` to `bottom-right: rgba(255,255,255,0.05)`.
- **Level 3 (Interactions/Modals):** Increased blur (40px) and a subtle outer glow using the Primary color (`box-shadow: 0 0 20px rgba(57, 255, 20, 0.3)`).

Avoid solid blacks for overlays; always use varying levels of transparency and blur to maintain the "holographic" quality.

## Shapes
This design system uses a **Soft (0.25rem)** base roundedness to maintain a precise, engineered feel. Large glass cards and sections may use **rounded-lg (0.5rem)**, but the system steers away from overly pill-shaped elements to avoid appearing too "friendly" or "soft." Sharp corners are used for decorative UI accents (like frame corners or crosshair symbols) to emphasize the technical nature of the interface.

## Components
- **Buttons:** Primary buttons are solid Neon Green with black text. On hover, they emit a strong external glow. Secondary buttons are ghost-style with a thin white border and backdrop blur.
- **Input Fields:** Semi-transparent containers with a `1px` bottom border. When focused, the border transitions to Primary Green and a faint green glow appears behind the text.
- **Cards (Dimension Tiles):** Large glass panels. The background of the card should feature a subtle, desaturated image of the destination dimension, overlaid with a heavy blur and a 0.05 opacity white tint.
- **Chips/Status:** Small, high-contrast badges. "Safe" dimensions use Green, "Unstable" dimensions use the Purple tertiary color with a pulsing animation.
- **Navigation:** A fixed top bar with `backdrop-filter: blur(12px)`. Links use Geist Mono in all-caps. The active state is indicated by a small neon green dot below the text.
- **Portal Loader:** A circular SVG stroke animation using the Primary color with a high-intensity Gaussian blur to simulate a swirling portal.