import { atom } from "recoil";

export const userInputState = atom<string>({
  key: "userInputState",
  default: "",
});
