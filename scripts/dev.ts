/* Development: rebuild the browser code on every save and run the local server.
   Refresh the browser after a change. Restart this command after changing server/ files. */
import * as esbuild from "esbuild";
import { copyPublic, options } from "./build";

copyPublic();
const ctx = await esbuild.context({ ...options, define: { "process.env.NODE_ENV": '"development"' } });
await ctx.watch();
await import("../server/main");
