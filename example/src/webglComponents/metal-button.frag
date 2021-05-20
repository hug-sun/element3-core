precision highp float;

#define OCTAVES 6

uniform float m1;
uniform float m2;

uniform float iWidth;
uniform float iHeight;

uniform float r;
uniform float g;
uniform float b;


highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    highp float a = random(vec2(i.x, i.y));
    highp float b = random(floor(vec2(i.x + 1., i.y)));
    highp float c = random(floor(vec2(i.x, i.y + 1.)));
    highp float d = random(floor(vec2(i.x + 1., i.y + 1.)));

    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    //return a;
    return mix(a, b, u.x) +
        (c - a)* u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 3.;
        amplitude *= .7;
    }
    return value;
}

vec2 roundToPrec(in vec2 st, float prec) { 
    return floor(st / prec) * prec;
}


const int count = 15;

vec3 blur(vec2 st, float prec){
    vec4 color = vec4(0, 0, 0, 0);
    float theta = atan(1., 2.);

    for(int i = -count; i <= count; i++) {
        float v = random(roundToPrec(st + vec2(float(i) * 0.5 , float(i)) * 0.4, 0.4)) ;
        color = color + vec4(vec3(v / (float(count) * 2.0 + 1.0)) , 1.0); 
    }
    return color.xyz;
}

vec3 gradient(vec2 st) {
    float d = (st.x * 2. + st.y * 1.0);
    //d += iTime;
    vec3 color = vec3(r, g, b);
    
    //color = vec3(.85, .7, .45);
    float v = (sin(d / iWidth * 1.));
    return vec3((color + v + 3.) / 4.);
}

vec4 gradient2(vec2 co)
{
    vec4 color = vec4(0.0, 1.0, 1.0, 1.0);
    float x = co.x - iWidth / 2.;
    float y = co.y - iHeight / 2.;
    float theta = atan(co.x - iWidth / 2., co.y - iHeight / 2.);
    //theta += iTime;
    float r = sqrt(x * x + y * y);
    color = vec4(vec3(sin(theta * 4.0) + 3.0) / 4.0, 1.0);
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/600.0;

    vec3 color1 = vec3(0.0);
    color1 += fbm(st*1.0);

    vec3 color2 = blur(gl_FragCoord.xy, 0.1);

    vec3 color3 = gradient(gl_FragCoord.xy).xyz;

    vec3 color = mix(color3, color2, m1 / 100.);

    gl_FragColor = vec4(color.xyz, 1.0);
    //gl_FragColor = vec4(0., 0., 0., 1.);
}

