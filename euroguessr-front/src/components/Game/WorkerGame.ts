import { SongElement } from "../SongList/Song";
import { GameMode, GameModeKeys } from "./GameModes"

export const route = [GameModeKeys.DAILY, GameModeKeys.TRAINING];

export function changeGameMode(isLeft: boolean, dictionary: Map<GameModeKeys, GameMode>, selectedGameMode: GameMode | undefined, setSelectedGameMode: any,
                               songs: SongElement[], setSongs: (songs: SongElement[]) => void){
    if(!selectedGameMode) return;

    // Get the current index
    const currentIndex = route.indexOf(selectedGameMode.key);

    // Depending on the direction, get the new index
    let newIndex = currentIndex + (isLeft ? -1 : 1);

    // If the new index is out of bounds, loop to the end
    if (newIndex < 0) {
      newIndex = route.length - 1;
    } 
    // If the new index is out of bounds, loop to the beginning
    else if (newIndex >= route.length) {
      newIndex = 0;
    }

    // Get the new game mode
    const newGameMode = dictionary.get(route[newIndex]);

    // Changing the selected game mode 
    setSelectedGameMode(newGameMode);

    // Starting the routine
    selectingGameModeRoutine(newGameMode, songs, setSongs);
}

export function selectingGameModeRoutine(selectedGameMode: GameMode | undefined, songs: SongElement[], setSongs: (songs: SongElement[]) => void) {
  // Reloading songs
  if (songs.length === 0) {
    selectedGameMode?.reloadSongs(setSongs);
  }
}
