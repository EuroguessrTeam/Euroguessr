import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import { Background } from "./components/background/background";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/play" element={<Game/>} />
      <Route path="/background" element={<Background className="relative h-full w-full inset-0 -mt-[10.625vh]"/> } />
    </Routes>
  )
}
