import {Routes, Route, Navigate} from "react-router-dom";
import Game from "./components/Game/Game";
import HowToPlay from "./components/Pages/HowToPlay/HowToPlay";
import About from "./components/Pages/About/About";
import Account from "./components/Pages/Account/Account";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/play" />} /> 
      <Route path="/play" element={<Game/>} />
      <Route path="/how-to-play" element={<HowToPlay/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/help" element={<HowToPlay/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
  )
}
