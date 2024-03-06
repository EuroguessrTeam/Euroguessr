import { Song, SongElement } from "./Song";

interface SongListProps {
  className?: string;
  songs: SongElement[];
}

export function SongList ({ className, songs }:SongListProps) {
  return (
    <div className={className}>
      {songs.map((song, index) => {
        return (
          <Song key={index} className="w-full h-[5.5vh] bg-white flex items-center rounded-xl shadow-sm mb-[2.375vh] p-2" imgUrl={song.imgUrl} title={song.title} />
        )
      })}
    </div>
  )
}
