import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Opens your default browser automatically when you start the dev server
    open: true,
    port: 5173,
  },
});
