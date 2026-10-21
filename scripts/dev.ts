/* Development: rebuild the browser code on every save and serve dist/ at http://localhost:5173.
   Refresh the browser after a change. */
import * as esbuild from "esbuild";
import { copyPublic, options } from "./build";

try { process.loadEnvFile(".env"); } catch { /* no .env: default port */ }
copyPublic();
const ctx = await esbuild.context({ ...options, define: { "process.env.NODE_ENV": '"development"' } });
await ctx.watch();
const { port } = await ctx.serve({ servedir: options.outdir, port: Number(process.env.PORT) || 5173 });
console.log(`Website:    http://localhost:${port}\nCampusMeal: http://localhost:${port}/campusmeal.html`);
