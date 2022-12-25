#pragma glslify:gammaCorrection=require(../common/gamma)
uniform float uTime;
uniform vec3 bottomColor;
uniform vec3 topColor;

varying vec2 vUv;

void main(){

    float col=1.-smoothstep(0.4,.5,length(vUv-0.5));
    col*=smoothstep(0.1,0.2,fract(vUv.y*5.-uTime*0.3)+(vUv.y-0.5));
    vec3 color=mix(bottomColor,topColor*2.,vUv.y);
    color=gammaCorrection(color,2.2);
    gl_FragColor=vec4(color,col);
}