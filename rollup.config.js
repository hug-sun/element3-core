import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import ts from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
export default {
  input: "src/main.ts",
  output: {
    file: "dist/element3-core.esm.js",
    format: "es",
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".vue", ".jsx", ".js", ".ts", ".tsx"],
    }),
    vue(),
    ts(),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".vue", ".tsx", ".ts"],
      babelHelpers: "bundled",
    }),
  ],
};
