---
name: Mohammad Hosein Portfolio
description: Swiss Editorial × Neo-Brutalism × Y2K Technical Nostalgia Design System
---

<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Mohammad Hosein Portfolio

## Overview

**Creative North Star: "The Swiss-Y2K Architectural Blueprint"**

A high-contrast, technical editorial design system built on a warm paper-white canvas. Refuses generic SaaS dark mode and decorative gradients in favor of structural grid lines, bold typographic lockups, and flat, intentional color accents. 

Designed specifically for a Senior Frontend Developer portfolio, combining the systemic order of Swiss graphic design, the physical edge of Neo-Brutalism, and the technical nostalgia of early digital CAD/blueprint software.

**Key Characteristics:**
- Warm paper-white ground (`#F4F3EF`) with deep charcoal ink (`#111111`).
- Hairline structural grid borders (`1px #111111`) and monospace corner labels.
- Asymmetric layout driven by giant typographic identity lockups.
- Flat accent colors used as structural markers rather than background washes.
- Interactive CAD-like live blueprint elements.

## Colors

The color palette is high-contrast, flat, and intentional. Color is used strictly for focus, state changes, and structural metadata.

### Primary
- **Deep Charcoal Ink** (`#111111`): Primary text, headings, hairline borders, and structural rules.

### Secondary
- **Warm Paper White Ground** (`#F4F3EF`): Main canvas surface, creating a physical paper feel.

### Accent Roles
- **Electric Cobalt** (`#0047FF`): Primary interactive focus, active tab borders, and primary CTA buttons.
- **Acidic Lime** (`#D4FF00`): Secondary highlights, status badges, and technical tags.
- **Saturated Red-Orange** (`#FF3B00`): Critical live telemetry indicators, alerts, and active crosshair coordinates.

### Named Rules
**The Rarity Rule.** Accent colors appear on ≤15% of any viewport. Their structural scarcity is what creates high visual impact.

## Typography

**Display Font:** Space Grotesk (or Syne)
**Body & Code Font:** JetBrains Mono (or Space Mono)

**Character:** High-contrast pairing between a bold, geometric wide display face and a crisp, engineering-grade monospace font.

### Hierarchy
- **Display** (Bold 700, 3rem–5rem, line-height 1.05): Typographic name lockups and section titles.
- **Headline** (SemiBold 600, 1.5rem–2.5rem, line-height 1.2): Project headlines and technical statements.
- **Body** (Regular 400, 0.9rem–1.05rem, line-height 1.6, max 70ch): Descriptive text and case study summaries.
- **Label / Monospace** (Medium 500, 0.75rem–0.85rem, uppercase, tracked): Grid coordinates, code metrics, and status metadata.

## Layout

An asymmetric, grid-driven spatial model with visible hairline borders separating content zones. 

- **Grid:** Strict 12-column grid with exposed 1px border dividers.
- **Spacing Rhythm:** Tight metric cards paired with generous structural whitespace.
- **Responsiveness:** Collapses from multi-column technical inspection panels to single-column stacked blueprint cards on mobile.

## Elevation & Depth

**The Flat-By-Default Rule.** Surfaces are completely flat at rest with zero box-shadows. Depth is conveyed strictly through hairline borders (`1px #111111`), color contrast, and layered grid borders—never blur or soft drop-shadows.

## Shapes

- **Corners:** Sharp, zero-radius corners (`border-radius: 0px`) or minimal 2px technical cuts.
- **Borders:** Consistent 1px solid deep charcoal borders (`border: 1px solid #111111`).

## Do's and Don'ts

### Do:
- **Do** maintain a warm paper-white background (`#F4F3EF`) with crisp charcoal borders.
- **Do** use JetBrains Mono for all metadata, metrics, logs, and grid labels.
- **Do** keep accent colors flat, high-contrast, and strictly functional.

### Don't:
- **Don't** use dark-mode backgrounds, generic SaaS blue/purple gradients, or glassmorphism.
- **Don't** use soft drop-shadows, blurry rounded containers, or centered hero templates.
- **Don't** use avatar profile photos or generic placeholder marketing copy.
