import compileFileToComponent from "./compileFileToComponent.js";
const fileRegex = /\.frag$/;

export default function webglLoader() {
  return {
    name: "webgl-loader", // this name will show up in warnings and errors
    transform(rawCode, id) {
      if (fileRegex.test(id)) {
        const { code } = compileFileToComponent(rawCode, null);
        return { code };
      } else {
        return rawCode;
      }
    },
  };
}
