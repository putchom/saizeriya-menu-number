/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    globals: true,
    includeSource: ["src/**/*.{ts,tsx}"],
    environment: "jsdom",
  },
});
