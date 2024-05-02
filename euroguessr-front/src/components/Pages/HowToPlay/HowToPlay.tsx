import { useState } from "react";
import { Song } from "../../SongList/Song";
import { PlayButton } from "../../Game/PlayButton";
import { setListeningTime, setWin } from "../../../services/useGlobalState";


export default function HowToPlay() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  setWin(false);
  setListeningTime(360);

  return (
    <div className="overflow-auto h-[89.4vh] p-4 bg-purple">
      <h1>How to play</h1>

      <h2 className="underline">1 - Listening to the song</h2>
      <p>Hear the extract by simply pressing the play button</p>
      <br/>
      <div className="flex justify-around items-center">
        <h2 className={!isHovered ? "opacity-0" : ""}>Let's</h2>
          <div className="z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <PlayButton className={"z-20 w-[15vh] h-[15vh] flex justify-center items-center bg-pink rounded-full shadow-2xl border-4 hover:scale-110 transition-all"}
                        videoIdProp={"dQw4w9WgXcQ"}
                        seekToProp={0}
            />
          </div>
        <h2 className={!isHovered ? "opacity-0" : ""}>play !</h2>
      </div>

      <h2 className="underline">2 - (Euro)Guessing the song</h2>
      <p>To try guessing a song, search in the song list by title, year, country or author name.</p>
      <p>Then click on the pink button to send your guess.</p>
      <br/>
      <div className="flex justify-around items-center">
        <div className="w-full h-[34%] flex justify-center bg-purple">
          <div className="relative z-10 w-[80%] h-full rounded-lg overflow-auto">
            <div className="relative font-roboto font-thin text-black px-8 my-2">
              <Song song={{id: "1", country: "France", artist_name: "Johnny Hallyday", song_name: "Allumer le feu", video_id: "s3O1Xro7oAI", year: 2012}}
                  className="flex justify-between h-[5.5vh] items-center rounded-xl shadow-sm mb-[2.375vh] p-2"
                  fakeSongIsValid={false}/>
              <Song song={{id: "1", country: "France", artist_name: "Rick Astley", song_name: "Never Gonna Give You Up", video_id: "dQw4w9WgXcQ", year: 1987}}
                  className="flex justify-between h-[5.5vh] items-center rounded-xl shadow-sm mb-[2.375vh] p-2"
                  fakeSongIsValid={true}/>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <p>If, after sending the guess, the sound is displayed in green, congratulations, you've won! However, if it displays in red, it wasn't the right guess.</p>
      <p>Don't give up... you get extra listening time with every bad guess :)</p>

      <h2 className="underline">3 - Enjoy the game !</h2>
      <p>Euroguessr is as simple as that. Don't hesitate to try out the different game modes, and give us your suggestions at contact@euroguessr.com.</p>
      <b>Have fun playing Euroguessr !</b>

    </div>
  )
}