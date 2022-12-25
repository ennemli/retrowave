varying vec2 vuv;
void main(){
    vuv=uv;
    vec4 worldPosition=modelMatrix*vec4(position,1.);
    
    vec4 viewPosition=viewMatrix*worldPosition;

    gl_Position=projectionMatrix*viewPosition;

}