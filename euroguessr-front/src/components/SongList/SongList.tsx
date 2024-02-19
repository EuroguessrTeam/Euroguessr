import React from "react";
import { Song, SongElement } from "./Song";

interface SongListProps {
    className?: string;
    songs: SongElement[];
}

export class SongList extends React.Component<SongListProps> {
  render(){
        // Props
        const { className, songs } = this.props;

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
}