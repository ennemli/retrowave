import * as THREE from 'three'
export const declaration=`
varying vec2 v_uv; 
uniform float uDivision;
uniform float gridWidth;
uniform float gridSpeed;
uniform vec3 groundColor;
uniform vec3 gridColor;
uniform vec3 mountainColor;

`
export const main=THREE.ShaderChunk['output_fragment'].replace(
    'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
`
vec2 coord = v_uv*(uDivision*0.5-1.);
vec2 divs=fract(coord-0.5);
vec2 grid = abs(divs-0.5)/fwidth(coord*gridWidth);
float line= min(grid.x,grid.y);
line=min(1.,line);

float r=smoothstep(0.025,0.1,abs(v_uv.x-0.5));

vec3 color=mix(gridColor,mix(groundColor,mountainColor,r),line);
gl_FragColor = vec4( color, diffuseColor.a);
`)