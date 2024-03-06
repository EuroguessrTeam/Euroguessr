import { SongElement } from "../SongList/Song";
import { reloadDailySongs } from "./WorkerSong";

export const enum GameModeKeys {
    DAILY = 1,
    TRAINING = 2,
}

export interface GameMode{
    key: GameModeKeys;
    name: string;
    player_source_api: string;
    skip_button_active: boolean;
    reloadSongs: (setSongs: (songs: SongElement[]) => void) => void;
}

export const gameModes: Map<GameModeKeys, GameMode> = new Map<GameModeKeys, GameMode>(); 

gameModes.set(
    GameModeKeys.DAILY, 
    {
        key: GameModeKeys.DAILY, 
        name: "Daily",
        player_source_api: "api/daily",
        skip_button_active: false,
        reloadSongs: reloadDailySongs,
    }
);

gameModes.set(
    GameModeKeys.TRAINING, 
    {
        key: GameModeKeys.TRAINING, 
        name: "Training",
        player_source_api: "api/training",
        skip_button_active: true,
        reloadSongs: reloadDailySongs,
    }
);

