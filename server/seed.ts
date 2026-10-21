/* Fill CampusMeal with data. Website text, media and survey data are never touched.
   npm run seed        → starter menu (six overview dishes, this week and next) if CampusMeal is empty
   npm run seed:demo   → 6 weeks of sample service data (replaces all CampusMeal data) */
import { config } from "./config";
import { JsonStore } from "./store";
import { demoSeed, starterSeed } from "../shared/campusmeal/demo";

const demo = process.argv.includes("--demo");
const store = new JsonStore(config.dbFile);
const cm = store.get().cm;
const hasData = Object.keys(cm.dishes).length > 0;

if (!demo && hasData) {
  console.log("CampusMeal already has dishes, nothing changed. Use `npm run seed:demo` to replace everything with sample data.");
} else {
  await store.update((d) => { d.cm = demo ? demoSeed() : starterSeed(); });
  console.log(demo ? "Loaded 6 weeks of SAMPLE CampusMeal data (not real)." : "Created the starter menu for this week and next.");
}
