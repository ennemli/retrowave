import { useEffect, useRef } from "react";
import solarVertex from './shaders/solar/vertex.glsl'
import solarFragment from './shaders/solar/fragment.glsl'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
// import {folder, useControls } from "leva";
export default function Solar(props: JSX.IntrinsicElements['mesh']) {

    const mesh = useRef<THREE.Mesh>(null!)

    const colors={topColor:"#bcc927",bottomColor:"#ff10ad"}
    // useControls({
    //     solar:folder(changeGUI<string>(
    //     colors,
    //     (colorValue,propName)=>{
    //         const material=mesh.current.material as THREE.ShaderMaterial
    //         material.uniforms[propName].value=new THREE.Color(colorValue)
    //     }
    // ))})

    useEffect(() => {
        mesh.current.position.z = -1.5-75/2
        mesh.current.position.y = 10


    })
    useFrame(({clock})=>{
        const elapsedTime=clock.getElapsedTime()
        const material=mesh.current.material as THREE.ShaderMaterial
        material.uniforms.uTime.value=elapsedTime
    })
    return (

        <>

            <mesh {...props}  ref={mesh}>

                <planeBufferGeometry args={[50, 50]} />
                <shaderMaterial  vertexShader={solarVertex} fragmentShader={solarFragment} transparent={true} uniforms={
                    {uTime:{
                        value:0,

                    },
                    topColor:{
                        value:new THREE.Color(colors.topColor)
                    },
                    bottomColor:{
                        value:new THREE.Color(colors.bottomColor)
                    }
                }
                }/>

            </mesh>


        </>
    )
}