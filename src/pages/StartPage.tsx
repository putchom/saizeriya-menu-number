import React from "react";
import meals from "../data/meals.json";
import { NUMBER_OF_QUESTIONS } from "../constants";
import { useSetRecoilState } from "recoil";
import {
  GameStatus,
  correctAnswersState,
  currentMealIndexState,
  gameStatusState,
  incorrectAnswersState,
  selectedMealsState,
} from "../states";
import { selectRandomMeals } from "../utils/selectRandomMeals";

export const StartPage: React.FC = () => {
  const setCorrectAnswers = useSetRecoilState(correctAnswersState);
  const setIncorrectAnswers = useSetRecoilState(incorrectAnswersState);
  const setCurrentMealIndex = useSetRecoilState(currentMealIndexState);
  const setSelectedMeals = useSetRecoilState(selectedMealsState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  const resetData = () => {
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setCurrentMealIndex(0);
    setSelectedMeals([]);
  };

  const startGame = () => {
    resetData();
    setSelectedMeals(
      selectRandomMeals({ meals: meals, quantity: NUMBER_OF_QUESTIONS }),
    );
    setGameStatus(GameStatus.PLAYING);
  };

  return (
    <div>
      <p>
        サイゼの料理の
        <br />
        メニュー番号を
        <br />
        当てまくれ！
      </p>
      <button type="button" onClick={startGame}>
        プレイ
      </button>
    </div>
  );
};
