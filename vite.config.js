import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset URLs so the built site works on GitHub Pages (/repo/), Netlify, and subpaths.
  base: "./",
  plugins: [react()],
  server: {
    // Opens your default browser automatically when you start the dev server
    open: true,
    port: 5173,
  },
});
