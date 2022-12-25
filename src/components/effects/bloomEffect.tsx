import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'

export function SelectiveBloom({ layers: layer = 11, children, enabled = true, strength, radius, threshold }: {layers?: number, children: React.ReactNode, enabled?: boolean, strength: number, radius: number, threshold: number }) {

    const { camera, scene, gl, size } = useThree()
    const effectComposer = new EffectComposer(gl)
    const isBloomEnabled=enabled && React.Children.count(children) > 0
    const childrenMesh = React.useMemo(() => {
        if (isBloomEnabled) {
            return React.Children.map(children, (child) => {
                const layers = new THREE.Layers()
                layers.enable(layer)
                child = child as React.ReactElement

                return React.cloneElement(child, { ...child.props, layers }, child.props?.children)

            })
        }
        return children
    },[])
    if (isBloomEnabled) {

        const renderScene = new RenderPass(scene, camera)
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height)
            , strength, radius, threshold)

        effectComposer.setSize(size.width, size.height)
        effectComposer.addPass(renderScene)
        effectComposer.addPass(bloomPass)
        gl.autoClear=false

    }
    
    useFrame(() => {

        if (isBloomEnabled) {

            gl.clear()
            camera.layers.set(layer)
            effectComposer?.render()
            gl.clearDepth()

            camera.layers.set(0)


        }
    }, -1)

    return <>{childrenMesh}</>
}