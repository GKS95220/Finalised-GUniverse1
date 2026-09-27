# GUniverse — Landing Page PRD

## Original Problem Statement
Sleek, modern, futuristic, professional landing page for GUniverse — a pre-seed startup at the intersection of XR, spatial computing, and digital therapeutics. Dark-mode glassmorphism aesthetic with cyan/deep-indigo/electric-violet gradients and neon accents. Sections: header/nav, hero with 3D spatial canvas, problem & solution, core platform features grid, target markets, CTA banner with lead form, footer.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion (scroll reveals, masked hero line reveal) + lenis (momentum smooth scroll) + three.js (interactive 3D particle/orbital hero canvas with mouse parallax)
- Backend: FastAPI, all routes under /api
- DB: MongoDB via MONGO_URL/DB_NAME env vars — `leads` collection stores pilot-access submissions
- Design tokens: /app/design_guidelines.json (deep space #050714, cyan #00f2fe, violet #8b5cf6; Outfit/Inter/JetBrains Mono)

## User Personas
- Healthcare providers / rehab center directors evaluating XR therapy pilots
- Medical institutions & enterprises exploring immersive training
- Investors reviewing traction and vision

## Core Requirements (static)
1. Sticky glass nav: Platform, Applications, Technology, Traction, About Us, Contact + "Request Pilot Access" CTA
2. Hero: headline, subheadline, Explore Platform / View Pitch Highlights CTAs, interactive 3D canvas
3. Problem & Solution section
4. Features grid: Spatial Therapeutics, WebXR compatibility, Interactive Learning, Data-Driven Insights
5. Target markets: Healthcare & Rehab Centers / Institutions & Enterprises (tabs)
6. CTA banner with lead form (Name, Email, Organization, Message)
7. Footer with links, LinkedIn, contact details

## Implemented (2026-09-19)
- Full landing page: Navbar (mobile menu), Hero (3D canvas, masked line-by-line reveal, scroll parallax), editorial marquee, numbered manifesto chapters (problem/solution), bento features grid, markets tabs with imagery, technology stack section, traction stats with animated counters, about section with parallax image, CTA lead form, footer
- Backend: POST /api/leads (validated, EmailStr), GET /api/leads
- Lead form verified end-to-end (UI submit → toast → success state → stored in MongoDB)
- All interactive elements carry data-testid attributes per design guidelines

## Implemented (2026-09-19, iteration 2)
- Email alerts: every pilot form submission triggers a branded notification email via Emergent-managed Resend proxy (verified 202 Accepted). Recipient is ADMIN_NOTIFY_EMAIL in backend/.env — currently the Resend test sink until the user provides a real inbox.
- Private Leads Dashboard at /admin: JWT cookie auth (access + refresh, httpOnly), bcrypt hashing, brute-force lockout (5 tries / 15 min), seeded admin, leads table with stats (total, orgs, latest). Footer "Admin" link.
- Pitch Highlights: hero button opens an animated 7-chapter investor pitch modal (Vision → The Ask) with ESC/backdrop close and CTA into the contact form.
- Logo: user will add manually — text logo retained; swap in Navbar.jsx `Logo` component (also used in footer & admin).
- Test playbook saved to /app/auth_testing.md; credentials in /app/memory/test_credentials.md.

## Implemented (2026-09-19, iteration 3)
- Real notification inbox connected: lead alerts now send to G.k.sharma95220@gmail.com (verified 202 Accepted via managed Resend proxy)
- User's real logo integrated: cropped orbital mark saved to frontend/public/guniverse-logo.png, used in nav, footer, and admin login via the shared Logo component

## Implemented (2026-09-23, iteration 4)
- Website content rebuilt precisely from user's two PDFs (Therapeutic VR Blueprint + Technology Presentation):
  - Problem/Solution: in-vivo cost/risk, imaginal variability, no environment control vs safe simulations, real-time trigger adjustment, SUDS + EHR logging
  - Platform: Patient VR Engine (Quest 3S + Unity), Therapist Console (WebSocket live control, instant freeze), HIPAA Cloud Backend
  - New Ecosystem section: 6 planetary modules (Calm, Confidence, Focus, Sleep, Phobia Worlds, Recovery Spaces)
  - Markets: 3 tabs — Health Institutes (MedTech), Tier-1 Educational Institutes (EdTech), Direct Patients (B2C, incl. Dry Eye treatment)
  - Technology: Quest 3S 128GB, Unity + Sketchfab/Blender pipeline, clinician control loop (SUDS 1-10, live mirror), neuroscience layer (binaural beats, 5 pain regions, Dr. Sweta / Limitless Brain Labs)
  - Traction: 60% stress / 43% pain reduction, 6-min sessions, $18.6B market by 2034 (19.3% CAGR), Nirmaan Summer Cohort '25 badge, 4-phase roadmap (MVP → 5 clinic pilots → ISO 13485/SaMD → national), ARR $0.4M→$12.5M
  - About: non-pharmacological mission, Nirmaan cohort, research backing (Harvard brain wiring, Hanyang ACT, J. Orthopaedic Surgery 2025)
  - Pitch modal: 8 chapters mirroring the real deck incl. $299/seat/mo SaaS + B2B2C + hardware bundles

## Implemented (2026-09-27, iteration 5)
- User's headset animation (1758036972720.mp4, "G"-branded VR headset cinematic) integrated site-wide:
  - Converted to a seamless boomerang loop (forward+reverse, ~1.1MB) at frontend/public/guniverse-headset.mp4
  - Hero: floating glass video frame with glow, "Realtime Render" + "GUniverse Engine · Meta Quest 3S" chips, idle float + scroll parallax, alongside the existing three.js particle globe
  - New full-bleed "The Experience" cinematic band after the marquee: dark-graded video background with scroll parallax/zoom and "Step inside the future of care." headline
- Removals per user: HIPAA cloud backend card + all HIPAA mentions, $299/seat ARR line, Nirmaan cohort badge/mentions, Dr. Sweta (Limitless Brain Labs) name, execution roadmap strip

## Backlog
- P0: None
- P1: Real social links (LinkedIn URL); pitch modal still mentions roadmap/ARR + $299 — user may want synced
- P2: Deck PDF downloads, lead CSV export, reply-to-lead, favicon from logo, scenario showcase gallery
