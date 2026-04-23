import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// Same Southern Container Solutions UI (Tailwind in App.jsx). This only bundles CSS into the JS
// entry so Netlify/CDNs don’t serve a separate .css URL that can 404 or redirect wrong.
export default defineConfig({
  base: "/",
  plugins: [react(), cssInjectedByJsPlugin()],
  server: {
    open: true,
    port: 5173,
  },
});
