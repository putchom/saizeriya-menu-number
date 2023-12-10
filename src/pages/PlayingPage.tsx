import React from "react";
import { NUMBER_OF_QUESTIONS } from "../constants";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  GameStatus,
  correctAnswersState,
  currentMealIndexState,
  gameStatusState,
  incorrectAnswersState,
  selectedMealsState,
  userInputState,
} from "../states";

export const PlayingPage: React.FC = () => {
  const selectedMeals = useRecoilValue(selectedMealsState);
  const [currentMealIndex, setCurrentMealIndex] = useRecoilState(
    currentMealIndexState,
  );
  const [userInput, setUserInput] = useRecoilState(userInputState);
  const [correctAnswers, setCorrectAnswers] =
    useRecoilState(correctAnswersState);
  const [incorrectAnswers, setIncorrectAnswers] = useRecoilState(
    incorrectAnswersState,
  );
  const setGameStatus = useSetRecoilState(gameStatusState);

  const checkAnswer = () => {
    const currentMeal = selectedMeals[currentMealIndex];
    if (currentMeal && userInput === currentMeal.id) {
      setCorrectAnswers([...correctAnswers, currentMeal]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentMeal]);
    }
    setCurrentMealIndex(currentMealIndex + 1);

    if (currentMealIndex === selectedMeals.length - 1) {
      setGameStatus(GameStatus.END);
    }

    setUserInput("");
  };

  return (
    <div>
      <p>
        {currentMealIndex + 1} / {NUMBER_OF_QUESTIONS}
      </p>
      <img
        src={selectedMeals[currentMealIndex]?.imagePath}
        width="300"
        alt={selectedMeals[currentMealIndex]?.name}
      />
      <p>{selectedMeals[currentMealIndex]?.name}</p>
      <label>
        <div>メニュー番号</div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="(例) AA01"
          required
        />
        <button type="button" onClick={checkAnswer}>
          回答
        </button>{" "}
      </label>
    </div>
  );
};
