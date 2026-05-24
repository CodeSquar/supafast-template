import { run, runOptional } from "./exec.js";
import { isDockerAvailable, printDockerHelp } from "./docker.js";

export async function setupSupabase(
  projectName: string,
  targetDir: string,
): Promise<void> {
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
      printDockerHelp(projectName);
    }
  } else {
    printDockerHelp(projectName);
  }
}
