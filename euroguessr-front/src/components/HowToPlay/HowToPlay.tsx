import { useState } from "react";
import { Song } from "../SongList/Song";

export default function HowToPlay() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div>
      <h1>How to play</h1>
      <div>

        <h2>First step, hearing.</h2>
        <p>Hear the extract by pressing the play button</p>
        <div className="flex justify-around items-center">
          <h2 className={!isHovered ? "opacity-0" : ""}>Let's</h2>
          <div className="w-[15vh] h-[15vh] flex justify-center items-center bg-pink rounded-full shadow-2xl border-4 hover:scale-110 transition-all cursor-pointer"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-[65%] h-[65%] ml-[6%]">
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
            </svg>
          </div>
          <h2 className={!isHovered ? "opacity-0" : ""}>play !</h2>
        </div>

        <h2>(Euro)Guessing the song</h2>
        <p>To try guessing a song, search in the song list by title, year, country or author name.</p>
        <p>Then click on the send button.</p>
        <div className="flex justify-around items-center">
          <div className="w-full h-[34%] flex justify-center bg-purple">
            <div className="relative z-10 w-[80%] h-full rounded-lg overflow-auto">
              <div className="relative font-roboto font-thin text-black px-8 my-2">
                <Song song={{id: "1", country: "France", artist_name: "Johnny Hallyday", song_name: "Allumer le feu", video_id: "dQw4w9WgXcQ", year: 2012}}
                      className="flex justify-between h-[5.5vh] items-center rounded-xl shadow-sm mb-[2.375vh] p-2"
                      fakeSongIsValid={false}/>
                <Song song={{id: "1", country: "France", artist_name: "Johnny Hallyday", song_name: "Allumer le feu", video_id: "dQw4w9WgXcQ", year: 2012}}
                      className="flex justify-between h-[5.5vh] items-center rounded-xl shadow-sm mb-[2.375vh] p-2"
                      fakeSongIsValid={true}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
