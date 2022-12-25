import { Canvas } from '@react-three/fiber';

import Scene from './components/scene';
import './App.css';
import { Leva } from 'leva';
import { useState } from 'react';
import Loading from './html/loading';
import Header from './html/header';
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
    <Canvas   camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 2] }} >
      <Scene setReady={setReady}/>
    </Canvas>
}
    <Leva collapsed/>
    </>
    
  )


}

export default App;
