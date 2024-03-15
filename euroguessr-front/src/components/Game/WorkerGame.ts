import { GameMode, GameModeKeys } from "./GameModes"

export const route = [GameModeKeys.DAILY, GameModeKeys.TRAINING];

export function searchNearGameMode(previous: boolean, dictionary: Map<GameModeKeys, GameMode>, currentGameMode: GameMode | undefined): GameMode | undefined {
    if(!currentGameMode) return;

    // Get the current index
    const currentIndex = route.indexOf(currentGameMode.key);

    // Depending on the direction, get the new index
    let newIndex = currentIndex + (previous ? -1 : 1);

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

    // Return the new game mode
    return newGameMode;
}

export function selectingGameModeRoutine(selectedGameMode: GameMode | undefined, setSearchInput: (searchInput: string) => void) {
  // Reloading searchInput => Reloading songs
  setSearchInput(''); 
  console.log("Reloading songs for " + selectedGameMode?.name);
}
