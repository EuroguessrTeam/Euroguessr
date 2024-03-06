import { useEffect, useState } from "react";
import { Background } from "../Background/Background";
import { DoublePlayIcon } from "../Icons/DoublePlayIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { SongList } from "../SongList/SongList";
import { PlayButton } from "./PlayButton";
import { SongElement } from "../SongList/Song";
import { GameMode, GameModeKeys, gameModes } from "./GameModes";
import { changeGameMode, selectingGameModeRoutine } from "./WorkerGame";

export default function Game() {
  // #     #
  // # CSS #
  // #     #
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

  // #           #
  // # Gamemodes #
  // #           #
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | undefined>(gameModes.get(GameModeKeys.DAILY));

  // #           #
  // # Searching #
  // #           #
  const [songs, setSongs] = useState<SongElement[]>([]);

  // #         #
  // # OnMount #
  // #         #
  useEffect(() => selectingGameModeRoutine(selectedGameMode, songs, setSongs))
  
  // #     #
  // # JSX #
  // #     #
  return (
    <>
      {/* Background */}
      <Background className="absolute z-0 h-full w-[--header-width] inset-auto -mt-[21vh]"/>

      {/* Game UI */}
      {selectedGameMode && 
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
            <button onClick={() => changeGameMode(true, gameModes, selectedGameMode, setSelectedGameMode, songs, setSongs)}>
              <DoublePlayIcon isLeft={true} />
            </button>

            {/* Gamemode title */}
            <p className="font-eurotype text-[3vh]">{selectedGameMode.name}</p>

            {/* Change to next */}
            <button onClick={() => changeGameMode(false, gameModes, selectedGameMode, setSelectedGameMode, songs, setSongs)}>
              <DoublePlayIcon isLeft={false} />
            </button>

          </div>

          {/* Plus button */}
          {selectedGameMode.skip_button_active &&
            <div className="bg-purple-light rounded-full w-[4vh] h-[4vh] flex items-center justify-center">
                +
            </div>
          }

          {/* Play Button */}
          <PlayButton className="w-[15vh] h-[15vh] flex justify-center items-center bg-pink rounded-full shadow-2xl border-4 hover:scale-110 transition ease-in-out duration-200" />

          {/* Skip button */}
          {selectedGameMode.skip_button_active &&
            <div className="bg-purple-light rounded-full w-[8vh] h-[4vh] flex items-center justify-center">
               SKIP 
            </div>
          }

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
      }

      {/* Song list */}
      <div className="w-full h-[34%] flex justify-center bg-purple">
        <div className="relative z-10 bg-yellow w-[80%] h-full rounded-lg overflow-auto">
          <div className="flex justify-center items-center">
              pagination
          </div>
          <SongList className="relative font-roboto font-thin text-black p-8" 
                    songs={songs}
          />
          <div className="flex justify-center items-center">
              pagination
          </div>
        </div>
      </div>
    </>
  )
}
