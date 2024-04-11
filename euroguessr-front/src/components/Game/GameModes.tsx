import { SongElement } from "../SongList/Song";
import { countSongs, initializeSongs, searchInSongs } from "./WorkerSong";

export const enum GameModeKeys {
    DAILY = 1,
    TRAINING = 2,
}

export interface GameMode{
    key: GameModeKeys;
    name: string;
    player_source_api: string;
    skip_button_active: boolean;
    initializeSongs: () => Promise<SongElement[]>;
    searchInSongs: (searchTerm: string | null, page_number: number | null, rows_number: number | null) => Promise<SongElement[]>;
    countSongs: (searchTerm: string | null) => Promise<number>;
}

export const gameModes: Map<GameModeKeys, GameMode> = new Map<GameModeKeys, GameMode>(); 

gameModes.set(
    GameModeKeys.DAILY, 
    {
        key: GameModeKeys.DAILY, 
        name: "Daily",
        player_source_api: "song/daily",
        skip_button_active: false,
        initializeSongs: initializeSongs,
        searchInSongs: searchInSongs,
        countSongs: countSongs,
    }
);

gameModes.set(
    GameModeKeys.TRAINING, 
    {
        key: GameModeKeys.TRAINING, 
        name: "Training",
        player_source_api: "song/training",
        skip_button_active: true,
        initializeSongs: initializeSongs,
        searchInSongs: searchInSongs,
        countSongs: countSongs,
    }
);

