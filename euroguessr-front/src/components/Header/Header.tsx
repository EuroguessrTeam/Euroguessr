import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {

    const [isMenuBarVisible, setIsMenuBarVisible] = useState<boolean>(false);

    const toggleMenuBar = () => {
      const elements = document.querySelectorAll('.headerMenu');
      // Toggle the class on each element at the exact same time
      requestAnimationFrame(() => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.toggle("translate-y-[24.9vh]");
        }
        isMenuBarVisible ? setIsMenuBarVisible(false) : setIsMenuBarVisible(true);
      });
    }

    const updateHeaderWidth = () => {
      const rootDiv: HTMLElement | null = document.getElementById('root');
  
      if (rootDiv) {
        // Récupérer la largeur de la div
        const largeurDiv: number = rootDiv.offsetWidth;
  
        // Injecter la largeur dans une propriété CSS personnalisée
        document.documentElement.style.setProperty('--header-width', `${largeurDiv}px`);
      }
    }
    updateHeaderWidth();
  
    window.addEventListener('resize', updateHeaderWidth);

    return (
      <>
      {/* Artificial height of the header */}
      <div className="h-[10.6vh] w-full"></div>

      {/* Header */}
      <div className="fixed top-0 z-50 h-[7.6vh] w-[--header-width] flex items-center bg-yellow overflow-hidden">
        <div className="w-[16.6666%] flex items-center justify-center text-black">
          <button onClick={toggleMenuBar}>
            {!isMenuBarVisible ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" strokeWidth="2.25" stroke="black" className="w-6 h-6 hover:scale-110 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.5h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 30.5h28" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-110 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            }

          </button>
        </div>
        <div className="w-[66.6%] flex items-center justify-center">
          <p className="text-[250%] text-bold text-center text-black font-eurotype"><Link to="/play" className="text-black hover:text-black">Euroguessr&nbsp;*</Link></p>
        </div>
        <a href="https://twitter.com/euroguessr" className="w-[16.6666%] h-full flex items-center justify-center flex-col">
          <img className="h-[50%] rounded-full" src="src/assets/twitter-icon.png"></img>
          <p className="text-xs text-black">Follow&nbsp;us!</p>
        </a>
      </div>

      {/* Exit menu when open */}
      {isMenuBarVisible &&
        <button className="absolute top-[32.5vh] w-[100vw] z-50 h-[67.5vh] cursor-default" onClick={toggleMenuBar}></button>
      }

      {/* Hidden/Visible Menu */}
      <div className="overflow-hidden z-40 headerMenu fixed top-[-17.4vh] h-[25vh] w-[--header-width] bg-yellow transition ease-in-out duration-700 flex flex-col items-center justify-around">

        <button onClick={toggleMenuBar} className="hover:scale-110 transition-all">
          <p className="text-blue font-eurotype text-2xl"><Link to="/play">Play!</Link></p>
        </button>

        <button onClick={toggleMenuBar} className="hover:scale-110 transition-all">
          <p className="text-blue font-eurotype text-2xl"><Link to="/account">Account</Link></p>
        </button>

        <button onClick={toggleMenuBar} className="hover:scale-110 transition-all">
          <p className="text-blue font-eurotype text-2xl"><Link to="/how-to-play">How to play</Link></p>
        </button>

        <button onClick={toggleMenuBar} className="hover:scale-110 transition-all">
          <p className="text-blue font-eurotype text-2xl"><Link to="/about">About</Link></p>
        </button>
        
      </div>

      {/* Yellow triangle */}
      <svg className="z-30 headerMenu fixed top-[7.4vh] h-[3vh] w-[--header-width] fill-yellow transition ease-in-out duration-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" strokeWidth="3" stroke="black">
        <polygon points="-5,0 50,100 105,0"/>
      </svg>
    </>
  )
}