import { execa } from "execa";
import { logger } from "./logger.js";

export type RunOptions = {
  cwd?: string;
  label?: string;
};

export async function run(
  command: string,
  args: string[],
  options: RunOptions = {},
): Promise<void> {
  const { cwd, label } = options;

  if (label) {
    logger.step(label);
  }

  try {
    await execa(command, args, {
      cwd,
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        CI: "1",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown command error";
    throw new Error(
      `Command failed: ${command} ${args.join(" ")}${label ? ` (${label})` : ""}\n${message}`,
    );
  }
}

export async function runOptional(
  command: string,
  args: string[],
  options: RunOptions = {},
): Promise<boolean> {
  try {
    await run(command, args, options);
    return true;
  } catch {
    return false;
  }
}
