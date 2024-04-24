import { createGlobalState } from "react-hooks-global-state";
import { GameModeKeys, gameModes } from "../components/Game/GameModes";

const { setGlobalState, useGlobalState } = createGlobalState({
  currentGamemode: gameModes.get(GameModeKeys.DAILY),
  attempt: 1,
  win: false,
  listeningTime: 1,
  skipButtonCounter: 0,
  searchInput: "",
});

export function setCurrentGamemode(value: GameModeKeys) {
  setGlobalState("currentGamemode", gameModes.get(value));
}

export function setAttempt(value: number) {
  setGlobalState("attempt", value);
}

export function setWin(value: boolean) {
  setGlobalState("win", value);
}

export function setListeningTime(value: number) {
  setGlobalState("listeningTime", value);
}

export function setSkipButtonCounter(value: number) {
  setGlobalState("skipButtonCounter", value);
}

export function setSearchInput(value: string) {
  setGlobalState("searchInput", value);
}

export { setGlobalState, useGlobalState };