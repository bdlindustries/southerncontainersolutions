import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  // Root deploy (Netlify, etc.). Styles are injected via JS — no separate CSS file URL to break.
  base: "/",
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  server: {
    open: true,
    port: 5173,
  },
});
