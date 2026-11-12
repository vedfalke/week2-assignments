# QuickDrop – Responsive Company Website

A simple 4-page website for a fictional delivery company, built with plain HTML, CSS and JavaScript.

**Live demo:** _add your GitHub Pages / Netlify link here_

## Pages
- `index.html` – Home (hero with address search and order card, category chips, how it works, call-to-action)
- `about.html` – Company story and team
- `services.html` – Service cards grid
- `contact.html` – Contact form with validation

## Features
- Glass (frosted) UI using `backdrop-filter`
- Responsive navbar with hamburger menu on mobile
- CSS Grid and Flexbox layouts
- Same footer on every page
- Form validation (name, email format, message length)
- Fake order tracker on the home page (try `QD123`)

## Design decisions
- **Colors:** green accent on a soft mint/sky/lavender gradient, so the glass effect is visible.
- **Font:** system font stack – no extra downloads, loads fast.
- **Icons:** emojis – no icon library needed.
- **Breakpoints:** 900px (tablet, 2 columns) and 700px (mobile, 1 column + hamburger).
- **Semantic HTML:** `header`, `nav`, `main`, `section`, `footer`.

## Run locally
Open `index.html` in a browser. No install needed.

## Publish on GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo → Settings → Pages → Branch: `main` → Save.
3. Copy the link into the Live demo line above.

## Screenshots
Take them in Chrome DevTools (F12 → device toolbar) at 375px, 768px and 1280px, then save them in a `screenshots/` folder.
