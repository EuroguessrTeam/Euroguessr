import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  BrowserRouter,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
        <div className="z-50 flex fixed w-full h-[7.6vh] items-center bg-yellow overflow-hidden p-1">
          <div className="w-[16.6666%] h-full flex items-center justify-center text-black">
            <button className="p-0 border-0 text-black focus:outline-none active:outline-none bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.5h18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14h18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 22.5h18" />
              </svg>
            </button>
          </div>
          <div className="w-[66.6%] h-full flex items-center justify-center text-black font-eurotype">
            <p className="text-[250%] text-bold flex-grow text-center">Euroguessr</p>
          </div>
          <div className="w-[16.6666%] h-full flex items-center justify-center">
            <img className="h-full rounded-full" src="src/assets/profile-pic.png"></img>
          </div>
        </div>

    <App />
  </BrowserRouter>
)
