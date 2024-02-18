import { Background } from "../Background/Background";

export default function Game() {

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
      <Background className="absolute z-0 h-full w-[--header-width] inset-auto -mt-[10.625vh]"/>
      <div className="flex fixed h-[7.6vh] w-[--header-width] items-center bg-yellow mb-[12.5vh] overflow-hidden p-[0.75%]">
        <div className="w-[16.6666%] h-full flex items-center justify-center text-black">
          <button className="p-0 border-0 text-black focus:outline-none active:outline-none bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth="2.25" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.5h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 30.5h28" />
            </svg>
          </button>
        </div>
        <div className="w-[66.6%] h-full flex items-center justify-center text-black font-eurotype">
          <p className="text-[250%] text-bold text-center">Euroguessr</p>
        </div>
        <div className="w-[16.6666%] h-full flex items-center justify-center ">
          <img className="h-full rounded-full" src="src/assets/profile-pic.png"></img>
        </div>
      </div>

      <div className="flex h-[44.87vh] items-center mb-[4vh] mt-[20.1vh] overflow-hidden">

        <div className="w-[16.6666%] h-full flex flex-row-reverse items-center">
          <p className="z-10 text-black font-eurotype text-[3vh]">10</p>
        </div>

        <div className="w-[66.68%] h-full flex flex-col justify-between">
          
          <div className="z-10 flex items-center justify-between h-[5.125vh] bg-orange border-2 p-1 border-orange rounded-2xl">
            <button className="p-0 border-0 text-white focus:outline-none active:outline-none bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            </button>

            <p className="font-eurotype text-[3vh]">Training</p>

            <button className="p-0 border-0 text-white focus:outline-none active:outline-none bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </button>
          </div>

          <div className=""></div>

          <div className="z-10 flex flex-row items-center h-[5.125vh] bg-white border-2 border-blue rounded-2xl p-1">
            <input className="w-full grow outline-none focus:ring-0 bg-white border-blue rounded-2xl text-black text-[3vh] font-eurotype"></input>
            <button className="p-0 border-0 text-white font-bold rounded-xl">
              <div className="flex items-center justify-center w-[4vh] h-[4vh] bg-blue rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="w-[16.6666%] h-full flex flex-row items-center">
          <div className="flex flex-column">
            <p className="text-black font-eurotype text-[150%]">Seconds</p>
            <p className="z-10 text-black font-eurotype text-[150%]">1</p>
          </div>
        </div>

      </div>


    </>
  )
}
