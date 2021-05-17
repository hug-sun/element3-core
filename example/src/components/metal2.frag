precision mediump float;

highp float rand(vec2 co)
{
    /*if(int(co.x) < 50 && int(co.x) > 46  && int(co.y) < 50 && int(co.y) > 46) {
        return 0.0;
    } else {
        return 1.0;
    }*/
    co = vec2(float(int(co.x / 0.5)), float(int(co.y / 0.5)));
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}
const int count = 15;

vec4 blur(vec2 co)
{
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    float x = co.x - 300.0;
    float y = co.y - 300.0;

    float theta = atan(co.y - 300.0, co.x - 300.0);
    float r = sqrt(x * x + y * y);
    
    for(int i = -count; i <= count; i++) {
        float v1 = rand( vec2(cos(theta + float(i) / r) * r, sin(theta + float(i) / r) * r)) / (float(count) * 2.0 - 1.0);
        color = color + vec4(v1, v1, v1, 1.0); 
    }
    return color;
}

vec4 gradient(vec2 co)
{
    vec4 color = vec4(0.0, 1.0, 1.0, 1.0);
    float x = co.x - 300.0;
    float y = co.y - 300.0;
    float theta = atan(co.y - 300.0, co.x - 300.0);
    float r = sqrt(x * x + y * y);
    color = vec4(vec3(sin(theta * 4.0) + 3.0) / 4.0, 1.0);
    return color;
}



void main(){
    gl_FragColor = mix(gradient(gl_FragCoord.xy), blur(gl_FragCoord.xy), 0.4) ;
}