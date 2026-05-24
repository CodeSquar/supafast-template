import type { ProjectOptions } from "../prompts.js";
import { run, runOptional } from "../utils/exec.js";
import { logger } from "../utils/logger.js";
import { copyTemplate } from "../utils/copy-template.js";
import {
  isDockerAvailable,
  printDockerHelp,
} from "../utils/docker.js";

export async function runFullstack(options: ProjectOptions): Promise<void> {
  const { name, targetDir } = options;

  logger.intro(`Creating fullstack project: ${name}`);

  await run(
    "npx",
    [
      "create-next-app@latest",
      name,
      "--yes",
      "--ts",
      "--tailwind",
      "--eslint",
      "--app",
      "--import-alias",
      "@/*",
    ],
    { label: "Scaffolding Next.js app" },
  );

  await run("npx", ["shadcn@latest", "init", "-d"], {
    cwd: targetDir,
    label: "Initializing shadcn/ui",
  });

  const shadcnOk = await runOptional(
    "npx",
    ["shadcn@latest", "add", "--all", "--yes"],
    {
      cwd: targetDir,
      label: "Adding all shadcn/ui components",
    },
  );

  if (!shadcnOk) {
    logger.warn(
      "Some shadcn components may not have been installed. You can retry with: npx shadcn@latest add --all --yes",
    );
  }

  await run("npx", ["supabase", "init"], {
    cwd: targetDir,
    label: "Initializing Supabase",
  });

  const dockerOk = await isDockerAvailable();

  if (dockerOk) {
    const supabaseStarted = await runOptional(
      "npx",
      ["supabase", "start"],
      {
        cwd: targetDir,
        label: "Starting Supabase local stack",
      },
    );

    if (!supabaseStarted) {
      printDockerHelp(name);
    }
  } else {
    printDockerHelp(name);
  }

  await copyTemplate("fullstack", targetDir);

  logger.blank();
  logger.success(`Fullstack project "${name}" created successfully!`);
  logger.info(`  cd ${name}`);
  logger.info("  npm run dev");
  logger.blank();
}
