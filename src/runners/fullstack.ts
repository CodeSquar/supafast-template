import type { ProjectOptions } from "../prompts.js";
import { run, runOptional } from "../utils/exec.js";
import { logger } from "../utils/logger.js";
import { copyTemplate } from "../utils/copy-template.js";
import { setupSupabase } from "../utils/supabase.js";

export async function runFullstack(options: ProjectOptions): Promise<void> {
  const { name, targetDir, supabase } = options;

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

  if (supabase) {
    await setupSupabase(name, targetDir);
  }

  await copyTemplate("fullstack", targetDir);

  logger.blank();
  logger.success(`Fullstack project "${name}" created successfully!`);
  logger.info(`  cd ${name}`);
  logger.info("  npm run dev");
  if (supabase) {
    logger.info("  npx supabase status");
  }
  logger.blank();
}
