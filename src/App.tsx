import { Canvas } from '@react-three/fiber';

import Scene from './components/scene';
import './App.css';
import { Leva } from 'leva';
import { useState,Suspense,useEffect } from 'react';
import Loading from './html/loading';
import Header from './html/header';
import audioSrc from './audios/voyage-enter.ogg'
import { PositionalAudio } from '@react-three/drei';
function Ready({setReady}:{setReady:React.Dispatch<React.SetStateAction<boolean>>}){
    useEffect(()=>()=>void  setReady(true),[])
    return null
  }
function App() {
  const [clicked,setClicked]=useState(false)
  const [ready,setReady]=useState(false)
  return (
    <>
    {!ready&&
    <>
    <Header/>
    <Loading clicked={clicked} handleClick={()=>{setClicked(true)}}/></>}
    {clicked&&
    <Canvas   camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 4] }} >
          <Suspense fallback={<Ready setReady={setReady}/>}>
                        <PositionalAudio position={[0,0,2]} autoplay url={`.${audioSrc}`} distance={15} loop/>

          </Suspense>
      {ready&&<Scene />}
    </Canvas>
}
    <Leva collapsed/>
    </>
    
  )


}

export default App;
