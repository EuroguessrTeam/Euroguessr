import { useEffect, useState } from "react";
import { Song, SongElement } from "./Song";
import { GameMode } from "../Game/GameModes";

interface SongListProps {
  className?: string;
  searchInput?: string;
  selectedGameMode: GameMode;
}

export function SongList ({ className, searchInput, selectedGameMode }:SongListProps) {
    const [songs, setSongs] = useState<SongElement[]>([]);

    useEffect(() => {
        if(songs.length === 0){
          selectedGameMode.initializeSongs().then((songs) => setSongs(songs));
        }
        else{
          selectedGameMode.searchInSongs(searchInput ?? '', 1, 25).then((songs) => setSongs(songs));
        }
    }, [searchInput]);

    return (
        <div className={className}>
            {songs.map((song) => {
                return (
                    <Song key={song.id} 
                          className="w-full h-[5.5vh] bg-white flex items-center rounded-xl shadow-sm mb-[2.375vh] p-2" 
                          song={song} />
                )
            })}
        </div>
    )
}
