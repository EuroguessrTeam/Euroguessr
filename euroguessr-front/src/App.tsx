import {Routes, Route, Navigate} from "react-router-dom";
import Game from "./components/Game/Game";
import { Background } from "./components/Background/Background";
import { HowToPlay } from "./components/HowToPlay/HowToPlay";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/play" />} /> 
      <Route path="/play" element={<Game/>} />
      <Route path="/how-to-play" element={<HowToPlay/>} />
      <Route path="/background" element={<Background className="relative h-full w-full inset-0 -mt-[10.625vh]"/> } />
    </Routes>
  )
}
