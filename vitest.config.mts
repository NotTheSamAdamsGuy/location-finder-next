import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    alias: {
      "@/": path.resolve(__dirname, "./src/"), // Example alias
    },
  },
});
