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
    fakeSongIsValid?: boolean;
}

export function Song({className, song, fakeSongIsValid}: SongProps) {
  // Props
  const [isGuessCorrect, setIsGuessCorrect] = useState<boolean | undefined>(undefined);
  const [attempt] = useGlobalState("attempt");
  const [win] = useGlobalState("win");
  const [currentGamemode] = useGlobalState("currentGamemode");
  const [skipButtonCounter] = useGlobalState("skipButtonCounter");

  // Guess
  function guess(response: boolean){
      setIsGuessCorrect(response);
      setWin(response);
    }

  // Send song
  function sendSongDefault() {
    console.log(song);
    currentGamemode?.send_guess_api(parseInt(song.id)).then((response) => {
      console.log(response);
      guess(response);
      if(!response){
        setAttempt(attempt + 1);
      }
    });
  }

  function sendSong() {
    fakeSongIsValid ? guess(fakeSongIsValid) : sendSongDefault();
  }

  useEffect(() => {
    setIsGuessCorrect(undefined);
  }, [currentGamemode, skipButtonCounter]);

  // Rendered element
  return (
    <div className={`${isGuessCorrect != undefined ? isGuessCorrect ? "bg-green" : "bg-red" : "bg-white "} ${win && !isGuessCorrect ? "opacity-60" : ""} ${className} transition-all duration-1000`}>

      <div className="flex">
        <img src={`https://i.ytimg.com/vi/${song.video_id}/hq720.jpg`} alt={`${song.song_name} image`} className="max-w-[4vh] min-w-[4vh] max-h-[4vh] min-h-[4vh] rounded-lg" />
      </div>

      <div className={`w-[20vw] text-nowrap truncate flex flex-col p-[1vw] ${isGuessCorrect == undefined ? "text-black" : "text-white"}`}>
        <p className="font-medium	text-[1.5vh] truncate">{song.song_name}</p>
        <p className="font-medium	text-[1.5vh] truncate">{song.artist_name}</p>
      </div>

      <div className={`w-[20vw] text-nowrap truncate flex flex-col p-[1vw] ${isGuessCorrect == undefined ? "text-black" : "text-white"}`}>
        <p className="font-medium	text-[1.5vh] truncate">{song.year}</p>
        <p className="font-medium	text-[1.5vh] truncate">{song.country}</p>
      </div>

      <div className="flex">
        <button disabled={isGuessCorrect != undefined || win} onClick={sendSong} className={`transition-all duration-1000 w-[4vh] h-[4vh] flex items-center justify-center rounded-lg ${isGuessCorrect != undefined || win ? "bg-white disabled" : "bg-pink disabled"}`}>
          <GuessIcon fill="white" stroke="black" guessCorrect={isGuessCorrect} sendActive={win || isGuessCorrect != undefined} />
        </button>
      </div>
      
    </div>
  )
}
