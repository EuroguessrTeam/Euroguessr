import { useEffect, useState } from "react";
import { GuessIcon } from "../Icons/GuessIcon";
import { setAttempt, setWin, useGlobalState } from "../../services/useGlobalState";

export interface SongElement {
    id: string;
    year: number;
    country: string;
    artist_name: string;
    song_name: string;
    video_id: string;
}

interface SongProps {
    className?: string;
    song: SongElement;
}

export function Song({className, song}: SongProps) {
  // Props
  const [isGuessCorrect, setIsGuessCorrect] = useState<boolean | undefined>(undefined);
  const [attempt] = useGlobalState("attempt");
  const [win] = useGlobalState("win");
  const [currentGamemode] = useGlobalState("currentGamemode");
  const [skipButtonCounter] = useGlobalState("skipButtonCounter");

  // Send song
  function sendSong() {
    console.log(song);
    currentGamemode?.send_guess_api(parseInt(song.id)).then((response) => {
      console.log(response);
      setIsGuessCorrect(response);
      setWin(response);
      if(!response){
        setAttempt(attempt + 1);
      }
    });
  }

  useEffect(() => {
    setIsGuessCorrect(undefined);
  }, [currentGamemode, skipButtonCounter]);

  // Rendered element
  return (
    <div className={`${isGuessCorrect != undefined ? isGuessCorrect ? "bg-green" : "bg-red" : "bg-white "} ${win && !isGuessCorrect ? "opacity-60" : ""} ${className} transition-all duration-1000`}>
      <div className="grow flex flex-row justify-between items-center overflow-auto">

        <img src={`https://i.ytimg.com/vi/${song.video_id}/hq720.jpg`} alt={`${song.song_name} image`} className="w-[4vh] h-[4vh] rounded-lg" />

        <div className={`grow flex flex-row flex-start justify-between ${isGuessCorrect == undefined ? "text-black" : "text-white"}`}>
          <div className="flex flex-col w-[30%] truncate">
            <p className="text-[1.5vh] grow text-left ml-4 truncate">{song.song_name}</p>
            <p className="text-[1.5vh] italic grow text-left ml-4 truncate">{song.artist_name}</p>
          </div>
          <div className="flex flex-col w-[35%] truncate">
            <p className="text-[1.5vh] grow text-left ml-4 truncate">{song.year}</p>
            <p className="text-[1.5vh] grow text-left ml-4 truncate">{song.country}</p>
          </div>

          <button disabled={isGuessCorrect != undefined || win} onClick={sendSong} className={`transition-all duration-1000 w-[4vh] h-[4vh] flex items-center justify-center rounded-lg ${isGuessCorrect != undefined || win ? "bg-white disabled" : "bg-pink disabled"}`}>
            <GuessIcon fill="white" stroke="black" guessCorrect={isGuessCorrect} sendActive={win || isGuessCorrect != undefined} />
          </button>

        </div>
      </div>
    </div>
  )
}
