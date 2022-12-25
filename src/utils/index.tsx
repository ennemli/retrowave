import * as THREE from 'three'

export const getSize=(gl:THREE.WebGLRenderer):[number,number]=>[gl.domElement.width,gl.domElement.height]
