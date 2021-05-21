precision highp float;

#define OCTAVES 6

uniform float m1;
uniform float m2;

uniform float iWidth;
uniform float iHeight;

uniform float r;
uniform float g;
uniform float b;

float radius=8.0;

vec3 rgb=vec3(r,g,b);

vec2 u_CanvasSize = vec2(iWidth, iHeight);
vec2 center = u_CanvasSize / 2.0;
float len1 = length(center);
float pi = acos(-1.0);

//渐变
float texture1(float x) {
  float a = x / u_CanvasSize.x;
  float b = radians(360.0) * 0.5 * a+1.0;
  return (sin(b) + 1.0) / 2.0;
}

//水平拉丝
float texture2(vec2 v) {
  vec2 a = vec2(0.2222, 0.4444);
  float n = dot(v, a);
  return fract(tan(n));
}

//杂色
float texture3(vec2 v) {
  vec2 a = vec2(0.1234, 0.5678);
  float n = dot(v, a);
  return fract(tan(n) * 10000.0);
}




void main() {
  //极坐标系转二维直角坐标系
  //渐变
  float f1 = texture1(gl_FragCoord.x*cos(1.)-gl_FragCoord.y*sin(1.));
  f1 = 0.65 * f1 + 0.35;

  //拉丝
  float f2 = texture2(gl_FragCoord.xy);
  f2 = f2*0.3+0.5;

  //杂色
  float f3 = texture3(gl_FragCoord.xy);

  //复合颜色
  float f = f1*f2;
  vec3 color=rgb * f;
  color*=1.4;
  gl_FragColor = vec4(color, 1);
}

