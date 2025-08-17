import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/frontend-challenge-roadsurfer/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(new URL("./src", import.meta.url).pathname),
    },
  },
});
