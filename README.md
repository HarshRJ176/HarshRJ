# Harsh Raj Jaiswal — Aerospace Engineering Portfolio

Live: [harshrajjaiswal.com.np](https://harshrajjaiswal.com.np/)

A cinematic, single-page portfolio built around an orbiting Earth centerpiece.
Scroll position drives a docked Earth, an elliptical orbit with a satellite
relay, and per-section orbital markers that track which part of the profile
is currently in view — Mission Brief, Experience, Education, Projects,
Research, Skills, and Contact.

## Stack

- React 19 + TypeScript, built with Vite
- React Three Fiber / Three.js for the WebGL scene (procedural shaders, no
  baked lighting)
- GSAP + ScrollTrigger for the opening cinematic and scroll-scrubbed
  animation
- Lenis for smooth scroll
- Framer Motion for DOM-layer transitions
- Plain CSS (no Tailwind) — design tokens in `src/styles/variables.css`

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b --noEmit
npm run lint        # eslint .
npm run build        # production build -> dist/
npm run preview      # serve the production build locally
```

## Structure

```
src/
  config/       Theme tokens, scene geometry, opening-sequence timing
  engine/       WebGL plumbing: Canvas wrapper, scene root, lighting,
                environment, postprocessing, camera rig, flightState
                (the mutable animation bus GSAP writes to and R3F reads)
  scene/        Visual objects — Starfield, Nebula, SunGlow, and
                PlanetSystem (Earth, Clouds, Atmosphere, orbital path,
                orbit markers, satellite relay)
  cinematic/    Opening timeline (useOpeningTimeline), scroll-scrubbed
                docking narrative (useScrollNarrative), HeroSection
  mission/      The seven scrollable content sections
  content/      Plain-data files — edit these to update copy, projects,
                research, experience, education, or contact details
  ui/           Shared presentational components (Panel, SectionHeading,
                NavDock, HoverDetailRail, DetailModal)
  hooks/        useLenis, useReducedMotion, useScrollReveal,
                useActiveSection
  styles/       Plain CSS loaded in cascade order from main.tsx
```

## Editing content

Everything under `src/content/` is plain data — no need to touch component
code to update a project, add a research entry, or change a contact link.

## Deploying

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. The custom domain is set via `CNAME`.
