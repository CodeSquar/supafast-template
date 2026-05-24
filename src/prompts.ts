import path from "node:path";
import fs from "fs-extra";
import * as p from "@clack/prompts";
import pc from "picocolors";

export type ProjectType = "fullstack" | "landing";

export type ProjectOptions = {
  name: string;
  type: ProjectType;
  targetDir: string;
};

function isValidPackageName(name: string): boolean {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    name,
  );
}

function validateProjectName(name: string): string | undefined {
  if (!name.trim()) {
    return "Project name is required";
  }

  if (!isValidPackageName(name)) {
    return "Invalid project name. Use lowercase letters, numbers, and hyphens.";
  }

  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    return `Directory "${name}" already exists`;
  }

  return undefined;
}

export async function resolveProjectOptions(
  nameArg?: string,
  typeArg?: string,
): Promise<ProjectOptions | null> {
  p.intro(pc.bgCyan(pc.black(" create-supafast-template ")));

  let name = nameArg?.trim();

  if (!name) {
    const response = await p.text({
      message: "Project name",
      placeholder: "my-app",
      validate: validateProjectName,
    });

    if (p.isCancel(response)) {
      p.cancel("Operation cancelled.");
      return null;
    }

    name = response;
  } else {
    const error = validateProjectName(name);
    if (error) {
      p.cancel(error);
      return null;
    }
  }

  let type = typeArg as ProjectType | undefined;

  if (type && type !== "fullstack" && type !== "landing") {
    p.cancel('Invalid --type. Use "fullstack" or "landing".');
    return null;
  }

  if (!type) {
    const response = await p.select({
      message: "Project type",
      options: [
        {
          value: "fullstack" as const,
          label: "Fullstack",
          hint: "Next.js + shadcn + Supabase",
        },
        {
          value: "landing" as const,
          label: "Landing page",
          hint: "Astro + Tailwind",
        },
      ],
    });

    if (p.isCancel(response)) {
      p.cancel("Operation cancelled.");
      return null;
    }

    type = response;
  }

  const targetDir = path.resolve(process.cwd(), name);

  return {
    name,
    type,
    targetDir,
  };
}
