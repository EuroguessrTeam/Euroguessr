import { useEffect, useState } from "react";
import { Song, SongElement } from "./Song";
import { GameMode } from "../Game/GameModes";
import { Paging, PagingMemo } from "./Paging";

interface SongListProps {
  className?: string;
  searchInput?: string;
  selectedGameMode: GameMode;
}

export function SongList ({ className, searchInput, selectedGameMode }:SongListProps) {
    const [songs, setSongs] = useState<SongElement[]>([]);
    const [page, setPage] = useState<number>(1);
    const [numberPages, setNumberPages] = useState<number>(1);

    // #                          #
    // # useEffect on searchInput #
    // #                          #
    useEffect(() => {
        if(songs.length === 0 && !searchInput){
          selectedGameMode.initializeSongs().then((songs) => setSongs(songs));
          console.log('initializeSongs dans useEffect searchInput');
        }
        else{
          selectedGameMode.searchInSongs(searchInput ?? null, 1, 25).then((songs) => setSongs(songs));
          console.log('searchInSongs dans useEffect searchInput');
        }

        // Paging update
        selectedGameMode.countSongs(searchInput ?? null).then((count) => {
              setPage(1);
              let numberPages = Math.ceil(count / 25);
              if(numberPages < 1){
                numberPages = 1;
              }
              setNumberPages(numberPages);
              console.log(numberPages);
          });
    }, [searchInput]);

    // #                   #
    // # useEffect on page #
    // #                   #
    useEffect(() => {
        if(songs.length !== 0){
          if(!searchInput && page === 1){
            selectedGameMode.initializeSongs().then((songs) => setSongs(songs));
            console.log('initializeSongs dans useEffect page');
          }
          else{
            selectedGameMode.searchInSongs(searchInput ?? null, page, 25).then((songs) => setSongs(songs));
            console.log('searchInSongs dans useEffect page');
          }

          // Paging update
          selectedGameMode.countSongs(searchInput ?? null).then((count) => {
              let numberPages = Math.ceil(count / 25);
              if(numberPages < 1){
                numberPages = 1;
              }
              setNumberPages(numberPages);
              console.log(numberPages);
            });
        }
    }, [page]);

    return (
        <>
          <PagingMemo className="flex justify-center items-center"
                      actualPage={page}
                      setActualPage={setPage}
                      totalPages={numberPages} />

          <div className={className}>
              {songs.map((song) => {
                  return (
                      <Song key={song.id} 
                            className="w-full h-[5.5vh] bg-white flex items-center rounded-xl shadow-sm mb-[2.375vh] p-2" 
                            song={song} />
                  )
              })}
          </div>

          <PagingMemo className="flex justify-center items-center"
                      actualPage={page}
                      setActualPage={setPage}
                      totalPages={numberPages} />

        </>
    )
}
