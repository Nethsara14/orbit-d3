# ORBIT D3 · Echoes of Space

> Their missions ended. Their stories didn't.

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-0b3d91)](https://www.spaceappschallenge.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Built with HTML, CSS and JavaScript](https://img.shields.io/badge/Built%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)

**Echoes of Space** is an interactive storytelling website about NASA equipment left behind on the Moon and Mars.
Built by **Team ORBIT D3** for the **NASA Space Apps Challenge 2026**
(challenge: [NASA's Discarded Equipment Storytelling](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/)).

## The stories

| Mission | World | Story page |
|---|---|---|
| Apollo 11: Eagle | Moon · 1969 | `stories/apollo/` |
| Apollo 15: Lunar Rover | Moon · 1971 | `stories/apollo-15/` |
| Opportunity | Mars · 2004–2018 | `stories/opportunity/` |
| Ingenuity | Mars · 2021–2024 | `stories/ingenuity/` |

Each story follows the same three chapters: **Beginning → Discoveries → Legacy**.
The mission pages use an interactive trail map: explore each stop to follow the journey from launch to the final signal.

## Features

- Animated hero with a drifting starfield
- Mission cards carousel with pagination dots and auto-scroll
- Mission timeline (1969 → 2024)
- Live "Fresh from the NASA archive" section using the NASA Image and Video Library API (no API key needed)
- Story pages with a photo slideshow and an interactive mission trail map
- Responsive layout (desktop, tablet, mobile) and accessibility basics: skip link, keyboard focus, reduced-motion support

## Tech stack

Plain **HTML, CSS and JavaScript**. No framework, no build step and no installation needed.
It is a static website, so it runs by simply opening `index.html` (see "Run locally" below).

## Project structure

```
orbit-d3/
├── index.html              Homepage
├── assets/images/          Local images (hero illustration, etc.)
├── css/
│   ├── global.css          Shared tokens and base styles
│   ├── hero.css            Navbar and hero
│   ├── home.css            Missions, timeline, NASA news
│   ├── story.css           Shared story page design
│   └── footer.css          Footer
├── js/
│   ├── navigation.js       Mobile menu
│   ├── cards-carousel.js   Mission cards dots and auto-scroll
│   ├── nasa-news.js        NASA archive section (API)
│   ├── story.js            Trail map and stop popups
│   ├── gallery.js          Story photo slideshow
│   └── reveal.js           Scroll reveal effects
├── data/mission-records.json
└── stories/
    ├── apollo/
    ├── apollo-15/
    ├── opportunity/
    └── ingenuity/
```

Each story folder has its own `index.html`, `script.js` (mission data) and `style.css` (theme colours).

## Run locally

1. Clone the repository
   ```bash
   git clone https://github.com/OWNER/orbit-d3.git
   cd orbit-d3
   ```
2. Open the folder in VS Code and start **Live Server** on `index.html`
   (or run `npx serve` or `python -m http.server`, then open the address it shows).

An internet connection is needed for NASA photos, Google Fonts and the NASA API.

## Team workflow

One repository, small pull requests and a stable `main` branch.

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/your-task
# ...edit files...
git add <files>
git commit -m "Describe the change"
git push -u origin feature/your-task
```

Then open a Pull Request into `main` and ask a teammate to review it.

## Team

| Member | Role | Responsibility | GitHub |
|---|---|---|---|
| **Sasindu Nethsara Karanayaka** | Team Leader | Page Footer Story Cards Apollo-15, Ingenuity, Opportunity story | [@Nethsara14] (https://github.com/Nethsara14) |
| **Pasindu Hirushan** | Developer | Page Header&Design, Apollo-11 stories | [@Hirushan450] (https://github.com/Hirushan450) |


## AI tool usage

[Describe honestly how AI tools were used, for example: "Claude (Anthropic) was used to help write and
debug HTML, CSS and JavaScript. All mission facts were checked against NASA sources by the team."]

## License

The code in this repository is released under the [MIT License](LICENSE).
© 2026 ORBIT D3 Team (Sasindu Nethsara Karanayaka, Pasindu Hirushan).

## NASA media and credits

Mission photos and facts come from NASA (NASA/JPL-Caltech, NASA/JSC and others) and are credited on each page.
They are **not** covered by the MIT License and remain subject to
[NASA's media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).
Live data comes from the [NASA Image and Video Library](https://images.nasa.gov).

This is an educational student project and **not an official NASA website**.
