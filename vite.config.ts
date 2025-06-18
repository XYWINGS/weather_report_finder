import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@configs": path.resolve(__dirname, "./src/configs"),
      "@slices": path.resolve(__dirname, "./src/slices"),
      "@views": path.resolve(__dirname, "./src/views"),
    },
  },
});
