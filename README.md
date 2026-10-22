# FFI — Future of Finance Institute website (React + Vite)

## Run
npm install
npm run dev          # local dev server
npm run build        # production build -> dist/
npm run build:single # one self-contained HTML -> dist-single/index.html

## Structure
src/
  data/content.js        all copy (nav, pillars, initiatives) — edit text here
  components/
    Header.jsx           sticky nav, mobile menu (Esc closes)
    Hero.jsx             headline, glass slash, INNOVATE/INTEGRATE/IMPLEMENT marquee (pausable)
    WhatWeDo.jsx         stacked pillar cards + glass icons
    Initiatives.jsx      horizontal scroll-snap carousel with prev/next buttons
    Ecosystem.jsx        node network graphic
    Footer.jsx           contact, links, legal bar
    Visuals.jsx          logo + CSS/SVG stand-ins for the 3D renders
  hooks/useReveal.js     scroll reveal via IntersectionObserver
  index.css              design tokens (:root) + all styles

## Swap in real Figma assets
The 3D glass objects, network sphere and initiative logos are CSS/SVG recreations.
Export the renders from Figma as WebP and replace the components in Visuals.jsx
(keep aria-hidden on decorative images). Replace placeholder emails/links in Footer.jsx.

## UX notes (UI/UX Pro Max checklist)
- Skip link, visible focus rings, semantic headings, labelled icon buttons
- 44px touch targets, keyboard-operable carousel and marquee pause
- prefers-reduced-motion disables marquee, float and reveal animations
- Responsive at 375 / 768 / 1024 / 1440, no horizontal scroll
