import { Background } from "../Background/Background";
import { DoublePlayIcon } from "../Icons/DoublePlayIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { SongList } from "../SongList/SongList";
import PlayButton from "./PlayButton";

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

        {/* Attempts */}
        <div className="w-[16.6666%] h-full flex items-center pl-[2%]">
          <p className="text-black font-eurotype text-[2.5vh]">Attempt&nbsp;10</p>
        </div>

        {/* Game */}
        <div className="w-[66.68%] h-full flex flex-col justify-between items-center">
          
          {/* Gaming mode */}
          <div className="flex items-center justify-between h-[5.125vh] w-full bg-orange border-2 p-1 border-orange rounded-2xl shadow-2xl">

            {/* Change to precedent */}
            <button>
              <DoublePlayIcon isLeft={true} />
            </button>

            {/* Gamemode title */}
            <p className="font-eurotype text-[3vh]">Training</p>

            {/* Change to next */}
            <button>
              <DoublePlayIcon isLeft={false} />
            </button>

          </div>

          {/* Play Button */}
          <PlayButton className="w-[15vh] h-[15vh] flex justify-center items-center bg-pink rounded-full shadow-2xl border-4 hover:scale-110 transition ease-in-out duration-200" />

          {/* Search bar */}
          <div className="w-full h-[5.125vh] flex flex-row items-center bg-white border-2 border-blue rounded-2xl p-1 shadow-2xl">

            {/* Text input */}
            <input className="w-full outline-none focus:ring-0 bg-white rounded-2xl text-black text-[3vh] font-eurotype"></input>

            {/* Search button */}
            <button className="bg-blue rounded-xl hover:scale-105 transition ease-in-out duration-200">
              <div className="w-[4vh] h-[4vh] flex items-center justify-center">
                <SearchIcon fill="white" stroke="none" />
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
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 2" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 3" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 4" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 5" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 6" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 7" },
                            { imgUrl: "src/assets/profile-pic.png", title: "Song 8" },
                        ]
                    }
          />
        </div>
      </div>
    </>
  )
}
