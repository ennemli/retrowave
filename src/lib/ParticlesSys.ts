import * as THREE from 'three'
export default class ParticleSys{
    mesh:THREE.Points;
    width:number;
    height:number;
    texture:THREE.Texture|undefined;
    constructor(mesh:THREE.Points,width:number,height:number){
        this.mesh=mesh
        this.width=width
        this.height=height
        this.texture=undefined
    }
    init(url:string){
        const textureLoader=new THREE.TextureLoader()
        textureLoader.load(url,(texture)=>{
            const geometry=this.mesh.geometry
            const material=this.mesh.material as THREE.ShaderMaterial
            
            this.texture=texture
            const vertices=this.getVertices()
            geometry.setAttribute('position',new THREE.BufferAttribute(vertices,2))
            material.uniforms.uTexture.value=this.texture
            material.uniforms.uTextureSize.value=new THREE.Vector2(this.width,this.height)

        })
    }

    getVertices(){
        const size=this.width*this.height
        const vertices=new Float32Array(size*3)
        for (let i = 0; i < size; i++) {
            const stride=i*3
            vertices[stride]=(i%this.width)
            vertices[stride+1]=Math.floor(i/this.width)
        }
        return vertices
    }
}