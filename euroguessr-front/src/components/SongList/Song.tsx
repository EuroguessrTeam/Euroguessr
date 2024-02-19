import React from "react";

export interface SongElement {
    imgUrl: string;
    title: string;
}

interface SongProps {
    className?: string;
    imgUrl: string;
    title: string;
}

export class Song extends React.Component<SongProps> {
  render(){
        // Props
        const { className, imgUrl, title } = this.props;

        // Rendered element
        return (
            <div className={className}>
                <div className="grow flex flex-row justify-between items-center">

                    <img src={imgUrl} alt={title} className="w-[4vh] h-[4vh] rounded-lg" />

                    <p className="text-[2vh] grow text-left ml-4">{title}</p>

                    <button className="bg-pink flex items-center justify-center w-[4vh] h-[4vh] rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>

                </div>
            </div>
        )
    }
}
