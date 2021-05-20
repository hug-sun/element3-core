precision mediump float;

uniform float iTime;
uniform float iWidth;
uniform float iHeight;

vec2 u_CanvasSize=vec2(iWidth,iHeight);
vec2 center = u_CanvasSize / 2.0;
float len1 = length(center);
float pi = radians(360.0) / 2.0;


//渐变
float texture1(float x) {
  float a = x / u_CanvasSize.x;
  float b = radians(360.0) * 5.0 * a;
  return (sin(b) + 1.0) / 2.0;
}

//水平拉丝
float texture2(vec2 v) {
  vec2 a = vec2(0.0, 1.0);
  float n = dot(v, a);
  return fract(tan(n) * 10000.0);
}

//杂色
float texture3(vec2 v) {
  vec2 a = vec2(0.1234, 0.5678);
  float n = dot(v, a);
  return fract(tan(n) * 10000.0);
}

//比例尺
float scaler(float ax, float ay, float bx, float by, float x) {
  float x1 = bx - ax;
  float y1 = by - ay;
  float k = y1 / x1;
  float b = ay - ax * k;
  return k * x + b;
}



void main(){
  //极坐标系转二维直角坐标系
  vec2 p = gl_FragCoord.xy - center;
  float len2 = length(p);
  float ang = atan(p.y, p.x);
  float x = scaler(-pi, 0.0, pi, u_CanvasSize.x, ang);
  float y = (len2 / len1) * u_CanvasSize.y;

  //渐变
  float f1 = texture1(x);
  f1 = 0.65 * f1 + 0.35;

  //拉丝
  float f2 = texture2(vec2(int(x), int(y)));
  f2 = clamp(f2, 0.75, 0.8);

  //杂色
  float f3 = texture3(gl_FragCoord.xy);

  //复合颜色
  float f = (f1 * f2 + f3 * 0.07) * 1.2;

  
  //平行光方向
  vec2 lightDir1 = normalize(vec2(0.5, -1));
  vec2 lightDir2 = lightDir1 * -1.0;

  //片元和光线的夹角
  float cosAng1 = (dot(normalize(p), lightDir1) + 1.0) / 1.5 + 0.3;
  //cosAng1*=cosAng1/2.0;
  float cosAng2 = (dot(normalize(p), lightDir2) + 1.0) / 4.0 + 0.2;
  float cosAng3 = (dot(normalize(p), lightDir2) + 1.0) / 2.0 + 0.3;
  cosAng3 *= cosAng3;
  float cosAng4 = (dot(normalize(p), lightDir1) + 1.0) / 2.0 + 0.3;

  //扩展1
  float expand1=2.0;
  float expand2=4.0;
  float expand3=2.0;
  float expand4=3.0;

  //初始半径
  float r = center.y-expand1-expand2-expand3-expand4;

  float r1 = r + expand1;
  float r2 = r1 + expand2;
  float r3 = r2 + expand3;

  if(len2 < r) {
    gl_FragColor = vec4(vec3(f), 1);
  } else if(len2 >= r && len2 < r1) {
    f *= cosAng1;
  } else if(len2 >= r1 && len2 < r2) {
    f *= cosAng2;
  } else if(len2 >= r2 && len2 < r3) {
    f *= cosAng3;
  }

  gl_FragColor = vec4(vec3(f), 1);
     
}