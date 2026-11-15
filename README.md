# ORBIT D3 · Echoes of Space

> Their missions ended. Their stories didn't.

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-0b3d91)](https://www.spaceappschallenge.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-JavaScript-orange)

**Echoes of Space** is an interactive storytelling website about NASA equipment left behind on the Moon and Mars.
Built by **Team ORBIT D3** for the **NASA Space Apps Challenge 2026**.

## Table of contents

- [Challenge](#challenge)
- [Team](#team)
- [Mentor / Monitor](#mentor--monitor)
- [The stories](#the-stories)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Team workflow](#team-workflow)
- [AI tool usage](#ai-tool-usage)
- [Data and credits](#data-and-credits)
- [License](#license)

## Challenge

| | |
|---|---|
| **Event** | NASA Space Apps Challenge 2026 |
| **Challenge** | NASA's Discarded Equipment Storytelling |
| **Team name** | ORBIT D3 |
| **Location / Local event** | [City, Country / local host organisation] |
| **Challenge page** | [spaceappschallenge.org](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/) |

## Team

| Member | Role | Story / responsibility | GitHub |
|---|---|---|---|
| **Sasindu Nethsara Karanayaka** | [e.g. Developer, Homepage and design] | [e.g. Homepage, Opportunity story] | [@your-username](https://github.com/your-username) |
| **Pasindu Hirushan** | [e.g. Developer, Content and research] | [e.g. Apollo, Ingenuity stories] | [@their-username](https://github.com/their-username) |

> Add more rows here if the team has more members.

## Mentor / Monitor

| Name | Role | Organisation | Contact |
|---|---|---|---|
| [Mentor name] | [Mentor / Monitor / Supervisor] | [Institute / organisation] | [email or LinkedIn] |

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
It is a static website, so it runs by simply opening `index.html` (see [Run locally](#run-locally)).

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

## AI tool usage

[Describe honestly how AI tools were used, for example: "Claude (Anthropic) was used to help write and
debug HTML, CSS and JavaScript, and to suggest wording. All mission facts were checked against NASA sources
by the team."]

## Data and credits

- Mission photos and facts come from NASA (NASA/JPL-Caltech, NASA/JSC and others) and are credited on each page.
  They are **not** covered by the MIT License and remain subject to
  [NASA's media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Live data: [NASA Image and Video Library](https://images.nasa.gov).
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts, SIL Open Font License).

This is an educational student project and **not an official NASA website**.

## License

The code in this repository is released under the [MIT License](LICENSE).
© 2026 ORBIT D3 Team (Sasindu Nethsara Karanayaka, Pasindu Hirushan).
