import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getTemplatesRoot(): string {
  const packageRoot = path.resolve(__dirname, "..");
  return path.join(packageRoot, "templates");
}

export async function copyTemplate(
  type: "fullstack" | "landing",
  projectPath: string,
): Promise<void> {
  const templatesRoot = getTemplatesRoot();

  if (type === "fullstack") {
    const source = path.join(templatesRoot, "fullstack", "page.tsx");
    const target = path.join(projectPath, "app", "page.tsx");
    await fs.ensureDir(path.dirname(target));
    await fs.copy(source, target, { overwrite: true });
    logger.success("Copied custom page.tsx template");
    return;
  }

  const source = path.join(templatesRoot, "landing", "index.astro");
  const target = path.join(projectPath, "src", "pages", "index.astro");
  await fs.ensureDir(path.dirname(target));
  await fs.copy(source, target, { overwrite: true });
  logger.success("Copied custom index.astro template");
}
