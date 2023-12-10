import { atom } from "recoil";
import { Meal } from "../types";

export const incorrectAnswersState = atom<Meal[]>({
  key: "incorrectAnswersState",
  default: [],
});
