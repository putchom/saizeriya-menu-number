import { atom } from "recoil";
import { Meal } from "../types";

export const selectedMealsState = atom<Meal[]>({
  key: "selectedMealsState",
  default: [],
});
