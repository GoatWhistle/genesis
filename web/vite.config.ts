import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { baseRulesPlugin, slimLangsPlugin } from "./scripts/baseRules";

// /api идёт относительным путём: в разработке проксируем на поднятый локально
// сервис, без переменной окружения с адресом.
export default defineConfig({
  plugins: [react(), tailwind(), baseRulesPlugin(), slimLangsPlugin()],
  resolve: {
    alias: [
      { find: /^~\/shared\//, replacement: fileURLToPath(new URL("./src/shared/", import.meta.url)) },
      { find: /^~\/layout\//, replacement: fileURLToPath(new URL("./src/layout/", import.meta.url)) },
      { find: /^~\/screens\//, replacement: fileURLToPath(new URL("./src/screens/", import.meta.url)) },
      { find: /^~\//, replacement: fileURLToPath(new URL("./src/", import.meta.url)) }
    ]
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9292",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
