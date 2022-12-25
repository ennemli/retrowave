import { Canvas } from '@react-three/fiber';
import Scene from './components/scene';
import './App.css';
import { Leva } from 'leva';
function App() {
  return (
    <>
    <Canvas  camera={{ fov: 75, near: 0.1, far: 800, position: [0, 5, 2] }} >

      <Scene />

    </Canvas>
    <Leva collapsed/>
    </>
  )


}

export default App;
