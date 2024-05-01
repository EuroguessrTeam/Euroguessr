import { useEffect, useState } from "react";
import { Song, SongElement } from "./Song";
import { PagingMemo } from "./Paging";
import { useGlobalState } from "../../services/useGlobalState";

interface SongListProps {
  className?: string;
}

export function SongList ({ className}: SongListProps) {
    const [songs, setSongs] = useState<SongElement[]>([]);
    const [page, setPage] = useState<number>(1);
    const [numberPages, setNumberPages] = useState<number>(1);
    const [currentGamemode] = useGlobalState("currentGamemode");
    const [searchInput] = useGlobalState("searchInput");

    // #                          #
    // # useEffect on searchInput #
    // #                          #
    useEffect(() => {
        if(songs.length === 0 && !searchInput){
          currentGamemode?.initializeSongs().then((songs) => setSongs(songs));
        }
        else{
          currentGamemode?.searchInSongs(searchInput ?? null, 1, 25).then((songs) => setSongs(songs));
        }

        // Paging update
        currentGamemode?.countSongs(searchInput ?? null).then((count) => {
              setPage(1);
              let numberPages = Math.ceil(count / 25);
              if(numberPages < 1){
                numberPages = 1;
              }
              setNumberPages(numberPages);
          });
    }, [searchInput]);

    // #                   #
    // # useEffect on page #
    // #                   #
    useEffect(() => {
        if(songs.length !== 0){
          if(!searchInput && page === 1){
            currentGamemode?.initializeSongs().then((songs) => setSongs(songs));
          }
          else{
            currentGamemode?.searchInSongs(searchInput ?? null, page, 25).then((songs) => setSongs(songs));
          }

          // Paging update
          currentGamemode?.countSongs(searchInput ?? null).then((count) => {
              let numberPages = Math.ceil(count / 25);
              if(numberPages < 1){
                numberPages = 1;
              }
              setNumberPages(numberPages);
            });
        }
    }, [page]);

    return (
        <>
          <PagingMemo className="flex justify-center items-center text-purple space-x-4 my-1"
                      actualPage={page}
                      setActualPage={setPage}
                      totalPages={numberPages} />

          <div className={className}>
              {songs.map((song) => {
                  return (
                      <Song key={song.id} 
                            className="flex justify-between h-[5.5vh] items-center rounded-xl shadow-sm mb-[2.375vh] p-2" 
                            song={song} />
                  )
              })}
          </div>

          {songs && songs.length >= 4 && 
            <PagingMemo className="flex justify-center items-center text-purple space-x-4 mb-1 -mt-3"
                        actualPage={page}
                        setActualPage={setPage}
                        totalPages={numberPages} />
          }

        </>
    )
}
