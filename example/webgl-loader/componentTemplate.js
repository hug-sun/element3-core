export default (vertexShader, fragmentShader, watchers, properties) => `
import { h, onMounted, ref, watchEffect,watch } from "vue";

export default {
  name: "webgl-renderer",
  props: {
    width: String,
    height: String,
    indicesCount: {
      default: () => 5,
    },
    indicesStart: {
      default: () => 0,
    },
    ${properties}
  },


  setup(props) {
    const canvas = ref(null);
    let gl;
    let glProgram;

    watchEffect(() => {
      if (!gl || !glProgram) return;
      gl.drawArrays(gl.TRIANGLE_STRIP, props.indicesStart, props.indicesCount);
    });

    onMounted(() => {
      //获取webgl上下文
      gl = canvas.value.getContext("webgl");
      var vertShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShader, \`${vertexShader}\`);
      gl.compileShader(vertShader);
      var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShader, \`${fragmentShader}\`);
      gl.compileShader(fragShader);
      glProgram = gl.createProgram();
      gl.attachShader(glProgram, vertShader);
      gl.attachShader(glProgram, fragShader);
      gl.linkProgram(glProgram);
      gl.useProgram(glProgram);
      var a_PointSize = gl.getAttribLocation(glProgram, "a_PointSize");
      gl.vertexAttrib1f(a_PointSize, 30.0);
      //1.创建缓冲区对象
      var vertexBuffer = gl.createBuffer();
      // 2.绑定缓冲区对象（表明了缓冲区对象的用途）
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // 3.向缓冲区对象中写入数据
      var tempData = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1, -1, -1]);
      gl.bufferData(gl.ARRAY_BUFFER, tempData, gl.STATIC_DRAW);
      // 4.获取变量存储位置
      var a_Position = gl.getAttribLocation(glProgram, "a_Position");
      // 5.把缓冲区对象分配给a_Position变量
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
      // 6.连接缓冲区对象和a_Position变量
      gl.enableVertexAttribArray(a_Position);
      gl.drawArrays(
        gl.TRIANGLE_STRIP,
        props["indicesStart"],
        props["indicesCount"]
      );
      //gl.drawArrays(gl.POINTS, 0, 3);
    });

    ${watchers}

    return {
      canvas,
    };
  },

  render: function() {
    return h("canvas", {
      ref: "canvas",
      width: this.$props["width"],
      height: this.$props["height"],
    });
  },
};
`;
