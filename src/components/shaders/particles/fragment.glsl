#define colorFactor 1.
uniform sampler2D uTexture;
varying vec2 vPuv;

void main(){
    vec4 tsample=texture2D(uTexture,vPuv);
    float grey =(tsample.r+tsample.g+tsample.b)/3.;
	gl_FragColor = vec4(tsample.rgb +grey*2., grey);
}