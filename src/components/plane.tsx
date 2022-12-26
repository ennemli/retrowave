import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as planeVertex from './shaders/plane/vertex.glsl'
import * as planeFragment from './shaders/plane/fragment.glsl'
import * as THREE from 'three'
import { planeProps } from "../types/types";
import { folder, useControls } from "leva";
import { changeGUI } from "./commons";
export default function Plane(props: planeProps&JSX.IntrinsicElements['mesh']) {

    const colors={
            gridColor:"#ff0073",
            groundColor:"#59e6ff",
            mountainColor:"#000000"
        }
    
    const mesh = useRef<THREE.Mesh>(null!);
    const division = props.division
    const planeArgs = props.planeArgs
    useControls({
        Plane:folder(
            changeGUI(colors,
            (colorValue,propName)=>{
                const material=mesh.current.material as THREE.MeshBasicMaterial
                const shader=material.userData.shader
                if(shader){
                shader.uniforms[propName].value=new THREE.Color(colorValue as string)
                }
            }
            ))
    })
    useEffect(() => {
        mesh.current.geometry.rotateX(Math.PI * -0.5);
    },[])

    useFrame(({ clock }: { clock: THREE.Clock }) => {
        const elapsedTime = clock.getElapsedTime()
        const material = mesh.current.material as THREE.MeshBasicMaterial
        const shader=material.userData.shader
        if(shader){
        shader.uniforms.uTime.value = elapsedTime
        }
    })
    const  uniforms=
        {
            uDivision: {
                value: division
            },
            uTime: {
                value: 0.0
            },
            gridWidth:{
                value:3
            },
            gridColor:{
                value:new THREE.Color(colors.gridColor)
            },
            groundColor:{
                value:new THREE.Color(colors.groundColor)
            },
            mountainColor:{
                value:new THREE.Color(colors.mountainColor)
            },
            gridSpeed:{
                value:15
            }
        }
    return (
        <mesh {...props}  ref={mesh} >
            <planeBufferGeometry  args={[planeArgs.width, planeArgs.height, 100, 100]} />
            <meshBasicMaterial
            onBeforeCompile={
                (shader)=>{
                    shader.uniforms={
                        ...shader.uniforms,
                        ...uniforms
                    }
                    shader.vertexShader=planeVertex.declaration+shader.vertexShader;
                    shader.vertexShader=shader.vertexShader.replace(
                        '#include <begin_vertex>',planeVertex.main
                    )
                    shader.fragmentShader=planeFragment.declaration+shader.fragmentShader
                    shader.fragmentShader=shader.fragmentShader.replace(
                     '#include <output_fragment>' ,
                     planeFragment.main  
                    )
                    const material=mesh.current.material as THREE.MeshBasicMaterial
                    material.userData.shader=shader

                    
                }
                
            }
            />
        

        </mesh>
    )
}