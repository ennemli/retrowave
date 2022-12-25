import particleFragment from './shaders/particles/fragment.glsl'
import particleVertex from './shaders/particles/vertex.glsl'
import * as THREE from 'three'
import {  useEffect, useRef } from "react"
import ParticleSys from '../lib/ParticlesSys'
export default function Particles(props:JSX.IntrinsicElements['points']&{width:number,height:number}){
    const refPoints=useRef<THREE.Points>(null!)

   useEffect(()=>{
    const prtSys=new ParticleSys(refPoints.current,props.width,props.height)
    prtSys.init('./images/berserk-skull.png')
    })
    
    return <points ref={refPoints}>
        <shaderMaterial attach={'material'} uniforms={{
            uTexture:{value:null},
            uTextureSize:{value:new THREE.Vector2(0,0)},
            uTime:{value:0}
        }}  transparent={true} depthWrite={false} vertexShader={particleVertex} fragmentShader={particleFragment}/>
    </points>
}