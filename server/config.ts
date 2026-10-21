import path from "node:path";
import { fileURLToPath } from "node:url";

try { process.loadEnvFile(path.resolve(".env")); } catch { /* no .env: use defaults below */ }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const config = {
  port: Number(process.env.PORT) || 5173,
  host: process.env.HOST || "127.0.0.1",
  /** Team PIN for edit mode and the kitchen screens. Empty = nobody can edit. */
  staffPin: (process.env.STAFF_PIN || "").trim(),
  root,
  distDir: path.join(root, "dist"),
  assetsDir: process.env.ASSETS_DIR ? path.resolve(process.env.ASSETS_DIR) : path.join(root, "assets"),
  get uploadsDir() { return path.join(this.assetsDir, "uploads"); },
  dbFile: process.env.DB_FILE ? path.resolve(process.env.DB_FILE) : path.join(root, "data", "db.json"),
};
