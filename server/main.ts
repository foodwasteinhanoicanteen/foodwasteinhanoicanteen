/* Entry point: `npm start` (built app) and `npm run dev` both run this file. */
import { config } from "./config";
import { createServer } from "./index";
import { JsonStore } from "./store";

const store = new JsonStore(config.dbFile);
createServer(store).listen(config.port, config.host, () => {
  console.log(`Wasted by Design is running: http://localhost:${config.port}`);
  console.log(`CampusMeal app:              http://localhost:${config.port}/campusmeal`);
  if (!config.staffPin) console.log("Note: STAFF_PIN is not set in .env, so edit mode and the kitchen screens are locked.");
});
