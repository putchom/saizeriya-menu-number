import { atom } from "recoil";
import { Meal } from "../types";

export enum GameStatus {
  START = 0,
  PLAYING = 1,
  END = 2,
}

export const correctAnswersState = atom<Meal[]>({
  key: "correctAnswersState",
  default: [],
});

export const currentMealIndexState = atom<number>({
  key: "currentMealIndexState",
  default: 0,
});

export const gameStatusState = atom<GameStatus>({
  key: "gameStatusState",
  default: GameStatus.START,
});

export const incorrectAnswersState = atom<Meal[]>({
  key: "incorrectAnswersState",
  default: [],
});

export const selectedMealsState = atom<Meal[]>({
  key: "selectedMealsState",
  default: [],
});

export const userInputState = atom<string>({
  key: "userInputState",
  default: "",
});
