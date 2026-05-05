import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const index = join(process.cwd(), "dist", "index.html");
const notFound = join(process.cwd(), "dist", "404.html");
if (!existsSync(index)) {
  console.error("dist/index.html missing; run vite build first.");
  process.exit(1);
}
copyFileSync(index, notFound);
