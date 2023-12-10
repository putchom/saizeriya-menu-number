import { atom, selector, snapshot_UNSTABLE } from "recoil";
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

export const formattedUserInputState = selector<string>({
  key: "formattedUserInputState",
  get: ({ get }) => {
    const userInput = get(userInputState);
    return userInput.toUpperCase().trim();
  },
});

if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;

  describe("formattedUserInputState", () => {
    test("大文字に変換される", () => {
      const initialSnapshot = snapshot_UNSTABLE();
      expect(
        initialSnapshot.getLoadable(formattedUserInputState).valueOrThrow(),
      ).toBe("");

      const testSnapshot = snapshot_UNSTABLE(({ set }) =>
        set(userInputState, "a"),
      );
      expect(
        testSnapshot.getLoadable(formattedUserInputState).valueOrThrow(),
      ).toBe("A");
    });
  });
}
