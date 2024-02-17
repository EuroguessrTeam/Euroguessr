import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/play" element={<Game/>} />
    </Routes>
  )
}
