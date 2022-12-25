

uniform vec2 uTextureSize; 
uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vPuv;

void main(){
    vPuv=position.xy/uTextureSize;
    vec4 tsample=texture2D(uTexture,vPuv);

    float grey =(tsample.r+tsample.g+tsample.b)/3.;    

    vec4 modelPosition=modelMatrix*vec4(position,1.0);
    modelPosition.xy-=0.5*uTextureSize;
    modelPosition.xy*=0.2;
    vec4 viewPosition=viewMatrix*modelPosition;
    gl_Position=projectionMatrix*viewPosition;
    gl_PointSize=grey*35.;
    gl_PointSize*= ( 1.0 / - viewPosition.z );
}