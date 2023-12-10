import { atom } from "recoil";
import { Meal } from "../types";

export const correctAnswersState = atom<Meal[]>({
  key: "correctAnswersState",
  default: [],
});
