# Wasted by Design + CampusMeal

The MANA3021 Team Mini Social Impact Project website (food waste in Hanoi, VinUni canteens) and the CampusMeal pilot app, rebuilt with **TypeScript, React and Node.js**.

Everything runs on your own computer:

- No Firebase, Supabase, Google Cloud or any other online database.
- No OAuth or Google login.
- No CDN: React and the fonts come from npm and are bundled into the app.

| What | Where |
|---|---|
| Saved data (team text, survey rows, CampusMeal orders, menus and logs) | `data/db.json`, a single JSON file |
| Uploaded photos and videos | `assets/uploads/` |
| Website | http://localhost:5173 |
| CampusMeal app | http://localhost:5173/campusmeal |

---

## 1. Run it (first time)

You need **Node.js 20.12 or newer**. Download the LTS version from nodejs.org, then check it in a terminal:

```bash
node -v   # should print v20.12 or higher
```

Then, inside this folder:

```bash
npm install             # 1. install React, TypeScript, esbuild, zod, fonts (once)
cp .env.example .env    # 2. create your settings file (Windows: copy .env.example .env)
#                         3. open .env and change STAFF_PIN to your own team PIN
npm run seed:demo       # 4. optional: load 6 weeks of SAMPLE CampusMeal data to try the app
npm run dev             # 5. start everything
```

Open http://localhost:5173. Press **Ctrl + C** in the terminal to stop.

- `npm run dev` rebuilds the browser code every time you save a file under `src/`. Refresh the page to see the change.
- If you change a file under `server/`, stop the command with Ctrl + C and start `npm run dev` again.

## 2. Everyday use

### Website: team edit mode

1. Click **Unlock** in the dark bar at the bottom right of the website.
2. Enter the `STAFF_PIN` from `.env`.
3. Click **Turn on**. Every yellow box now has an **edit** button, and every photo or video slot has an **Upload photo or video** button.

Text saves to `data/db.json`. Files save to `assets/uploads/`. Accepted files are JPG, PNG, WebP, GIF, MP4 and WebM, up to 20 MB each.

### Survey data (page 04, tab "Enter data")

You must be unlocked to save survey data.

1. Copy the Google Forms response sheet (Responses → View in Sheets), including the header row.
2. Paste it, press **Check data**, then choose **Replace** or **Add**.

The ANOVA, Tukey, robustness checks, conclusion and every survey number on the site recalculate automatically. **Download as CSV** exports the saved rows.

### CampusMeal

| Who | How |
|---|---|
| Students | Open `/campusmeal`. No login is needed. Each browser gets an anonymous id (kept in the browser), so students only ever see their own orders, ratings and feedback. |
| Kitchen staff | Click **Kitchen login** and enter the same `STAFF_PIN`. This unlocks the Dashboard, Pickups, Last call & donate, Waste log, Menu planner, Insights, Weekly report and Settings. |

- **Empty app:** run `npm run seed` to create the six starter dishes for this week and next. You can also use **Create starter menu** in the Menu planner.
- **Phones on the same Wi-Fi:**
  1. Set `HOST=0.0.0.0` in `.env` and restart.
  2. Open `http://<this-computer's-IP>:5173/campusmeal` on the phone.

### Seeding and resetting

> Stop the server (Ctrl + C) before running a seed command. The running server keeps its own copy of the data in memory and would overwrite the seed.

| Command | What it does |
|---|---|
| `npm run seed` | Creates the starter menu, only if CampusMeal has no dishes yet. |
| `npm run seed:demo` | Replaces **all CampusMeal data** with sample data. Website text, media and survey rows are kept. |

To reset everything, stop the server and delete `data/db.json` and the files in `assets/uploads/` (keep `.gitkeep`).

**Back up** by copying `data/db.json` and `assets/uploads/`.

## 3. Production-style run

```bash
npm run build   # bundles the browser code into dist/ (minified)
npm start       # serves dist/, the API and assets/ on PORT
```

## 4. Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development: rebuild on save + local server |
| `npm run build` | Build the website and CampusMeal into `dist/` |
| `npm start` | Run the server with the last build |
| `npm test` | Unit tests: statistics vs scipy, survey import, forecast rules, server permissions and uploads |
| `npm run typecheck` | TypeScript check of `src/`, `shared/`, `server/`, `scripts/` |
| `npm run seed` / `npm run seed:demo` | Starter menu / sample data for CampusMeal |

