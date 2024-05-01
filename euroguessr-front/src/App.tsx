import {Routes, Route, Navigate} from "react-router-dom";
import Game from "./components/Game/Game";
import About from "./components/Pages/About/About";
import Account from "./components/Pages/Account/Account";
import Help from "./components/Pages/Help/Help";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/play" />} /> 
      <Route path="/play" element={<Game/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/help" element={<Help/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
  )
}
