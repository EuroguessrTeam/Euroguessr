import { Background } from "../Background/Background";
import Header from "../Header/Header";
import { SongList } from "../SongList/SongList";

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
      {/* Background */}
      <Background className="absolute z-0 h-full w-[--header-width] inset-auto -mt-[21vh]"/>

      {/* Game UI */}
      <div className="z-10 relative h-[44.87vh] flex mb-[4vh] mt-[6.5vh] overflow-hidden">

        <div className="w-[16.6666%] h-full flex items-center pl-[2%]">
          <p className="text-black font-eurotype text-[2.5vh]">Attempt&nbsp;10</p>
        </div>

        {/* Game */}
        <div className="w-[66.68%] h-full flex flex-col justify-between items-center">
          
          {/* Gaming mode */}
          <div className="flex items-center justify-between h-[5.125vh] w-full bg-orange border-2 p-1 border-orange rounded-2xl shadow-2xl">
            <button className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            </button>

            <p className="font-eurotype text-[3vh]">Training</p>

            <button className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </button>
          </div>

          {/* Play Button */}
          <button className="flex justify-center items-center h-[15vh] w-[15vh] bg-pink rounded-full border-4 hover:scale-110 transition ease-in-out duration-200 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[65%] h-[65%] ml-[6%]">
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
            </svg>
          </button>

          {/* Search bar */}
          <div className="flex flex-row items-center h-[5.125vh] w-full bg-white border-2 border-blue rounded-2xl p-1 shadow-2xl">
            <input className="w-full outline-none focus:ring-0 bg-white rounded-2xl text-black text-[3vh] font-eurotype"></input>
            <button className="p-0 border-0 text-white font-bold rounded-xl">
              <div className="flex items-center justify-center w-[4vh] h-[4vh] bg-blue rounded-xl hover:scale-110 transition ease-in-out duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Seconds */}
        <div className="w-[16.6666%] h-full flex flex-row-reverse items-center pr-[2%]">
          <div className="flex flex-column">
            <p className="text-black font-eurotype text-[2.5vh]">Seconds&nbsp;120</p>
          </div>
        </div>

      </div>

      {/* Song list */}
            <div className="w-full flex justify-center bg-purple">
                <div className="relative z-10 bg-yellow w-[80%] h-full rounded-lg ">
                    <div className="flex justify-center items-center">
                        pagination
                    </div>
                    <SongList className="relative font-roboto font-thin text-black p-8" 
                        songs={
                            [
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                                { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
                            ]
                        }
                    />
                </div>
            </div>
    </>
  )
}
