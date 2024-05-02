import { APIHelper, Guess, Score } from "../../services/apiHelper";
import { SongElement } from "../SongList/Song";
import { countSongs, initializeSongs, searchInSongs } from "./WorkerSong";

export const enum GameModeKeys {
    DAILY = 1,
    TRAINING = 2,
}

export interface GameMode{
    key: GameModeKeys;
    name: string;
    get_score_api: () => Promise<Score>;
    get_song_api: () => Promise<Guess>;
    send_guess_api: (songId: number) => Promise<boolean>;
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
        name: "Daily Guess",
        get_score_api: APIHelper.getDailyScore,
        get_song_api: APIHelper.getDailyGuess,
        send_guess_api: APIHelper.sendDailyGuess,
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
        name: "infinite Mode",
        get_score_api: APIHelper.getTrainingScore,
        get_song_api: APIHelper.getTrainingGuess,
        send_guess_api: APIHelper.sendTrainingGuess,
        skip_button_active: true,
        initializeSongs: initializeSongs,
        searchInSongs: searchInSongs,
        countSongs: countSongs,
    }
);

