import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import element3Webgl from "rollup-plugin-element3-webgl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/webgl", // TODO 开发环境是 / 生产环境是 /webgl
  plugins: [vue(), element3Webgl()],
});
