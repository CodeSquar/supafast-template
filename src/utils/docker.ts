import { runOptional } from "./exec.js";
import { logger } from "./logger.js";

export async function isDockerAvailable(): Promise<boolean> {
  logger.step("Checking Docker availability...");
  const available = await runOptional("docker", ["info"], {
    label: undefined,
  });

  if (available) {
    logger.success("Docker is running");
  } else {
    logger.warn("Docker is not available or not running");
  }

  return available;
}

export function printDockerHelp(projectName: string): void {
  logger.blank();
  logger.warn("Supabase local stack could not be started.");
  logger.info("Requirements:");
  logger.info("  • Docker Desktop installed and running");
  logger.info("  • At least ~7GB RAM available");
  logger.blank();
  logger.info("To start Supabase manually later:");
  logger.info(`  cd ${projectName}`);
  logger.info("  npx supabase start");
  logger.blank();
}
