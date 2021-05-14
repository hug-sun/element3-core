import fs from "fs";
import t from "./componentTemplate.js";

export default function (fragmentShaderSource, map) {
  var hasVertexShader = false;
  try {
    var vertexShaderSource = fs.readFileSync(
      this.resourcePath.replace(/.frag$/, ".vert2"),
      "utf8"
    );
    hasVertexShader = true;
  } catch (err) {
    var vertexShaderSource = `attribute vec4 a_Position;
void main(){
    gl_Position=a_Position;
}
`;
    hasVertexShader = false;
  }

  var typeMapping = {
    bool: {
      jsType: "Boolean",
      ctxMethod: "uniform1fv",
    },
    bvec2: {
      jsType: "Float32Array",
      ctxMethod: "uniform2fv",
    },
    bvec3: {
      jsType: "Float32Array",
      ctxMethod: "uniform3fv",
    },
    bvec4: {
      jsType: "Float32Array",
      ctxMethod: "uniform4fv",
    },

    float: {
      jsType: "Number",
      ctxMethod: "uniform1f",
    },
    vec2: {
      jsType: "Array",
      ctxMethod: "uniform2fv",
    },
    vec3: {
      jsType: "Array",
      ctxMethod: "uniform3fv",
    },
    vec4: {
      jsType: "Array",
      ctxMethod: "uniform4fv",
    },

    int: {
      jsType: "Number",
      ctxMethod: "uniform1i",
    },
    ivec2: {
      jsType: "Int32Array",
      ctxMethod: "uniform2iv",
    },
    ivec3: {
      jsType: "Int32Array",
      ctxMethod: "uniform3iv",
    },
    ivec4: {
      jsType: "Int32Array",
      ctxMethod: "uniform4iv",
    },

    mat2: {
      jsType: "Float32Array",
      ctxMethod: "uniformMatrix2fv",
    },
    mat3: {
      jsType: "Float32Array",
      ctxMethod: "uniformMatrix3fv",
    },
    mat4: {
      jsType: "Float32Array",
      ctxMethod: "uniformMatrix4fv",
    },

    sampler2D: {
      jsType: "Float32Array",
    },

    samplerCube: {
      //TODO
    },
  };
  var watcherTemplate = (name, jsType, ctxMethod) => `
    watch(()=>props.${name},(newVal)=>{
        if(!gl||!glProgram)
            return;
        let ${name} = gl.getUniformLocation(glProgram,'${name}');
        gl.${ctxMethod}(${name}, ${jsType}(newVal));
        gl.drawArrays(gl.TRIANGLE_STRIP, props['indicesStart'], props['indicesCount']);
    })
    `;

  var sampler2DTemplate = (name) => `

    watch(()=> props.${name},(newVal)=>{
            var image = new Image();
            image.src = newVal;
            image.onload = () => {
                if(!gl||!glProgram)
                    return;
                let ${name} = gl.getUniformLocation(glProgram,'${name}');
                var texture = gl.createTexture();
                //1.对纹理图像进行Y轴反转
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                //2.开启0号纹理单元
                gl.activeTexture(gl.TEXTURE0);
                //3.向target绑定纹理对象
                gl.bindTexture(gl.TEXTURE_2D, texture);
            
                //4.配置纹理参数
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                //5.配置纹理图像
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            
                //6.将0号纹理图像传递给着色器
                gl.uniform1i(${name}, 0);
    
                gl.clearColor(0.0,0.0,0.0,1.0);

                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLE_STRIP, props['indicesStart'], props['indicesCount']);
            }
    },{
        immediate: true,
    })
    `;

  function* getUniforms(code) {
    var uniformPattern = /uniform ([a-z1-9A-Z]+) ([_a-zA-Z0-9]+)/g;
    var uniform;
    while ((uniform = uniformPattern.exec(code))) {
      yield uniform;
    }
  }

  var watchersCode = "";
  var propertiesCode = "";

  for (let uniform of getUniforms(vertexShaderSource)) {
    watchersCode += watcherTemplate(
      uniform[2],
      typeMapping[uniform[1]].jsType,
      typeMapping[uniform[1]].ctxMethod
    );
    propertiesCode += `    ${uniform[2]} : {},\n`;
  }
  for (let uniform of getUniforms(fragmentShaderSource)) {
    if (uniform[1] === "sampler2D") {
      watchersCode += sampler2DTemplate(
        uniform[2],
        typeMapping[uniform[1]].jsType,
        typeMapping[uniform[1]].ctxMethod
      );
      propertiesCode += `    ${uniform[2]} : {},\n`;
      continue;
    }
    watchersCode += watcherTemplate(
      uniform[2],
      typeMapping[uniform[1]].jsType,
      typeMapping[uniform[1]].ctxMethod
    );
    propertiesCode += `    ${uniform[2]} : {},\n`;
  }

  return {
    code: t(
      vertexShaderSource,
      fragmentShaderSource,
      watchersCode,
      propertiesCode
    ),
    map,
  };
}
