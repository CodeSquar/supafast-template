import { Command } from "commander";
import * as p from "@clack/prompts";
import { resolveProjectOptions } from "./prompts.js";
import { runFullstack } from "./runners/fullstack.js";
import { runLanding } from "./runners/landing.js";
import { logger } from "./utils/logger.js";

async function main(): Promise<void> {
  const program = new Command();

  program
    .name("create-supafast-template")
    .description(
      "Scaffold fullstack (Next.js + shadcn + Supabase) or landing (Astro + Tailwind) projects",
    )
    .argument("[project-name]", "Name of the project directory")
    .option(
      "--type <type>",
      "Project type: fullstack or landing",
    )
    .option("--supabase", "Initialize Supabase local database")
    .option("--no-supabase", "Skip Supabase initialization")
    .version("0.1.1")
    .parse(process.argv);

  const opts = program.opts<{
    type?: string;
    supabase?: boolean;
    noSupabase?: boolean;
  }>();
  const projectName = program.args[0];

  let supabase: boolean | undefined;
  if (opts.noSupabase) {
    supabase = false;
  } else if (opts.supabase) {
    supabase = true;
  }

  try {
    const options = await resolveProjectOptions(
      projectName,
      opts.type,
      supabase,
    );

    if (!options) {
      process.exit(1);
    }

    if (options.type === "fullstack") {
      await runFullstack(options);
    } else {
      await runLanding(options);
    }

    p.outro("Done!");
  } catch (error) {
    p.cancel("Project creation failed.");
    logger.error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
    process.exit(1);
  }
}

main();
