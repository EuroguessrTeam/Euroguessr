import { API } from "../../services/api";
import { SongElement } from "../SongList/Song";

export async function searchInSongs(searchTerm: string | null, page_number: number | null, rows_number: number | null): Promise<SongElement[]> {
    // Get the instance of the API
    const api = API.getInstance();

    // Define the url to get the songs
    let url = `song/search?${searchTerm ? `searchTerm=${searchTerm}&` : ''}page=${page_number}&rowsNumber=${rows_number}`;
    console.log("Reloading songs");
    console.log(url);

    // Get the songs from the API
    return api.get(url);
}

export async function initializeSongs(): Promise<SongElement[]> {
    return await searchInSongs(null, 4, 25);
}
