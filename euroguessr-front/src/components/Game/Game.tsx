import { useEffect, useState } from "react";
import { Background } from "../Background/Background";
import { DoublePlayIcon } from "../Icons/DoublePlayIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { SongList } from "../SongList/SongList";
import { PlayButton } from "./PlayButton";
import { GameModeKeys, gameModes } from "./GameModes";
import { searchNearGameMode } from "./WorkerGame";
import { setAttempt, setCurrentGamemode, setListeningTime, setSearchInput, setSkipButtonCounter, setWin, useGlobalState } from "../../services/useGlobalState";

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

  // #                       #
  // # Global game variables #
  // #                       #
  const [timeUntilMidnight, setTimeUntilMidnight] = useState<string>("");
  const [attemptCounter] = useGlobalState("attempt");
  const [win] = useGlobalState("win");
  const [listeningTime] = useGlobalState("listeningTime");
  const [currentGamemode] = useGlobalState("currentGamemode");
  const [skipButtonCounter] = useGlobalState("skipButtonCounter");

  // #                 #
  // # Switch Gamemode #
  // #                 #
  function switchGameMode(previous: boolean) {
    const newGameMode = searchNearGameMode(previous, gameModes, currentGamemode);
    if(newGameMode){
      setCurrentGamemode(newGameMode.key);
    }
  }

  // #             #
  // # Skip button #
  // #             #
  const [skipButtonDisabled, setSkipButtonDisabled] = useState<boolean>(false);
  const handleSkipButtonClicked = () => {
    setSkipButtonCounter(skipButtonCounter + 1);
    setSkipButtonDisabled(true);
    setTimeout(() => {
        setSkipButtonDisabled(false);
      }, 2500);
  };

  // #           #
  // # Searching #
  // #           #
  const search = () => {
    // Get the input value
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;

    // Set the state
    setSearchInput(searchInput.value);
  };

  // #           #
  // # useEffect #
  // #           #
  useEffect(() => {
    currentGamemode?.get_score_api().then((response) => {
      setAttempt(response.attempts);
      setWin(response.win);
    });
  }, [currentGamemode]);

  useEffect(() => {
    setAttempt(1);
    setWin(false);
  }, [skipButtonCounter]);

  useEffect(() => {
    setListeningTime(getListeningTime(attemptCounter));
  }, [attemptCounter]);

  function getListeningTime(attempt:number): number {
    switch(attempt) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 5;
      case 4:
        return 10;
      case 5:
        return 30;
      case 6:
        return 60;
      case 7:
        return 90;
      default:
        return 360;
    }
  }

  // Définition d'une fonction pour calculer le temps restant jusqu'à minuit
  function getTimeUntilMidnight(): number {
    const secondsInOneDay = 3600*24; // 24 hours in seconds
    const currentDate = new Date();
    const UTCSeconds = currentDate.getUTCHours()*3600 + currentDate.getUTCMinutes()*60 + currentDate.getUTCSeconds(); // UTC hour in seconds
    return Math.ceil(secondsInOneDay - UTCSeconds); // Conversion en secondes
  }

  // Fonction pour afficher le temps restant jusqu'à minuit
  function updateTimeUntilMidnight(): void {
    const timeUntilMidnight = getTimeUntilMidnight();
    const hours = Math.floor(timeUntilMidnight / 3600);
    const minutes = Math.floor((timeUntilMidnight % 3600) / 60);
    const seconds = timeUntilMidnight % 60;
    setTimeUntilMidnight(`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
}

  // Décompte toutes les secondes
  setInterval(() => {
    updateTimeUntilMidnight();
  }, 1000);

  // #     #
  // # JSX #
  // #     #
  return (
    <>
      {/* Background */}
      <Background className="absolute z-0 h-full w-[--header-width] inset-auto -mt-[21vh]"/>

      {/* Game UI */}
      {currentGamemode && 
      <div className="z-10 relative h-[44.87vh] flex mb-[4vh] mt-[6.5vh] overflow-hidden">

        {/* Attempts */}
        <div className="w-[16.6666%] h-full flex items-center pl-[2%]">
          <p className="text-black font-eurotype text-[2.5vh]">Attempt&nbsp;{attemptCounter}</p>
        </div>

        {/* Game */}
        <div className="w-[66.68%] h-full flex flex-col justify-between items-center">
          
          {/* Gaming mode */}
          <div className="flex items-center justify-between h-[5.125vh] w-full bg-orange border-2 p-1 px-4 border-orange rounded-2xl shadow-2xl">

            {/* Change to previous */}
            <button onClick={() => switchGameMode(true)}>
              <DoublePlayIcon isLeft={true} />
            </button>

            {/* Gamemode title */}
            <p className="font-eurotype text-[3vh]">{currentGamemode.name}</p>

            {/* Change to next */}
            <button onClick={() => switchGameMode(false)}>
              <DoublePlayIcon isLeft={false} />
            </button>

          </div>

          {/* Plus button (not implemented yet)*/}
          {currentGamemode.key == GameModeKeys.TRAINING && <div className="opacity-0 bg-purple-light rounded-full w-[4vh] h-[4vh] flex items-center justify-center">
              +
          </div>}

          {/* Daily win text */}
          {currentGamemode.key == GameModeKeys.DAILY &&
            <div className={`opacity-0 ${win ? "opacity-100" : ""} h-[4vh] flex items-center justify-center flex-col text-pretty text-sm`}>
              <p className="text-center  bg-purple rounded-lg p-[1vh]">You got today's song in {attemptCounter} attempts !</p>
              <p className="text-center bg-purple rounded-b-lg px-[1vh] pb-[1vh]">Next song in {timeUntilMidnight}</p> 
            </div>
          }

          {/* Play Button */}
          <PlayButton className={"w-[15vh] h-[15vh] flex justify-center items-center bg-pink rounded-full shadow-2xl border-4 hover:scale-110 transition-all"}/>

          {/* Skip button */}
          {currentGamemode.skip_button_active &&
            <button onClick={handleSkipButtonClicked} disabled={skipButtonDisabled} className={`disabled:opacity-50 animation-full ${win ? "animate-wiggle" : ""}`}>
              <div className="bg-blue rounded-full w-[8vh] h-[4vh] flex items-center justify-center">
                <p className="font-bold">{!win ? "SKIP" : "NEXT >"}</p> 
              </div>
            </button>
          }

          {/* Daily win text 2 */}
          {currentGamemode.key === GameModeKeys.DAILY &&
            <div className={`opacity-0 ${win ? "opacity-100" : ""} h-[4vh] flex items-center justify-center flex-col text-pretty text-sm`}>
              <p className="text-center  bg-purple rounded-lg p-[1vh]">To see all your scores, <b><u>click here</u></b></p>
              <p className="text-center bg-purple rounded-b-lg px-[1vh] pb-[1vh]">To continue playing, <b><u><button className="underline" onClick={() => switchGameMode(false)}>click here</button></u></b></p> 
            </div>
          }

          {/* Search bar */}
          <div className="w-full h-[5.125vh] flex flex-row items-center bg-white border-2 border-blue rounded-2xl p-1 shadow-2xl">

            {/* Text input */}
            <input id="searchInput"
                   className="w-full outline-none focus:ring-0 bg-white rounded-2xl text-black text-[3vh] font-eurotype"
                   onKeyDown={(e) => {
                               if(e.key === 'Enter'){
                                 search();
                               }
                             }}/>

            {/* Search button */}
            <button className="bg-blue rounded-xl hover:scale-105 transition ease-in-out duration-200"
                    onClick={() => {search();}}>
              <div className="w-[4vh] h-[4vh] flex items-center justify-center">
                <SearchIcon fill="white" stroke="none" />
              </div>
            </button>

          </div>
        </div>

        {/* Seconds */}
        <div className="w-[16.6666%] h-full flex flex-row-reverse items-center pr-[2%]">
          <div className="flex flex-column">
            <p className="text-black font-eurotype text-[2.5vh]">Seconds&nbsp;{listeningTime}</p>
          </div>
        </div>

      </div>
      }

      {/* Song list */}
      {currentGamemode && 
      <div className="w-full h-[34%] flex justify-center bg-purple">
        <div className="relative z-10 bg-yellow w-[80%] h-full rounded-lg overflow-auto">
          <SongList className="relative font-roboto font-thin text-black p-8" />
        </div>
      </div>
      }
    </>
  )
}
