import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VrajOS is a fully static single-page app. The default output directory is
// `dist`, which is what the Amplify build spec publishes.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
