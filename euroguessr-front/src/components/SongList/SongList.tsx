import { useEffect, useState } from "react";
import { Song, SongElement } from "./Song";
import { GameMode } from "../Game/GameModes";
import { PagingMemo } from "./Paging";

interface SongListProps {
  className?: string;
  searchInput?: string;
  selectedGameMode: GameMode;
}

export function SongList ({ className, searchInput, selectedGameMode }:SongListProps) {
    const [songs, setSongs] = useState<SongElement[]>([]);
    const [page, setPage] = useState<number>(1);

    // #                          #
    // # useEffect on searchInput #
    // #                          #
    useEffect(() => {
        if(songs.length === 0 || !searchInput){
          selectedGameMode.initializeSongs().then((songs) => setSongs(songs));
          console.log('initializeSongs dans useEffect searchInput');
        }
        else{
          selectedGameMode.searchInSongs(searchInput, 1, 25).then((songs) => setSongs(songs));
          console.log('searchInSongs dans useEffect searchInput');
        }
    }, [searchInput]);

    useEffect(() => {
        if(songs.length !== 0){
          if(!searchInput){
            selectedGameMode.initializeSongs().then((songs) => setSongs(songs));
          }
          else{
            selectedGameMode.searchInSongs(searchInput, page, 25).then((songs) => setSongs(songs));
          }
          console.log('searchInSongs dans useEffect page');
        }
    }, [page]);

    return (
        <>
          <PagingMemo className="flex justify-center items-center"/>

          <div className={className}>
              {songs.map((song) => {
                  return (
                      <Song key={song.id} 
                            className="w-full h-[5.5vh] bg-white flex items-center rounded-xl shadow-sm mb-[2.375vh] p-2" 
                            song={song} />
                  )
              })}
          </div>

          <PagingMemo className="flex justify-center items-center"/>
        </>
    )
}
