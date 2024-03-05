import { SongElement } from "../SongList/Song";

export function reloadDailySongs(setSongs: (songs: SongElement[]) => void){
    setSongs(
        [
            { imgUrl: "src/assets/profile-pic.png", title: "Song 1" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 2" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 3" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 4" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 5" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 6" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 7" },
            { imgUrl: "src/assets/profile-pic.png", title: "Song 8" },
        ]
    );
}

