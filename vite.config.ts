import { execSync } from "node:child_process";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

let hash = "";

try {
  hash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (error) {
  hash = "DEVELOPMENT";
}

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      COMMIT_HASH: hash,
    }),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
  build: {
    target: "esnext",
    assetsDir: "",
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
  resolve: {
    alias: {
      "@app": resolve(__dirname, "./src"),
      "@pagesOLD": resolve(__dirname, "./src/pages/old"),
      "@pagesNEW": resolve(__dirname, "./src/pages/NEW"),
      "@componentsOLD": resolve(__dirname, "./src/components/old"),
      "@componentsNEW": resolve(__dirname, "./src/components/NEW"),
      "@core": resolve(__dirname, "./src/core"),
      "@layouts": resolve(__dirname, "./src/layouts"),
    },
  },
});
