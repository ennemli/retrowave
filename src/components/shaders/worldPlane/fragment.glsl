#pragma glslify:perlin=require(../noises/perlin)
#pragma glslify:gammaCorrection=require(../common/gamma)

uniform float uTime;
varying vec2 vuv;
void main(){
    vec2 uv = vuv-0.5;
    float len=length(uv);
    float angle=(atan(uv.y,uv.x*len)+len*10.+uTime*0.5)*5.;
    float hole=smoothstep(0.1,0.3,len*.7+0.05);
    vec2 st=vec2(cos(angle),sin(angle))*len;
    float dust=perlin(st,10.)*hole;
    float m=min(dust,smoothstep(.15,.1,len*0.29))*2.;
    vec3 color=mix(vec3(1.0,0.0,0.8),vec3(1.0,0.5,0.2),m);
    color=gammaCorrection(color,2.2);

    gl_FragColor =vec4(color,m);
}