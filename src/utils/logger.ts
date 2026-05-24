import pc from "picocolors";

export const logger = {
  intro(message: string) {
    console.log(pc.bold(pc.cyan(`\n${message}\n`)));
  },

  step(message: string) {
    console.log(pc.cyan("●") + " " + message);
  },

  success(message: string) {
    console.log(pc.green("✔") + " " + message);
  },

  warn(message: string) {
    console.log(pc.yellow("⚠") + " " + message);
  },

  error(message: string) {
    console.error(pc.red("✖") + " " + message);
  },

  info(message: string) {
    console.log(pc.dim(message));
  },

  blank() {
    console.log();
  },
};
