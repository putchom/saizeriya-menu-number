import { atom } from "recoil";

export const currentMealIndexState = atom<number>({
  key: "currentMealIndexState",
  default: 0,
});
