import { API } from "../../services/api";
import { SongElement } from "../SongList/Song";

export function reloadSongs(setSongs: (songs: SongElement[]) => void){
    
    console.log("Reloading songs list");
    let songs: SongElement[] = [];
    const api = API.getInstance();
    //api.get(`song/search?searchTerm=${searchTerm}&page=${page}&rowsNumber=${rowsNumber}`)
    const response = api.get(`song/search?searchTerm=a&page=5&rowsNumber=25`).then((response) => {
        songs = response;
        setSongs(songs);
    });
}
