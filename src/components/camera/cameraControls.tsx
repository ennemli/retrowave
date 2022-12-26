import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { useThree, useFrame, extend } from "@react-three/fiber";
import  { useEffect, useRef } from "react";

import {ReactThreeFiber} from '@react-three/fiber'
import * as THREE from 'three'
declare global {

    namespace JSX {

        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}
extend({ OrbitControls })


export const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    
    const controlsRef = useRef<OrbitControls>(null!);
    const minDistance=25
    const maxDistance=165
    const ms=1200
    useEffect(()=>{
        camera.userData.zoomOutOccurred=false
        camera.userData._timeoutId=-1
        camera.userData.lastZPos=minDistance
        return ()=>{
            if(camera.userData._timeoutId){
                clearTimeout(camera.userData._timeoutId)
            }
        }
    })
    useFrame(() => {
        const controls = controlsRef.current
        controls.update()
        if(camera.position.z>camera.userData.lastZPos){
            if(camera.userData._timeoutId>0){
                clearTimeout(camera.userData._timeoutId)
            }
            camera.userData.zoomOutOccurred=false

            camera.userData._timeoutId=setTimeout(()=>{
                camera.userData.zoomOutOccurred=true
            },ms)
            camera.userData.lastZPos=camera.position.z
        
        }
        if(camera.userData.zoomOutOccurred){
            const normalizedDistance=controls.getDistance()/maxDistance
            const zPos=Math.max(minDistance,camera.position.z-THREE.MathUtils.lerp(0,1,normalizedDistance*2.)*3.)
            camera.position.z=zPos

            if(zPos<=minDistance){
                camera.userData.zoomOutOccurred=false
                camera.userData.lastZPos=zPos

    
            }
        }
    
        

    });
    return <orbitControls 
    minDistance={minDistance} enableDamping={true} 
    maxPolarAngle={0.99*Math.PI/2} minPolarAngle={0.99*Math.PI/2} 
    maxAzimuthAngle={Math.PI*0.045} minAzimuthAngle={-Math.PI*0.045}
    dampingFactor={0.015} maxDistance={maxDistance} enablePan={false}
    zoomSpeed={0.75}

    ref={controlsRef} args={[camera, domElement]} 
    />;
}