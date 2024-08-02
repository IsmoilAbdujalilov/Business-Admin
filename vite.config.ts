import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  optimizeDeps: {
    include: ["jss-plugin-vendor-prefixer", "jss-plugin-props-sort"],
  },
});
