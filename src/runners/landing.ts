import type { ProjectOptions } from "../prompts.js";
import { run } from "../utils/exec.js";
import { logger } from "../utils/logger.js";
import { copyTemplate } from "../utils/copy-template.js";

export async function runLanding(options: ProjectOptions): Promise<void> {
  const { name, targetDir } = options;

  logger.intro(`Creating landing page project: ${name}`);

  await run(
    "npm",
    [
      "create",
      "astro@latest",
      name,
      "--",
      "--yes",
      "--template",
      "basics",
      "--install",
      "--skip-houston",
    ],
    { label: "Scaffolding Astro app" },
  );

  await run("npx", ["astro", "add", "tailwind", "--yes"], {
    cwd: targetDir,
    label: "Adding Tailwind CSS",
  });

  await copyTemplate("landing", targetDir);

  logger.blank();
  logger.success(`Landing page project "${name}" created successfully!`);
  logger.info(`  cd ${name}`);
  logger.info("  npm run dev");
  logger.blank();
}
