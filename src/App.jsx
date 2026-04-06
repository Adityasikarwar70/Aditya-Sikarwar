import { useEffect, useRef } from 'react'
import Canvas from './Components/Canvas/Canvas'
import Cursor from './Components/Cursor/Cursor'
import Home from './Components/Home/Home'
import OverlayText from './Components/OverlayText/OverlayText'
import SocialLinks from './Components/SocialLinks/SocialLinks'
import Navbar from './Components/Navbar/Navbar'
import Project from './Components/Projects/Project'
import Learning from './Components/Learning/Learning'

function App() {

  const bodyRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <div ref={bodyRef} className="app-wrapper">
      
        <Cursor />
        <Navbar />
        <SocialLinks />
        <Canvas />
        <OverlayText />
        <Home />
        <Project reference={bodyRef} />
        <Learning reference={bodyRef} />
    </div>
     
    </>
  )
}

export default App
