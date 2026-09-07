import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "ClickLogger",
      fileName: (format) =>
        format === "es" ? "click-logger.js" : `click-logger.${format}.js`,
      formats: ["es", "iife"],
    },
  },
  test: {
    environment: "jsdom",
  },
});
