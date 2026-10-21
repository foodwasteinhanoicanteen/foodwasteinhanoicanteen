# Wasted by Design + CampusMeal

The MANA3021 Team Mini Social Impact Project website (food waste in Hanoi, VinUni canteens) and the CampusMeal pilot app, rebuilt with **TypeScript, React and Node.js**.

It is a **static website** (HTML, CSS and JavaScript only) published with **GitHub Pages**. There is no server and no database:

- Visitors see the team content from `public/content.json`.
- Anything saved on the site (team edits, CampusMeal orders, menus and logs) stays in **that browser's own storage** (IndexedDB).
- No CDN: React and the fonts come from npm and are bundled into the app.

| What | Where |
|---|---|
| Published team text, photos/videos and survey rows | `public/content.json` (you export it from the site, see below) |
| Unpublished edits, CampusMeal data | the browser's IndexedDB, per browser |
| Website | http://localhost:5173 (dev) or your GitHub Pages address |
| CampusMeal app | `/campusmeal.html` |

---

## 1. Publish on GitHub Pages

1. In the repository: **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` runs the tests, builds and publishes `dist/`.

The address is `https://<account>.github.io/<repo>/`. For the account's own address (`https://<account>.github.io/`), name the repository `<account>.github.io`.

## 2. Run it on your computer

You need **Node.js 20.12 or newer**.

```bash
npm install             # once
npm run dev             # http://localhost:5173, rebuilds on save (refresh the page)
```

## 3. Everyday use

### Website: edit mode → publish

1. Every photo or video slot has an **Upload photo or video** button. To change text, click **Turn on** in the dark bar at the bottom right: every yellow box then gets an **edit** button. Anyone can do this; there is no PIN. Survey data goes in page 04, tab "Enter data".
2. Your edits save **only in your browser**. To publish them, click **Export content.json**, put the file in `public/` (replace the old one), commit and push.
3. **Discard local edits** shows the published content again. Do this after someone else publishes, so you start from their version.

Accepted files are JPG, PNG, WebP, GIF, MP4 and WebM, up to 20 MB each. They are stored inside `content.json`, so keep videos short or compressed.

### CampusMeal

A demo that runs in each visitor's browser. A new browser starts with six weeks of **sample** data. Anyone can switch between the **Student** and **Kitchen** screens at the top; there is no login.

To start over, clear the site's data in the browser (site settings → clear data).

## 4. Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development: rebuild on save + local web server |
| `npm run build` | Build the static site into `dist/` |
| `npm test` | Unit tests: statistics vs scipy, survey import, forecast rules, data rules and uploads |
| `npm run typecheck` | TypeScript check of `src/`, `shared/`, `scripts/` |

## 5. How the code is organised

```
public/              HTML shells (index.html = website, campusmeal.html = app) with the inline SVG icon sprite,
                     and content.json once the team publishes edits
src/
  site.tsx           website entry: providers + the ten pages
  campusmeal.tsx     CampusMeal entry
  pages/             one component per page (content, converted from the original HTML)
    meta.ts          page list, design-thinking stages, sub-tab names
  components/
    layout/          TopBar, PageSection, Tab, SubTabs, Pager, StageStepper, HomeCards, Footer
    ui/              Field + MediaSlot + edit bar (EditMode), Card/More/Front (dialog cards),
                     FilterButtons, CountUp, CopyButton, BAToggle/BAShow, Overlays (toast, tooltip, dialog), Html
    widgets/         interactive pieces per page: problem (calculator, donut, bars, food journey, law timeline),
                     ethics (flip cards, dilemmas, quotes, verdict grid), plan (scoring, roadmap, team, references),
                     app (phone preview, functions, kitchen forecast, protocol download)
    survey/          survey state (example vs our data), all analysis panels, the Enter data screen
  campusmeal/        app shell (App.tsx), data hook (store.tsx), screen state (nav.tsx), views/student + views/staff
  data/content.ts    text and data for the widgets (charts, laws, dilemmas, references, roadmap…)
  state/             hash router, website data provider, polling hook, tiny shared-store helper
  api/client.ts      api() helper (adds the anonymous browser id)
  api/local.ts       the data rules that used to be the server, saving to IndexedDB
  styles/            site.css and campusmeal.css (unchanged from the original), fonts.ts
shared/              rules, schemas and analysis code
  schemas/           zod schemas: what may be saved (site fields, media, survey rows, every CampusMeal document)
  models/            data classes: SurveyResponse, Order
  stats.ts           ANOVA, Tukey HSD (R's ptukey), repeated-measures ANOVA, Friedman, chi-square, t-tests
  survey.ts          survey questions, CSV/TSV import and validation, analysis helpers
  surveyReport.ts    bilingual conclusion and the survey numbers quoted across the site
  campusmeal/        forecast, batches, daily stats, weekly report (logic.ts) and sample data (demo.ts)
  data/              the 50 example survey responses
scripts/             build.ts (static build) and dev.ts (rebuild on save + local web server)
.github/workflows/   deploy.yml: build and publish to GitHub Pages on every push to main
```

### Where to change things

| To change | Edit |
|---|---|
| Page text | the page file in `src/pages/`. Yellow placeholders are `<Field id="…">placeholder</Field>`, and the saved text replaces them. |
| Chart, timeline, dilemma or reference data | `src/data/content.ts` |
| Page order, sub-tab names, design-thinking steps | `src/pages/meta.ts`. Keep the `<Tab id>` values in the page files the same. |
| Survey questions or columns | `shared/survey.ts`. Then update the example rows in `shared/data/exampleSurvey.ts`. |
| CampusMeal rules (forecast, batch, last-call limits) | `shared/campusmeal/logic.ts`. Defaults are also editable in the app's Settings screen. |
| What may be saved | `shared/schemas/` |
| Look and feel | `src/styles/site.css` or `src/styles/campusmeal.css` |
| Fixed images | Put them in `public/` (e.g. `public/logo.png`) and refer to them as `logo.png`. |

## 6. Known limits

- **No shared data:** each browser keeps its own CampusMeal orders and edits. A real canteen pilot, where students and the kitchen see the same orders, needs a server and a database again.
- **No login:** every visitor can turn on edit mode and open the kitchen screens. That is safe only because nothing a visitor does leaves their own browser.
- **Publishing edits:** one person's edits reach visitors only after they export `content.json` and push it. Two people editing at the same time will overwrite each other's export.
- **Clearing the browser:** a student who clears browser data loses their orders and gets a new anonymous id.
