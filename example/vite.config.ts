import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webglLoader from "./webgl-loader/rollup-plugin-webgl-loader.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), webglLoader()],
});
