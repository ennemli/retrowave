import { Canvas } from '@react-three/fiber';

import Scene from './components/scene';
import './App.css';
import { Leva } from 'leva';
import { useState } from 'react';
import gifLoading from './images/l1.gif'
function App() {
  const [clicked,setClicked]=useState(false)
  const [ready,setReady]=useState(false)
  return (
    <>
    {!ready&&<div  className='loading'>
      {!clicked&&<button onClick={()=>{setClicked(true)}}>Play</button>}
      {clicked&&<div className='spinner'>
        <img src={gifLoading} alt="Loading"/>
        </div>}
      </div>
}

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
