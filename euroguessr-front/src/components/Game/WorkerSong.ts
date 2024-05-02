import { API } from "../../services/api";
import { SongElement } from "../SongList/Song";

export async function searchInSongs(searchTerm: string | null, page_number: number | null, rows_number: number | null): Promise<SongElement[]> {
    // Get the instance of the API
    const api = API.getInstance();

    // Define the url to get the songs
    const url = `song/search?${searchTerm ? `searchTerm=${searchTerm}&` : ''}page=${page_number}&rowsNumber=${rows_number}`;

    // Get the songs from the API
    return api.get(url, undefined);
}

export async function countSongs(searchTerm: string | null): Promise<number> {
    const url = `song/count${searchTerm ? `?searchTerm=${searchTerm}&` : ''}`;
    return API.getInstance().get(url, undefined);
}

export async function initializeSongs(): Promise<SongElement[]> {
    return await searchInSongs(null, 1, 25);
}