## 5. How the code is organised

```
public/              HTML shells (index.html = website, campusmeal.html = app) with the inline SVG icon sprite
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
  api/client.ts      fetch wrapper (adds the anonymous browser id and the PIN)
  styles/            site.css and campusmeal.css (unchanged from the original), fonts.ts
shared/              code used by both browser and server
  schemas/           zod schemas: what may be saved (site fields, media, survey rows, every CampusMeal document)
  models/            data classes: SurveyResponse, Order
  stats.ts           ANOVA, Tukey HSD (R's ptukey), repeated-measures ANOVA, Friedman, chi-square, t-tests
  survey.ts          survey questions, CSV/TSV import and validation, analysis helpers
  surveyReport.ts    bilingual conclusion and the survey numbers quoted across the site
  campusmeal/        forecast, batches, daily stats, weekly report (logic.ts) and sample data (demo.ts)
  data/              the 50 example survey responses
server/
  main.ts            starts the server
  index.ts           node:http server: API routes, /assets/*, built app
  routes/site.ts     /api/site: fields, media uploads, survey rows
  routes/campusmeal.ts  /api/cm: CampusMeal documents with per-student and staff rules
  store.ts           JSON file database with atomic writes
  auth.ts            team PIN (with lock-out after 5 wrong tries) and anonymous student id
  seed.ts            npm run seed / seed:demo
assets/uploads/      uploaded photos and videos
data/db.json         created on first save
```

### Where to change things

| To change | Edit |
|---|---|
| Page text | the page file in `src/pages/`. Yellow placeholders are `<Field id="…">placeholder</Field>`, and the saved text replaces them. |
| Chart, timeline, dilemma or reference data | `src/data/content.ts` |
| Page order, sub-tab names, design-thinking steps | `src/pages/meta.ts`. Keep the `<Tab id>` values in the page files the same. |
| Survey questions or columns | `shared/survey.ts`. Then update the example rows in `shared/data/exampleSurvey.ts`. |
| CampusMeal rules (forecast, batch, last-call limits) | `shared/campusmeal/logic.ts`. Defaults are also editable in the app's Settings screen. |
| What the server accepts | `shared/schemas/` |
| Look and feel | `src/styles/site.css` or `src/styles/campusmeal.css` |
| Fixed images | Put them in `assets/` (e.g. `assets/images/logo.png`) and refer to them as `/assets/images/logo.png`. |

## 6. API (for reference)

All responses are JSON.

- **PIN:** routes that need it check the `x-staff-pin` header.
- **Students:** CampusMeal identifies students with the `x-client-id` header.

| Method | Path | Who | Purpose |
|---|---|---|---|
| GET | `/api/session` | anyone | `{ staff, editingEnabled }` |
| GET | `/api/site` | anyone | team text, media and survey rows |
| PUT / DELETE | `/api/site/fields/:id` | PIN | save or clear one yellow box (`{ "v": "text" }`) |
| PUT / DELETE | `/api/site/media/:slot` | PIN | upload (raw file body, `Content-Type` = file type) or remove |
| PUT | `/api/site/survey` | PIN | replace survey rows (`{ "rows": [[…23 answers…]] }`) |
| GET | `/api/cm` | anyone | menus, settings and logs. Students get only their own orders, ratings and feedback; staff get all. |
| PUT / PATCH / DELETE | `/api/cm/:collection/:id` | see below | replace, merge into, or delete a document |

| Collections | Who can write |
|---|---|
| `settings`, `dishes`, `days`, `log` | staff only |
| `orders`, `ratings`, `feedback` | the student whose id matches `:id`, or staff |

Every write is checked against the zod schema before it is saved.

## 7. Known limits

- **Login:** one shared team PIN and an anonymous browser id, not personal accounts. This is fine for a class pilot. Add real logins before using it across the whole university.
- **Clearing the browser:** a student who clears browser data gets a new anonymous id, and with it a new order history.
- **Live updates:** the website and the app check for changes every 4–5 seconds instead of receiving them instantly.
- **Data storage:** `data/db.json` suits one canteen pilot. For many users or years of data, switch the store in `server/store.ts` to SQLite.
