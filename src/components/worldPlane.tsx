import worldPlaneVertex from './shaders/worldPlane/vertex.glsl'
import worldPlaneFragment from './shaders/worldPlane/fragment.glsl'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
export default function WorldPlane(props: JSX.IntrinsicElements['mesh']) {
    const mesh=useRef<THREE.Mesh>(null!)
    const { clock } = useThree()

    useFrame(() => {
        const material=mesh.current.material as THREE.ShaderMaterial
        material.uniforms.uTime.value=clock.getElapsedTime()
    })
    return (
        <mesh {...props} ref={mesh}>
            <planeGeometry args={[350, 350]} />
            <shaderMaterial depthWrite={false} transparent={true} vertexShader={worldPlaneVertex} fragmentShader={worldPlaneFragment} uniforms={{
                uTime: {
                        value: 0
                },
            }} />

        </mesh>
    )
}