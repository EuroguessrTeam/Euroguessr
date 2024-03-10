import React from "react";
import { GuessIcon } from "../Icons/GuessIcon";

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

export class Song extends React.Component<SongProps> {
  render(){
    // Props
    const { className, song } = this.props;

    // Rendered element
    return (
      <div className={className}>
        <div className="grow flex flex-row justify-between items-center">

          <img src={`https://i.ytimg.com/vi/${song.video_id}/hq720.jpg`} alt={`${song.song_name} image`} className="w-[4vh] h-[4vh] rounded-lg" />

          <div className="flex flex-row flex-start">
            <div className="flex flex-col">
              <p className="text-[1.5vh] grow text-left ml-4">{song.song_name}</p>
              <p className="text-[1.5vh] grow text-left ml-4">{song.artist_name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[1.5vh] grow text-left ml-4">{song.year}</p>
              <p className="text-[1.5vh] grow text-left ml-4">{song.country}</p>
            </div>
          </div>

          <button className="w-[4vh] h-[4vh] flex items-center justify-center bg-pink rounded-lg">
            <GuessIcon fill="white" stroke="white" />
          </button>

        </div>
      </div>
    )
  }
}
