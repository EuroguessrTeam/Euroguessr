import { GuessIcon } from "../Icons/GuessIcon";

export interface SongElement {
  imgUrl: string;
  title: string;
}

interface SongProps {
  className?: string;
  imgUrl: string;
  title: string;
}

export function Song ({ className, imgUrl, title }:SongProps) {
  // Rendered element
  return (
    <div className={className}>
      <div className="grow flex flex-row justify-between items-center">

        <img src={imgUrl} alt={title} className="w-[4vh] h-[4vh] rounded-lg" />

        <p className="text-[2vh] grow text-left ml-4">{title}</p>

        <button className="w-[4vh] h-[4vh] flex items-center justify-center bg-pink rounded-lg">
          <GuessIcon fill="white" stroke="white" />
        </button>

      </div>
    </div>
  )
}
