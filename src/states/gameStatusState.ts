import { atom } from "recoil";

export enum GameStatus {
  START = 0,
  PLAYING = 1,
  END = 2,
}

export const gameStatusState = atom<GameStatus>({
  key: "gameStatusState",
  default: GameStatus.START,
});
