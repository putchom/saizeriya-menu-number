import React from "react";
import meals from "../data/meals.json";
import { useSetRecoilState } from "recoil";
import { selectedMealsState } from "../states/selectedMealsState";
import { currentMealIndexState } from "../states/currentMealIndexState";
import { GameStatus, gameStatusState } from "../states/gameStatusState";
import { NUMBER_OF_QUESTIONS } from "../constants/numberOfQuestions";
import { selectRandomMeals } from "../utils/selectRandomMeals";

export const StartPage: React.FC = () => {
  const setSelectedMeals = useSetRecoilState(selectedMealsState);
  const setCurrentMealIndex = useSetRecoilState(currentMealIndexState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  const startGame = () => {
    setSelectedMeals(
      selectRandomMeals({ meals: meals, quantity: NUMBER_OF_QUESTIONS }),
    );
    setGameStatus(GameStatus.PLAYING);
    setCurrentMealIndex(0);
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
