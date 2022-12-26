import Plane from "./plane";
import Solar from "./solar";
import WorldPlane from "./worldPlane";
import { CameraControls } from "./camera/cameraControls";
import { SelectiveBloom } from "./effects/bloomEffect";
import {  Stats } from '@react-three/drei'
import { folder, useControls } from 'leva'
import * as THREE from 'three'
import {  useRef } from "react";

function Effect() {
    const bloomProps = {
        strength: {
            value: .5,
            min: 0,
            max: 2
        },
        radius: {
            value: 0.5,
            min: 0,
            max: 4
        },
        threshold: {
            value: 0,
            min: 0,
            max: 1
        },
        enabled:true
    }

    const bloomPropsElm= useControls({
        Bloom: folder(
            bloomProps
        )
    }
    )


    return <SelectiveBloom {...bloomPropsElm}
    >
        <Solar />
        <WorldPlane />
    </SelectiveBloom>
}
function Fog(){
    const fogRef=useRef<THREE.FogExp2>(null!)

    const fogProps=useControls({

        Fog:folder({
            color:{
                value:'#333333',
            onChange:(v:string)=>{
                fogRef.current.color=new THREE.Color(v)
            }
        },
     
            density:{
                min:0,
                max:1,
                value:0.1,
                   step:0.005,
                onChange:(v:number)=>{
                    fogRef.current.density=v
                }
            },
        })
})
    
    return     <fogExp2 ref={fogRef} {...fogProps} attach={'fog'}/>


}


export default function Scene() {

    const planeArgs = {
        width: 75,
        height: 75
    }
    const division = 28
    return (
        <>

            <Stats showPanel={0} />
            <CameraControls />
            <Fog/>
            <Effect />
            <Plane planeArgs={planeArgs} division={division} />

        </>

    )
}
