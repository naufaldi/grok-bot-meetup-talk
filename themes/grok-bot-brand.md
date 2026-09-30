---
name: Grok Bot Brand
description: Light, high-contrast meetup deck. White canvas, ink type, official Grok Bot mark, silk gradient only inside capsules and cards.
mode: light
---

# Grok Bot Brand (light)

## Aesthetic

White canvas, near-black type, one idea per page. Brand color lives in small moments: a silk capsule holding the mark, a dot in the eyebrow, an accent on one word. Reference: the meetup wall (paper `#f6f6f6`, ink `#111`, black mark with white eyes, one big color capsule) and the Grok Bot marketplace.

## Palette

- Canvas: `#ffffff`
- Ink: `#0b0b0f`, secondary `#3a3a44`, muted `#62626e`
- Card: `#f4f4f6`, hairline `#e2e2e7`
- Magenta accent: `#c0278a` (core story)
- Orange accent: `#e2560a` (use cases, praktek, Q&A)
- Silk: `slides/grok-bot-meetup/assets/silk-magenta.jpg`, `silk-orange.jpg` (cropped from the official theme art with the lockup removed). Only inside capsules and cards, never as a page background.

## Typography

- Display: Universal Sans Display 550, tight tracking (`-0.035em`)
- Body: Universal Sans Text 400 / 550
- Labels: Geist Mono, uppercase, `0.12em` tracking
- Claim titles 92 to 120px, hero 184 to 320px, body 40 to 46px, captions 22 to 30px
- Fallback stack: Inter, system-ui

## Marks

- Grok Bot mark is drawn from the official SVG paths. On white: ink head, white eyes. On silk: white head, ink eyes.
- SpaceXAI wordmark: `spacexai-wordmark-black.svg` on light, `spacexai-wordmark-white.svg` on silk. Footer on every page, "Presented by" lockup.
- Never redraw the mark or approximate the wordmark in type.

## Layout

- Canvas 1920x1080, horizontal padding 120, content starts at y=170, footer at y=1028
- Header: small mark + "Grok Bot Meetup". Footer: wordmark left, page counter right
- Left-aligned claim title, one diagram or visual per page

## Motion

- Enter: rise 22px with stagger, about 0.75s, expo-out
- Eyes: blink every 5.6s, idle look cycle every 10s, glance toward the content after enter, wake-up on hero marks
- Capsules: slow silk pan, hero marks float
- Diagrams draw in (curves, arrows, timelines)
- Page transition: 260ms rise, held exit. Breath dip only on use-case start and demo.
- All motion is scoped to the active page and honors reduced motion

## Assets

- `assets/grok-bot-mark.svg`, `assets/spacexai-wordmark-*.svg`, `assets/meetup-qr.png`
- `assets/silk-magenta.jpg`, `assets/silk-orange.jpg`
- `assets/student-school-room.png` (real Grok Bot room, student use case)
